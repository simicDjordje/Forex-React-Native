import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
//import { createStackNavigator } from '@react-navigation/stack'
import BottomTabNavigation from './BottomTabNavigation'
import StackNavigation from './StackNavigation'
import LoadingScreenNavigation from "./LoadingScreenNavigation"
// import ModalNavigation from "./ModalNavigation"

const Stack = createNativeStackNavigator()
//const Stack = createStackNavigator()


const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="LoadingTabs" component={LoadingScreenNavigation} />
                <Stack.Screen name="StackTabs" component={StackNavigation} />
                <Stack.Screen name="MainTabs" component={BottomTabNavigation} />
                {/* <Stack.Screen name="ModalTabs" component={ModalNavigation} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation


