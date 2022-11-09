import { FC, Fragment, memo, useContext, useEffect, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { useNavigation, useTheme } from '@react-navigation/native';
import publicService from '../services/publicService';
import { useAuth } from '../contexts/Auth';
import { emailValidator, nameValidator } from '../utils/utils';
import { Layout } from '../components/Layout';
import { ThemeColors } from 'react-navigation';
import { HorizontalContainer, VerticalContainer } from '../components/StyledComponents';
import Label from '../components/Label';
import { Spacer } from '../components/Spacer';
import { FontSize } from '../utils/Constants';
import { Card, List } from 'react-native-paper';


interface Props {
  route: {
    params: {
      userDetails: any;
      isEdit: boolean;
    };
  };
}

interface ILocation {
  id: string;
  lat: string;
  lng: string;
  userId: string;
}

export const UserDetailsScreen: FC<Props> = (props: Props) => {
  const { route } = props;
  const { userDetails } = route.params;
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [locations, setLocations] = useState<ILocation[]>([]);
  const nav = useNavigation();
  const auth = useAuth();
  const { colors } = useTheme();

  const getDetails = async () => {
    const response = await publicService.userDetails(auth.authData?.token, email);
    setLocations(response.locations)
  };

  useEffect(() => {
    if (userDetails) {
      setName(userDetails.name)
      setEmail(userDetails.email)
      getDetails();
    }
  }, [userDetails]);
  useEffect(() => {
    getDetails();

  }, [name]);

  const _onAddLocationPressed = () => {
  };

  return (
    <Layout padding={16}>
      <View
        style={{
          flexDirection: 'column',
          height: '100%',
        }}>
        <View>
          <Card >
            <View style={{ padding: 10 }}>
              <Label fontSize={FontSize.XL}>{name}</Label>
              <Label fontSize={FontSize.XL}>{email}</Label>
            </View>
          </Card>
        </View>
        <Spacer size='large' direction='vertical' />
        <HorizontalContainer
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'center'
          }}>
          <View style={{ marginEnd: 5, alignSelf: 'center' }}>
            <Label fontSize={FontSize.XXL}>Locations</Label>
          </View>
          <View style={{ marginEnd: 5, alignSelf: 'center' }}>
            <Button
              mode="outlined"
              onPress={() => nav.navigate('AddLocationScreen')}>
              Add Location
            </Button>
          </View>
        </HorizontalContainer>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={locations}
          ItemSeparatorComponent={() => <Spacer direction='vertical' size='smaller' />}
          style={{ height: Dimensions.get('window').height - (50 ?? 0) }}
          renderItem={(item) => {
            return (
              <List.Item
                onPress={() => nav.navigate('AddLocationScreen')}
                style={{ padding: 10 }}
                right={props => (
                  <View
                    style={{
                      alignContent: 'center',
                      flexDirection: 'row',
                      alignSelf: 'flex-end',
                    }}>
                    <Button
                      color="grey"
                      mode="outlined"
                      onPress={() => nav.navigate('AddLocationScreen')}>
                      Delete
                    </Button>
                  </View>
                )}
                title={'No location name'}
                description={`${item.item.lat} / ${item.item.lng}`} />

            )
          }}
        />
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

