import { useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';

export function useEmailUsage() {
  const { user } = useUser();
  const [usageCount, setUsageCount] = useState(0);

  useEffect(() => {
    // Get usage count from user metadata
    const count = user?.privateMetadata?.emailUsageCount as number || 0;
    setUsageCount(count);
  }, [user]);

  const incrementUsage = async () => {
    try {
      const newCount = usageCount + 1;
      await user?.update({
        privateMetadata: {
          ...user.privateMetadata,
          emailUsageCount: newCount,
        },
      });
      setUsageCount(newCount);
    } catch (error) {
      console.error('Error updating usage count:', error);
    }
  };

  return {
    usageCount,
    incrementUsage,
    hasReachedLimit: usageCount >= 3,
  };
} 