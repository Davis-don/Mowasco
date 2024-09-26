import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
const store = create(
  persist((set) => ({
    user: null,
    getUserData: (data) => set(() => ({ user: data })),
    logoutUser: (date) => set(()=>({user:null}))
  })),
);

export default store;
