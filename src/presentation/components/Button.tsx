import React from 'react';
import { StyleProp, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import tw from '../../core/libs/tailwind';

interface Props {
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    text?: string;
    onPress?(): void;
}

const Button: React.FC<Props> = ({
    style,
    textStyle,
    text,
    onPress
}) => {
    return (
        <TouchableOpacity onPress={onPress} style={[tw`p-4 w-full rounded-full bg-purple-600 items-center justify-center`, style]}>
            <Text style={[tw`text-white text-center text-base`, textStyle]}>
                {text}
            </Text>
        </TouchableOpacity>
    )
}

export default Button