import { View, Text, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'


const Header = ({title}) => {
  return (
    <View className="flex flex-row justify-between items-center">
      <Text className="text-white text-3xl">{title}</Text>
      <Image className="w-12 h-12" source={require('../assets/icon.png')} />

      {/* Notifications icon */}
      {/* <View className="bg-[#202021] rounded-full p-1">
        <Ionicons name="notifications-outline" size={24} color="#97979D" />
      </View> */}
    </View>
  )
}

export default Header