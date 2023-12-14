import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartOrdersStore = create(
  persist(
    (set) => ({
      cartOrders: [],

      setOrderList: (cartOrdersList) => {
        set({
          cartOrders: cartOrdersList,
        });
      },

      setAddressCartOrders: (userAddressId) => {
        set((state) => ({
          cartOrders: state.cartOrders.map((order) => ({
            ...order,
            userAddressId,
          })),
        }));
      },

      setShippingMethodCartOrders: (shipping) => {
        set((state) => ({
          cartOrders: state.cartOrders.map((order) => ({
            ...order,
            shipping,
          })),
        }));
      },

      setPaymentMethodCartOrders: (paymentMethod) => {
        set((state) => ({
          cartOrders: state.cartOrders.map((order) => ({
            ...order,
            transaction: {
              paymentMethod,
            },
          })),
        }));
      },
    }),
    {
      name: 'cart-orders',
    }
  )
);
