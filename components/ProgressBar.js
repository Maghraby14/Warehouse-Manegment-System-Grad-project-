import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import ProgressCircle from 'react-native-progress/Circle';

const ProgressBar = ({ progress }) => {
  return (
    <View style={styles.container}>
      <ProgressCircle
        progress={progress / 100} // Progress should be between 0 and 1
        size={100}
        borderWidth={5}
        color="#4BB543" // Green color
        showsText // Show percentage text
        textStyle={styles.progressText}
      />
      <Text style={styles.label}>{progress}%</Text>
    </View>
  );
};

const App = () => {
  const [progress, setProgress] = useState(0);

  // Function to update progress value
  const updateProgress = () => {
    // Example: Update progress every second
    setInterval(() => {
      setProgress((prevProgress) => (prevProgress < 100 ? prevProgress + 10 : 0));
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Button title="Start Progress" onPress={updateProgress} />
      <ProgressBar progress={progress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default App;
