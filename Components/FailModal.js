import { View, Text, Modal, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import LootieFail from './LootieFail'

const FailModal = ({isModalOpen, setIsModalOpen, messageType}) => {    
  return (
    <Modal
    animationType='slide'
    transparent={true}
    visible={isModalOpen}
    >
      <View className="flex-col flex-1 justify-end">
        <View className="h-3/4 rounded-t-3xl shadow-none bg-black border border-0.5 border-[#202021]">
            <View className="mt-5 flex-row justify-end items-center">
              <TouchableOpacity className="rounded-full mr-5 p-2 bg-[#343437]" onPress={()=>{
                setIsModalOpen(null)
                }}>
                <MaterialIcons name="keyboard-arrow-down" size={24} color={'white'} />
              </TouchableOpacity>
            </View>
            <View className="px-4 mb-72">

               
                <View className="px-4 mt-20 flex flex-col justify-center items-center">
                    {messageType === 'isError' && <View className="flex flex-col gap-4">
                            <Text className="text-red-500 text-xl">We failed to authenticate to your broker using credentials provided.</Text>
                            <Text className="text-red-500 text-xl">Please check that your MetaTrader login, password, and server name are correct.</Text>
                        </View>}

                    {messageType === 'fail' && <View className="flex flex-col gap-4">
                        <Text className="text-red-500 text-xl">We failed to authenticate to your broker using credentials provided.</Text>
                        <Text className="text-red-500 text-xl">Please check that your MetaTrader login, password, and server name are correct.</Text>
                    </View>}

                    {messageType === 'already_connected' && <Text className="text-[#97979D] text-xl">Your account is already connected with MetaTrader.</Text>}
                    <View className="mt-12">
                        <LootieFail d={100} isLoop={false} />
                    </View>

                </View>
            </View>
        </View>
      </View>
    </Modal>
  )
}

export default FailModal