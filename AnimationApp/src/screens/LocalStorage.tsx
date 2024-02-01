import React, {useEffect, useState} from 'react';
import {
  Animated,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {MMKVLoader, useMMKVStorage} from 'react-native-mmkv-storage';
import Biometrics from 'react-native-biometrics';

type Task = {
  id: string;
  text: string;
  completed: boolean;
};

const storage = new MMKVLoader().withInstanceID('tasks').initialize();

const LocalStorage = (props: any) => {
  const {
    navigation: {navigate},
  } = props;
  const [text, setText] = React.useState('');
  const opacityValue = React.useState(new Animated.Value(0))[0];
  // const [tasks, setTasks] = useState([] as Task[]);
  const [tasks, setTasks] = useMMKVStorage<Task[]>('user', storage, []);
  const [authenticated, setAuthenticated] = useState(false);

  const toggleTask = (id: string) => {
    const newTasks = tasks.map(task => {
      if (task.id === id) {
        return {...task, completed: !task.completed};
      }
      return task;
    });
    setTasks(newTasks);
  };
  const removeTask = (id: string) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
  };
  const addTask = () => {
    const newTask = {id: Date.now().toString(), text, completed: false};
    setTasks([...tasks, newTask]);
    setText('');
  };

  useEffect(() => {
    (async () => {
      const rnBiometrics = new Biometrics();

      const {biometryType} = await rnBiometrics.isSensorAvailable();
      console.log('Biometrics object', rnBiometrics);
      console.log('Biometrics type', biometryType);
      rnBiometrics
        .simplePrompt({
          promptMessage: 'Verify it is you!',
          cancelButtonText: "It's not mine",
        })
        .then(result => {
          console.log('Biometrics result', result);
          if (!result.success) {
            navigate('Home');
          } else {
            setAuthenticated(true);
            Animated.timing(opacityValue, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }).start(() => {
              console.log('Animation completed');
            });
          }
        })
        .catch(err => {
          console.log('Biometrics error', err);
        });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const AnimatedStyles = StyleSheet.create({
    todoContainer: {
      opacity: opacityValue,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.titleStyle}>Todo List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={text}
          onChangeText={value => setText(value)}
          style={styles.inputStyle}
          placeholder="Enter your Todo"
        />
        <Button title="+" onPress={addTask} />
      </View>
      <Text style={styles.todoTitle}>Your Todo's are: </Text>
      <Animated.View style={AnimatedStyles.todoContainer}>
        {!authenticated ? (
          <Text>Authenticating...</Text>
        ) : (
          // <Text> Authenticated</Text>
          <FlatList
            data={tasks}
            keyExtractor={task => task.id}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => toggleTask(item.id)}>
                <View style={styles.task}>
                  <Text
                    style={
                      item.completed
                        ? styles.completedText
                        : styles.uncompletedText
                    }>
                    {item.text}
                  </Text>
                  <Button title="X" onPress={() => removeTask(item.id)} />
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    gap: 20,
  },
  titleStyle: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  inputStyle: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  todoTitle: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  task: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  uncompletedText: {
    fontSize: 16,
  },
  completedText: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    color: '#888',
  },
});

export default LocalStorage;
