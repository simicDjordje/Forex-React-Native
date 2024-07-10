import { View, Text, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'


const Header = () => {
  return (
    <View className="flex flex-row justify-between items-center">
      <Image className="w-10 h-10" source={require('../assets/IconWhite.png')} />

      <View className="bg-[#202021] rounded-full p-1">
        <Ionicons name="notifications-outline" size={24} color="#97979D" />
      </View>
    </View>
  )
}

export default Header