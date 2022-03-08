import {Image, Platform, View} from 'react-native';

import DashboardScreen from '../../features/dashboard/screens/dashboard.screen';
import HosScreen from '../../features/hos/screens/hos.screen';
import Icon from 'react-native-vector-icons/Ionicons';
import MessageScreen from '../../features/messaging/screens/message.screen';
import OrderScreen from '../../features/orders/screens/order.screen';
import React from 'react';
import {Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import styled from 'styled-components/native';
import HosScreen from '../../features/hos/screens/hos.screen';
import SettingStackNav from './setting.stack.nav';

const TAB_ICON = {
  Orders: require('../../../assets/order.png'),
  Messages: require('../../../assets/message.png'),
  Voice: 'mic-outline',
  Hos: require('../../../assets/hos.png'),
  Dashboard: require('../../../assets/dashboard.png'),
};

const ImageIcon = styled.Image`
  width: 24px;
  height: 24px;
`;

const isIos = Platform.OS === 'ios';

function Voice() {
  return (
    <>
      <Text>setting Details Voice</Text>
      <Icon name="md-checkmark-circle" size={32} color="green" />
    </>
  );
}

function Hos() {
  return (
    <>
      <Text>setting Details Voice</Text>
      <Icon name="md-checkmark-circle" size={32} color="green" />
    </>
  );
}

const Microphone = () => {
  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        backgroundColor: '#F4F6FB',
        borderRadius: 40,
        borderWidth: 1,
        borderColor: '#ECEFF8',
        marginTop: !isIos ? -8 : 0,
      }}>
      <Icon
        name="mic-outline"
        size={24}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          color: '#3BC2DE',
          width: isIos ? 51 : 40,
          height: isIos ? 56 : 42,
          alignContent: 'center',
          marginTop: isIos ? 20 : 12,
          marginLeft: isIos ? 28 : 15,
        }}
      />
    </View>
  );
};
//const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// create tab bottom  screenOptions
const createTabOptions = ({route}) => ({
  tabBarIcon: ({size, color}) => {
    const iconName = TAB_ICON[route.name];
    return <Icon name={iconName} color={color} size={18} />;
  },

  tabBarActiveTintColor: '#90C862',
  tabBarInactiveTintColor: 'black',
  tabBarStyle: {
    paddingTop: 10,
  },
  headerTitleAlign: 'center',
  //headerShown: false,
});

// Tab bBottom Navigation
const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={createTabOptions}>
      <Tab.Screen
        name="Orders"
        component={OrderScreen}
        options={({route}) => ({
          headerShown: false,
          title: 'Orders',
          headerTitleStyle: {
            alignSelf: 'center',
            fontWeight: 'bold',
            fontSize: 24,
          },
          tabBarIcon: () => <ImageIcon source={TAB_ICON.Orders} />,
        })}
      />
      <Tab.Screen
        name="Messages"
        component={MessageScreen}
        options={({route}) => ({
          title: 'Messaging',
          headerTitleStyle: {
            alignSelf: 'center',
            fontWeight: 'bold',
            fontSize: 24,
          },
          tabBarIcon: () => <ImageIcon source={TAB_ICON.Messages} />,
        })}
      />
      <Tab.Screen
        name="Voice"
        component={Voice}
        options={({route}) => ({
          title: '',
          headerTitleStyle: {
            alignSelf: 'center',
            fontWeight: 'bold',
            fontSize: 24,
          },
          tabBarIcon: ({color, size}) => <Microphone />,
          tabBarActiveTintColor: '#90C862',
          headerTitleAlign: 'center',
        })}
      />
      <Tab.Screen
        name="Hos"
        component={HosScreen}
        options={() => ({
          headerShown: false,
          title: 'HOS',
          headerTitleStyle: {
            alignSelf: 'center',
            fontWeight: 'bold',
            fontSize: 24,
          },
          tabBarIcon: () => <ImageIcon source={TAB_ICON.Hos} />,
        })}
      />
      <Tab.Screen
        name="Dashboard"
        component={SettingStackNav}
        options={({route}) => ({
          headerShown: false,
          headerStyle: {
            backgroundColor: '#F4F6FB',
          },
          headerTitleStyle: {
            alignSelf: 'center',
            fontWeight: 'bold',
            fontSize: 24,
          },
          tabBarIcon: () => <ImageIcon source={TAB_ICON.Dashboard} />,
        })}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
