import { createStackNavigator } from "@react-navigation/stack"
import React from 'react'
import Bookmark from "../pages/Bookmark";
import Home from "../pages/Home";
import ReadNews from "../pages/ReadNews";
import Search from "../pages/Search";

const Stack = createStackNavigator();

function HomeNavigator() {
    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name='home' component={Home}/>
            <Stack.Screen name='read-news' component={ReadNews} />
            <Stack.Screen name='search' component={Search} />
            <Stack.Screen name='bookmarks' component={Bookmark} />
        </Stack.Navigator>
    )
}

export default HomeNavigator
