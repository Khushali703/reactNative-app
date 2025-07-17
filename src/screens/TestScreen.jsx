import {useNavigation} from '@react-navigation/native';
import {useState, useEffect} from 'react';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  answerQuestions,
  finishTest,
  goToNextQuestion,
} from '../redux_store/QuestionSlice';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

const TestScreen = () => {
  const Navigation = useNavigation();
  const dispatch = useDispatch();

  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const {currentTest, currentQuestionIndex} = useSelector(
    state => state.question,
  );
  const answers = useSelector(state => state.question.answers);
  const questions = useSelector(state => state.question.currentTest.questions);
  const currentQuestion = currentTest.questions[currentQuestionIndex];
  const explanation = useSelector(state => state.question.explanation);

  const isLastQuestion =
    currentQuestionIndex === currentTest.questions.length - 1;

  // Correct & Incorrect count
  const correctCount = questions.filter(
    (q, i) => q.answer === answers[i],
  ).length;
  const incorrectCount = answers.length - correctCount;

  // Handle answer selection
  const handleAnswer = selectedAnswer => {
    if (selectedOption) {
      return; // Prevent multiple clicks
    } else {
      setSelectedOption(selectedAnswer);
      const correct = selectedAnswer === currentQuestion.answer;
      setIsCorrect(correct);
      dispatch(answerQuestions(selectedAnswer));
    }
  };

  // Handle Next button
  const handleNext = () => {
    if (!selectedOption) {
      alert('Please select an option before proceeding.');
      return;
    }
    if (isLastQuestion) {
      dispatch(finishTest());
      Navigation.navigate('results');
    } else {
      dispatch(goToNextQuestion());
      setSelectedOption(null);
      setIsCorrect(null);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          {currentQuestionIndex + 1}/{currentTest.questions.length}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 50,
            }}>
            <Icon
              name="check-circle"
              size={20}
              color="#28A745"
              style={{marginRight: 6}}
            />
            <Text style={styles.correct}>{correctCount}</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 50,
            }}>
            <Icon
              name="times-circle"
              size={20}
              color="#DC3545"
              style={{marginRight: 6}}
            />
            <Text style={styles.incorrect}>{incorrectCount}</Text>
          </View>

          <Icon
            name="bookmark"
            size={20}
            color="#007BFF"
            style={styles.bookmark}
          />
        </View>
      </View>

      {/**to set the question */}
      <View style={styles.questionSection}>
        {currentQuestion ? (
          <>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
          </>
        ) : (
          <Text>No more questions or test finished.</Text>
        )}

        {/*to set the options*/}
        <View style={styles.optionSection}>
          {currentQuestion && currentQuestion.options ? (
            Object.entries(currentQuestion.options).map(([key, value]) => {
              let optionBoxStyle = styles.optionBox;
              let optionTextStyle = styles.optionText;

              if (selectedOption === key) {
                if (isCorrect && key === currentQuestion.answer) {
                  optionBoxStyle = styles.correctOptionBox;
                  optionTextStyle = styles.correctOptionText;
                } else if (!isCorrect && key === selectedOption) {
                  optionBoxStyle = styles.incorrectOptionBox;
                  optionTextStyle = styles.incorrectOptionText;
                }
              }

              return (
                <TouchableOpacity
                  key={key}
                  onPress={() => handleAnswer(key)}
                  style={optionBoxStyle}
                  disabled={selectedOption !== null}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {selectedOption === key && (
                      <Icon
                        name={isCorrect ? 'check-circle' : 'times-circle'}
                        size={24}
                        color={isCorrect ? '#fff' : '#fff'}
                        style={{marginRight: 12, color: '#fff'}} // Space between icon and text
                      />
                    )}
                    <Text style={optionTextStyle}>{value}</Text>
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            <Text>No options available.</Text>
          )}
          {/* corret answer explaination  */}

          {selectedOption && explanation && isCorrect ? (
            <View style={styles.explanationBox}>
              <View style={styles.explainantionIconTitle}>
                <Icon
                  name={'check-circle'}
                  size={22}
                  color={'green'}
                  style={{marginRight: 10, color: '#28A745'}}
                />
                <Text style={styles.explanationTitle}>Correct</Text>
              </View>
              <Text style={styles.explanationText}>{explanation}</Text>
            </View>
          ) : null}
        </View>
      </View>

      <TouchableOpacity
        style={[styles.nextButton, {opacity: selectedOption ? 1 : 0.5}]}
        onPress={handleNext}
        disabled={!selectedOption}>
        <Text style={styles.nextButtonText}>
          {isLastQuestion ? 'Finish' : 'Next'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9',
    paddingTop: 10,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    margin: 7,
    borderRadius: 10,
    elevation: 3,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  correct: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 16,
  },
  incorrect: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bookmark: {
    fontSize: 18,
  },
  questionSection: {
    borderRadius: 8,
    padding: 10,
  },
  questionText: {
    color: 'black',
    fontSize: 25,
    fontWeight: '600',
    height: '40%',
    borderRadius: 20,
    width: '100%',
    textAlign: 'center',
    paddingTop: 70,
  },
  optionSection: {
    height: '40%',
  },
  optionBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 5,
    padding: 16,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    textTransform: 'capitalize',
    letterSpacing: 0.5,
    paddingLeft: 17,
  },
  correctOptionBox: {
    backgroundColor: '#28A745',
    borderRadius: 10,
    padding: 14,
    marginVertical: 5,
  },
  correctOptionText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  incorrectOptionBox: {
    borderRadius: 10,
    padding: 14,
    marginVertical: 5,
    backgroundColor: '#DC3545',
  },
  incorrectOptionText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  explanationBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 5,
    padding: 14,
  },
  explainantionIconTitle: {
    flexDirection: 'row',
  },
  explanationTitle: {
    fontSize: 17,
    color: '#28A745',
    fontWeight: 'bold',
  },
  explanationText: {
    fontSize: 16,
    fontVariant: '400',
    marginTop: 10,
  },
  nextButton: {
    backgroundColor: '#004aad',
    paddingVertical: 12,
    paddingHorizontal: 170,
    borderRadius: 30,
    alignSelf: 'center',
    position: 'static',
  },
  nextButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TestScreen;
