import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();

  // 샘플 데이터
  const peopleData = [
    { id: "1", name: "Mom", image: require("../../assets/mom.png") },
    { id: "2", name: "Dad", image: require("../../assets/dad.png") },
    { id: "3", name: "Brother1", image: require("../../assets/brother1.png") },
    { id: "4", name: "Jane", image: require("../../assets/jane.png") },
  ];

  const newsData = [
    {
      id: "1",
      title: "Earthquake 7.1",
      sender: "GrandParents",
      image: require("../../assets/earthquake.jpg"),
    },
    {
      id: "2",
      title: "Flood",
      sender: "Jane",
      image: require("../../assets/flood.jpg"),
    },
  ];

  return (
    <View style={styles.container}>
      {/* 검색 창 */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#777" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor="#999"
        />
      </View>

      {/* Navigation Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity style={styles.tab}>
          <Ionicons name="heart-outline" size={18} color="#333" />
          <Text style={styles.tabText}>Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}
          onPress={() => navigation.navigate("News")}
        >
          <Ionicons name="newspaper-outline" size={18} color="#333" />
          <Text style={styles.tabText}>What's up?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}
          onPress={() => navigation.navigate("People")}
        >
          <Ionicons name="people-outline" size={18} color="#333" />
          <Text style={styles.tabText}>People</Text>
        </TouchableOpacity>
      </View>

       {/* Map Section */}
       <View style={styles.mapSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Map</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Map")}>
            <Ionicons name="chevron-forward-circle-outline" size={20} color="#333" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Map")}>

          {/* 나중에 수정해야함. Map 초기값 임의로 넣음. */}
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {/* 사용자 위치 표시 */}
            <Marker
              coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
              title="Me"
            />
          </MapView>
        </TouchableOpacity>
      </View>

      {/* People Section */}
      <View style={styles.peopleSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>People</Text>
          <TouchableOpacity onPress={() => navigation.navigate("People")}>
            <Ionicons
              name="chevron-forward-circle-outline"
              size={20} // 화살표 크기
              color="#333"
            />
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={peopleData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.personCard}>
              <Image source={item.image} style={styles.personImage} />
              <Text style={styles.personName}>{item.name}</Text>
            </View>
          )}
        />
      </View>

      {/* What's up? Section */}
      <View style={styles.newsSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>What's up?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("News")}>
            <Ionicons
              name="chevron-forward-circle-outline"
              size={20} // 화살표 크기
              color="#333"
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={newsData}
          keyExtractor={(item) => item.id}
          numColumns={2} // 두 개의 열로 배치
          renderItem={({ item }) => (
            <View style={styles.newsCard}>
              <View style={styles.newsImageContainer}>
                <Image source={item.image} style={styles.newsImage} />
              </View>
              <View style={styles.newsContent}>
                <Text style={styles.sender}>{item.sender}</Text>
                <Text style={styles.title}>{item.title}</Text>
                <TouchableOpacity 
                  onPress={() => navigation.navigate("Messages")}
                  style={styles.messageButton}>
                  <Text style={{ color: "#fff", fontWeight: "bold" }}>
                    Go to message
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingTop: 20, // 상단 여백
  },
  searchContainer: {
    flexDirection: "row", // 아이콘과 입력창을 가로로 배치
    alignItems: "center", // 세로 정렬
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  icon: {
    marginRight: 8, // 아이콘과 입력창 간격
  },
  input: {
    flex: 1, // 입력창이 남은 공간을 차지하도록 설정
    height: 40,
    fontSize: 16,
    color: "#333",
  },
  tabs: {
    flexDirection: "row", // 탭을 가로로 배치
    justifyContent: "space-around", // 탭 간격 균등 배치
    marginVertical: 10,
  },
  tab: {
    flexDirection: "row", // 아이콘과 텍스트를 가로로 배치
    alignItems: "center", // 세로 정렬
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
  },
  tabText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 5, // 아이콘과 텍스트 간격
  },
  sectionHeader: {
    flexDirection: "row", // 제목과 화살표를 같은 행에 배치
    alignItems: "center", // 세로 중앙 정렬
  },
  map: {
    width: "100%", // 화면 너비를 가득 채움
    height: 150,   // 지도 섹션 높이 설정
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 24, // 텍스트 크기 조정
    fontWeight: "bold", // 텍스트 두께 설정
    color: "#333", // 텍스트 색상 설정
    marginLeft: 10, // 왼쪽 벽하고 간격 추가
    marginRight: 5, // 화살표 아이콘과 간격 추가
  },
  peopleSection: {
    marginVertical: 10,
  },
  personCard: {
    alignItems: "center",
    marginRight: 20, // 카드 간격 조정
    marginTop: 10,
    marginLeft: 10,
  },
  personImage: {
    width: 80, // 원형 이미지 너비 증가
    height: 80, // 원형 이미지 높이 증가
    borderRadius: 40, // 원형으로 유지
  },
  personName: {
    fontSize: 14, // 텍스트 크기 조정
    color: "#333",
  },
  newsSection: {
    marginVertical: 10,
  },
  newsContent: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  sender: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  newsCard: {
    flex: 1,
    margin: 10,
    backgroundColor: "#fff",
    overflow: "hidden", // 둥근 모서리 효과를 적용
  },
  newsImageContainer: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 15, // 상단 왼쪽 둥근 모서리
    borderTopRightRadius: 15, // 상단 오른쪽 둥근 모서리
    borderBottomLeftRadius: 15, // 하단 왼쪽 둥근 모서리 추가
    borderBottomRightRadius: 15, // 하단 오른쪽 둥근 모서리 추가
  },
  newsImage: {
    width: "100%",
    height: "100%",
  },
  
  title: {
    fontSize: 12,
    color: "#666",
  },
  messageButton: {
    marginTop: 10,
    backgroundColor: "#4CAF50", // 초록색 버튼
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },  
});
