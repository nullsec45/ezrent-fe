import { api } from '@/utils/axios';
import useSWRMutation from 'swr/mutation';

const rejectPaymentTransaction = async (url) => {
  await api.post(url);
};

export default function useRejectTransactionsMutation(transactionId) {
  const res = useSWRMutation(
    `/transactions/${transactionId}/reject-payment`,
    rejectPaymentTransaction
  );

  return res;
}
