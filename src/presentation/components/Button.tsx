import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface Props {
    className?: string;
    textClassName?: string;
    text?: string;
    onPress?(): void;
}

const Button: React.FC<Props> = ({
    className,
    textClassName,
    text,
    onPress
}) => {
    return (
        <TouchableOpacity onPress={onPress} className={`p-4 w-full rounded-full bg-purple-600 items-center justify-center ${className ? className : ''}`}>
            <Text className={`text-white text-center text-base ${textClassName ? textClassName : ''}`}>
                {text}
            </Text>
        </TouchableOpacity>
    )
}

export default Button