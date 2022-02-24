import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AccountNavigator from './account.nav';
import TabNavigator from './tab.navigation';
const Navigation = ({user}) => {
  //const [auth, setAuth] = useState(false);

  return (
    <NavigationContainer>
      {user ? <TabNavigator /> : <AccountNavigator />}
    </NavigationContainer>
  );
};

export default Navigation;
