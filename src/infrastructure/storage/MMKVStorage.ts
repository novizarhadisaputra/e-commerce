import { MMKV } from 'react-native-mmkv'
import { Cart } from '../../domain/models/Cart'
import { User } from '../../domain/models/User'

const storage = new MMKV()

export const MMKVStorage = {
    setUser: (user: User) => storage.set('user', JSON.stringify(user)),
    getUser: (): User | null => {
        const data = storage.getString('user')
        return data ? JSON.parse(data) : null
    },
    clearUser: () => storage.delete('user'),
    setCart: (cart: Cart[]) => storage.set('cart', JSON.stringify(cart)),
    getCart: (): Cart[] => {
        const data = storage.getString('cart')
        return data ? JSON.parse(data) : [];
    },
    clearCart: () => storage.delete('cart'),
}
