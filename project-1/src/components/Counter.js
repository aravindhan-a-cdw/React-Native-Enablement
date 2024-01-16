import { Button, View, Text, StyleSheet } from "react-native";
import { useReducer, useState } from "react";

const countReducer = (state, action) => {
	switch (action.type) {
		case "increment":
			return state + 1;
		case "decrement":
			return state - 1;
		default:
			return state;
	}
};

export default function (props) {
	const [counter, dispatch] = useReducer(countReducer, 0);
	// const [counter, setCounter] = useState(0);

	const increment = () => dispatch({ type: "increment" });
	const decrement = () => dispatch({ type: "decrement" });

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
