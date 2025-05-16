import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import tw from '../../../core/themes/tailwind'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { useAuth } from '../../hooks/useAuth'
import { AuthStackScreenProps } from '../../navigation/types'

type Props = AuthStackScreenProps<'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const { t } = useTranslation();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const { login } = useAuth();

    const handleLogin = async () => {
        try {
            login(email, password);
        } catch (error) {
            console.error('Login failed', error)
        }
    }

    return (
        <View style={tw`flex-1 justify-center items-center bg-white px-10`}>
            <View style={tw`w-full gap-y-4 mb-10`}>
                <Input
                    placeholder={'Email'}
                    onChangeText={setEmail}
                    keyboardType={'email-address'}
                    autoCapitalize={'sentences'}
                />
                <Input
                    placeholder={'Password'}
                    onChangeText={setPassword}
                    isPassword={true}
                />
            </View>
            <Button
                text={t('login')}
                onPress={handleLogin}
            />

        </View>
    )
}

export default LoginScreen