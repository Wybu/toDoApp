import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface ProjectMember {
  id: string;
  avatar: string;
  name: string;
}

interface Project {
  id: string;
  title: string;
  members: ProjectMember[];
  deadline: string;
}

const ProjectListScreen = () => {
  const navigation = useNavigation();

  // Mock data - sẽ được thay thế bằng data thật từ API
  const projects: Project[] = [
    {
      id: '1',
      title: 'Mobile App Wireframe',
      members: [
        { id: '1', avatar: 'avatar1.png', name: 'Gianvi' },
        { id: '2', avatar: 'avatar2.png', name: 'Tod' },
        { id: '3', avatar: 'avatar3.png', name: 'Eliel' },
        { id: '4', avatar: 'avatar4.png', name: 'Enno' },
        { id: '5', avatar: 'avatar5.png', name: 'Heyden' },
      ],
      deadline: '10:05 am 24th April',
    },
    {
      id: '2',
      title: 'Game Developer',
      members: [
        { id: '6', avatar: 'avatar6.png', name: 'Barney' },
        { id: '7', avatar: 'avatar7.png', name: 'Tod' },
        { id: '8', avatar: 'avatar8.png', name: 'Alden' },
        { id: '9', avatar: 'avatar9.png', name: 'Enno' },
      ],
      deadline: '09:00 am 22nd April',
    },
    {
      id: '3',
      title: 'Web App Developer',
      members: [
        { id: '10', avatar: 'avatar10.png', name: 'Heyden' },
        { id: '11', avatar: 'avatar11.png', name: 'Tod' },
        { id: '12', avatar: 'avatar12.png', name: 'Justin' },
        { id: '13', avatar: 'avatar13.png', name: 'Enno' },
        { id: '14', avatar: 'avatar14.png', name: 'Nellie' },
      ],
      deadline: '09:15 am 13th May',
    },
    {
      id: '4',
      title: 'My Project',
      members: [
        { id: '15', avatar: 'avatar15.png', name: 'Tod' },
      ],
      deadline: '12:01 am 24th May',
    },
  ];

  const ProjectCard = ({ project }: { project: Project }) => (
    <TouchableOpacity
      style={styles.projectCard}
      onPress={() => navigation.navigate('ResourceDetail', { projectId: project.id })}
    >
      <View style={styles.projectHeader}>
        <Text style={styles.projectTitle}>{project.title}</Text>
        <TouchableOpacity>
          <Text style={styles.viewMore}>Xem thêm</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.membersContainer}>
        {project.members.map((member, index) => (
          <View key={member.id} style={[styles.memberAvatar, index > 0 && styles.overlappingAvatar]}>
            <Image
              source={{ uri: member.avatar }}
              style={styles.avatar}
            />
          </View>
        ))}
      </View>

      <View style={styles.deadlineContainer}>
        <Text style={styles.deadlineLabel}>Deadline:</Text>
        <Text style={styles.deadlineText}>{project.deadline}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nguồn lực dự án</Text>
      </View>

      <Text style={styles.sectionTitle}>Dự Án</Text>

      <ScrollView style={styles.scrollView}>
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>💬</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🔔</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a237e',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    color: 'white',
    fontSize: 24,
    marginRight: 16,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  sectionTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  projectCard: {
    backgroundColor: '#3949ab',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  projectTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  viewMore: {
    color: '#ffd700',
    fontSize: 14,
  },
  membersContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  memberAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e8eaf6',
  },
  overlappingAvatar: {
    marginLeft: -10,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  deadlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deadlineLabel: {
    color: '#b0bec5',
    marginRight: 8,
  },
  deadlineText: {
    color: 'white',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#283593',
  },
  navItem: {
    padding: 8,
  },
  navIcon: {
    fontSize: 24,
  },
});

export default ProjectListScreen; 