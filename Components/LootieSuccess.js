import LottieView from 'lottie-react-native'

const LootieSuccess = ({d}) => {
  return (
    <LottieView
            autoPlay
            loop
            style={{
            width: d || 50,
            height: d || 50,
            marginLeft: 'auto',
            marginRight: 'auto',
            }}
        source={require('../assets/Lootie/LootieSuccess.json')}
    />
  )
}

export default LootieSuccess

