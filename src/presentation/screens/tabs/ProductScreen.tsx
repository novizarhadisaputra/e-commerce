import { MasonryFlashList } from '@shopify/flash-list';
import { useInfiniteQuery } from '@tanstack/react-query';
import { ArrowLeft, Search, ShoppingCart } from 'lucide-react-native';
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProductUseCase } from '../../../application/useCases/ProductUseCase';
import { AppColors } from '../../../core/themes/colors';
import ProductCard from '../../components/ProductCard';
import { ProductStackScreenProps } from '../../navigation/types';

type Props = ProductStackScreenProps<'ProductList'>;

const ProductScreen: React.FC<Props> = ({ navigation, route }) => {
    const { top } = useSafeAreaInsets();
    const {
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        error,
        data
    } = useInfiniteQuery({
        queryKey: ['products'],
        queryFn: ({ pageParam }) => ProductUseCase.fetchAll(pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.skip < lastPage.total ? allPages.length + 1 : undefined;
        },
    })

    if (isLoading) return <ActivityIndicator size={'large'} />;
    if (error instanceof Error) return <Text>{error.message}</Text>;

    const products = data?.pages.flatMap(p => p.products) ?? [];

    return (
        <View className='bg-white flex-1' style={{ paddingTop: top }}>

            {/* Top navigation */}
            <View className='py-5 justify-center'>
                <Text className=' text-black text-center text-2xl font-semibold'>
                    {'Products'}
                </Text>
                <View className='absolute w-full flex-row items-center justify-between px-4 py-5'>
                    <TouchableOpacity onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Main', { screen: 'Home' })} className='p-3 bg-gray-100 rounded-full items-center justify-center'>
                        <ArrowLeft size={24} color={AppColors.black} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.getParent()?.navigate('Cart')} className='p-3 bg-gray-100 rounded-full items-center justify-center'>
                        <ShoppingCart size={24} color={AppColors.black} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Search bar */}
            <TouchableOpacity className='flex-row items-center mt-5 mx-4 px-4 py-3 bg-gray-100 rounded-full gap-x-3'>
                <Search size={24} />
                <Text className='text-gray-500'>
                    {'Search here'}
                </Text>
            </TouchableOpacity>

            {data?.pages?.length &&
                <View className='mt-5 mx-4 flex-1'>
                    <MasonryFlashList
                        numColumns={2}
                        data={products}
                        estimatedItemSize={data.pages[0].total}
                        onEndReachedThreshold={0.5}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item, index }) => <ProductCard data={item} index={index} />}
                        ItemSeparatorComponent={() => <View className='mb-4' />}
                        onEndReached={() => hasNextPage && !isFetchingNextPage && fetchNextPage()}
                        ListFooterComponent={() => isFetchingNextPage ? <ActivityIndicator /> : null}
                    />
                </View>}
        </View>
    )
}

export default ProductScreen