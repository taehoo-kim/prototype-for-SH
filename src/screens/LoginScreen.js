import React from 'react';
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';



WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }) {

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "1018343746579-2js033oh704kg1mkr8vjb3s9t53ot5u8.apps.googleusercontent.com", // 안드로이드 클라이언트 ID
    useProxy: true,
  });

  const [userInfo, setUserInfo] = useState(null);

  const handleKakaoLogin = () => {
    // 카카오 로그인 로직 추가 예정
    console.log('카카오 로그인');
    navigation.replace('Main'); 
  };

  const handleGoogleLogin = async () => {
    
    const storedUser = await AsyncStorage.getItem("@user");
    if (!storedUser) {
      if (response?.type === "success") {
        await getUserInfo(response.authentication?.accessToken);
      }
    } else {
      setUserInfo(JSON.parse(storedUser));
    }

  };

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = await res.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
      console.log("유저 정보:", user);
      navigation.replace("Main");
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("@user");
    setUserInfo(null);
    console.log("로그아웃 완료");
  };

  // Google 인증 응답이 변경될 때마다 실행
  useEffect(() => {
    handleGoogleLogin();
  }, [response]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Your Own Account</Text>
      <Text style={styles.subtitle}>
        Stay connected with your loved ones and make it easier to send greetings and check in.
      </Text>

      <TouchableOpacity style={[styles.button, styles.kakaoButton]} onPress={handleKakaoLogin}>
        <Text style={styles.buttonText}>카카오 로그인</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.googleButton]}
        onPress={() => promptAsync()}
        disabled={!request} // 요청 준비가 안되었을 때 비활성화
      >
        <Text style={styles.buttonText}>구글 로그인</Text>
      </TouchableOpacity>

      {userInfo && (
        <TouchableOpacity style={[styles.button]} onPress={handleLogout}>
          <Text style={styles.buttonText}>로그아웃</Text>
        </TouchableOpacity>
      )}

      {/* 유저 정보 출력 */}
      {userInfo && (
        <View style={styles.userInfo}>
          <Text>Logged in as:</Text>
          <Text>{userInfo.name}</Text>
          <Text>{userInfo.email}</Text>
        </View>
      )}
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
