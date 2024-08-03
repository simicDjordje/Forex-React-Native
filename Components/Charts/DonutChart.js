import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";


        
const DonutChartComponent = ({data, isLoading, setIsLoading, maxValueItem, setMaxValueItem}) => {
    const [modifiedData, setModifiedData] = useState([])

    useEffect(()=>{
        setModifiedData(data)
        setIsLoading(false)
    }, [data])

    const handleDayPress = (item) => {
        setMaxValueItem(item)

        setModifiedData(prevData => {
            return prevData.map(prevItem => {
                if(prevItem.focused && prevItem.focused === true){
                    return {...prevItem, focused: false}
                }

                if(prevItem.text === item.text){
                    return {...prevItem, focused: true}
                }

                return {...prevItem}
            })
        })
    }


    if(isLoading) return null
    
    return(
        <View className="flex flex-col justify-center items-center">
            <PieChart
            showText={false}
            textColor="black"
            radius={120}
            textSize={20}
            showTextBackground
            textBackgroundRadius={26}
            data={modifiedData}
            donut
            isAnimated
            showGradient
            innerRadius={90}
            innerCircleColor={'#0d0d0c'}
            focusOnPress
            onPress={(item)=>{handleDayPress(item)}}
            //strokeWidth={10}
            //strokeColor="#FFFFFF00"
            centerLabelComponent={() => {
                if(maxValueItem === null) return null
                return (
                  <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text
                      style={{fontSize: 30, color: 'white', fontWeight: 'bold'}}>
                      {maxValueItem.value}
                    </Text>
                    <Text style={{fontSize: 14, color: 'white'}}>{maxValueItem.text}</Text>
                  </View>
                );
              }}
            />
            <View className="mt-10 w-full px-8">
                <View className="flex flex-row flex-wrap">
                    {modifiedData.map((item, index) => {
                        return (
                            <TouchableOpacity onPress={()=>handleDayPress(item)} key={index} className="flex flex-row justify-start items-center gap-2 m-2">
                                <View className={`w-3 h-3 rounded-full`} style={{backgroundColor: item.color}}></View>
                                <Text className="text-white">{item.text}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>
        </View>
    )
}


export default DonutChartComponent