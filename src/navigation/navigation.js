import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import NewProject from '../screens/NewProject/NewProject';
import auth from '@react-native-firebase/auth';
import Login from '../screens/Login/Login';
import Signup from '../screens/SignUp/Signup';
import UserInfor from '../screens/UserInfor/Userinfor';


const AppNavigation = () => {
    const [isLoginnedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        auth().onAuthStateChanged(user => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        });
    }, []);

    const Stack = createNativeStackNavigator();

    // Rename internal variables to avoid conflict with the component name
    const AppStack = () => (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="NewProject" component={NewProject} />
        </Stack.Navigator>
    );

    const AuthStack = () => (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="UserInfor" component={UserInfor} />

        </Stack.Navigator>
    );

    return (
        <NavigationContainer>
            {isLoginnedIn ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
};

export default AppNavigation;

