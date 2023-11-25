'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export default function ProgressTopBar() {
  return (
    <ProgressBar
      height="2px"
      color={'#000000'}
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
}
