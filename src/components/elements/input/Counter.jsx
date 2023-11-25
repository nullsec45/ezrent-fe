'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function Counter({
  value,
  onIncement,
  onDecrement,
  onInputChange,
}) {
  return (
    <div className="flex items-center">
      <Button
        variant="secondary"
        className="rounded-r-none text-xl"
        onClick={onDecrement}
      >
        -
      </Button>
      <Input
        type="text"
        value={value}
        className="w-12 focus-visible:ring-0"
        onChange={onInputChange}
      />
      <Button
        variant="secondary"
        className="rounded-l-none text-xl"
        onClick={onIncement}
      >
        +
      </Button>
    </div>
  );
}
