import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
const store = create(
  persist((set) => ({
    user: null,
    customers: null,
    getUserData: (data) => set(() => ({ user: data })),
    logoutUser: () => set(() => ({ user: null })),
    // delete:() => set((customers) => customers.filter((customer) => customer.cust !== id))
  })),
);

export default store;
