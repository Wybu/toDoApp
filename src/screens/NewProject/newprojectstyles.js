import { StyleSheet, Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#04247C",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
    marginBottom: 10,
    marginLeft: 20,
  },
  backButton: {
    borderRadius: 20,
    marginRight: 14,
  },
  backButtonImage: {
    width: 24,
    height: 24,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 4,
  },
  titleIcon: {
    width: 31,
    height: 31,
    marginRight: 12,
  },
  titleText: {
    color: "#B3B3AC",
    fontSize: 22,
  },
  divider: {
    height: 1,
    backgroundColor: "#BAA3FB",
    marginBottom: 10,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 6,
  },
  textInput: {
    color: "#484848",
    fontSize: 16,
    marginBottom: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 24,
    width: '100%',
  },
  textAreaInput: {
    color: "#484848",
    fontSize: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    height: windowHeight * 0.15,
    width: '100%',
    textAlignVertical: 'top',
    marginBottom: 8,
  },
  teamContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  memberContainer: {
    alignItems: "flex-start",
    marginRight: 26,
    position: "relative",
  },

  // New styles for email containers
  emailListContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 5,
    marginBottom: 15,
    width: '100%',
  },
  emailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  emailText: {
    color: "#484848",
    fontSize: 14,
    flex: 1,
  },
  removeEmailButton: {
    padding: 5,
  },
  removeEmailText: {
    color: "#FF4D4D",
    fontSize: 14,
  },
  emailInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 0,
  },
  emailInput: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginRight: 10,
    color: "#484848",
  },
  addEmailButton: {
    backgroundColor: "#446ADD",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addEmailText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: 'bold',
  },
  memberImageContainer: {
    marginBottom: 3,
    position: "relative",
  },
  memberImage: {
    width: 58,
    height: 58,
  },
  removeButton: {
    position: "absolute",
    top: -5,
    right: -5,
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonImage: {
    width: 26,
    height: 26,
  },
  memberName: {
    color: "#FFFFFF",
    fontSize: 12,
    marginLeft: 8,
  },
  addMemberButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  addMemberBackground: {
    width: 58,
    height: 58,
    alignItems: "center",
    justifyContent: "center",
  },
  addMemberText: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
    lineHeight: 30,
    textAlign: "center",
    marginBottom: 2,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  halfWidth: {
    width: '48%',
  },
  datePickerButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    height: 45,
    justifyContent: 'center',
  },
  datePickerText: {
    color: "#484848",
    fontSize: 14,
  },
  fileUploadButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  addIconContainer: {
    backgroundColor: "#446ADD",
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIconText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  fileItemContainer: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  fileInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  fileIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  fileName: {
    color: "#FFFFFF",
    fontSize: 14,
    flex: 1,
  },
  createButtonContainer: {
    padding: 20,
  },
  createButton: {
    backgroundColor: "#446ADD",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: 'bold',
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
// Date Picker Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    elevation: 5
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333333'
  },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 200,
    marginBottom: 20
  },
  pickerColumn: {
    flex: 1,
    marginHorizontal: 5
  },
  pickerLabel: {
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#333333'
  },
  picker: {
    height: 150,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 8
  },
  pickerItem: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10
  },
  pickerItemSelected: {
    backgroundColor: '#007AFF',
  },
  pickerItemText: {
    fontSize: 16,
    color: '#333333'
  },
  pickerItemTextSelected: {
    color: '#FFFFFF',
    fontWeight: 'bold'
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  modalButtonCancel: {
    flex: 1,
    backgroundColor: '#E0E0E0',
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center'
  },
  modalButtonConfirm: {
    flex: 1,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 8,
    alignItems: 'center'
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16
  },
});

export default styles;
