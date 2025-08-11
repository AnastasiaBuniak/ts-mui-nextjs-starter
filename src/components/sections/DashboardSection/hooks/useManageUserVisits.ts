import { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { addVisit, deleteVisit } from 'src/api/visit';
import { createPolicy, editPolicy, deletePolicy } from 'src/api/policy';
import { User, Visit, Policy, ExtendedPolicy } from 'src/types/data';
import {
  CreatePolicyParams,
  DeletePolicyParams,
  EditPolicyParams
} from 'src/types/api-types';
import { useGetUserPolicies } from './useGetUserPolicies';

export const useManageUserVisits = ({ user }: { user: User | null }) => {
  if (!user) {
    throw new Error('User is required to manage visits');
  }
  const { userPolicies, isLoading } = useGetUserPolicies();
  const getTotalDays = (visits: Visit[]) =>
    visits.reduce((sum, v) => sum + dayjs(v.exit).diff(v.entry, 'day') + 1, 0);
  const [policies, setPolicies] = useState<ExtendedPolicy[]>([]);

  useEffect(() => {
    const populatedPolicies = userPolicies.map((country: Policy) => {
      const totalDays = getTotalDays(country.visits || []);
      return { ...country, totalDays };
    });
    setPolicies(populatedPolicies);
  }, [userPolicies]);

  const addVisitToThePolicy =
    (policyId: string) =>
    async ({ entry, exit }: { entry: Dayjs; exit: Dayjs }) => {
      const result = await addVisit({
        start: dayjs(entry).valueOf(),
        exit: dayjs(exit).valueOf(),
        countryId: policyId
      });

      if (!result) {
        console.error('Failed to add visit');
        return;
      }
      const newVisit = result.data.visit;

      const policiesWithNewVisit = policies.map((policy: ExtendedPolicy) => {
        if (policy._id === policyId) {
          if (!policy.visits) {
            policy.visits = [];
          }

          policy.visits.push(newVisit);
          const totalDays = getTotalDays(policy.visits || []);
          return { ...policy, totalDays };
        }
        return policy;
      });
      setPolicies(policiesWithNewVisit);
    };

  const deleteVisitFromThePolicy = async (visit: Visit) => {
    const visitId = visit._id;
    await deleteVisit(visitId);
    const updatedPolicies = policies.map((policy: ExtendedPolicy) => {
      if (policy.visits) {
        policy.visits = policy.visits.filter((visit) => visit._id !== visitId);
        const totalDays = getTotalDays(policy.visits || []);
        return { ...policy, totalDays };
      }
      return policy;
    });
    setPolicies(updatedPolicies);
  };

  const addNewPolicy = async ({ name, description }: CreatePolicyParams) => {
    const result = await createPolicy({ name, description });

    if (!result) {
      console.error('Failed to add policy');
      return;
    }
    const newPolicy = result.data.policy;

    setPolicies(policies.concat({ ...newPolicy, totalDays: 1 }));
  };

  const onDeletePolicy = async ({ id }: DeletePolicyParams) => {
    const result = await deletePolicy({ id });

    if (!result.success) {
      console.error('Failed to delete policy');
      return;
    }

    setPolicies(policies.filter((policy: ExtendedPolicy) => policy._id !== id));
  };

  const onEditPolicy = async ({ id, name, description }: EditPolicyParams) => {
    const result = await editPolicy({ id, name, description });

    if (!result) {
      console.error('Failed to edit policy');
      return;
    }
    const newPolicy = result.data.policy;
    const updatedPolicies = policies.map((policy: ExtendedPolicy) => {
      if (policy._id === newPolicy._id) {
        return { ...policy, name, description };
      }
      return policy;
    });

    setPolicies(updatedPolicies);
  };

  return {
    policies,
    isLoading,
    addVisit: addVisitToThePolicy,
    deleteVisit: deleteVisitFromThePolicy,
    addPolicy: addNewPolicy,
    deletePolicy: onDeletePolicy,
    editPolicy: onEditPolicy
  };
};
