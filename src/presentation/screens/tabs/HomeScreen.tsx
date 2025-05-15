import { MasonryFlashList } from '@shopify/flash-list';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Bell, Search } from 'lucide-react-native';
import React from 'react';
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProductUseCase } from '../../../application/useCases/ProductUseCase';
import ProductCard from '../../components/ProductCard';
import { useAuth } from '../../hooks/useAuth';

const HomeScreen: React.FC = () => {
    const { top } = useSafeAreaInsets();
    const { user } = useAuth();
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
        getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
            return lastPage.skip < lastPage.total ? allPages.length + 1 : undefined;
        },
    })

    if (isLoading) return <ActivityIndicator size={'large'} />;
    if (error instanceof Error) return <Text>{error.message}</Text>;

    const products = data?.pages.flatMap(p => p.products) ?? [];

    return (
        <View className='bg-white flex-1' style={{ paddingTop: top }}>
            <View className='flex-row items-center mt-5 mx-4 gap-x-2'>
                {/* Avatar */}
                <View className='bg-gray-500 h-12 w-12 rounded-full justify-center items-center'>
                    <Text className='text-white text-center'>
                    </Text>
                </View>
                {/* Greetings and Name */}
                <View className='gap-y-1 flex-1'>
                    <Text className='text-black text-xs'>
                        {'Hello!'}
                    </Text>
                    <Text className='text-black text-sm font-bold'>
                        {user?.name}
                    </Text>
                </View>
                {/* Notification */}
                <TouchableOpacity className='border border-gray-200 bg-gray-100 h-12 w-12 rounded-full justify-center items-center'>
                    <Bell />
                </TouchableOpacity>
            </View>

            {/* Search bar */}
            <TouchableOpacity className='flex-row items-center mt-5 mx-4 px-4 py-3 bg-gray-100 rounded-full gap-x-3'>
                <Search size={24} />
                <Text className='text-gray-500'>
                    {'Search here'}
                </Text>
            </TouchableOpacity>

            {/* Banner */}
            <Image
                className='h-[8.4375rem] mx-4 mt-5 rounded-xl'
                source={{
                    uri: `https://picsum.photos/200/300`
                }}
            />

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

export default HomeScreen