import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { ImageBackground } from 'react-native';
import { AuthContext } from '../../store/auth-context';
import { useContext } from 'react';
function LoadingOverlay({ message }) {
  const authCtx = useContext(AuthContext);
  
  return (
    <ImageBackground source={authCtx.darkMode ? require('../../assets/Frame 7 (3).png') : require('../../assets/Frame 7 (1).png')} style={{ flex: 1 }}>
    <View style={styles.rootContainer}>
      <Text style={styles.message}>{message}</Text>
      <ActivityIndicator size="large" />
    </View>
    </ImageBackground>
  );
}

export default LoadingOverlay;

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
