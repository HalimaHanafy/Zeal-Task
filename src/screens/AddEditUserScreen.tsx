import { FC, memo, useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { useNavigation, useTheme } from '@react-navigation/native';
import publicService from '../services/publicService';
import { useAuth } from '../contexts/Auth';
import { emailValidator, nameValidator } from '../utils/utils';
import { Layout } from '../components/Layout';
import { ThemeColors } from 'react-navigation';




interface Props {
  route: {
    params: {
      userDetails: any;
      isEdit: boolean;
    };
  };
}

export const AddEditUserScreen: FC<Props> = (props: Props) => {
  const { route } = props;
  const { isEdit, userDetails } = route.params;

  const [email, setEmail] = useState({ value: '', error: '' });
  const [name, setName] = useState({ value: '', error: '' });
  const nav = useNavigation();
  const auth = useAuth();
  const { colors } = useTheme();

  const AddUser = async () => {
    const response = await publicService.addUser(auth.authData?.token, name.value, email.value);
    nav.goBack();
  };

  useEffect(() => {
    if (isEdit && userDetails) {
      setName({ value: userDetails.name, error: '' })
      setEmail({ value: userDetails.email, error: '' })
    } else {

    }
  }, [isEdit]);
  const _onAddEditUser = () => {
    const emailError = emailValidator(email.value);
    const nameError = nameValidator(name.value);

    if (emailError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      return;
    }

    AddUser();
  };

  return (
    <Layout padding={16}>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}>
        <View>
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
        </View>
        <Button mode="contained" onPress={_onAddEditUser}>
          Submit
        </Button>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  forgotlng: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: ThemeColors.light.bodyContent,
  },
  link: {
    fontWeight: 'bold',
    color: ThemeColors.light.header,
  },
});

