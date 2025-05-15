import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { useCart } from '../hooks/useCart'
import AuthStack from './AuthStack'
import MainTabs from './MainTabs'
import { RootStackParamList } from './types'

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
    const { user, loadUserFromStorage } = useAuth();
    const { loadCartFromStorage } = useCart()
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        loadUserFromStorage();
        loadCartFromStorage();
        setTimeout(() => setLoading(false), 300)
    }, [])

    if (loading) return null

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {user ? (
                    <Stack.Screen name={'Main'} component={MainTabs} />
                ) : (
                    <Stack.Screen name={'Auth'} component={AuthStack} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator