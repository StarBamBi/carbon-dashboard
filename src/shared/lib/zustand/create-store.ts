import { create } from "zustand";

export type StoreCreator<T> = (set: (partial: Partial<T>) => void) => T;

export const createStore = <T>(creator: StoreCreator<T>) => create<T>()(creator);
