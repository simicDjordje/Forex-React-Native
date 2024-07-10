import LottieView from 'lottie-react-native'

const LootieLoader = () => {
  return (
    <LottieView
            autoPlay
            loop
            style={{
            width: 50,
            height: 50,
            marginLeft: 'auto',
            marginRight: 'auto',
            }}
        source={require('../assets/Lootie/loader.json')}
    />
  )
}

export default LootieLoader

