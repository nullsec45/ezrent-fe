import { api } from '@/utils/axios';
import useSWRMutation from 'swr/mutation';

const addReview = async (url, { arg }) => {
  await api.post(url, arg);
};

export default function useAddReviewMutation(productId) {
  const res = useSWRMutation(`/products/${productId}/reviews`, addReview);
  return res;
}
