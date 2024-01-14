import { useState } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";

export default function App() {
	const [colors, setColors] = useState([]);
	const addColor = () => {
		setColors((colors) => [
			...colors,
			{
				red: Math.random() * 255,
				green: Math.random() * 255,
				blue: Math.random() * 255,
			},
		]);
	};
	const clearColors = () => setColors([]);
	return (
		<View>
			<Text style={styles.heading}>Color Palette</Text>
			<Button title="Add Color" onPress={addColor} />
			<Button title="Clear Colors" onPress={clearColors} />
			<FlatList
				style={styles.button}
				horizontal
				data={colors}
				renderItem={({ item }) => <ColorView {...item} />}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
}

function ColorView(props) {
	console.log(props);
	return (
		<View
			style={{
				height: 100,
				width: 100,
				backgroundColor: `rgba(${props.red}, ${props.green}, ${props.blue}, 0.6)`,
			}}
		></View>
	);
}

const styles = StyleSheet.create({
	heading: {
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
		marginVertical: 10,
	},
	button: {
		marginVertical: 10,
	},
});
