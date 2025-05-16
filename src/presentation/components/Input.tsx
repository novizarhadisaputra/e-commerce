import React from 'react';
import { KeyboardTypeOptions, StyleProp, TextInput, TextStyle } from 'react-native';
import tw from '../../core/themes/tailwind';

interface Props {
    isPassword?: boolean;
    placeholder?: string;
    onChangeText?: ((text: string) => void);
    style?: StyleProp<TextStyle>;
    keyboardType?: KeyboardTypeOptions;
    autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
    autoCorrect?: boolean;

};

const Input: React.FC<Props> = ({
    isPassword = false,
    placeholder,
    onChangeText,
    style,
    keyboardType = 'default',
    autoCapitalize = 'none',
    autoCorrect = false,
}) => {
    return (
        <TextInput
            secureTextEntry={isPassword}
            placeholder={placeholder}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            style={[tw`border-b text-base font-normal text-black border-gray-700 py-4`, style]}
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
        />
    )
}

export default Input