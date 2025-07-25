import { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { addVisit, deleteVisit } from './api';
import { User, Visit, Policy, ExtendedPolicy } from 'src/types/data';

export const useGetUserPolicies = (
  id: string
): { userPolicies: Policy[]; isLoading: boolean } => {
  const [userPolicies, setUserPolicies] = useState<Policy[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/policy/${id}`,
          {
            method: 'GET',
            credentials: 'include'
          }
        );
        const result = await response.json();
        if (response.ok) {
          setUserPolicies(result.data.policies);
          setIsLoading(false);
        } else {
          console.error('Failed to fetch user Policies:', result.message);
        }
      } catch (error) {
        console.error('Failed to fetch user Policies:', error);
      }
    };

    fetchData();
  }, []);

  return { userPolicies, isLoading };
};

export const useManageUserVisits = ({ user }: { user: User | null }) => {
  if (!user) {
    throw new Error('User is required to manage visits');
  }
  const { userPolicies, isLoading } = useGetUserPolicies(user.id);
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

  return {
    policies,
    isLoading,
    addVisit: addVisitToThePolicy,
    deleteVisit: deleteVisitFromThePolicy
  };
};
