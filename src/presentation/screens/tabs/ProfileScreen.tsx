import { ArrowLeft } from 'lucide-react-native';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppColors } from '../../../core/themes/colors';
import { useAuth } from '../../hooks/useAuth';
import { MainTabScreenProps } from '../../navigation/types';
import Button from '../../components/Button';

type Props = MainTabScreenProps<'Profile'>;

const ProfileScreen: React.FC<Props> = ({
    navigation, route
}) => {
    const { user, logout } = useAuth();
    const { top } = useSafeAreaInsets();
    const handleLogout = async () => {
        await logout();
        navigation.replace('Auth', { screen: 'Login' });
    };

    return (
        <View className='flex-1 bg-white' style={{ paddingTop: top }}>
            <View className='items-center gap-y-2'>
                <Image
                    source={{ uri: `https://picsum.photos/200/300` }}
                    className='h-20 w-20 rounded-full'
                />
                <Text className='text-black text-xl font-semibold'>
                    {user?.name}
                </Text>
            </View>
            <Button
                text={'Sign out'}
                textClassName='text-red-500 font-semibold'
                className='bg-transparent'
            />
        </View>
    )
}

export default ProfileScreen