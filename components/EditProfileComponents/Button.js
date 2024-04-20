import * as Animatable from 'react-native-animatable';
import Input from '../Auth/Input';
import { View,TouchableOpacity,Text } from 'react-native';
function Button({animation,duration,easing,AnimatbleView,style,label,color,value,onupdate,ViewStyle,TOStyle,OnPress,textStyle,TOStyle2,OnPress2,textStyle2,txt,txt2}){
    return <>
    <Animatable.View animation={animation} duration={duration} easing={easing} style={{width:'90%'}}>
        <Input label={label} color={color} value={value} onUpdateValue={onupdate} />
        <View style={ViewStyle}>
<TouchableOpacity style={TOStyle} onPress={OnPress} >
    <Text style={textStyle}>{txt}</Text>
</TouchableOpacity>
<TouchableOpacity style={TOStyle2} onPress={OnPress2} >
    <Text style={textStyle2}>{txt2}</Text>
</TouchableOpacity>
        </View>
    </Animatable.View>
    </>
}
export default Button;