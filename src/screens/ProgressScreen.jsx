// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
// } from 'react-native';
// import {useSelector} from 'react-redux';
// import {QUESTIONS} from '../data/questions';
// import Icon from 'react-native-vector-icons/FontAwesome'; // Adjust the import path as necessary

// const YourProgressScreen = () => {
//   const progress = useSelector(state => state.question.progress);
//   const progressEntries = Object.entries(progress);

//   return (
//     <View style={styles.container}>
//       <ScrollView contentContainerStyle={styles.content}>
//         {/* For Each Test */}
//         {progressEntries.map(([testName, data], index) => (
//           <View key={index} style={styles.testBlock}>
//             {/* <Text style={styles.testTitle}>{testName}</Text> */}

//             {/* Bar Chart */}
//             <View style={styles.barChartContainer}>
//               {/* Y-Axis Labels */}
//               <View style={styles.yAxis}>
//                 {[30, 25, 20, 15, 10, 5, 0].map(value => (
//                   <Text key={value} style={styles.yAxisLabel}>
//                     {value}
//                   </Text>
//                 ))}
//               </View>

//               {/* Bars */}
//               <View style={styles.bars}>
//                 {data.scores.map((score, i) => {
//                   const testObj = QUESTIONS.find(
//                     q => `Test-${q.test}` === testName,
//                   );
//                   const totalQuestions = testObj ? testObj.questions.length : 0;
//                   const correctCount = Math.round(
//                     (score / 100) * totalQuestions,
//                   );
//                   return (
//                     <View key={i} style={styles.barBox}>
//                       <View style={[styles.bar, {height: correctCount * 5}]} />
//                       <Text style={styles.barLabel}>{correctCount}</Text>
//                     </View>
//                   );
//                 })}
//               </View>
//             </View>

//             {/* Attempts Cards */}
//             {data.scores.map((score, i) => {
//               const correctPercent = score;
//               const incorrectPercent = 100 - score;
//               return (
//                 <View key={i} style={styles.card}>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       justifyContent: 'space-between',
//                       marginBottom: 15,
//                     }}>
//                     <Text style={styles.dateText}>
//                       {new Date().toLocaleDateString()}
//                     </Text>
//                     <TouchableOpacity>
//                       <Text style={styles.reviewBtn}>
//                         REVIEW{' '}
//                         <Icon name="chevron-right" size={12} color="#004aad" />
//                       </Text>
//                     </TouchableOpacity>
//                   </View>
//                   <View style={styles.progressBar}>
//                     <View
//                       style={[styles.correct, {width: `${correctPercent}%`}]}
//                     />
//                     <View
//                       style={[
//                         styles.incorrect,
//                         {width: `${incorrectPercent}%`},
//                       ]}
//                     />
//                   </View>
//                 </View>
//               );
//             })}
//           </View>
//         ))}

//         {/* Scope of Improvements Button */}
//         <TouchableOpacity style={styles.scopeBtn}>
//           <Text style={styles.scopeText}>Scope of Improvements</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   );
// };

// export default YourProgressScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f2f4f7',
//   },
//   content: {
//     padding: 16,
//   },
//   testBlock: {
//     marginBottom: 20,
//   },
//   testTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#004aad',
//     marginBottom: 15,
//     textAlign: 'center',
//   },
//   barChartContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 16,
//     flexDirection: 'row',
//     marginBottom: 15,
//   },
//   yAxis: {
//     justifyContent: 'space-between',
//     marginRight: 10,
//   },
//   yAxisLabel: {
//     fontSize: 12,
//     color: '#333',
//     textAlign: 'right',
//     width: 30,
//     marginBottom: 10,
//     fontWeight: 'bold',
//     lineHeight: 18,
//     height: 20,
//   },
//   bars: {
//     flexDirection: 'row',
//     alignItems: 'flex-end',
//     flex: 1,
//     justifyContent: 'space-evenly',
//   },
//   barBox: {
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   bar: {
//     width: 100,
//     backgroundColor: '#004aad',
//   },
//   barLabel: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     marginTop: 4,
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 13,
//     marginBottom: 16,
//   },
//   dateText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#004aad',
//   },
//   reviewBtn: {
//     color: '#004aad',
//     fontWeight: 'bold',
//     textAlign: 'right',
//   },
//   progressBar: {
//     flexDirection: 'row',
//     height: 10,
//     borderRadius: 5,
//     overflow: 'hidden',
//     marginBottom: 10,
//   },
//   correct: {
//     backgroundColor: '#28A745',
//   },
//   incorrect: {
//     backgroundColor: '#DC3545',
//   },

//   scopeBtn: {
//     backgroundColor: '#004aad',
//     padding: 14,
//     borderRadius: 30,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   scopeText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import {QUESTIONS} from '../data/questions';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProgressScreen = () => {
  const route = useRoute();
  const testId = route.params ? route.params.testId : undefined;

  const progress = useSelector(state => state.question.progress);
  const testKey = `Test-${Number(testId)}`;
  const testProgress = progress[testKey];

  const testObj = QUESTIONS.find(q => Number(q.test) == Number(testId));
  const totalQuestions = testObj ? testObj.questions.length : 30;

  if (!testProgress) {
    return (
      <View style={styles.container}>
        <Text style={styles.testTitle}>
          No progress found for Test {testId}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.testTitle}>Progress for Test {Number(testId)}</Text>

        {/* Bar Chart */}
        <View style={styles.barChartContainer}>
          <View style={styles.yAxis}>
            {[30, 25, 20, 15, 10, 5, 0].map(value => (
              <Text key={value} style={styles.yAxisLabel}>
                {value}
              </Text>
            ))}
          </View>

          <View style={styles.bars}>
            {testProgress.scores.map((score, i) => {
              const correctCount = Math.round((score / 100) * totalQuestions);
              return (
                <View key={i} style={styles.barBox}>
                  <View style={[styles.bar, {height: correctCount * 5}]} />
                  <Text style={styles.barLabel}>{correctCount}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Attempt Cards */}
        {testProgress.scores.map((score, i) => {
          const correctPercent = score;
          const incorrectPercent = 100 - score;

          return (
            <View key={i} style={styles.card}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 15,
                }}>
                <Text style={styles.dateText}>
                  {new Date().toLocaleDateString()}
                </Text>
                <TouchableOpacity>
                  <Text style={styles.reviewBtn}>
                    REVIEW{' '}
                    <Icon name="chevron-right" size={12} color="#004aad" />
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.progressBar}>
                <View style={[styles.correct, {width: `${correctPercent}%`}]} />
                <View
                  style={[styles.incorrect, {width: `${incorrectPercent}%`}]}
                />
              </View>
            </View>
          );
        })}

        {/* Scope of Improvements Button */}
        <TouchableOpacity style={styles.scopeBtn}>
          <Text style={styles.scopeText}>Scope of Improvements</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ProgressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f4f7',
  },
  content: {
    padding: 16,
  },
  testTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#004aad',
    marginBottom: 15,
    textAlign: 'center',
  },
  barChartContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    marginBottom: 15,
  },
  yAxis: {
    justifyContent: 'space-between',
    marginRight: 10,
  },
  yAxisLabel: {
    fontSize: 12,
    color: '#333',
    textAlign: 'right',
    width: 30,
    marginBottom: 10,
    fontWeight: 'bold',
    lineHeight: 18,
    height: 20,
  },
  bars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'space-evenly',
  },
  barBox: {
    alignItems: 'center',
    marginBottom: 10,
  },
  bar: {
    width: 100,
    backgroundColor: '#004aad',
  },
  barLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 13,
    marginBottom: 16,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#004aad',
  },
  reviewBtn: {
    color: '#004aad',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  progressBar: {
    flexDirection: 'row',
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 10,
  },
  correct: {
    backgroundColor: '#28A745',
  },
  incorrect: {
    backgroundColor: '#DC3545',
  },
  scopeBtn: {
    backgroundColor: '#004aad',
    padding: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  scopeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
