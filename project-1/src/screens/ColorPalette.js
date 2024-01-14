import { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	Button,
	TouchableOpacity,
} from "react-native";

export default function App() {
	const [colors, setColors] = useState([]);
	const [selectedColor, setSelectedColor] = useState(null);

	let rgbSelectedColor = colors[selectedColor] || {
		red: 0,
		green: 0,
		blue: 0,
	};
	let selectedColorString = `rgba(${rgbSelectedColor.red}, ${rgbSelectedColor.green}, ${rgbSelectedColor.blue}, 0.6)`;

	const addColor = () => {
		setColors((colors) => [
			...colors,
			{
				red: Math.floor(Math.random() * 255),
				green: Math.floor(Math.random() * 255),
				blue: Math.floor(Math.random() * 255),
			},
		]);
	};
	const clearColors = () => {
		setColors([]);
		setSelectedColor(null);
	};
	return (
		<View>
			<Text style={styles.heading}>Color Palette</Text>
			<Button title="Add Color" onPress={addColor} />
			<Button title="Clear Colors" onPress={clearColors} />
			<FlatList
				style={styles.button}
				horizontal
				data={colors}
				renderItem={({ item, index }) => (
					<TouchableOpacity onPress={() => setSelectedColor(index)}>
						<ColorView {...item} />
					</TouchableOpacity>
				)}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
			/>
			{selectedColor !== null ? (
				<View>
					<Text>Selected Color: {selectedColorString}</Text>
					<ColorView {...rgbSelectedColor} />
					<Text>Red</Text>
					<Button
						title="+"
						onPress={() =>
							setColors((state) => [
								...state,
								(state[selectedColor].red += 1),
							])
						}
					/>
					<Button
						title="-"
						onPress={() =>
							setColors((state) => [
								...state,
								(state[selectedColor].red -= 1),
							])
						}
					/>
					<Text>Green</Text>
					<Button
						title="+"
						onPress={() =>
							setColors((state) => [
								...state,
								(state[selectedColor].green += 1),
							])
						}
					/>
					<Button
						title="-"
						onPress={() =>
							setColors((state) => [
								...state,
								(state[selectedColor].green -= 1),
							])
						}
					/>
					<Text>Blue</Text>
					<Button
						title="+"
						onPress={() =>
							setColors((state) => [
								...state,
								(state[selectedColor].blue += 1),
							])
						}
					/>
					<Button
						title="-"
						onPress={() =>
							setColors((state) => [
								...state,
								(state[selectedColor].blue -= 1),
							])
						}
					/>
				</View>
			) : (
				""
			)}
		</View>
	);
}

function ColorView(props) {
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
