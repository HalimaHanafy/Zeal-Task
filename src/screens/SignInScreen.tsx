import React, { useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import { styles } from './styles';
import { useAuth } from '../contexts/Auth';
import { Layout } from '../components/Layout';
import Label from '../components/Label';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { FontSize } from '../utils/Constants';
import { HorizontalContainer, VerticalContainer } from '../components/StyledComponents';
import { emailValidator, passwordValidator } from '../utils/utils';
import { useToast } from "react-native-toast-notifications";
import { Spacer } from '../components/Spacer';

export const SignInScreen = () => {
  const [loading, isLoading] = useState(false);
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const toast = useToast();

  const nav = useNavigation();
  const auth = useAuth();
  const signIn = async () => {
    isLoading(true);
    const response = await auth.signIn(email.value, password.value);
    if (!response) {
      toast.show("Date Not valid", { type: 'warning' });
      isLoading(false);
    } else {
      toast.show("Welcome .. ", { type: 'success' });
    }
  };

  const _onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    signIn();
  };

  return (
    <Layout >
      <VerticalContainer style={{
        width: '100%', height: '100%', padding: 30,

        justifyContent: 'center'
      }}>
        {loading ? (
          <ActivityIndicator color={'#000'} animating={true} size="small" />
        ) : (
          <View>
            <Label color='black' fontSize={FontSize.XXL} centerText>Welcome back.</Label>
            <Spacer direction='vertical' size='large' />
            <Label color='black' fontSize={FontSize.LG} >Login.</Label>
            <TextInput
              label="Email"
              returnKeyType="next"
              value={email.value}
              onChangeText={text => setEmail({ value: text, error: '' })}
              error={!!email.error}
              errorText={email.error}
              autoCapitalize="none"
              textContentType="emailAddress"
              keyboardType="email-address"
            />
            <TextInput
              label="Password"
              returnKeyType="done"
              value={password.value}
              onChangeText={text => setPassword({ value: text, error: '' })}
              error={!!password.error}
              errorText={password.error}
              secureTextEntry
            />
            <Button mode="contained" onPress={_onLoginPressed}>
              Login
            </Button>
            <TouchableOpacity onPress={() => nav.navigate('SignUpScreen' as never)}>
              <Label color='black' fontSize={FontSize.LG} forceRightAlign>{`Register`}</Label>
            </TouchableOpacity>
          </View>

        )}
      </VerticalContainer>
    </Layout >
  );
};
