import { View, Text, Modal, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import LootieSuccess from './LootieSuccess'
import { useNavigation } from '@react-navigation/native'


const AddedStrategySuccessModal = ({isModalOpen, setIsModalOpen}) => {
    const navigation = useNavigation()

  return (
    <Modal
    animationType='slide'
    transparent={true}
    visible={isModalOpen}
    >
            <View className="flex-col flex-1 justify-end">
        <View className="h-3/4 rounded-t-3xl shadow-none bg-black border border-0.5 border-[#202021]">
            <View className="mt-5 flex-row justify-between items-center">
              <View className="flex-row justify-start items-center pl-5">
                <Text className="text-2xl font-bold mr-1 text-white"></Text>
              </View>
              <TouchableOpacity className="rounded-full mr-5 p-2 bg-[#343437]" onPress={()=>{
                setIsSuccess(false)
                setIsModalOpen(null)
                }}>
                <MaterialIcons name="keyboard-arrow-down" size={24} color={'white'} />
              </TouchableOpacity>
            </View>
            <View className="px-4 mb-72">
                <View className="px-4 mt-20 flex flex-col justify-center items-center">
                    <Text className="text-white text-2xl">Your strategy has been successfully provided.</Text>
                    <View className="mt-12">
                        <LootieSuccess d={150} />
                    </View>

                </View>

                <View>
                    <TouchableOpacity 
                        onPress={()=>{
                            setIsModalOpen(false)
                            navigation.navigate('MainTabs', {screen: 'Strategy'})
                        }}
                        className={`bg-[#D4D4D8] mt-10 p-4 rounded-lg flex flex-row justify-between items-center`}>
                        <MaterialIcons name="keyboard-arrow-left" size={22} color={'black'} />
                        <View className="flex-1 flex flex-row justify-center">
                            <Text>My strategies</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
      </View>
    </Modal>
  )
}

export default AddedStrategySuccessModal