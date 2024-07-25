import { View, Text, Modal, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { useState, useEffect } from 'react'
import LootieLoader from './LootieLoader'
import LootieSuccess from './LootieSuccess'
import Feather from '@expo/vector-icons/Feather'
import { useChangePasswordMutation } from '../redux/services/apiCore'


const ChangePasswordModal = ({isModalOpen, setIsModalOpen}) => {
    const [isSuccess, setIsSuccess] = useState(false)
    const [hideCurrentPass, setHideCurrentPass] = useState(true)
    const [hideNewPass, setHideNewPass] = useState(true)
    const [inputsData, setInputsData] = useState({
        current_password: '',
        new_password: '',
        confirm_new_password: ''
    })
    const [changePassword, {isLoading}] = useChangePasswordMutation()
    const [validation, setValidation] = useState(false)
    const [currentPasswordError, setCurrentPasswordError] = useState(false)
    const [newPassowordError, setNewPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')

    useEffect(()=>{
        if(inputsData.new_password && inputsData.new_password.length < 6) {
            setNewPasswordError('Must contain at least 6 signs')
        }else{
            setNewPasswordError('')
        }

        if(inputsData.confirm_new_password && inputsData.confirm_new_password < 6){
            setConfirmPasswordError('Must contain at least 6 signs')
        }else{
            setConfirmPasswordError('')
        }

        if(inputsData.confirm_new_password && inputsData.confirm_new_password >= 6 && inputsData.confirm_new_password !== inputsData.new_password){
            setConfirmPasswordError("Password doesn't match")
        }else{
            setConfirmPasswordError('')
        }
    }, [inputsData])

    const handleChangePassword = async () => {
        if(!inputsData.current_password || !inputsData.new_password || !inputsData.confirm_new_password){
            setValidation(true)
            return
        }
        
        setValidation(false)

        const formData = new FormData()
        formData.append('current_password', inputsData.current_password)
        formData.append('new_password', inputsData.new_password)
    
        const {data, error} = await changePassword(formData)
        console.log(error)
        if(data && data.status === 'success'){
            setInputsData({
                current_password: '',
                new_password: '',
                confirm_new_password: ''
            })
            setCurrentPasswordError(false)
            setIsSuccess(true)
        }
        
        if(data && data.status == 'fail'){
            setCurrentPasswordError(true)
        }
    }

  return (
    <Modal
    animationType='slide'
    transparent={true}
    visible={isModalOpen}
    >
      <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="h-screen"
        >
      <View className="flex-col flex-1 justify-end">
        <View className="h-full rounded-t-3xl shadow-none bg-black border border-0.5 border-[#202021]">
            <View className="mt-5 flex-row justify-between items-center">
              <View className="flex-row justify-start items-center pl-5">
                <Text className="text-2xl font-bold mr-1 text-white">Changing your password</Text>
              </View>
              <TouchableOpacity className="rounded-full mr-5 p-2 bg-[#343437]" onPress={()=>{
                setIsSuccess(false)
                setIsModalOpen(null)
                }}>
                <MaterialIcons name="keyboard-arrow-down" size={24} color={'white'} />
              </TouchableOpacity>
            </View>
            <View className="px-4 mb-72">

            {!isSuccess &&
                <View className="px-4 mt-20">
                    <View>
                        <Text className="text-[#97979D] text-md mb-2">
                            Current password
                            {validation && !inputsData.current_password && <Text className="text-red-500"> *</Text>}
                            {currentPasswordError && <Text className="text-red-500"> Current password is incorrect</Text>}
                        </Text>
                        <View className="bg-[#343437] p-4 rounded-lg flex flex-row justify-between items-center">
                            <TextInput
                            placeholderTextColor={'#101011'}
                            value={inputsData.current_password}
                            onChangeText={text => setInputsData({...inputsData, current_password: text})}
                            placeholder='Current password' 
                            color={'#fff'}
                            className="flex-1"
                            secureTextEntry={hideCurrentPass}
                            />
                            <TouchableOpacity onPress={()=>setHideCurrentPass(!hideCurrentPass)} className="pl-2">
                                {hideCurrentPass && <Feather name="eye-off" size={24} color="white" />}
                                {!hideCurrentPass && <Feather name="eye" size={24} color="white" />}
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View className="mt-6">
                        <Text className="text-[#97979D] text-md mb-2">
                            New password
                            {validation && !inputsData.new_password && <Text className="text-red-500"> *</Text>}
                            <Text className="text-red-500"> {newPassowordError}</Text>
                        </Text>
                        <View className="bg-[#343437] p-4 rounded-lg flex flex-row justify-between items-center">
                            <TextInput
                            placeholderTextColor={'#101011'}
                            value={inputsData.new_password}
                            onChangeText={text => setInputsData({...inputsData, new_password: text})}
                            placeholder='New password' 
                            color={'#fff'}
                            className="flex-1"
                            secureTextEntry={hideNewPass}
                            />
                            <TouchableOpacity onPress={()=>setHideNewPass(!hideNewPass)} className="pl-2">
                                {hideNewPass && <Feather name="eye-off" size={24} color="white" />}
                                {!hideNewPass && <Feather name="eye" size={24} color="white" />}
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View className="mt-6">
                        <Text className="text-[#97979D] text-md mb-2">
                            Confirm new password
                            <Text className="text-red-500"> {confirmPasswordError}</Text>
                        </Text>
                        <View className="bg-[#343437] p-4 rounded-lg flex flex-row justify-between items-center">
                            <TextInput
                            placeholderTextColor={'#101011'}
                            value={inputsData.confirm_new_password}
                            onChangeText={text => setInputsData({...inputsData, confirm_new_password: text})}
                            placeholder='Confirm new password' 
                            color={'#fff'}
                            className="flex-1"
                            secureTextEntry={hideNewPass}
                            />
                            <TouchableOpacity onPress={()=>setHideNewPass(!hideNewPass)} className="pl-2">
                                {hideNewPass && <Feather name="eye-off" size={24} color="white" />}
                                {!hideNewPass && <Feather name="eye" size={24} color="white" />}
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity 
                        onPress={handleChangePassword}
                        className={`bg-[#D4D4D8] mt-10 p-4 rounded-lg flex flex-row justify-center`}>
                        {isLoading && !isSuccess && <LootieLoader d={20} />}
                        {!isLoading && !isSuccess && <Text>Confirm</Text>}                        
                    </TouchableOpacity>
                </View>
            }


               {isSuccess && 
                <View className="px-4 mt-20 flex flex-col justify-center items-center">
                    <Text className="text-white text-xl">Password changed succesfully</Text>
                    <View className="mt-12">
                        <LootieSuccess d={150} />
                    </View>

                </View>
                }
            </View>
        </View>
      </View>
      </KeyboardAvoidingView>
    </Modal>
  )
}

export default ChangePasswordModal