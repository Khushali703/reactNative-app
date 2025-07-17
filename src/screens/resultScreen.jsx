import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

import {useDispatch, useSelector} from 'react-redux';

const ResultScreen = () => {
  const {currentTest, answers} = useSelector(state => state.question);
  const dispatch = useDispatch();
  const Navigation = useNavigation();

  const testId = currentTest?.test;

  // Check if currentTest and questions exist
  if (
    !currentTest ||
    !currentTest.questions ||
    !Array.isArray(currentTest.questions)
  ) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No test data found.</Text>
        <TouchableOpacity
          style={styles.goHomeButton}
          onPress={() => Navigation.navigate('home')}>
          <Text style={styles.secondaryButtonText}>Go Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const correct = currentTest.questions.filter(
    (q, i) => q.answer === answers?.[i],
  ).length;

  const score = Math.round((correct / currentTest.questions.length) * 100);

  return (
    <View style={styles.container}>
      <View style={styles.scoreContainer}>
        <AnimatedCircularProgress
          size={150}
          width={15}
          fill={score}
          tintColor="#28a745"
          backgroundColor="#d6d6d6"
          rotation={0}
          lineCap="round">
          {() => <Text style={styles.percentage}>{score}%</Text>}
        </AnimatedCircularProgress>
      </View>
      <Text style={styles.title}>You are awesome!</Text>
      <Text style={styles.subtitle}>
        Congratulations! You got {correct} questions correct out of{' '}
        {currentTest.questions.length}
      </Text>

      {/**Review button */}
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => Navigation.navigate('review')}>
        <Text style={styles.primaryButtonText}>Review Answers</Text>
      </TouchableOpacity>

      {/**show progress button */}
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => Navigation.navigate('progress', {testId})}>
        <Text style={styles.secondaryButtonText}>View Progress</Text>
      </TouchableOpacity>

      {/** navigate to the home button */}
      <TouchableOpacity
        style={styles.goHomeButton}
        onPress={() => {
          Navigation.navigate('home');
        }}>
        <Text style={styles.secondaryButtonText}>Go Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#f4f6f9',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#003f9f',
    width: '100%',
    paddingVertical: 12,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  scoreContainer: {
    marginVertical: 30,
  },
  percentage: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#003f9f',
  },
  title: {
    color: '#28a745',
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  primaryButton: {
    backgroundColor: '#004aad',
    paddingVertical: 12,
    paddingHorizontal: 130,
    borderRadius: 30,
    marginTop: 30,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButton: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#004aad',
    paddingVertical: 10,
    paddingHorizontal: 130,
    borderRadius: 30,
  },
  secondaryButtonText: {
    color: '#004aad',
    fontWeight: 'bold',
    fontSize: 16,
  },
  goHomeButton: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#004aad',
    paddingVertical: 10,
    paddingHorizontal: 150,
    borderRadius: 30,
  },
});

export default ResultScreen;
