/* eslint-disable prettier/prettier */

import * as login from '../../../store/actions/auth';

import {ActivityIndicator, Alert, Image} from 'react-native';
import {
  AuthContainer,
  ButtonText,
  Group,
  OnTouch,
  SubmitButton,
} from '../components/accounts.styles';
import {LockIcon, Lockbackground} from '../components/loginbackground.styles';
import React, {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';

import {AuthContext} from '../../../services/auth/auth.context';
import Icon from 'react-native-vector-icons/Ionicons';
import ImputForm from '../../../components/form-control/InputFormComponent';
import {colors} from '../../../infrastructure/theme/colors';
import styled from 'styled-components/native';
import {useDispatch} from 'react-redux';

//import {Ionicons} from '@expo/vector-icons';

const LoginContiner = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  text-align: left;
`;

const LogoContainer = styled.View`
  margin-bottom: ${props => props.theme.space[4]};
  align-items: center;
`;

const ForgetPassword = styled.View`
  align-items: flex-end;
  margin-bottom: ${props => props.theme.space[3]};
`;
const ForgetPasswordText = styled.Text`
  color: ${props => props.theme.colors.text.secondary};
  font-size: ${props => props.theme.fontSizes.caption};
`;

const Slogon = styled.Text`
  font-size: ${props => props.theme.fontSizes.caption};
  color: ${props => props.theme.colors.text.disabled};
`;

const CheckboxContainer = styled.View`
  flex-direction: row;
  margin-bottom: ${props => props.theme.space[3]};
`;

const CheckboxLabel = styled.Text`
  text-align: left;
  margin-bottom: ${props => props.theme.space[2]};
  margin-left: ${props => props.theme.space[2]};
  padding-top: 3px;
  color: ${props => props.theme.colors.text.secondary};
`;

const NewUserContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SignUpText = styled.Text`
  color: ${props => props.theme.colors.brand.primary};
  margin-top: -5px;
`;
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};
const Login = ({navigation}) => {
  const [checked, setChecked] = useState(false);
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const {signIn} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      fleetId: '',
      username: '',
      password: '', 
    },
    inputValidities: {
      fleetId: false,
      username: false,
      password: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error, [{text: 'Okay'}]);
    }
  }, [error]);

  const loginHandler = async () => {
    let action;
    console.log('password ' + password);
    console.log('fleetId ' + formState.inputValues.fleetId);
    console.log('username ' + formState.inputValues.email);
    action = login.login(
      formState.inputValues.fleetId,
      formState.inputValues.email,
      formState.inputValues.password,
    );
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      console.log('success');
      // signIn;
      navigation.navigate('Dashboard');
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState],
  );
  return (
    <Lockbackground resizeMode="cover">
      <LockIcon>
        <LoginContiner>
          <LogoContainer>
            <Image
              source={require('../../../../assets/logo.png')}
              style={{
                width: 230,
                height: 69,
                resizeMode: 'cover',
              }}
            />
            <Slogon>Glad you made it!</Slogon>
          </LogoContainer>
          <AuthContainer>
            <ImputForm
              autoCapitalize="none"
              id="fleetId"
              label="Fleet ID"
              name="fleetId"
              placeholder="Fleet ID"
              autoComplete="off"
              // value={fleetId}
              errorText="Please enter a your fleetId!"
              keyboardType="default"
              onInputChange={inputChangeHandler}
              required
            />

            <ImputForm
              autoCapitalize="none"
              autoComplete="off"
              id="email"
              label="Email Address"
              name="email"
              placeholder="Email Address"
              errorText="Please enter your a valid email!"
              required
              onInputChange={inputChangeHandler}
            />
            <Group>
              <ImputForm
                autoCapitalize="none"
                id="password"
                label="Password"
                autoComplete="off"
                name="password"
                placeholder="Password"
                errorText="Please enter a valid password."
                secureTextEntry={secureTextEntry}
                required
                // value={password}
                onChangeText={text => setPassword(text)}
                onInputChange={inputChangeHandler}
              />
              {secureTextEntry ? (
                <Icon
                  onPress={() => setSecureTextEntry(false)}
                  name="eye-sharp"
                  size={20}
                  color={colors.text.secondary}
                  style={{
                    position: 'absolute',
                    right: 15,
                    top: 48,
                  }}
                />
              ) : (
                <Icon
                  onPress={() => setSecureTextEntry(true)}
                  name="eye-off"
                  size={20}
                  color={colors.text.primary}
                  style={{
                    position: 'absolute',
                    right: 15,
                    top: 48,
                  }}
                />
              )}
            </Group>
            <ForgetPassword>
              <OnTouch onPress={() => navigation.navigate('ForgotPassword')}>
                <ForgetPasswordText>Forgot Password?</ForgetPasswordText>
              </OnTouch>
            </ForgetPassword>
            <CheckboxContainer>
              {checked ? (
                <Icon
                  name="checkbox-outline"
                  size={22}
                  color={colors.brand.primary}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
              ) : (
                <Icon
                  name="square-outline"
                  size={22}
                  color={colors.text.secondary}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
              )}

              <CheckboxLabel>I agree to the terms and conditions</CheckboxLabel>
            </CheckboxContainer>
            {isLoading ? (
              <ActivityIndicator size="small" color="#4CB75C" />
            ) : (
              <OnTouch onPress={loginHandler}>
                <SubmitButton resizeMode="cover">
                  <ButtonText>Sign In</ButtonText>
                </SubmitButton>
              </OnTouch>
            )}
            <NewUserContainer>
              <CheckboxLabel>New User? </CheckboxLabel>
              <OnTouch>
                <SignUpText onPress={() => navigation.navigate('Register')}>
                  Sign up
                </SignUpText>
              </OnTouch>
            </NewUserContainer>
          </AuthContainer>
        </LoginContiner>
      </LockIcon>
    </Lockbackground>
  );
};

export default Login;
