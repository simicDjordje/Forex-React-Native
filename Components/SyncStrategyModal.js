import { View, Text, Modal, TouchableOpacity, TextInput } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { useState, useEffect } from 'react'
import { useStrategyInfoMutation, useSubscribeStrategyMutation } from '../redux/services/apiCore'
import LootieLoader from './LootieLoader'
import Slider from '@react-native-community/slider'
import LootieSuccess from './LootieSuccess'

const SyncStrategyModal = ({isModalOpen, setIsModalOpen, strategyToSync}) => {
    const [strategyInfo, {data: siData, isLoading: siIsLoading, isError: siIsError, error: siError}] = useStrategyInfoMutation()
    const [subscribeStrategy, {isLoading: ssIsLoading, isError: ssIsError, error: ssError}] = useSubscribeStrategyMutation()
    const [multiplier, setMultiplier] = useState(1)
    const [isSuccess, setIsSuccess] = useState(false)

    useEffect(()=>{
        strategyInfo({strategy_id: strategyToSync?.id})
    }, [strategyToSync, strategyInfo])

    const handleSubscribeStrategy = async () => {
        try{
            console.log({
                strategy_id: strategyToSync?.id,
                multiplier: multiplier
            })
            const {data, error} = await subscribeStrategy({
                strategy_id: strategyToSync?.id,
                multiplier: multiplier
            })
            console.log('data: ', data)
            if(data.success){
                setIsSuccess(true)
                setTimeout(()=>{
                    // setIsSuccess(false)
                    // setIsModalOpen(false)
                }, 2000)
            }
        }catch(error){
            console.log(error)
        }
    }
    
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
                <Text className="text-2xl font-bold mr-1 text-white">Sync this strategy</Text>
              </View>
              <TouchableOpacity className="rounded-full mr-5 p-2 bg-[#343437]" onPress={()=>{
                setIsSuccess(false)
                setIsModalOpen(null)
                }}>
                <MaterialIcons name="keyboard-arrow-down" size={24} color={'white'} />
              </TouchableOpacity>
            </View>
            <View className="px-4 mb-72">

                {siIsLoading && <View className="px-4 mt-48 flex flex-col justify-center items-center"><LootieLoader /></View>}
               {siData && !siIsLoading && !isSuccess &&
                <View className="px-4 mt-20">
                    <View>
                            <Text className="text-[#97979D] text-md mb-2">Performance fee</Text>
                            <View className="bg-[#343437] p-4 rounded-lg">
                                {/* <TextInput
                                placeholderTextColor={'#101011'}
                                value={siData?.performance_fee}
                                placeholder='Performance fee' 
                                color={'#fff'}
                                /> */}
                                <Text className="text-[#97979D]">{siData?.performance_fee}</Text>
                            </View>
                        </View>

                        <View className="mt-6">
                            <Text className="text-[#97979D] text-md mb-2">Recommended equity</Text>
                            <View className="bg-[#343437] p-4 rounded-lg">
                                {/* <TextInput
                                placeholderTextColor={'#101011'}
                                value={siData?.recommended_equity}
                                placeholder='Recommended equity' 
                                color={'#fff'}
                                
                                /> */}
                                <Text className="text-[#97979D]">{siData?.recommended_equity}</Text>
                            </View>
                        </View>

                        <View className="mt-6">
                            <Text className="text-[#97979D] text-md mb-2">Recommended equity</Text>
                            <View className="bg-[#343437] p-1 rounded-lg flex flex-row justify-between items-center">
                            <Text className="text-white mx-1 font-bold mt-6">1</Text>
                            <View className="flex-1 flex flex-col justify-center items-center">
                                    <Text className="text-white font-bold text-lg">{parseInt(multiplier)}</Text>
                                <Slider
                                    style={{ width: '100%', height: 40 }}
                                    minimumValue={1}
                                    maximumValue={100}
                                    minimumTrackTintColor="#FFFFFF"
                                    maximumTrackTintColor="#000000"
                                    thumbTintColor="#FFFFFF"
                                    value={multiplier}
                                    onValueChange={(value) => setMultiplier(parseInt(value))}
                                    />
                            </View>
                            <Text className="text-white mx-1 font-bold mt-6">100</Text>
                            </View>
                        </View>

                        <TouchableOpacity 
                            onPress={handleSubscribeStrategy}
                            className={`bg-[#D4D4D8] mt-10 ${isSuccess ? '' : 'p-4'} rounded-lg flex flex-row justify-center`}>
                            {ssIsLoading && !isSuccess && <LootieLoader d={20} />}
                            {!ssIsLoading && !isSuccess && <Text>Agree</Text>}
                            {/* {isSuccess && <LootieSuccess />} */}
                            
                        </TouchableOpacity>
                </View>
               }


               {isSuccess && 
                <View className="px-4 mt-20 flex flex-col justify-center items-center">
                    <Text className="text-white text-2xl">Your strategy has been successfully provided.</Text>
                    <View className="mt-12">
                        <LootieSuccess d={150} />
                    </View>

                </View>
                }
            </View>
        </View>
      </View>
    </Modal>
  )
}

export default SyncStrategyModal