import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";
import JSXExercise1 from "./src/screens/JSXExercise1";

const navigator = createStackNavigator(
	{
		Home: HomeScreen,
		Exercise1: JSXExercise1,
	},
	{
		initialRouteName: "Exercise1",
		defaultNavigationOptions: {
			title: "App",
		},
	}
);

export default createAppContainer(navigator);
