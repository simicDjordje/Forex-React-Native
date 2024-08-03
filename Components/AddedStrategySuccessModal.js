import { View, Text, Modal, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import LootieSuccess from './LootieSuccess'
import { useNavigation } from '@react-navigation/native'


const AddedStrategySuccessModal = ({isModalOpen, setIsModalOpen, summaryData}) => {
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
            <View className="px-4 mb-72 h-full flex flex-col justify-between items-center pt-10 pb-20">
                <View className="px-4 flex flex-col justify-center items-center">
                    <Text className="text-white text-2xl">Strategy <Text className="font-bold">{summaryData?.strategy_name || ''}</Text> has been successfully provided!</Text>
                    <View className="mt-4">
                        <LootieSuccess d={120} />
                    </View>

                </View>

                <View className="flex-1 px-4 w-full">
                  {/* <View className="flex flex-row justify-between items-center">
                    <Text className="text-[#97979D] text-md">Factsheet URL</Text>
                    <Text className="text-white text-md">{summaryData?.factsheet_url || '/'}</Text>
                  </View> */}

                  <View className="flex flex-row justify-between items-center">
                    <Text className="text-[#97979D] text-md">Platform</Text>
                    <Text className="text-white text-md">{summaryData?.platform || '/'}</Text>
                  </View>

                  {/* <View className="flex flex-row justify-between items-center">
                    <Text className="text-[#97979D] text-md">Strategy Name</Text>
                    <Text className="text-white text-md">{summaryData?.strategy_name || '/'}</Text>
                  </View> */}

                  <View className="flex flex-row justify-between items-center">
                    <Text className="text-[#97979D] text-md">Server</Text>
                    <Text className="text-white text-md">{summaryData?.server?.server_name || '/'}</Text>
                  </View>

                  <View className="flex flex-row justify-between items-center">
                    <Text className="text-[#97979D] text-md">Account Number</Text>
                    <Text className="text-white text-md">{summaryData?.account_number || '/'}</Text>
                  </View>

                  <View className="flex flex-row justify-between items-center">
                    <Text className="text-[#97979D] text-md">Performance Fee</Text>
                    <Text className="text-white text-md">{summaryData?.performance_fee || '/'}</Text>
                  </View>

                  <View className="flex flex-row justify-between items-center">
                    <Text className="text-[#97979D] text-md">Recommended Equity</Text>
                    <Text className="text-white text-md">{summaryData?.recommended_equity || '/'}</Text>
                  </View>

                </View>

                <View>
                    <TouchableOpacity 
                        onPress={()=>{
                            setIsModalOpen(false)
                            navigation.navigate('MainTabs', {screen: 'Strategy'})
                        }}
                        className={`bg-[#D4D4D8] mt-10 p-4 rounded-lg flex flex-row justify-between items-center w-full`}>
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