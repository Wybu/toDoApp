// filepath: E:\demo\src\screens\HomeScreen\homescreenstyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#04247C",
  },
  headerContainer: {
    backgroundColor: "#04247C",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 28,
    marginBottom: 20,
    marginHorizontal: 22,
  },
  headerTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  welcomeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "bold",
  },
  userName: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
  },
  avatarImage: {
    width: 47,
    height: 48,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#446ADD",
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginBottom: 19,
    marginHorizontal: 22,
    borderRadius: 5,
  },
  searchIcon: {
    width: 24,
    height: 24,
    marginRight: 14,
  },
  searchInput: {
    color: "#FFFFFF",
    fontSize: 16,
    flex: 1,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    marginLeft: 22,
  },
  scrollViewContainer: {
    flex: 1,
    backgroundColor: "#04247C",
    paddingBottom: 10,
  },
  projectCard: {
    alignItems: "flex-start",
    backgroundColor: "#446ADD",
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    marginHorizontal: 22,
    borderRadius: 5,
  },
  projectTitle: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "bold",
    marginBottom: 8,
  },
  projectInfo: {
    color: "#FFFFFF",
    fontSize: 14,
    marginBottom: 4,
  },
  projectDateInfo: {
    color: "#FFFFFF",
    fontSize: 12,
    marginBottom: 2,
    opacity: 0.9,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
  },
  loadingText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
  },
  emptyText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
  },
  navigationBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#446ADD",
    paddingVertical: 17,
    paddingHorizontal: 20,
  },
  navButton: {
    alignItems: "center",
    flex: 1,
  },
  navIcon: {
    width: 24,
    height: 24,
    marginBottom: 3,
  },
  navText: {
    color: "#FFFFFF",
    fontSize: 10,
  },
  addButton: {
    backgroundColor: "#04247C",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    width: 45,
    height: 45,
    alignSelf: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginHorizontal: 5,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "bold",
  },
});

export default styles;