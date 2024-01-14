import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";
import JSXExercise1 from "./src/screens/JSXExercise1";
import FriendsList from "./src/screens/FriendsList";
import ImageList from "./src/screens/ImageList";

const navigator = createStackNavigator(
	{
		Home: HomeScreen,
		Exercise1: JSXExercise1,
		FriendsList: FriendsList,
		ImageList: ImageList,
	},
	{
		initialRouteName: "Home",
		defaultNavigationOptions: {
			title: "App",
		},
	}
);

export default createAppContainer(navigator);
