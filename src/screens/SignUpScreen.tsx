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
import { emailValidator, nameValidator, passwordValidator } from '../utils/utils';
import { useToast } from "react-native-toast-notifications";
import { Spacer } from '../components/Spacer';
import authService from '../services/authService';

export const SignUpScreen = () => {
  const [loading, isLoading] = useState(false);
  const [name, setName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const toast = useToast();

  const nav = useNavigation();
  const auth = useAuth();
  const signUp = async () => {
    isLoading(true);
    const response = await authService.register(email.value,
      password.value,
      name.value,
    );
    if (!response) {
      toast.show("Date Not valid", { type: 'warning' });
      isLoading(false);
    } else {
      toast.show("Registered successfully .. ", { type: 'success' });
      nav.navigate('SignInScreen' as never);
    }
  };

  const _onSignUpPressed = () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    signUp();

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
            <Label color='black' fontSize={FontSize.XXXXL} centerText>Welcome</Label>
            <Spacer direction='vertical' size='large' />
            <Label color='black' fontSize={FontSize.LG} >Register </Label>

            <TextInput
              label="Name"
              returnKeyType="next"
              value={name.value}
              onChangeText={text => setName({ value: text, error: '' })}
              error={!!name.error}
              errorText={name.error}
            />
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
            <Button mode="contained" onPress={_onSignUpPressed}>
              Submit
            </Button>
            <Button mode="outlined" onPress={() => nav.navigate('SignInScreen' as never)}>
              Login
            </Button>
          </View>

        )}
      </VerticalContainer>
    </Layout >
  );
};
