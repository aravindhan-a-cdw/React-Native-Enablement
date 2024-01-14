import { Button, View, Text, StyleSheet } from "react-native";
import { useState } from "react";

export default function (props) {
	const [counter, setCounter] = useState(0);

	const increment = () => setCounter((state) => state + 1);
	const decrement = () => setCounter((state) => state - 1);

	return (
		<View>
			<Button title="Increase" onPress={increment} />
			<Button title="Decrease" onPress={decrement} />
			<Text style={styles.center}>Current Count is {counter}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	center: {
		textAlign: "center",
		marginVertical: 5,
	},
});
