import React from "react";
import { View } from "react-native";
import { useIsLoggedIn } from "../AuthContext";
import AuthNavigation from "../navigation/AuthNavigation";

export default () => {
    const isLoggedIn = true;

    return (
        <View style={{ flex: "1" }}>
            {isLoggedIn ? <TabNavifation /> : <AuthNavigation />}
        </View>
    );
};