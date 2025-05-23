import { ArrowLeft, EllipsisVertical } from 'lucide-react-native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EmptyCart } from '../../../assets/svgs';
import tw from '../../../core/themes/tailwind';
import { AppColors } from '../../../core/themes/colors';
import Button from '../../components/Button';
import CartCard from '../../components/CartCard';
import { useCart } from '../../hooks/useCart';
import { MainTabScreenProps } from '../../navigation/types';

type Props = MainTabScreenProps<'Cart'>;

const CartScreen: React.FC<Props> = ({ navigation, route }) => {
    const { cart } = useCart();
    const { top } = useSafeAreaInsets();

    return (
        <View style={tw.style('flex-1 bg-white', { paddingTop: top })}>

            {/* Top navigation */}
            <View style={tw`w-full flex-row items-center justify-between px-4 py-5`}>
                <TouchableOpacity onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Main', { screen: 'Home' })} style={tw`p-3 bg-gray-100 rounded-full items-center justify-center`}>
                    <ArrowLeft size={24} color={AppColors.black} />
                </TouchableOpacity>
                <TouchableOpacity style={tw`p-3 bg-gray-100 rounded-full items-center justify-center`}>
                    <EllipsisVertical size={24} color={AppColors.black} />
                </TouchableOpacity>
            </View>

            {cart.length > 0 ?
                cart?.map((cart) =>
                    <View key={cart.id} style={tw`px-4 mb-3`}>
                        <CartCard data={cart} />
                    </View>
                ) :
                <View style={tw`absolute h-full w-full items-center justify-center gap-y-4 px-10`}>
                    <EmptyCart width={200} height={200} />
                    <Button
                        text={'Add Cart'}
                        onPress={() => navigation.replace('Main', { screen: 'Home' })}
                    />
                </View>}
        </View>
    )
}

export default CartScreen