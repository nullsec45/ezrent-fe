'use client';

import { fetcher } from '@/utils/swrUtils';
import { SWRConfig } from 'swr';

export default function SWRConfigClient({ children }) {
  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
        onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
          // Never retry on 404 or 401.
          if (error.response.status === 404 || error.response.status === 401)
            return;

          // Never retry for a specific key.
          if (key === '/auth/verify-token') return;

          // Only retry up to 10 times.
          if (retryCount >= 10) return;

          // Retry after 5 seconds.
          setTimeout(() => revalidate({ retryCount }), 5000);
        },
      }}
    >
      {children}
    </SWRConfig>
  );
}
