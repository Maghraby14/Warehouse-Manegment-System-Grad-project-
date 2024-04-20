import { StyleSheet, View, Image, Text } from "react-native";
import axios from "axios";
import { AuthContext } from "../../store/auth-context";
import { useContext } from "react";
import { Colors } from "../../constants/styles";
import i18next from '../../services/i18next';
import {useTranslation} from 'react-i18next';
function ProfileCard({ name,uri }) {
  const authCtx = useContext(AuthContext);
  const {t} = useTranslation();
  return (
    <View style={[styles.container,{backgroundColor: authCtx.darkMode ? Colors.darksec : 'white'}]}>
      <View style={styles.imgContainer}>
        <Image
          source={{uri:uri}}
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title,{color: authCtx.darkMode ? Colors.white : '#000'}]}>{t('welcome')}</Text>
        <Text style={[styles.name,{color: authCtx.darkMode ? Colors.white : '#000'}]}>{name}</Text>
      </View>
    </View>
  );
}

export default ProfileCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',

    width: 300,
    height: 120,
    borderRadius: 20,
    marginTop: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imgContainer: {
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  textContainer: {
    justifyContent: 'space-around',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  name: {
    textAlign: 'center',
    fontSize: 16,
  },
});
