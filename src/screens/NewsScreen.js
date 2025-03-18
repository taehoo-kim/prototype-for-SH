import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NewsScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>뉴스 화면</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});
