import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const ReviewScreen = () => {
  const Navigation = useNavigation();
  const {currentTest, answers} = useSelector(state => state.question);

  //to check the questions is exists or not
  const questions = currentTest ? currentTest.questions : [];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.allQuestions}>
          All Questions ({questions.length}) ▼
        </Text>

        {questions.map((q, idx) => {
          const userAnswerKey = answers[idx]; //gets the selected option for that question index

          const userAnswer =
            userAnswerKey && q.options ? q.options[userAnswerKey] : undefined; //find the actual answers text

          const correctKey = q.answer; //correct option key for the question

          const correctAnswer =
            q.options && q.options[correctKey]
              ? q.options[correctKey]
              : q.answer;
          const isCorrect = userAnswerKey === correctKey;

          return (
            <View key={q.id || idx} style={styles.card}>
              <View style={styles.qHeader}>
                <Text style={styles.qIndex}>Question : {idx + 1}</Text>
                <Icon
                  name={isCorrect ? 'check-circle' : 'cancel'}
                  size={24}
                  color={isCorrect ? '#28a745' : '#e53935'}
                />
              </View>
              <Text style={styles.qText}>{q.question}</Text>

              <View style={styles.answerContainer}>
                <Icon
                  name={isCorrect ? 'check-circle' : 'cancel'}
                  size={20}
                  color={isCorrect ? '#28a745' : '#e53935'}
                  style={{marginLeft: 6}}
                />
                <Text
                  style={[
                    styles.answer,
                    isCorrect ? {color: 'black'} : {color: '#e53935'},
                  ]}>
                  {userAnswer || 'No answer selected'}
                </Text>
              </View>

              {!isCorrect && (
                <View style={styles.answerContainer}>
                  <Icon
                    name="check-circle"
                    size={20}
                    color="#28a745"
                    style={{marginLeft: 6}}
                  />
                  <Text style={[styles.answer, {color: 'black'}]}>
                    {correctAnswer}
                  </Text>
                </View>
              )}
            </View>
          );
        })}

        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => Navigation.navigate('home')}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9',
  },
  header: {
    backgroundColor: '#004aad',
    paddingVertical: 12,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  allQuestions: {
    fontSize: 16,
    color: '#004aad',
    fontWeight: '500',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 16,
    elevation: 2,
  },
  qHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  qIndex: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  qText: {
    marginVertical: 20,
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  image: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginVertical: 8,
  },
  answerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  answer: {
    marginLeft: 6,
    fontSize: 15,
    color: '#333',
  },
  doneButton: {
    backgroundColor: '#004aad',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  doneText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReviewScreen;
