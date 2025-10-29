import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
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
    addPolicy: addNewPolicy,
    deletePolicy: onDeletePolicy,
    editPolicy: onEditPolicy
  };
};
