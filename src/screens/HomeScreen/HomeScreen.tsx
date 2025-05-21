// filepath: e:\todoapp\src\screens\HomeScreen\HomeScreen.tsx
import React, {useState, useEffect} from "react";
import { SafeAreaView, View, ScrollView, Text, Image, TextInput, TouchableOpacity } from "react-native";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import homeScreenHandlers from "./homescreenfunc";
import styles from "./homescreenstyles";

/**
 * Màn hình chính - Home Screen
 */
const HomeScreen = (props) => {
  // State management
  const [searchText, setSearchText] = useState('');
  const [userName, setUserName] = useState('User');

  // Fetch user name from Firestore when component mounts
  useEffect(() => {
    const fetchUserName = async () => {
      const currentUser = auth().currentUser;
      if (currentUser) {
        try {
          const userDoc = await firestore()
            .collection('users')
            .where('email', '==', currentUser.email)
            .get();

          if (!userDoc.empty) {
            // Get the first document that matches
            const userData = userDoc.docs[0].data();
            if (userData.fullName) {
              setUserName(userData.fullName);
            }
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserName();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Phần tiêu đề cố định */}
      <View style={styles.headerContainer}>
        <View style={styles.headerRow}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.welcomeText}>{"Welcome Back!"}</Text>
            <Text style={styles.userName}>{userName}</Text>
          </View>
          <TouchableOpacity onPress={homeScreenHandlers.handleAvatarPress}>
            <Image
              source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ahfvssVHBU/ic62yv4h_expires_30_days.png"}}
              resizeMode={"stretch"}
              style={styles.avatarImage}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Image
            source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ahfvssVHBU/p80bvbaw_expires_30_days.png"}}
            resizeMode={"stretch"}
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search tasks"
            placeholderTextColor="#FFFFFF"
            value={searchText}
            onChangeText={(text) => {
              setSearchText(text);
              homeScreenHandlers.handleSearch(text);
            }}
            style={styles.searchInput}
          />
        </View>

        <Text style={styles.sectionTitle}>{"Ongoing Projects"}</Text>
      </View>

      {/* Phần danh sách dự án cuộn được */}
      <ScrollView style={styles.scrollViewContainer}>
        <TouchableOpacity
          style={styles.projectCard}
          onPress={() => homeScreenHandlers.handleProjectPress('Mobile App Wireframe')}
        >
          <Text style={styles.projectTitle}>{"Mobile App Wireframe"}</Text>
          <Text style={styles.teamMembersText}>{"Team members"}</Text>
          <View style={styles.teamMembersContainer}>
            <Image
              source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ahfvssVHBU/3j3qien5_expires_30_days.png"}}
              resizeMode={"stretch"}
              style={styles.memberAvatar}
            />
            <Image
              source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ahfvssVHBU/of57w88b_expires_30_days.png"}}
              resizeMode={"stretch"}
              style={[styles.memberAvatar, {marginRight: 3}]}
            />
            <Image
              source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ahfvssVHBU/dmdfiab2_expires_30_days.png"}}
              resizeMode={"stretch"}
              style={[styles.memberAvatar, {marginRight: 0, marginVertical: 1}]}
            />
          </View>
          <Text style={styles.dueDate}>{"Due on : 21 March"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.projectCard}
          onPress={() => homeScreenHandlers.handleProjectPress('Real Estate App Design')}
        >
          <Text style={styles.projectTitle}>{"Real Estate App Design"}</Text>
          <Text style={styles.teamMembersText}>{"Team members"}</Text>
          <View style={styles.teamMembersContainer}>
            <Image
              source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ahfvssVHBU/vb5m3om8_expires_30_days.png"}}
              resizeMode={"stretch"}
              style={styles.memberAvatar}
            />
            <Image
              source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ahfvssVHBU/0ctibh5j_expires_30_days.png"}}
              resizeMode={"stretch"}
              style={[styles.memberAvatar, {marginRight: 3}]}
            />
            <Image
              source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ahfvssVHBU/1jofdgzz_expires_30_days.png"}}
              resizeMode={"stretch"}
              style={[styles.memberAvatar, {marginRight: 0, marginVertical: 1}]}
            />
          </View>
          <Text style={styles.dueDate}>{"Due on : 20 June"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.projectCard}
          onPress={() => homeScreenHandlers.handleProjectPress('Dashboard & App Design')}
        >
          <Text style={styles.projectTitle}>{"Dashboard & App Design"}</Text>
          <Text style={styles.teamMembersText}>{"Team members"}</Text>
          <View style={styles.teamMembersContainer}>
            <Image
              source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ahfvssVHBU/r6lr3mjd_expires_30_days.png"}}
              resizeMode={"stretch"}
              style={[styles.memberAvatar, {marginRight: 3}]}
            />
            <Image
              source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ahfvssVHBU/um3twmrd_expires_30_days.png"}}
              resizeMode={"stretch"}
              style={[styles.memberAvatar, {marginRight: 3}]}
            />
            <Image
              source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ahfvssVHBU/5oru4vxa_expires_30_days.png"}}
              resizeMode={"stretch"}
              style={[styles.memberAvatar, {marginRight: 0, marginVertical: 1}]}
            />
          </View>
          <Text style={styles.dueDate}>{"Due on : 04 August"}</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Thanh điều hướng cố định ở dưới */}
      <View style={styles.navigationBar}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => homeScreenHandlers.handleNavigation('Home')}
        >
          <Image
            source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ahfvssVHBU/qnikzozz_expires_30_days.png"}}
            resizeMode={"stretch"}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>{"Home"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => homeScreenHandlers.handleNavigation('Chat')}
        >
          <Image
            source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ahfvssVHBU/vi6di51d_expires_30_days.png"}}
            resizeMode={"stretch"}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>{"Chat"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => homeScreenHandlers.handleAddNew(props.navigation)}
        >
          <Text style={styles.addButtonText}>{"+"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => homeScreenHandlers.handleNavigation('Calendar')}
        >
          <Image
            source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ahfvssVHBU/s0s92snh_expires_30_days.png"}}
            resizeMode={"stretch"}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>{"Calendar"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => homeScreenHandlers.handleNavigation('Notification')}
        >
          <Image
            source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ahfvssVHBU/6xkhq5ng_expires_30_days.png"}}
            resizeMode={"stretch"}
            style={styles.navIcon}
          />
          <Text style={[styles.navText, {textAlign: "center"}]}>{"Notification"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
