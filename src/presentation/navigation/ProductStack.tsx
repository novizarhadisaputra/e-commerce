import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ProductDetailScreen from '../screens/products/ProductDetailScreen';
import ProductScreen from '../screens/tabs/ProductScreen';
import { ProductStackParamList } from './types';

const Stack = createNativeStackNavigator<ProductStackParamList>();

const ProductStack: React.FC = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ProductList" component={ProductScreen} />
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        </Stack.Navigator>
    );
};

export default ProductStack;
