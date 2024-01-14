import { View, FlatList } from "react-native";
import ImageDetail from "../components/ImageDetail";

export default function ImageList() {
	const data = [
		{
			title: "Beach",
			imageSource: require("../../assets/images/beach.jpg"),
			imageScore: 9,
		},
		{
			title: "Forest",
			imageSource: require("../../assets/images/forest.jpg"),
			imageScore: 7,
		},
		{
			title: "Mountain",
			imageSource: require("../../assets/images/mountain.jpg"),
			imageScore: 4,
		},
	];
	return (
		<View>
			<FlatList
				data={data}
				renderItem={({ item }) => {
					return (
						<ImageDetail
							title={item.title}
							imageSource={item.imageSource}
							imageScore={item.imageScore}
						/>
					);
				}}
			/>
		</View>
	);
}
