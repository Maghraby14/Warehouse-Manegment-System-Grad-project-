import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { ImageBackground } from 'react-native';
import { AuthContext } from '../../store/auth-context';
import { useContext } from 'react';
import { Colors } from '../../constants/styles';
function LoadingOverlayy({ message }) {
  const authCtx = useContext(AuthContext);
  
  return (
    
    <View style={styles.rootContainer}>
      <Text style={[styles.message,{color:authCtx.darkMode ? 'white' : 'black'}]}>{message}</Text>
      <ActivityIndicator size="large" color={authCtx.darkMode ? 'white' : Colors.sec100} />
    </View>
    
  );
}

export default LoadingOverlayy;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
    padding: 32,
  },
  message: {
    fontSize: 16,
    marginBottom: 12,
  },
});
