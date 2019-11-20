import { createStackNavigator, createAppContainer } from "react-navigation";
import AuthHome from "../screens/Auth/AuthHome";

const AuthNavigation = createStackNavigator(
  {
    AuthHome
  },
  {
    headerMode: "none"
  }
);

export default createAppContainer(AuthNavigation);