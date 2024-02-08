import firestore from '@react-native-firebase/firestore';

export const createOrUpdateData = async (
  username: string,
  date: Date,
  data: object,
) => {
  try {
    const formattedDate = date.toLocaleDateString().replace(/\//g, '-');

    const response = await firestore()
      .collection(username)
      .doc(formattedDate)
      .set(data, {merge: true})
      .catch(error => {
        console.log(
          `Error in setting data for ${username} date ${date}`,
          error,
        );
      });

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteUserData = async (username: string, date: Date) => {
  try {
    await firestore()
      .collection(username)
      .doc(date.toLocaleDateString().replace(/\//g, '-'))
      .delete()
      .catch(error => {
        console.log(
          `Error in deleting ${username}'s data for date ${date}`,
          error,
        );
      });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const readData = async (username: string, date: Date) => {
  try {
    const formattedDate = date.toLocaleDateString().replace(/\//g, '-');
    console.log(formattedDate);
    const response = await firestore()
      .collection(username)
      .doc(formattedDate)
      .get();
    if (!response.exists) {
      throw new Error('No data found');
    }
    return response.data();
  } catch (error) {
    console.log(error);
    throw error;
  }
};
