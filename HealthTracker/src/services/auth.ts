import auth from '@react-native-firebase/auth';

export const createAccount = async (email: string, password: string) => {
  try {
    return auth().createUserWithEmailAndPassword(email, password);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const response = auth().signInWithEmailAndPassword(email, password);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
