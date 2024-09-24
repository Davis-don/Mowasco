import { create } from 'zustand'

const store = create ((set) => ({
    user:'',
    getUserData:(data) => set(() =>({user: data}))
}))

export default store
