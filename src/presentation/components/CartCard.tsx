import { Minus, Plus, Trash2 } from 'lucide-react-native';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { AppColors } from '../../core/themes/colors';
import { Cart } from '../../domain/models/Cart';
import { useCart } from '../hooks/useCart';
import tw from '../../core/libs/tailwind';

interface Props {
    data: Cart;
}

const CartCard: React.FC<Props> = ({ data }) => {
    const { removeCartItem, updateCartItem } = useCart();

    const handleDeleteItem = () => {
        removeCartItem(data.id);
    };


    const handleUpdateItem = (type: 'plus' | 'minus') => {
        let quantity = type == 'minus' ? data.quantity - 1 : data.quantity + 1;
        if (quantity == 0) {
            return handleDeleteItem();
        }
        return updateCartItem(data.id, { ...data, quantity })
    }

    return (
        <View style={tw` bg-gray-100 p-3 flex-row rounded-lg gap-x-3`}>
            <Image
                source={{ uri: data.product.thumbnail }}
                style={tw` h-28 w-32 bg-gray-300 rounded-lg`}
            />
            <View style={tw` flex-auto`}>
                <View style={tw` flex-row items-start justify-between`}>
                    <View style={tw` gap-y-1`}>
                        <Text style={tw` font-semibold text-sm text-black`}>
                            {data.product.brand}
                        </Text>
                        <Text style={tw` font-semibold text-sm text-gray-500 capitalize`}>
                            {data.product.category}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={handleDeleteItem}>
                        <Trash2 color={AppColors.red[500]} />
                    </TouchableOpacity>
                </View>
                <View style={tw` flex-row items-center flex-auto justify-between`}>
                    <Text style={tw` font-semibold text-sm text-black`}>
                        $ {data.product.price}
                    </Text>
                    <View style={tw` flex-row items-center gap-x-3`}>
                        <TouchableOpacity onPress={() => handleUpdateItem('minus')} style={tw`p-2 bg-purple-600 rounded-full`}>
                            <Minus size={16} color={AppColors.white} />
                        </TouchableOpacity>
                        <Text style={tw`text-black font-semibold text-sm`}>
                            {data.quantity}
                        </Text>
                        <TouchableOpacity onPress={() => handleUpdateItem('plus')} style={tw`p-2 bg-purple-600 rounded-full`}>
                            <Plus size={16} color={AppColors.white} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default CartCard