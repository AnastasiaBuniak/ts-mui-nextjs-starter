import { useState, useEffect } from 'react';
import { getPolicy } from 'src/api/policy';
import { addVisit, deleteVisit } from 'src/api/visit';
import { ExtendedPolicy, Visit } from 'src/types/data';
import dayjs, { Dayjs } from 'dayjs';

interface UseGetUserPolicyResponse {
  userPolicy?: ExtendedPolicy;
  isLoading: boolean;
  addPolicyVisit: (data: { entry: Dayjs; exit: Dayjs }) => Promise<void>;
  deletePolicyVisit: (visit: Visit) => Promise<void>;
}

export const useGetUserPolicy = ({
  id
}: {
  id: string | undefined;
}): UseGetUserPolicyResponse => {
  const [userPolicy, setUserPolicy] = useState<ExtendedPolicy>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const getTotalDays = (visits: Visit[]) =>
    visits.reduce((sum, v) => sum + dayjs(v.exit).diff(v.entry, 'day') + 1, 0);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      const result = await getPolicy({ id });
      if (!result?.data?.policy) {
        return;
      }
      const policy = result.data.policy;
      const totalDays = getTotalDays(policy.visits || []);

      setUserPolicy({ ...policy, totalDays });
      setIsLoading(false);
    };

    fetchData();
  }, [id]);

  const addPolicyVisit = async ({
    entry,
    exit
  }: {
    entry: Dayjs;
    exit: Dayjs;
  }) => {
    const result = await addVisit({
      start: dayjs(entry).valueOf(),
      exit: dayjs(exit).valueOf(),
      policyId: userPolicy?._id as string
    });

    if (!result) {
      console.error('Failed to add visit');
      return;
    }

    const newVisit = result.data.visit;
    const updatedVisitsList = userPolicy?.visits.concat(newVisit) || [];
    const totalDays = getTotalDays(updatedVisitsList);

    setUserPolicy({
      ...userPolicy,
      visits: updatedVisitsList,
      totalDays
    } as ExtendedPolicy);
  };

  const deletePolicyVisit = async (visit: Visit) => {
    const visitId = visit._id;
    await deleteVisit(visitId);

    const updatedVisits = userPolicy?.visits.filter(
      (visit) => visit._id !== visitId
    );

    const totalDays = getTotalDays(updatedVisits || []);

    setUserPolicy({
      ...userPolicy,
      visits: updatedVisits as Visit[],
      totalDays
    } as ExtendedPolicy);
  };

  return { userPolicy, isLoading, addPolicyVisit, deletePolicyVisit };
};
