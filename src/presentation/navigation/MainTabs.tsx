import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import MainTab from '../components/Tabs/MainTab'
import CartScreen from '../screens/tabs/CartScreen'
import HomeScreen from '../screens/tabs/HomeScreen'
import ProfileScreen from '../screens/tabs/ProfileScreen'
import ProductStack from './ProductStack'
import { MainTabParamList } from './types'

const Tab = createBottomTabNavigator<MainTabParamList>()

const MainTabs: React.FC = () => {
    return (
        <Tab.Navigator tabBar={(props: BottomTabBarProps) => <MainTab {...props} />}>
            <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Products" component={ProductStack} options={{ headerShown: false }} />
            <Tab.Screen name="Cart" component={CartScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
        </Tab.Navigator>
    )
}

export default MainTabs
