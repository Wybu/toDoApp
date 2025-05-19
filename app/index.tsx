import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Home() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      }}
    >
      <Text>Home Edit</Text>
      <Link href="/Project/projectCard">Work Project</Link>
      <Link href="/Project/WorkProgress/workProgress1">Work Project 11</Link>
      <Link href={"/Project/WorkProgress/creatNewTask"}>create New Task</Link>
      <Link href={"/Project/WorkProgress/CreatNewTask1"}>Pick Date From</Link>
    </View>
  );
}
