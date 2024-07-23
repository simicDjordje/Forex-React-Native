import { View } from 'react-native'
import LootieLoader from '../../Components/LootieLoader'

const Loading = () => {

  return (
    <View className="h-full bg-[#101011] flex flex-col justify-center items-center">
        <LootieLoader />
    </View>
  )
}

export default Loading