import React from "react";
import { Text, StyleSheet, View, Button, TouchableOpacity } from "react-native";

const HomeScreen = (props) => {
	const { navigation } = props;
	const pressHandler = (section) => {
		navigation.navigate(section);
	};
	const navigateToExercise1 = () => {
		navigation.navigate("Exercise1");
	};
	return (
		<View>
			<Text style={styles.text}>Hello World!</Text>
			<Button
				style={styles.button}
				onPress={() => pressHandler("Exercise1")}
				title="Exercise1"
			/>
			<Button
				style={styles.button}
				onPress={() => pressHandler("FriendsList")}
				title="FriendsList"
			/>
			<Button
				style={styles.button}
				onPress={() => pressHandler("ImageList")}
				title="ImageList"
			/>
			<Button
				style={styles.button}
				onPress={() => pressHandler("Counter")}
				title="Counter"
			/>
			<Button
				style={styles.button}
				onPress={() => pressHandler("ColorPalette")}
				title="ColorPalette"
			/>
			{/* <TouchableOpacity onPress={navigateToExercise1}>
				<Text>Go to Exercise1</Text>
			</TouchableOpacity> */}
		</View>
	);
};

const styles = StyleSheet.create({
	text: {
		fontSize: 30,
		textAlign: "center",
		marginVertical: 5,
	},
	button: {
		marginVertical: 10,
	},
});

export default HomeScreen;
