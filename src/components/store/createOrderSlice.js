import { persist } from 'zustand/middleware';

export const createOrderSlice = persist(
  (set) => ({
    order: {
      userAddressId: '',
      shipping: '',
      storeId: '',
      products: [
        {
          id: '',
          quantity: 0,
          rentPeriod: {
            from: '',
            to: '',
          },
        },
      ],
      transaction: {
        paymentMethod: '',
      },
    },

    setOrderProduct: ({ productId, quantity, rentPeriod: { from, to } }) =>
      set((state) => ({
        order: {
          ...state.order,
          products: [
            {
              id: productId,
              quantity,
              rentPeriod: {
                from,
                to,
              },
            },
          ],
        },
      })),

    setUserAddress: (userAddressId) =>
      set((state) => ({
        order: {
          ...state.order,
          userAddressId,
        },
      })),

    setOrderShipping: (shipping) =>
      set((state) => ({
        order: {
          ...state.order,
          shipping,
        },
      })),
  }),
  {
    name: 'product-rent',
  }
);
