import LottieView from 'lottie-react-native'

const LootieFail = ({d, isLoop}) => {
  return (
    <LottieView
            autoPlay
            loop={isLoop || true}
            style={{
            width: d || 50,
            height: d || 50,
            marginLeft: 'auto',
            marginRight: 'auto',
            }}
        source={require('../assets/Lootie/LootieFail.json')}
    />
  )
}

export default LootieFail

