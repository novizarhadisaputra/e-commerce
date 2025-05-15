import React from 'react';
import { KeyboardTypeOptions, TextInput } from 'react-native';

interface Props {
    isPassword?: boolean;
    placeholder?: string;
    onChangeText?: ((text: string) => void);
    className?: string;
    keyboardType?: KeyboardTypeOptions;
    autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
    autoCorrect?: boolean;

};

const Input: React.FC<Props> = ({
    isPassword = false,
    placeholder,
    onChangeText,
    className,
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
            className={`border-b text-base font-normal text-black border-gray-700 py-4 ${className ? className : ''}`}
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
        />
    )
}

export default Input