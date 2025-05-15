import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { Cart } from '../../domain/models/Cart';
import { Product } from '../../domain/models/Product';
import { MMKVStorage } from '../../infrastructure/storage/MMKVStorage';

type CartStore = {
    cart: Cart[]
    addItem: (item: Product) => void
    updateItem: (id: string, cart: Cart) => void
    removeItem: (id: string) => void
    clearCart: () => void
    loadCartFromStorage: () => void
}

export const useCartStore = create<CartStore>((set, get) => ({
    cart: [],
    addItem: (item) => {
        let carts: Cart[] = [...get().cart];
        let index = carts.findIndex((value) => value.product.id == item.id);
        if (index >= 0) {
            carts[index]['quantity'] += 1;
            carts[index]['product'] = item;
        } else {
            carts.push({
                id: uuidv4(),
                quantity: 1,
                product: item
            });
        }
        MMKVStorage.setCart(carts)
        set({ cart: carts })
    },
    updateItem: (id, item) => {
        let carts: Cart[] = [...get().cart];
        let index = carts.findIndex((value) => value.id == id);
        if (index >= 0) {
            carts[index]['product'] = item.product;
            carts[index]['quantity'] = item.quantity;
        }
        MMKVStorage.setCart(carts)
        set({ cart: carts })
    },
    removeItem: (id) => {
        const carts: Cart[] = get().cart.filter((item) => item.id !== id)
        MMKVStorage.setCart(carts)
        set({ cart: carts })
    },
    clearCart: () => {
        MMKVStorage.clearCart()
        set({ cart: [] })
    },
    loadCartFromStorage: () => {
        const storedCart = MMKVStorage.getCart()
        set({ cart: storedCart })
    },
}))
