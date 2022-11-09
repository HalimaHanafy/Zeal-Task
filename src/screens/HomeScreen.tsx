import React, { FC, Fragment, useEffect, useState } from 'react';
import { Dimensions, FlatList, Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';
import { useAuth } from '../contexts/Auth';
import { Layout } from '../components/Layout';
import Label from '../components/Label';
import publicService from '../services/publicService';
import { Spacer } from '../components/Spacer';
import { HorizontalContainer, VerticalContainer } from '../components/StyledComponents';
import { FontSize } from '../utils/Constants';
import Button from '../components/Button';
import { useNavigation, useTheme } from '@react-navigation/native';

export interface IListItem {
  id: string;
  name: string;
  email: string;
  adminId: string;
}

export const HomeScreen: FC = () => {
  const auth = useAuth();
  const [usersList, setUsersList] = useState<IListItem[]>();
  const [allLocations, setLocations] = useState<IListItem[]>();
  const { colors } = useTheme();
  const nav = useNavigation();
  const getUsers = async () => {
    const response = await publicService.usersList(auth.authData?.token);
    setUsersList(response.users);
  };
  const getLocations = async () => {
    const response = await publicService.allLocationsList(auth.authData?.token, auth.authData?.admin?.email ?? '');
    setLocations(response.locations)
  };

  useEffect(() => {
    getUsers();
    getLocations();
  }, [])

  const signOut = () => {
    auth.signOut();
  };

  return (
    <Layout padding={16} onScreenFocus={() => {
      getUsers();
    }}>
      <>
        <Button mode='contained' onPress={signOut} >Sign Out</Button>
        <Label forceRightAlign>#Users : {usersList?.length}</Label>
        <Label forceRightAlign>#Locations : {allLocations?.length}</Label>

        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={usersList}
          ItemSeparatorComponent={() => <Spacer direction='vertical' size='smaller' />}
          style={{ height: Dimensions.get('window').height - (50 ?? 0), marginTop: 10 }}
          renderItem={(item) => {
            return (
              <Fragment key={item.index}>
                <View key={item.item.id} style={{
                  borderRadius: 4,
                  paddingLeft: 16,
                  paddingRight: 14,
                  paddingTop: 14,
                  marginEnd: 6,
                  backgroundColor: 'white'
                }}>
                  <HorizontalContainer width='94%'>
                    <View style={{ backgroundColor: colors.border, width: 4, height: '100%', marginEnd: 14 }} />
                    <VerticalContainer >
                      <TouchableOpacity onPress={() => nav.navigate('UserDetailsScreen' as never, { userDetails: item?.item })}>

                        <Label color={'black'} fontSize={FontSize.XL}>{item?.item?.name}</Label>
                      </TouchableOpacity>
                      <>
                        <HorizontalContainer flexWrap>
                          <View style={{ width: '100%', flexDirection: 'column' }}>
                            <View style={{ paddingTop: 5, paddingBottom: 3 }}>
                              <Label color={'black'} lineHeight={16} fontSize={FontSize.LG} bold>{item?.item?.email}</Label>
                            </View>
                            <HorizontalContainer
                              style={{
                                justifyContent: 'space-around',
                                alignItems: 'flex-end',
                                alignContent: 'flex-end',
                                alignSelf: 'flex-end'
                              }}
                            >
                              <Button mode='outlined' onPress={() => nav.navigate('AddEditUserScreen' as never, { userDetails: item?.item, isEdit: true })}>
                                Edit</Button>
                              <Button mode='contained' >Delete</Button>
                            </HorizontalContainer>

                          </View>

                        </HorizontalContainer>
                      </>
                    </VerticalContainer>
                  </HorizontalContainer>
                  <Spacer direction='vertical' size='smaller' />
                </View>
              </Fragment>
            );
          }}
        />
        <Button
          mode="contained"
          onPress={() => nav.navigate('AddEditUserScreen' as never, { userDetails: undefined, isEdit: false })}>
          Add
        </Button>

      </>
    </Layout>
  );
};
