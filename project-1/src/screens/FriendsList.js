import { FlatList, View, Text, StyleSheet } from "react-native";

export default function FriendsList() {
	const friends = [
		{ name: "Friend #1", age: 20 },
		{ name: "Friend #2", age: 45 },
		{ name: "Friend #3", age: 32 },
		{ name: "Friend #4", age: 27 },
		{ name: "Friend #5", age: 53 },
		{ name: "Friend #6", age: 30 },
		{ name: "Friend #7", age: 20 },
		{ name: "Friend #8", age: 45 },
		{ name: "Friend #9", age: 32 },
		{ name: "Friend #10", age: 27 },
		{ name: "Friend #11", age: 53 },
		{ name: "Friend #12", age: 30 },
	];
	const FriendElement = ({ item }) => {
		return (
			<Text style={styles.textStyle}>
				{item.name} is of age {item.age} years
			</Text>
		);
	};
	return (
		<FlatList
			data={friends}
			renderItem={FriendElement}
			keyExtractor={(record) => record.name}
		></FlatList>
	);
}

const styles = StyleSheet.create({
	textStyle: {
		marginVertical: 50,
		textAlign: "center",
		borderWidth: 1,
		borderColor: "black",
		paddingVertical: 2,
	},
});
