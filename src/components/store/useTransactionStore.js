import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useTransactionStore = create(
  persist(
    (set) => ({
      currentTransaction: '',
      setCurrentTransaction: (transactionId) =>
        set({
          currentTransaction: transactionId,
        }),
      resetCurrentTransaction: () =>
        set({
          currentTransaction: '',
        }),
    }),
    {
      name: 'current-transaction',
    }
  )
);
