import { View, Text, Modal, TouchableOpacity, TextInput, FlatList } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { useState, useEffect } from 'react'


const UnsyncStrategyModal = ({isModalOpen, setIsModalOpen, handleYes}) => {
    
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
                <Text className="text-2xl font-bold mr-1 text-white">Unsync strategy</Text>
              </View>
              <TouchableOpacity className="rounded-full mr-5 p-2 bg-[#343437]" onPress={()=>{setIsModalOpen(false)}}>
                <MaterialIcons name="keyboard-arrow-down" size={24} color={'white'} />
              </TouchableOpacity>
            </View>
            <View className="px-4 mb-72">
                
                <View className="mt-10">
                    <View className="flex flex-row justify-center items-center">
                        <Text className="text-white text-xl">Are you sure?</Text>
                    </View>

                    <View className="flex flex-row justify-between px-20 mt-10">
                        <TouchableOpacity onPress={() => setIsModalOpen(false)} className="bg-[#343437] px-3 py-2 w-20 rounded-md flex flex-row justify-center items-center">
                            <Text className="text-white text-lg">No</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleYes} className="bg-[#343437] px-3 py-2 w-20 rounded-md flex flex-row justify-center items-center">
                            <Text className="text-white text-lg">Yes</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
      </View>
    </Modal>
  )
}

export default UnsyncStrategyModal