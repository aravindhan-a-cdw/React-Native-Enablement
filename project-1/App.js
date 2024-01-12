import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";
import JSXExercise1 from "./src/screens/JSXExercise1";
import FriendsList from "./src/screens/FriendsList";

const navigator = createStackNavigator(
	{
		Home: HomeScreen,
		Exercise1: JSXExercise1,
		FriendsList: FriendsList,
	},
	{
		initialRouteName: "Home",
		defaultNavigationOptions: {
			title: "App",
		},
	}
);

export default createAppContainer(navigator);
