import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

export default function JSXExercise1() {
	// const name = "Aravindhan A";
	const [name, setName] = useState();
	const clearName = () => {
		setName("");
	};
	return (
		<View>
			<Text style={styles.textStyle}>
				Getting started with React Native!
			</Text>
			<View style={styles.inputContainer}>
				<TextInput
					placeholder="Enter your name"
					value={name}
					onChange={(event) => setName(event.nativeEvent.text)}
					style={styles.textInput}
				></TextInput>
				<Button onPress={clearName} title="Clear"></Button>
			</View>
			<Text style={styles.outputContainer}>
				My name is: <Text style={styles.nameStyle}>{name}</Text>
			</Text>
		</View>
	);
}

const styles = StyleSheet.compose({
	outputContainer: {
		marginTop: 20,
		marginBottom: 20,
		fontSize: 20,
		textAlign: "center",
	},
	textStyle: {
		fontSize: 45,
		textAlign: "center",
	},
	nameStyle: {
		fontStyle: "italic",
		fontWeight: "bold",
	},
	textInput: {
		borderColor: "black",
		borderWidth: 1,
		borderRadius: 5,
		marginTop: 5,
		marginBottom: 5,
		width: 200,
	},
	inputContainer: {
		alignItems: "center",
	},
});
