import { create } from 'zustand';
import { createOrderSlice } from './createOrderSlice';

export const useBoundStore = create((...a) => ({
  ...createOrderSlice(...a),
}));
