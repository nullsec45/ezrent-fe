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
          price: 0,
          subTotal: 0,
        },
      ],
      transaction: {
        paymentMethod: '',
      },
    },

    setOrderProduct: ({
      productId,
      storeId,
      quantity,
      rentPeriod: { from, to },
      price,
      subTotal,
    }) =>
      set((state) => ({
        order: {
          ...state.order,
          storeId,
          products: [
            {
              id: productId,
              quantity,
              rentPeriod: {
                from,
                to,
              },
              price,
              subTotal,
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

    setOrderPaymentMethod: (paymentMethod) =>
      set((state) => ({
        order: {
          ...state.order,
          transaction: {
            ...state.order.transaction,
            paymentMethod,
          },
        },
      })),
  }),
  {
    name: 'product-rent',
  }
);
