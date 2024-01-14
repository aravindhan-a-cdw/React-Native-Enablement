import Counter from "../components/Counter";
import { View, StyleSheet } from "react-native";

export default function () {
	return (
		<View styles={styles.view}>
			<Counter />
		</View>
	);
}

const styles = StyleSheet.create({
	view: {
		marginVertical: 10,
	},
});
