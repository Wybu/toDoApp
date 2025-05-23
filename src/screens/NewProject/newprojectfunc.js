import { useState } from 'react';
import { Alert, Platform } from 'react-native';
import DocumentPicker from '@react-native-documents/picker';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


/**
 * Custom hook for NewProject screen functionality
 */
export const useNewProjectFunctions = (props) => {
  // State management
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [attachedFiles, setAttachedFiles] = useState([
    { name: 'project_document.pdf', icon: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ahfvssVHBU/nizabede_expires_30_days.png' }
  ]);

  // Separate team leaders and members
  const [teamLeaders, setTeamLeaders] = useState([

  ]);
  const [teamMembers, setTeamMembers] = useState([

  ]);

  // Date picker modal states
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [dateType, setDateType] = useState(null); // 'start' or 'end'
  const [selectedDate, setSelectedDate] = useState(new Date());

  // New team member/leader email input state
  const [newLeaderEmail, setNewLeaderEmail] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');

  /**
   * Xử lý khi nhấn vào nút quay lại
   */
  const handleBackPress = () => {
    if (props.navigation) {
      props.navigation.goBack();
    }
  };

  /**
   * Xử lý khi xóa thành viên nhóm
   * @param {string} memberEmail Email thành viên
   */
  const handleRemoveMember = (memberEmail) => {
    setTeamMembers(prevMembers =>
      prevMembers.filter(member => member.email !== memberEmail)
    );
    Alert.alert('Thông báo', `Đã xóa ${memberEmail} khỏi nhóm`);
  };


  const handleRemoveLeader = (leaderEmail) => {
    setTeamLeaders(prevLeaders =>
      prevLeaders.filter(leader => leader.email !== leaderEmail)
    );
    Alert.alert('Thông báo', `Đã xóa ${leaderEmail} khỏi nhóm trưởng`);
  };

  /**
   * Xử lý khi thêm thành viên mới
   */
  const handleAddMember = () => {
    if (!newMemberEmail.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập email thành viên');
      return;
    }

    // Convert email to lowercase
    const emailLowerCase = newMemberEmail.trim().toLowerCase();

    // Validate email format
    if (!isValidEmail(emailLowerCase)) {
      Alert.alert('Lỗi', 'Email không hợp lệ');
      return;
    }

    // Check if email already exists in members
    if (teamMembers.some(member => member.email === emailLowerCase)) {
      Alert.alert('Lỗi', 'Email này đã tồn tại trong danh sách thành viên');
      return;
    }

    // Check if email already exists in leaders
    if (teamLeaders.some(leader => leader.email === emailLowerCase)) {
      Alert.alert('Lỗi', 'Email này đã tồn tại trong danh sách nhóm trưởng');
      return;
    }

    setTeamMembers([...teamMembers, { email: emailLowerCase }]);
    setNewMemberEmail(''); // Clear input after adding
    Alert.alert('Thông báo', `Đã thêm ${emailLowerCase} vào nhóm`);
  };

  /**
   * Xử lý khi thêm nhóm trưởng mới
   */
  const handleAddLeader = () => {
    if (!newLeaderEmail.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập email nhóm trưởng');
      return;
    }

    // Convert email to lowercase
    const emailLowerCase = newLeaderEmail.trim().toLowerCase();

    // Validate email format
    if (!isValidEmail(emailLowerCase)) {
      Alert.alert('Lỗi', 'Email không hợp lệ');
      return;
    }

    // Check if email already exists in leaders
    if (teamLeaders.some(leader => leader.email === emailLowerCase)) {
      Alert.alert('Lỗi', 'Email này đã tồn tại trong danh sách nhóm trưởng');
      return;
    }

    // Check if email already exists in members
    if (teamMembers.some(member => member.email === emailLowerCase)) {
      Alert.alert('Lỗi', 'Email này đã tồn tại trong danh sách thành viên');
      return;
    }

    setTeamLeaders([...teamLeaders, { email: emailLowerCase }]);
    setNewLeaderEmail(''); // Clear input after adding
    Alert.alert('Thông báo', `Đã thêm ${emailLowerCase} vào nhóm trưởng`);
  };

  /**
   * Validate email format
   */
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Xử lý khi chọn ngày bắt đầu
   */
  const handleSelectStartDate = () => {
    setDateType('start');
    // Initialize with current start date if exists, otherwise today
    if (startDate) {
      const [day, month, year] = startDate.split('/').map(num => parseInt(num, 10));
      setSelectedDate(new Date(year, month - 1, day));
    } else {
      setSelectedDate(new Date());
    }
    setDatePickerVisible(true);
  };

  /**
   * Xử lý khi chọn ngày kết thúc
   */
  const handleSelectEndDate = () => {
    setDateType('end');
    // Initialize with current end date if exists, otherwise today
    if (endDate) {
      const [day, month, year] = endDate.split('/').map(num => parseInt(num, 10));
      setSelectedDate(new Date(year, month - 1, day));
    } else {
      setSelectedDate(new Date());
    }
    setDatePickerVisible(true);
  };

  /**
   * Validate that end date is after start date
   * @param {string} start - Start date in DD/MM/YYYY format
   * @param {string} end - End date in DD/MM/YYYY format
   * @returns {boolean} - True if dates are valid (end date is after start date)
   */
  const isValidDateRange = (start, end) => {
    if (!start || !end) return true; // If either date is not set yet, consider valid

    // Parse the dates from DD/MM/YYYY format to Date objects
    const [startDay, startMonth, startYear] = start.split('/').map(num => parseInt(num, 10));
    const [endDay, endMonth, endYear] = end.split('/').map(num => parseInt(num, 10));

    const startDate = new Date(startYear, startMonth - 1, startDay);
    const endDate = new Date(endYear, endMonth - 1, endDay);

    // Check if end date is greater than or equal to start date
    return endDate >= startDate;
  };

  /**
   * Xử lý khi người dùng xác nhận chọn ngày
   */
  const handleConfirmDate = (date) => {
    const formattedDate = formatDate(date);

    if (dateType === 'start') {
      // When setting start date, validate with existing end date
      if (endDate && !isValidDateRange(formattedDate, endDate)) {
        Alert.alert('Lỗi', 'Ngày bắt đầu không thể sau ngày kết thúc');
        return;
      }
      setStartDate(formattedDate);
    } else if (dateType === 'end') {
      // When setting end date, validate with existing start date
      if (startDate && !isValidDateRange(startDate, formattedDate)) {
        Alert.alert('Lỗi', 'Ngày kết thúc phải sau ngày bắt đầu');
        return;
      }
      setEndDate(formattedDate);
    }

    setDatePickerVisible(false);
  };

  /**
   * Hủy chọn ngày
   */
  const handleCancelDate = () => {
    setDatePickerVisible(false);
  };

  /**
   * Format date to DD/MM/YYYY
   */
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  /**
   * Xử lý khi tải lên tệp
   */
   const handleFileUpload = async () => {
      try {
        const results = await DocumentPicker.pick({
          allowMultiSelection: true,
        });

        if (results && results.length > 0) {
          const newFiles = [];
          const errorMessages = [];

          for (const result of results) {
            // Kiểm tra kích thước tệp (giới hạn 10MB)
            if (result.size > 10 * 1024 * 1024) {
              errorMessages.push(`Tệp "${result.name}" quá lớn. Giới hạn là 10MB.`);
              continue;
            }

            // Kiểm tra tệp đã tồn tại
            if (attachedFiles.some(file => file.name === result.name)) {
              errorMessages.push(`Tệp "${result.name}" đã tồn tại trong danh sách.`);
              continue;
            }

            // Xác định icon dựa vào loại tệp
            let icon = 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ahfvssVHBU/nizabede_expires_30_days.png';

            // Có thể thêm các icon khác cho các loại tệp khác nhau nếu cần

            newFiles.push({
              name: result.name,
              icon: icon,
              uri: result.uri,
              type: result.type,
              size: result.size
            });
          }

          // Thêm tất cả tệp hợp lệ vào một lần
          if (newFiles.length > 0) {
            setAttachedFiles(prevFiles => [...prevFiles, ...newFiles]);
            Alert.alert('Thành công', `Đã tải lên ${newFiles.length} tệp`);
          }

          // Hiển thị lỗi nếu có
          if (errorMessages.length > 0) {
            Alert.alert('Cảnh báo', errorMessages.join('\n'));
          }
        }
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          // Người dùng đã hủy chọn tệp, không cần hiển thị lỗi
          console.log('Người dùng đã hủy chọn tệp');
        } else {
          console.error('Lỗi khi chọn tệp:', err);
          Alert.alert('Lỗi', 'Có lỗi xảy ra khi chọn tệp. Vui lòng thử lại.');
        }
      }
    };

  const handleRemoveFile = (fileName) => {
    // Xác nhận trước khi xóa
    Alert.alert(
      'Xác nhận',
      `Bạn có chắc chắn muốn xóa tệp "${fileName}" không?`,
      [
        {
          text: 'Hủy',
          style: 'cancel'
        },
        {
          text: 'Xóa',
          onPress: () => {
            setAttachedFiles(prevFiles => prevFiles.filter(file => file.name !== fileName));
            Alert.alert('Thành công', `Đã xóa tệp "${fileName}"`);
          },
          style: 'destructive'
        }
      ]
    );
  };

  /**
   * Xử lý khi tạo dự án mới
   */
    const handleCreateProject = async () => {
      // Validate required fields
      if (!projectName.trim()) {
        Alert.alert('Lỗi', 'Vui lòng nhập tên dự án');
        return false;
      }
      if (teamLeaders.length === 0) {
        Alert.alert('Lỗi', 'Vui lòng thêm ít nhất một nhóm trưởng');
        return false;
      }
      if (teamMembers.length === 0) {
        Alert.alert('Lỗi', 'Vui lòng thêm ít nhất một thành viên');
        return false;
      }
      if (!startDate) {
        Alert.alert('Lỗi', 'Vui lòng chọn ngày bắt đầu');
        return false;
      }
      if (!endDate) {
        Alert.alert('Lỗi', 'Vui lòng chọn ngày kết thúc');
        return false;
      }

      try {
        // Show loading alert
        Alert.alert('Thông báo', `Đang kiểm tra và tạo dự án "${projectName}"`);

        // Check if all leader emails exist in users collection
        const leaderEmails = teamLeaders.map(leader => leader.email);
        const leaderUIDs = await validateAndGetUserIDs(leaderEmails);

        if (!leaderUIDs) {
          // Error already shown in validateAndGetUserIDs function
          return false;
        }

        // Check if all member emails exist in users collection
        const memberEmails = teamMembers.map(member => member.email);
        const memberUIDs = await validateAndGetUserIDs(memberEmails);

        if (!memberUIDs) {
          // Error already shown in validateAndGetUserIDs function
          return false;
        }

        // Current user as creator
        const currentUser = auth().currentUser;
        if (!currentUser) {
          Alert.alert('Lỗi', 'Bạn cần đăng nhập để tạo dự án');
          return false;
        }

        // Format dates for Firestore (convert from DD/MM/YYYY to timestamp)
        const startTimestamp = convertDateStringToTimestamp(startDate);
        const endTimestamp = convertDateStringToTimestamp(endDate);

        // Create project document
        const projectData = {
          name: projectName.trim(),
          description: description.trim(),
          startDate: startTimestamp,
          endDate: endTimestamp,
          leaders: leaderUIDs,
          members: memberUIDs,
          createdBy: currentUser.uid,
          createdAt: firestore.FieldValue.serverTimestamp(),
          updatedAt: firestore.FieldValue.serverTimestamp(),
          status: 'active',
        };

        // Add project to Firestore
        const projectRef = await firestore().collection('projects').add(projectData);

        // Handle file uploads if there are any attached files
        if (attachedFiles.length > 0) {
          // Note: You would typically upload files to Firebase Storage here
          // and add their references to the project document
          // This is just a placeholder for future implementation
        }

        Alert.alert(
          'Thành công',
          `Đã tạo dự án "${projectName}" thành công!`,
          [
            {
              text: 'OK',
              onPress: () => handleNavigation('HomeScreen')
            }
          ]
        );

        return true;
      } catch (error) {
        console.error('Error creating project:', error);
        Alert.alert('Lỗi', 'Có lỗi xảy ra khi tạo dự án. Vui lòng thử lại sau.');
        return false;
      }
    };

    /**
     * Validate emails and get corresponding user IDs from Firebase
     * @param {Array<string>} emails - Array of email addresses to validate
     * @returns {Promise<Array<string>|null>} - Array of user IDs if successful, null if any email is invalid
     */
    const validateAndGetUserIDs = async (emails) => {
      try {
        // Query Firestore for all users with the given emails
        const usersSnapshot = await firestore()
          .collection('users')
          .where('email', 'in', emails)
          .get();

        // Get the valid user data
        const validUsers = usersSnapshot.docs.map(doc => ({
          uid: doc.id,
          email: doc.data().email
        }));

        // Check if all emails were found
        if (validUsers.length !== emails.length) {
          // Find which emails are not valid
          const validEmails = validUsers.map(user => user.email);
          const invalidEmails = emails.filter(email => !validEmails.includes(email));

          Alert.alert(
            'Lỗi',
            `Các email sau không tồn tại trong hệ thống: ${invalidEmails.join(', ')}`
          );
          return null;
        }

        // Return array of user IDs
        return validUsers.map(user => user.uid);
      } catch (error) {
        console.error('Error validating emails:', error);
        Alert.alert('Lỗi', 'Không thể xác thực email. Vui lòng thử lại sau.');
        return null;
      }
    };

    /**
     * Convert date string from DD/MM/YYYY format to Firestore timestamp
     * @param {string} dateString - Date in DD/MM/YYYY format
     * @returns {firebase.firestore.Timestamp} - Firestore timestamp
     */
    const convertDateStringToTimestamp = (dateString) => {
      const [day, month, year] = dateString.split('/').map(num => parseInt(num, 10));
      const date = new Date(year, month - 1, day);
      return firestore.Timestamp.fromDate(date);
    };

    const handleNavigation = (screen) => {
      if (props.navigation) {
        props.navigation.navigate(screen);
      } else {
        Alert.alert('Thông báo', `Điều hướng đến màn hình ${screen}`);
      }
    };


    const handleAddNew = () => {
      Alert.alert('Thông báo', 'Tạo dự án/công việc mới');
    };

    return {
      projectName,
      setProjectName,
      description,
      setDescription,
      startDate,
      setStartDate,
      endDate,
      setEndDate,
      attachedFiles,
      setAttachedFiles,
      teamLeaders,
      setTeamLeaders,
      teamMembers,
      setTeamMembers,
      newLeaderEmail,
      setNewLeaderEmail,
      newMemberEmail,
      setNewMemberEmail,
      handleBackPress,
      handleRemoveMember,
      handleRemoveLeader,
      handleAddMember,
      handleAddLeader,
      handleSelectStartDate,
      handleSelectEndDate,
      handleFileUpload,
      handleRemoveFile,
      handleCreateProject,
      handleNavigation,
      handleAddNew,
      // Date picker modal props
      datePickerVisible,
      selectedDate,
      setSelectedDate,
      handleConfirmDate,
      handleCancelDate
    };
  };

