// filepath: e:\demo\src\screens\SignUp\signupstyles.js
import { StyleSheet, Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  backgroundImage: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    borderRadius: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 11,
    paddingHorizontal: 24,
    marginBottom: 41,
    marginHorizontal: 8,
  },
  backButton: {
    borderRadius: 20,
    width: 24,
    height: 24,
    marginBottom: 62,
    marginLeft: 32,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 33,
  },
  titleText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
  },
  subtitleText: {
    color: "#FFFFFF",
    fontSize: 20,
    marginBottom: 33,
    marginLeft: 121,
  },
  inputContainer: {
    marginBottom: 26,
    marginHorizontal: 30,
  },
  inputLabel: {
    color: "#FFFFFF",
    fontSize: 18,
    marginBottom: 6,
  },
  textInput: {
    color: "#999494",
    fontSize: 16,
    backgroundColor: "#EEF5FF",
    borderRadius: 12,
    paddingVertical: 14,
    paddingLeft: 16,
    paddingRight: 32,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEF5FF",
    borderRadius: 12,
  },
  passwordInput: {
    color: "#999494",
    fontSize: 16,
    flex: 1,
    paddingVertical: 14,
    paddingLeft: 16,
  },
  eyeIcon: {
    width: 22,
    height: 23,
    paddingRight: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  sendCodeButton: {
    backgroundColor: "#031956",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 22,
    marginHorizontal: 30,
  },
  sendCodeText: {
    color: "#EEF3FA",
    fontSize: 19,
  },
  loginPromptContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 2,
    marginBottom: 26,
    marginLeft: 106,
  },
  loginPromptText: {
    color: "#FFFFFF",
    fontSize: 16,
    marginRight: 32,
  },
  loginLinkText: {
    color: "#7FBAFF",
    fontSize: 16,
    fontWeight: "bold",
  }
});

export default styles;
