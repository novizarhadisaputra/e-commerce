import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Heart, ShoppingCart, Star } from 'lucide-react-native';
import React from 'react';
import { ActivityIndicator, Alert, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProductUseCase } from '../../../application/useCases/ProductUseCase';
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
        <View className='flex-1 bg-white'>
            <Animated.Image
                source={{ uri: route.params.thumbnail }}
                style={{ width: width, height: 401 + top }}
                className={'bg-gray-300'}
                resizeMode={'contain'}
                sharedTransitionTag="tag"
            />

            {/* Top navigation */}
            <View className='absolute w-full flex-row items-center justify-between px-4 py-5' style={{ marginTop: top }}>
                <TouchableOpacity onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Main', { screen: 'Home' })} className='p-3 bg-gray-100 rounded-full items-center justify-center'>
                    <ArrowLeft size={24} />
                </TouchableOpacity>
                <TouchableOpacity className='p-3 bg-gray-100 rounded-full items-center justify-center'>
                    <Heart size={24} />
                </TouchableOpacity>
            </View>

            {/* Title and reviews */}
            <View className='flex-row items-center justify-between mx-4'>
                <View className='gap-y-2.5'>
                    <Text className='font-semibold mt-2'>
                        {data?.brand}
                    </Text>
                    <View className='flex-row items-center gap-x-2'>
                        <Star
                            fill={AppColors.orange['400']}
                            color={AppColors.orange['400']}
                        />
                        <Text className='text-black text-xs font-semibold'>
                            {data?.reviews && (Math.round(data.reviews.reduce((total, next) => total + next.rating, 0) / data.reviews.length)) + ' (' + data.reviews.length + ' reviews)'}
                        </Text>
                    </View>
                </View>
                <Text className='text-blue-500 text-base font-semibold'>
                    {'$'}{data?.price ?? 0}
                </Text>
            </View>
            {/* Description */}
            <View className='mx-4 mt-5 gap-y-2'>
                <Text className='font-semibold text-base text-black capitalize'>
                    {'description'}
                </Text>
                <Text className='font-regular text-xs text-black capitalize'>
                    {data?.description}
                </Text>
            </View>

            <View className='absolute bottom-0 px-4 flex-row gap-x-2' style={{ paddingBottom: bottom }}>
                <Button
                    text={'buy now'}
                    textClassName='capitalize'
                    className='flex-auto'
                />
                <TouchableOpacity onPress={handleAddToCart} className='py-3 px-12'>
                    <ShoppingCart className='' />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ProductDetailScreen