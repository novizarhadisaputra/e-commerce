import { useCartStore } from '../../application/stores/useCartStore';
import { Cart } from '../../domain/models/Cart';
import { Product } from '../../domain/models/Product';

export const useCart = () => {
    const { cart, addItem, updateItem, removeItem, clearCart, loadCartFromStorage } = useCartStore();

    const setCartItem = (product: Product) => {
        addItem(product);
    }

    const updateCartItem = (id: string, cart: Cart) => {
        updateItem(cart.id, cart);
    }

    const removeCartItem = (id: string) => {
        removeItem(id);
    }
    const setClearItems = () => {
        clearCart();
    }

    return {
        cart,
        setCartItem,
        updateCartItem,
        removeCartItem,
        setClearItems,
        loadCartFromStorage,
    }
}
