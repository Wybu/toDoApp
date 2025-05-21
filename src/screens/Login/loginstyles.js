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
  scrollViewContent: {
    paddingBottom: 20,
    justifyContent: 'space-between',
    minHeight: windowHeight * 0.9,
  },
  headerSpace: {
    height: 40,
    marginBottom: 50,
    marginHorizontal: 8,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
  },
  subtitleContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  subtitle: {
    color: "#FFFFFF",
    fontSize: 20,
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
    marginBottom: 4,
    marginHorizontal: 30,
  },
  passwordInputContainer: {
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
    paddingRight: 8,
  },
  passwordToggle: {
    padding: 10,
    marginRight: 6,
  },
  passwordToggleIcon: {
    width: 22,
    height: 23,
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginBottom: 22,
  },
  forgotPasswordText: {
    color: "#80BAFF",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 50,
  },
  loginButton: {
    alignItems: "center",
    backgroundColor: "#031956",
    borderRadius: 12,
    paddingVertical: 15,
    marginBottom: 22,
    marginHorizontal: 30,
  },
  loginButtonText: {
    color: "#EEF3FA",
    fontSize: 19,
  },
  createAccountContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 2,
    marginBottom: 30,
    marginLeft: 70,
  },
  createAccountPrompt: {
    color: "#FFFFFF",
    fontSize: 16,
    marginRight: 16,
  },
  createAccountLink: {
    color: "#7FBAFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginHorizontal: 30,
  },
  divider: {
    height: 1,
    flex: 1,
    backgroundColor: "#B6B6B6",
  },
  dividerText: {
    color: "#FFFFFF",
    fontSize: 16,
    marginHorizontal: 15,
  },
  socialLoginContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    marginHorizontal: 30,
  },
  socialLoginButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 2,
    marginRight: 40,
  },
  socialLoginButtonLast: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 2,
  },
  googleIcon: {
    width: 50,
    height: 50,
    marginRight: 12,
  },
  facebookIcon: {
    width: 49,
    height: 50,
    marginRight: 13,
  },
  socialLoginText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default styles;
