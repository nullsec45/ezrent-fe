'use client';

import { fetcher } from '@/utils/swrUtils';
import { SWRConfig } from 'swr';

export default function SWRConfigClient({ children }) {
  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
      }}
    >
      {children}
    </SWRConfig>
  );
}
