import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
// import auth from '@react-native-firebase/auth';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';

// GoogleSignin.configure({
//     webClientId: 'AIzaSyBBENfvUFD3XpqU-90-dBEmin6awX3H-M4',
// });

export default function LoginScreen({ navigation }) {
  const handleKakaoLogin = () => {
    // 카카오 로그인 로직 추가 예정
    console.log('카카오 로그인');
    navigation.replace('Main'); 
  };

  const handleGoogleLogin = async () => {
    // try {
    // 
    //     const { idToken } = await GoogleSignin.signIn();
    // 
    //     const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    //     await auth().signInWithCredential(googleCredential);
    //     console.log('구글 로그인 성공');
    //     navigation.replace('Main'); // 메인 화면으로 이동
    //   } catch (error) {
    //     console.error(error);
    //   }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Your Own Account</Text>
      <Text style={styles.subtitle}>
        Stay connected with your loved ones and make it easier to send greetings and check in.
      </Text>

      <TouchableOpacity style={[styles.button, styles.kakaoButton]} onPress={handleKakaoLogin}>
        <Text style={styles.buttonText}>카카오 로그인</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.googleButton]} onPress={handleGoogleLogin}>
        <Text style={styles.buttonText}>구글 로그인</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  kakaoButton: {
    backgroundColor: '#FEE500',
  },
  googleButton: {
    backgroundColor: '#4285F4',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
