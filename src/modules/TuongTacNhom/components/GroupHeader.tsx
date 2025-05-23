import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

interface GroupHeaderProps {
  name: string;
  memberCount: number;
  onBack: () => void;
}

export const GroupHeader: React.FC<GroupHeaderProps> = ({
  name,
  memberCount,
  onBack,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={1}>{name}</Text>
        <Text style={styles.subtitle}>{memberCount} thành viên</Text>
      </View>
      <TouchableOpacity style={styles.moreButton}>
        <Text style={styles.moreText}>⋮</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#283593',
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  backText: {
    fontSize: 24,
    color: '#ffffff',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 12,
    color: '#9fa8da',
  },
  moreButton: {
    padding: 8,
  },
  moreText: {
    fontSize: 24,
    color: '#ffffff',
  },
}); 