import { View, Text, ImageBackground, Image, TouchableOpacity, Linking } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useState } from 'react'
import { useRemoveStrategyMutation, useUnsubscribeStrategyMutation } from '../redux/services/apiCore'
import UnsyncStrategyModal from './UnsyncStrategyModal'
import SyncStrategyModal from './SyncStrategyModal'

const StrategyCard = ({strategy, setData, userData, type, fetchActiveData}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [unsubscribeStrategy, {isLoading: unsubscribeStrategyIsLoading}] = useUnsubscribeStrategyMutation()
    const [removeStrategy, {isLoading: removeStrategyIsLoading}] = useRemoveStrategyMutation()
    const [strategyToSync, setStrategyToSync] = useState(null)
    

    const handleUnsubscribe = async () => {
        try{
            const {data} = await unsubscribeStrategy({
                subscription_id: strategy?.id,
            })

            if(data.success){
                setData(prevData => {
                    const modifiedData = prevData.filter(item => item?.id != strategy?.id)
                    return modifiedData
                })
                setIsOpen(false)
            }
        }catch(error){
            console.log(error)
        }
    }


    const handleRemoveStrategy = async () => {
        try{
            const {data} = await removeStrategy({
                strategy_id: strategy?.id,
            })

            if(data.success){
                setData(prevData => {
                    const modifiedData = prevData.filter(item => item?.id != strategy?.id)
                    return modifiedData
                })
                setIsOpen(false)
            }
        }catch(error){
            console.log(error)
        }
    }

  return (
    <View className="flex flex-col w-56 rounded-md mx-2 border border-0.5 border-[#202021]">
      <View className="h-28 w-full rounded-md">
            <ImageBackground source={require('../assets/Avatar.png')} resizeMode="cover" className="h-28 w-full rounded-md flex flex-row justify-center items-center">
                <Image className="h-14 w-14" source={require('../assets/Vector.png')} />
            </ImageBackground>
      </View>
      <View className="h-32 py-2 px-4 flex flex-col">
        <Text className="text-white text-lg">{strategy?.strategy_name || 'No name'}</Text>
        <TouchableOpacity onPress={()=>{Linking.openURL(`${strategy?.factsheet_url}`)}} className="flex flex-row justify-start items-center mt-1">
            <MaterialIcons name="subdirectory-arrow-right" size={20} color="gray" />
            <Text className="text-[#97979D] underline">Factsheet</Text>
        </TouchableOpacity>

        <View className=" bg-[#97979D] w-full my-3" style={{height: 0.3}}></View>

        <Text className="text-white">Category: <Text className="text-[#97979D]">Strategy</Text></Text>
      </View>
      <TouchableOpacity 
        onPress={()=>{userData.money_manager == '0' ? type === 'subscribe' ? setStrategyToSync(strategy) : setIsOpen(true) : setIsOpen(true)}}
        className="bg-[#343437] p-3 flex flex-row justify-start items-center rounded-b-md">
        <MaterialCommunityIcons name="vector-link" size={20} color="white" />
        <Text className="text-white ml-2">
            {userData.money_manager == '1' ? 'Remove Strategy' : `${type == 'subscribe' ? 'Sync' : 'Un-Sync'} Strategy`}
        </Text>
      </TouchableOpacity>


      <UnsyncStrategyModal 
        isModalOpen={isOpen}
        setIsModalOpen={setIsOpen}
        handleYes={userData.money_manager == '1' ? handleRemoveStrategy : handleUnsubscribe}
        isLoading={unsubscribeStrategyIsLoading || removeStrategyIsLoading}
      />

      <SyncStrategyModal 
      isModalOpen={!!strategyToSync}
      setIsModalOpen={setStrategyToSync}
      strategyToSync={strategyToSync}
      fetchActiveData={fetchActiveData}
      />
    </View>
  )
}

export default StrategyCard