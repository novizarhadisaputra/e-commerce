import { create } from 'zustand'
import { User } from '../../domain/models/User'
import { MMKVStorage } from '../../infrastructure/storage/MMKVStorage'

type UserStore = {
    user: User | null
    setUser: (user: User) => void
    clearUser: () => void
    loadUserFromStorage: () => void
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user) => {
        MMKVStorage.setUser(user)
        set({ user })
    },
    clearUser: () => {
        MMKVStorage.clearUser()
        set({ user: null })
    },
    loadUserFromStorage: () => {
        const user = MMKVStorage.getUser()
        if (user) set({ user })
    },
}))
