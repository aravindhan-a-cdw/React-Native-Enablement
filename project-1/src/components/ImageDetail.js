import { Image, View, Text } from "react-native";

export default function ImageDetail(props) {
	const { title, imageSource, imageScore } = props;
	return (
		<View>
			<Image source={imageSource} />
			<Text>{title}</Text>
			<Text>Image score - {imageScore}</Text>
		</View>
	);
}
