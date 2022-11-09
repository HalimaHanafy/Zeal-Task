import { useNavigation } from '@react-navigation/native';
import { FC, memo, useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemeColors } from 'react-navigation';
import Button from '../components/Button';
import { Layout } from '../components/Layout';
import TextInput from '../components/TextInput';
import { useAuth } from '../contexts/Auth';
import publicService from '../services/publicService';

export const AddLocationScreen: FC = () => {
  const [Lat, setlat] = useState({ value: '', error: '' });
  const [Lng, setlng] = useState({ value: '', error: '' });
  const nav = useNavigation();
  const auth = useAuth();

  const AddLocation = async () => {
    const response = await publicService.addLocation(auth.authData?.token, auth.authData?.admin.email, Lat.value, Lng.value);
    nav.goBack();
  };

  const _onLoginPressed = () => {
    setlat({ ...Lat, error: '' });
    setlng({ ...Lng, error: '' });
    if (!Lat.value || !Lng.value) {
      return;
    }

    AddLocation();
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
            label="Lat"
            returnKeyType="next"
            value={Lat.value}
            onChangeText={text => setlat({ value: text, error: '' })}
            autoCapitalize="none"
            keyboardType="decimal-pad"
          />

          <TextInput
            label="Lng"
            returnKeyType="done"
            value={Lng.value}
            onChangeText={text => setlng({ value: text, error: '' })}
            keyboardType="decimal-pad"
          />
        </View>
        <Button mode="contained" onPress={_onLoginPressed}>
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
    color: ThemeColors.light.bodyBorder,
  },
  link: {
    fontWeight: 'bold',
    color: ThemeColors.light.header,
  },
});

