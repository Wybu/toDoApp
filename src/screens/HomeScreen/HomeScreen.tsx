// filepath: e:\todoapp\src\screens\HomeScreen\HomeScreen.tsx
import React, {useState, useEffect} from "react";
import { SafeAreaView, View, ScrollView, Text, Image, TextInput, TouchableOpacity, Modal, Animated, Dimensions } from "react-native";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import homeScreenHandlers from "./homescreenfunc";
import styles from "./homescreenstyles";

const { width: screenWidth } = Dimensions.get('window');

/**
 * Màn hình chính - Home Screen
 */
const HomeScreen = (props) => {
  // State management
  const [searchText, setSearchText] = useState('');
  const [userName, setUserName] = useState('User');
  const [userEmail, setUserEmail] = useState('');
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(screenWidth));

  // Fetch user name from Firestore when component mounts
  useEffect(() => {
    const fetchUserName = async () => {
      const currentUser = auth().currentUser;
      if (currentUser) {
        setUserEmail(currentUser.email);
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

  // Fetch user's projects
  useEffect(() => {
    const fetchUserProjects = async () => {
      const currentUser = auth().currentUser;
      if (currentUser) {
        try {
          // First, get the current user's UID
          const userQuery = await firestore()
            .collection('users')
            .where('email', '==', currentUser.email)
            .get();

          if (!userQuery.empty) {
            const userUID = userQuery.docs[0].data().uid;

            // Query projects where user is either a member or leader
            const projectsQuery = await firestore()
              .collection('projects')
              .where('status', '==', 'active')
              .get();

            const userProjects = [];

            projectsQuery.forEach(doc => {
              const projectData = doc.data();
              const isParticipant = projectData.members?.includes(userUID) ||
                                   projectData.leaders?.includes(userUID);

              if (isParticipant) {
                userProjects.push({
                  id: doc.id,
                  ...projectData
                });
              }
            });

            setProjects(userProjects);
            setFilteredProjects(userProjects); // Initialize filtered projects
          }
        } catch (error) {
          console.error('Error fetching projects:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserProjects();
  }, []);

  // Handle search functionality
  useEffect(() => {
    if (searchText.trim() === '') {
      // If search is empty, show all projects
      setFilteredProjects(projects);
    } else {
      // Filter projects based on search text
      const filtered = projects.filter(project =>
        project.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredProjects(filtered);
    }
  }, [searchText, projects]);

  // Handle search input change
  const handleSearchChange = (text) => {
    setSearchText(text);
  };

  // Modal handlers - using functions from homescreenfunc
  const handleAvatarPress = () => {
    homeScreenHandlers.handleAvatarPress(setModalVisible, slideAnim);
  };

  const handleCloseModal = () => {
    homeScreenHandlers.handleCloseModal(slideAnim, screenWidth, setModalVisible);
  };

  const handleLogout = () => {
    homeScreenHandlers.handleLogout(handleCloseModal);
  };

  const handleViewProfile = () => {
    homeScreenHandlers.handleViewProfile();
  };

  // Helper function to format date
  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';

    let date;
    if (timestamp.toDate) {
      // Firestore timestamp
      date = timestamp.toDate();
    } else if (timestamp instanceof Date) {
      date = timestamp;
    } else {
      // String date
      date = new Date(timestamp);
    }

    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'  // Added year to display format
    });
  };

  // Calculate total members count
  const getTotalMembersCount = (project) => {
    const membersCount = project.members ? project.members.length : 0;
    const leadersCount = project.leaders ? project.leaders.length : 0;
    return membersCount + leadersCount;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Phần tiêu đề cố định */}
      <View style={styles.headerContainer}>
        <View style={styles.headerRow}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.welcomeText}>{"Welcome Back!"}</Text>
            <Text style={styles.userName}>{userName}</Text>
          </View>
          <TouchableOpacity onPress={handleAvatarPress}>
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
            placeholder="Search projects"
            placeholderTextColor="#FFFFFF"
            value={searchText}
            onChangeText={handleSearchChange}
            style={styles.searchInput}
          />
        </View>

        <Text style={styles.sectionTitle}>{"Ongoing Projects"}</Text>
      </View>

      {/* Phần danh sách dự án cuộn được */}
      <ScrollView style={styles.scrollViewContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading projects...</Text>
          </View>
        ) : filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <TouchableOpacity
              key={project.id}
              style={styles.projectCard}
              onPress={() => homeScreenHandlers.handleProjectPress(project.name, project.id, props.navigation)}
            >
              <Text style={styles.projectTitle}>{project.name}</Text>
              <Text style={styles.projectInfo}>
                {`${getTotalMembersCount(project)} members`}
              </Text>
              <Text style={styles.projectDateInfo}>
                {`Start: ${formatDate(project.startDate)}`}
              </Text>
              <Text style={styles.projectDateInfo}>
                {`End: ${formatDate(project.endDate)}`}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {searchText.trim() !== ''
                ? `No projects found matching "${searchText}"`
                : "No active projects found"}
            </Text>
          </View>
        )}
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

      {/* Avatar Modal */}
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackground}
            activeOpacity={1}
            onPress={handleCloseModal}
          />
          <Animated.View
            style={[
              styles.modalContent,
              {
                transform: [{ translateX: slideAnim }]
              }
            ]}
          >
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>

            {/* User Info */}
            <View style={styles.userInfoContainer}>
              <Image
                source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ahfvssVHBU/ic62yv4h_expires_30_days.png"}}
                resizeMode={"stretch"}
                style={styles.modalAvatarImage}
              />
              <Text style={styles.modalUserName}>{userName}</Text>
              <Text style={styles.modalUserEmail}>{userEmail}</Text>
            </View>

            {/* Menu Options */}
            <View style={styles.menuContainer}>
              <TouchableOpacity style={styles.menuItem} onPress={handleViewProfile}>
                <Text style={styles.menuItemText}>View Profile</Text>
                <Text style={styles.menuItemArrow}>›</Text>
              </TouchableOpacity>

              <View style={styles.menuDivider} />

              <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                <Text style={[styles.menuItemText, styles.logoutText]}>Logout</Text>
                <Text style={styles.menuItemArrow}>›</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;