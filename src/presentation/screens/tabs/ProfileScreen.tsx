import React from 'react';
import { Image, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tw from '../../../core/libs/tailwind';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';
import { MainTabScreenProps } from '../../navigation/types';

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
        <View style={tw.style(`flex-1 bg-white`, { paddingTop: top })}>
            <View style={tw`items-center gap-y-2`}>
                <Image
                    source={{ uri: `https://picsum.photos/200/300` }}
                    style={tw`h-20 w-20 rounded-full`}
                />
                <Text style={tw`text-black text-xl font-semibold`}>
                    {user?.name}
                </Text>
            </View>
            <Button
                text={'Sign out'}
                textStyle={tw`text-red-500 font-semibold`}
                style={tw`bg-transparent`}
                onPress={handleLogout}
            />
        </View>
    )
}

export default ProfileScreen