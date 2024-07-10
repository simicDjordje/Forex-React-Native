import { View, Text, Modal, TouchableOpacity, TextInput, FlatList } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { useState, useEffect } from 'react'
import { countriesArray } from '../constants'


const SelectCountryModal = ({isModalOpen, setIsModalOpen, setSelectedCountry, country}) => {
    const [searchText, setSearchText] = useState('')
    const [filteredData, setFilteredData] = useState(countriesArray)

    useEffect(()=>{
        if(!searchText){
            setFilteredData(countriesArray)
        }else{
            const filterArr = countriesArray.filter(i => i.label.toLowerCase().includes(searchText.toLocaleLowerCase()))
            setFilteredData(filterArr)
        }
    }, [searchText])

    useEffect(()=>{
        setSearchText('')
    }, [isModalOpen])

  
  return (
    <Modal
    animationType='slide'
    transparent={true}
    visible={isModalOpen}
    >
      <View className="flex-col flex-1 justify-end">
        <View className="h-3/4 rounded-t-3xl shadow-none bg-[#101011]">
            <View className="mt-5 flex-row justify-between items-center">
              <View className="flex-row justify-start items-center pl-5">
                <Text className="text-2xl font-bold mr-1 text-[#97979D]">Select country</Text>
              </View>
              <TouchableOpacity className="rounded-full mr-5 p-2" onPress={()=>{setIsModalOpen(false)}}>
                <MaterialIcons name="keyboard-arrow-down" size={24} color={'#97979D'} />
              </TouchableOpacity>
            </View>
            <View className="px-4 mb-72">
                <View className="mt-10">
                    <View className="flex-row items-center mt-2">
                        <View className="flex-row flex-1 bg-[#343437] p-4 rounded-lg">
                            <FontAwesome name="search" size={24} color={'white'} />  
                            <TextInput placeholderTextColor={'#101011'} onChangeText={text => setSearchText(text)} placeholder='Search' className="ml-2 flex-1" />
                        </View>
                    </View>
                </View>
                <View className="mt-10">
                <FlatList
                    data={filteredData}
                    keyExtractor={(item) => item.value.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 0 }}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => setSelectedCountry(item.value)} key={item.value} className="my-2 flex-row justify-center items-center">
                            <Text className="text-lg font-semibold text-[#97979D]">{item.label}</Text>
                        </TouchableOpacity>
                    )}
                />
                </View>
            </View>
        </View>
      </View>
    </Modal>
  )
}

export default SelectCountryModal