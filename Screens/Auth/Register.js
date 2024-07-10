import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Feather from '@expo/vector-icons/Feather'
import { useRegisterMutation } from '../../redux/services/apiCore'
import { setUser } from '../../redux/features/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker';
import SelectCountryModal from '../../Components/SelectCountryModal'
import LootieLoader from '../../Components/LootieLoader'


const Register = () => {
    const [inputsData, setInputsData] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: '',
        country: ''
    })
    const [hidePass, setHidePass] = useState(true)
    const [validation, setValidation] = useState(false)
    const [register, {isLoading}] = useRegisterMutation()
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [image, setImage] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [passwordErrorMessage, setPasswordErrorMessage] = useState(false)

    useEffect(()=>{
        if(inputsData.password === inputsData.confirm_password){
            setPasswordErrorMessage(false)
        }else{
            setPasswordErrorMessage(true)
        }
    }, [inputsData.password, inputsData.confirm_password])

    const setSelectedCountry = (country) => {
        setInputsData({...inputsData, country: country})
        setIsModalOpen(false)
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        })
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri)
        }
      }

      const handleRegister = async () => {
        if(!inputsData.name || !inputsData.email || !inputsData.password || !inputsData.confirm_password || !inputsData.country || !image){
            setValidation(true)
            return
        }

        if(passwordErrorMessage || inputsData.password.length < 6){
            return
        }
    
        const formData = new FormData()
        formData.append('name', inputsData.name)
        formData.append('email', inputsData.email)
        formData.append('password', inputsData.password)
        //formData.append('profile-photo', new Blob([image], { type: 'image/jpeg' }), 'image.jpg')
        formData.append('profile-photo', image)

        formData.append('country', inputsData.country)
    
        const {data} = await register(formData)
        console.log(formData)
        console.log('###########', data)
        if(data && data.status === 'success'){
            //localStorage.setItem('user-data', JSON.stringify(data.user_data))
            dispatch(setUser(data.user_data))
            navigate('/')
        }
    }

  return (
    <SafeAreaView className="bg-[#101011] min-h-screen">
      <View className="min-h-screen">
        <ScrollView>
        <View className="flex flex-row justify-center mt-20">
            <Text className="text-white text-3xl font-bold">Register</Text>
        </View>


        <View className="px-4 flex flex-col">
            <View>
                <Text className="text-[#97979D] text-md mb-2">Name {validation && !inputsData.name && <Text className="text-red-500">*</Text>}</Text>
                <View className="bg-[#343437] p-4 rounded-lg">
                    <TextInput
                    placeholderTextColor={'#101011'}
                    value={inputsData.name}
                    placeholder='Enter your name' 
                    onChangeText={text => setInputsData({...inputsData, name: text})}
                    />
                </View>
            </View>

            <View>
                <Text className="text-[#97979D] text-md mb-2 mt-4">Email {validation && !inputsData.email && <Text className="text-red-500">*</Text>}</Text>
                <View className="bg-[#343437] p-4 rounded-lg">
                    <TextInput
                    placeholderTextColor={'#101011'}
                    value={inputsData.email}
                    placeholder='Enter your email' 
                    onChangeText={text => setInputsData({...inputsData, email: text})}
                    />
                </View>
            </View>

            <View>
                <Text className="text-[#97979D] text-md mb-2 mt-4">
                    Password 
                    {validation && !inputsData.password && <Text className="text-red-500">*</Text>}
                    {inputsData.password.length > 0 && inputsData.confirm_password.length > 0 && (
                        inputsData.password.length < 6 || inputsData.confirm_password.length < 6 ? (
                            <Text className="text-red-500"> must be at least 6 characters</Text>
                        ) : (
                            inputsData.password !== inputsData.confirm_password && (
                                <Text className="text-red-500"> / Passwords don't match</Text>
                            )
                        )
                    )}
                </Text>
                <View className="bg-[#343437] p-4 rounded-lg flex flex-row justify-between items-center">
                    <TextInput
                        placeholderTextColor={'#101011'}
                        value={inputsData.password}
                        secureTextEntry={hidePass}
                        className="flex-1" 
                        placeholder='Enter your password' 
                        onChangeText={text => setInputsData({...inputsData, password: text})}
                        />
                    <TouchableOpacity onPress={()=>setHidePass(!hidePass)} className="pl-2">
                        {hidePass && <Feather name="eye-off" size={24} color="white" />}
                        {!hidePass && <Feather name="eye" size={24} color="white" />}
                    </TouchableOpacity>
                </View>
            </View>

            <View>
                <Text className="text-[#97979D] text-md mb-2 mt-4">Confirm Password {validation && !inputsData.confirm_password && <Text className="text-red-500">*</Text>}</Text>
                <View className="bg-[#343437] p-4 rounded-lg flex flex-row justify-between items-center">
                    <TextInput
                        placeholderTextColor={'#101011'}
                        value={inputsData.confirm_password} 
                        secureTextEntry={hidePass}
                        className="flex-1" 
                        placeholder='Confirm your password' 
                        onChangeText={text => setInputsData({...inputsData, confirm_password: text})}
                        />
                    <TouchableOpacity onPress={()=>setHidePass(!hidePass)} className="pl-2">
                        {hidePass && <Feather name="eye-off" size={24} color="white" />}
                        {!hidePass && <Feather name="eye" size={24} color="white" />}
                    </TouchableOpacity>
                </View>
            </View>

            <View className="flex flex-row justify-start gap-x-10 items-center mt-5">
                <View className="flex flex-col">
                    <Text className="text-[#97979D] mb-2">Profile picture {validation && !image && <Text className="text-red-500">*</Text>}</Text>
                    <Image className="h-24 w-24 rounded-lg" source={image ? { uri: image } : require('../../assets/ProfileImage.jpg')} />
                </View>

                <View className="flex flex-col gap-y-2 mt-4">
                    <TouchableOpacity onPress={pickImage} className="bg-[#D4D4D8] py-4 px-14 rounded-lg">
                        <Text>Upload Picture</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setImage(null)} className="bg-[#343437] py-4 px-14 rounded-lg flex flex-row justify-center">
                        <Text className="text-white">Delete</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
            <Text className="text-[#97979D] mt-2">Add a picture, recommended size 256x256</Text>

            <View className="mt-3">
                <Text className="text-[#97979D] text-md mb-2 mt-4">Country {validation && !inputsData.country && <Text className="text-red-500">*</Text>}</Text>
                <TouchableOpacity onPress={() => setIsModalOpen(true)} className="bg-[#343437] p-4 rounded-lg flex flex-row justify-between items-center">
                    <Text>{inputsData.country ? inputsData.country : 'Select country'}</Text>
                </TouchableOpacity>
            </View>

            <View>
                <TouchableOpacity 
                    onPress={handleRegister}
                    className={`bg-[#D4D4D8] mt-10 ${isLoading ? '' : 'p-4'} rounded-lg flex flex-row justify-center`}>
                    {isLoading ? <LootieLoader /> : <Text>Register</Text>}
                </TouchableOpacity>
            </View>

            <View className="flex flex-row justify-around items-center mt-10">
                <View className="bg-[#97979D] w-1/3" style={{height: 1}}></View>
                <Text className="text-[#97979D]">Or register with</Text>
                <View className="bg-[#97979D] w-1/3" style={{height: 1}}></View>
            </View>

            <View>
                <TouchableOpacity 
                    className="mt-5 p-4 rounded-lg flex flex-row justify-center border border-0.5 border-[#97979D]">
                    <Image className="w-5 h-5" source={require('../../assets/googlelogo.png')} />
                    <Text className="text-white ml-2">Google</Text>
                </TouchableOpacity>
            </View>

            <View className="flex flex-row justify-center mt-5 mb-28">
                <TouchableOpacity onPress={()=>navigation.navigate("StackTabs", {screen: "Login"})}>
                    <Text className="text-white">Already have an account? 
                        <Text className="text-blue-500"> Login here</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
        </ScrollView>
      </View>

      <SelectCountryModal 
        isModalOpen={isModalOpen} 
        setIsModalOpen={setIsModalOpen} 
        setSelectedCountry={setSelectedCountry} 
        country={inputsData.country}
        />
    </SafeAreaView>
  )
}

export default Register