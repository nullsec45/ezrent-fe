import { api } from '@/utils/axios';
import useSWRMutation from 'swr/mutation';

const approvePaymentTransaction = async (url) => {
  await api.post(url);
};

export default function useApproveTransactionsMutation(transactionId) {
  const res = useSWRMutation(
    `/transactions/${transactionId}/approve-payment`,
    approvePaymentTransaction
  );

  return res;
}
