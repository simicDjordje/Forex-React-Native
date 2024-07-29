import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AccountScreen, AddStrategyScreen, MetricsScreen, MoneyManagerScreen, SettingsScreen, StrategyScreen } from "../Screens"
import { FontAwesome5 } from '@expo/vector-icons'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { Ionicons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import authUserCheck from '../Components/HOC/authUserCheck'
import { useCallback, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import LootieLoader from '../Components/LootieLoader'


const Tab = createBottomTabNavigator()

const BottomTabNavigation = () => {
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useFocusEffect(useCallback(()=>{
    (async () => {
      try{
        setIsLoading(true)
        const user = await AsyncStorage.getItem('@userData')
        setUserData(JSON.parse(user))
      }catch(err){
        console.log(err)
      }finally{
        setIsLoading(false)
      }
    })()
  }, []))

  if(isLoading) return (
    <View className="h-full bg-[#101011] flex flex-col justify-center items-center">
        <LootieLoader />
    </View>
  )

  return (
    <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBarHideOnKeyborad: true,
        tabBarStyle: {
          backgroundColor: '#202021', 
          borderTopWidth: 0, 
          paddingBottom: 2,
          paddingTop: 4,
        },
        
        
    }}>

      {userData && userData.money_manager != '1' && 
        <Tab.Screen name="Metrics" component={authUserCheck(MetricsScreen)}
          options={{
              tabBarLabelStyle: {display: 'none'},
              tabBarIcon: ({focused}) => (
                  <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <FontAwesome6 stroke={focused ? 3 : 2} name="chart-simple" size={24} color={focused ? 'white' : '#97979D'} />
                    <Text style={{color: focused ? 'white': '#97979D', fontSize: 12}}>Metrics</Text>
                  </View>
              )
          }}
        />
      }

      {/* <Tab.Screen name="MoneyManager" component={MoneyManagerScreen}
        options={{
            tabBarLabelStyle: {display: 'none'},
            tabBarIcon: ({focused}) => (
                <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                  <FontAwesome6 stroke={focused ? 3 : 2} name="money-check-dollar" size={24} color={focused ? 'white' : '#97979D'} />
                  <Text style={{color: focused ? 'white': '#97979D', fontSize: 12}}>Money Manager</Text>
                </View>
            )
        }}
      /> */}

      <Tab.Screen name="Strategy" component={authUserCheck(StrategyScreen)}
        options={{
            tabBarLabelStyle: {display: 'none'},
            tabBarIcon: ({focused}) => (
                <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                  <MaterialCommunityIcons stroke={focused ? 3 : 2} name="strategy" size={24} color={focused ? 'white' : '#97979D'} />
                  <Text style={{color: focused ? 'white': '#97979D', fontSize: 12}}>Strategy</Text>
                </View>
            )
        }}
      />

      {userData && userData.money_manager == '1' && 
        <Tab.Screen name="AddStrategy" component={authUserCheck(AddStrategyScreen)}
          options={{
              tabBarLabelStyle: {display: 'none'},
              tabBarIcon: ({focused}) => (
                  <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <FontAwesome6 stroke={focused ? 3 : 2} name="add" size={24} color={focused ? 'white' : '#97979D'} />
                    <Text style={{color: focused ? 'white': '#97979D', fontSize: 12}}>Add Strategy</Text>
                  </View>
              )
          }}
        />
      }

      <Tab.Screen name="Account" component={authUserCheck(AccountScreen)}
        options={{
            tabBarLabelStyle: {display: 'none'},
            tabBarIcon: ({focused}) => (
                <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                  {/* <Ionicons stroke={focused ? 3 : 2} name="settings-sharp" size={24} color={focused ? 'white' : '#97979D'} /> */}
                  <FontAwesome5 name="user-cog" size={24} stroke={focused ? 3 : 2} color={focused ? 'white' : '#97979D'} />
                  <Text style={{color: focused ? 'white': '#97979D', fontSize: 12}}>Account</Text>
                </View>
            )
        }}
      />
    
    </Tab.Navigator>
  )
}

export default BottomTabNavigation