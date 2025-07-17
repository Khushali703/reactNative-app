import {useNavigation} from '@react-navigation/native';

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {useDispatch} from 'react-redux';
import {setCurrentTest} from '../redux_store/QuestionSlice';

export default function HomeScreen() {
  const Navigation = useNavigation();
  const dispatch = useDispatch();

  const handleTestSelect = testId => {
    dispatch(setCurrentTest(testId));
    Navigation.navigate('test');
  };

  const tests = Array.from({length: 10}, (_, i) => i + 1);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Practice Tests</Text>
          <Text style={styles.headerSubtitle}>Rhode Island Permit Test</Text>
        </View>
        <Image
          source={require('../../assets/rhode_island_logo.png')}
          style={styles.logo}
        />
      </View>

      {/* Practice Test List */}

      <FlatList
        data={tests}
        keyExtractor={item => item.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleTestSelect(item)}>
            <Text style={styles.questionCount}>30 QUESTIONS</Text>
            <Text style={styles.cardTitle}>Practice Test - {item}</Text>

            <View style={styles.cardBottom}>
              <Text style={styles.mistakes}>
                <Icon name="times-circle" size={16} color="#0047AB" /> 9
                Mistakes Allowed
              </Text>

              {/* Progress Button */}
              <TouchableOpacity
                style={styles.progressButton}
                onPress={() => Navigation.navigate('progress', {testId: item})}>
                <Icon name="bar-chart" size={14} color="#0047AB" />
                <Text style={styles.progressText}>Progress</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Bottom Tab */}
      <View style={styles.bottomTab}>
        <TabItem icon="car" label="Car" />
        <TabItem icon="motorcycle" label="Moto" />
        <TabItem icon="truck" label="CDL" />
        <TabItem icon="bars" label="Options" />
      </View>
    </View>
  );
}

const TabItem = ({icon, label}) => (
  <View style={styles.tabItem}>
    <Icon name={icon} size={20} color="#0047AB" />
    <Text style={styles.tabText}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f4f6f9'},
  header: {
    // backgroundColor: '#0047AB',
    backgroundColor: '#004AAD',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 60,
  },
  headerTitle: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    color: 'white',
    fontSize: 19,
    marginTop: 4,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  scrollContainer: {
    padding: 14,
    paddingBottom: 80,
  },
  card: {
    backgroundColor: '#ffff',
    borderRadius: 12,
    padding: 18,
    margin: 6,
    elevation: 1,
  },
  questionCount: {
    color: '#888',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginVertical: 6,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mistakes: {
    color: '#0047AB',
    fontWeight: '600',
  },
  progressButton: {
    borderWidth: 1,
    borderColor: '#0047AB',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressText: {
    color: '#0047AB',
    fontWeight: 'bold',
    fontSize: 14,
    paddingLeft: 6,
  },
  bottomTab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderColor: '#eee',
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  tabItem: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
    color: '#0047AB',
  },
});
