import { useState, useEffect } from 'react';

export const useGetUserRules = (id: string) => {
  const [rules, setRules] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log('Fetching user rules for ID:', id);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/rule/${id}`,
          {
            method: 'GET',
            credentials: 'include'
          }
        );
        const result = await response.json();
        if (response.ok) {
          setRules(result.data.rules);
        } else {
          console.error('Failed to fetch user rules:', result.message);
        }
      } catch (error) {
        console.error('Failed to fetch user rules:', error);
      }
    };

    fetchData();
  }, []);

  return { rules };
};
