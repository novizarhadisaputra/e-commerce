import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Heart, ShoppingCart, Star } from 'lucide-react-native';
import React from 'react';
import { ActivityIndicator, Alert, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProductUseCase } from '../../../application/useCases/ProductUseCase';
import tw from '../../../core/libs/tailwind';
import { AppColors } from '../../../core/themes/colors';
import Button from '../../components/Button';
import { useCart } from '../../hooks/useCart';
import { ProductStackScreenProps } from '../../navigation/types';

type Props = ProductStackScreenProps<'ProductDetail'>;

const ProductDetailScreen: React.FC<Props> = ({ navigation, route }) => {
    const { top, bottom } = useSafeAreaInsets();
    const { width } = useWindowDimensions();
    const { setCartItem } = useCart();
    const {
        isLoading,
        error,
        data
    } = useQuery({
        queryKey: ['product', route.params.id],
        queryFn: ({ pageParam }) => ProductUseCase.fetchById(route.params.id),
    })

    if (isLoading) return <ActivityIndicator size={'large'} />;
    if (error instanceof Error) return <Text>{error.message}</Text>;

    const handleAddToCart = () => {
        if (data) {
            setCartItem(data);
            Alert.alert('Notification', 'Add to cart success');
        }
    }

    return (
        <View style={tw`flex-1 bg-white`}>
            <Animated.Image
                source={{ uri: route.params.thumbnail }}
                style={[tw`bg-gray-300`, { width: width, height: 401 + top }]}
                resizeMode={'contain'}
                sharedTransitionTag="tag"
            />

            {/* Top navigation */}
            <View style={[tw`absolute w-full flex-row items-center justify-between px-4 py-5`, { marginTop: top }]}>
                <TouchableOpacity onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Main', { screen: 'Home' })} style={tw`p-3 bg-gray-100 rounded-full items-center justify-center`}>
                    <ArrowLeft size={24} />
                </TouchableOpacity>
                <TouchableOpacity style={tw`p-3 bg-gray-100 rounded-full items-center justify-center`}>
                    <Heart size={24} />
                </TouchableOpacity>
            </View >

            {/* Title and reviews */}
            < View style={tw`flex-row items-center justify-between mx-4`}>
                <View style={tw`gap-y-2.5`}>
                    <Text style={tw`font-semibold mt-2`}>
                        {data?.brand}
                    </Text>
                    <View style={tw`flex-row items-center gap-x-2`}>
                        <Star
                            fill={AppColors.orange['400']}
                            color={AppColors.orange['400']}
                        />
                        <Text style={tw`text-black text-xs font-semibold`}>
                            {data?.reviews && (Math.round(data.reviews.reduce((total, next) => total + next.rating, 0) / data.reviews.length)) + ' (' + data.reviews.length + ' reviews)'}
                        </Text>
                    </View>
                </View>
                <Text style={tw`text-blue-500 text-base font-semibold`}>
                    {'$'}{data?.price ?? 0}
                </Text>
            </View >
            {/* Description */}
            < View style={tw`mx-4 mt-5 gap-y-2`}>
                <Text style={tw`font-semibold text-base text-black capitalize`}>
                    {'description'}
                </Text>
                <Text style={tw`font-regular text-xs text-black capitalize`}>
                    {data?.description}
                </Text>
            </View >

            <View style={[tw`absolute bottom-0 px-4 flex-row gap-x-2`, { paddingBottom: bottom }]}>
                <Button
                    text={'buy now'}
                    textStyle={tw`capitalize`}
                    style={tw`flex-auto`}
                />
                <TouchableOpacity onPress={handleAddToCart} style={tw`py-3 px-12`}>
                    <ShoppingCart />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ProductDetailScreen