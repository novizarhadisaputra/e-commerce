import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { Home, Search, ShoppingCart, User } from 'lucide-react-native'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { MainTabParamList } from '../../navigation/types'
import tw from '../../../core/themes/tailwind'

const HIDDEN_SCREENS: (keyof MainTabParamList)[] = ['Products', 'Cart'];

const MainTab: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
    const { bottom } = useSafeAreaInsets();

    const currentRouteName = state.routes[state.index].name as keyof MainTabParamList;

    // 👇 Hide the tab bar on specific screens
    if (HIDDEN_SCREENS.includes(currentRouteName)) {
        return null;
    }

    return (
        <View style={tw`flex-row`}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    (options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name) as keyof MainTabParamList;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    console.log('route.name', route.name)
                    console.log('route.params', route.params)

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                let icon = <Home color={isFocused ? '#3b82f6' : '#000'} />

                switch (label) {
                    case 'Products':
                        icon = <Search color={isFocused ? '#3b82f6' : '#000'} />;
                        break;
                    case 'Cart':
                        icon = <ShoppingCart color={isFocused ? '#3b82f6' : '#000'} />;
                        break;
                    case 'Profile':
                        icon = <User color={isFocused ? '#3b82f6' : '#000'} />;
                        break;
                }

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        key={index.toString()}
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarButtonTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={tw.style(`flex-1 items-center justify-center bg-white`, { paddingBottom: bottom })}
                    >
                        <View style={tw`py-4`}>
                            {icon}
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default MainTab