import { MasonryFlashList } from '@shopify/flash-list';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Bell, Search } from 'lucide-react-native';
import React from 'react';
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProductUseCase } from '../../../application/useCases/ProductUseCase';
import ProductCard from '../../components/ProductCard';
import { useAuth } from '../../hooks/useAuth';
import tw from '../../../core/themes/tailwind';

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
        <View style={tw.style(`bg-white flex-1`, { paddingTop: top })}>
            <View style={tw`flex-row items-center mt-5 mx-4 gap-x-2`}>
                {/* Avatar */}
                <View style={tw`bg-gray-500 h-12 w-12 rounded-full justify-center items-center`}>
                    <Text style={tw`text-white text-center`}>
                    </Text>
                </View>
                {/* Greetings and Name */}
                <View style={tw`gap-y-1 flex-1`}>
                    <Text style={tw`text-black text-xs`}>
                        {'Hello!'}
                    </Text>
                    <Text style={tw`text-black text-sm font-bold`}>
                        {user?.name}
                    </Text>
                </View>
                {/* Notification */}
                <TouchableOpacity style={tw`border border-gray-200 bg-gray-100 h-12 w-12 rounded-full justify-center items-center`}>
                    <Bell />
                </TouchableOpacity>
            </View>

            {/* Search bar */}
            <TouchableOpacity style={tw`flex-row items-center mt-5 mx-4 px-4 py-3 bg-gray-100 rounded-full gap-x-3`}>
                <Search size={24} />
                <Text style={tw`text-gray-500`}>
                    {'Search here'}
                </Text>
            </TouchableOpacity>

            {/* Banner */}
            <Image
                style={tw`h-[8.4375rem] mx-4 mt-5 rounded-xl`}
                source={{
                    uri: `https://picsum.photos/200/300`
                }}
            />

            {data?.pages?.length &&
                <View style={tw`mt-5 mx-4 flex-1`}>
                    <MasonryFlashList
                        numColumns={2}
                        data={products}
                        estimatedItemSize={data.pages[0].total}
                        onEndReachedThreshold={0.5}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item, index }) => <ProductCard data={item} index={index} />}
                        ItemSeparatorComponent={() => <View style={tw`mb-4`} />}
                        onEndReached={() => hasNextPage && !isFetchingNextPage && fetchNextPage()}
                        ListFooterComponent={() => isFetchingNextPage ? <ActivityIndicator /> : null}
                    />
                </View>}
        </View>
    )
}

export default HomeScreen