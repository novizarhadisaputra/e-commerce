import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { Product } from '../../domain/models/Product';
import { MainTabParamList } from '../navigation/types';

type Props = {
    data: Product;
    index: number;
}

const ProductCard: React.FC<Props> = ({ data, index }) => {
    const navigation = useNavigation<NativeStackNavigationProp<MainTabParamList>>();

    return (
        <TouchableOpacity onPress={() => navigation.navigate('Products', { screen: 'ProductDetail', params: data })} className={`border border-gray-100 rounded-lg ${index % 2 == 0 ? 'mr-2' : 'ml-2'}`}>
            <Animated.Image
                source={{ uri: data.thumbnail }}
                resizeMode={'contain'}
                className='h-36'
                sharedTransitionTag={'tag'}
            />
            <View className='bg-gray-100 px-2 py-1 rounded-b-lg'>
                <Text className='text-black font-bold text-sm'>
                    {data.brand}
                </Text>
                <Text className='text-black font-semibold text-xs'>
                    $ {data.price}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default ProductCard