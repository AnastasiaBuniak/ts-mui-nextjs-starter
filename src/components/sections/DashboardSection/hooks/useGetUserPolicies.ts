import { useState, useEffect } from 'react';
import { Policy } from 'src/types/data';

export const useGetUserPolicies = (): {
  userPolicies: Policy[];
  isLoading: boolean;
} => {
  const [userPolicies, setUserPolicies] = useState<Policy[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/policies`,
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
