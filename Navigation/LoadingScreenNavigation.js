import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {LoadingScreen} from '../Screens'
import authUserCheck from '../Components/HOC/authUserCheck'

const Stack = createNativeStackNavigator()

const LoadingScreenNavigation = () => {
  return (
    <Stack.Navigator 
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Loading" component={authUserCheck(LoadingScreen)} />
    </Stack.Navigator>
  )
}

export default LoadingScreenNavigation