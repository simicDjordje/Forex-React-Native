import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginScreen, RegisterScreen, AccountConfScreen } from "../Screens"
import authScreensCheck from '../Components/HOC/authScreensCheck'

const Stack = createNativeStackNavigator()

const StackNavigation = () => {
  return (
    <Stack.Navigator 
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={authScreensCheck(LoginScreen)} />
      <Stack.Screen name="Register" component={authScreensCheck(RegisterScreen)} />
      <Stack.Screen name="AccountConf" component={AccountConfScreen} />
    </Stack.Navigator>
  )
}

export default StackNavigation