// filepath: e:\todoapp\src\screens\UserInfor\userinforfunc.js
import { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const useUserinforFunctions = (props) => {
    // Get email and password from navigation params
    const { email, password } = props.route.params || {};
    const [textInput1, onChangeTextInput1] = useState('');
    const [textInput2, onChangeTextInput2] = useState('');
    const [textInput3, onChangeTextInput3] = useState('');
    const [dateInput, setDateInput] = useState('');
    const [gender, setGender] = useState(''); // Added gender state
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    // Validate and correct date values
    const validateDateValues = (day, month, year) => {
        // Validate and correct day
        let validDay = parseInt(day, 10);
        if (isNaN(validDay) || validDay <= 0 || validDay > 31) {
            validDay = 1;
        }

        // Validate and correct month
        let validMonth = parseInt(month, 10);
        if (isNaN(validMonth) || validMonth <= 0 || validMonth > 12) {
            validMonth = 1;
        }

        // Validate and correct year
        let validYear = parseInt(year, 10);
        if (isNaN(validYear) || year.startsWith('0') || validYear > 2025) {
            validYear = 1900;
        }

        return {
            day: String(validDay).padStart(2, '0'),
            month: String(validMonth).padStart(2, '0'),
            year: String(validYear)
        };
    };

    // Validate all form fields
    const validateFormFields = () => {
        let newErrors = {};
        let isValid = true;

        // Validate full name
        if (!textInput1 || textInput1.trim() === '') {
            newErrors.name = 'Vui lòng nhập họ và tên';
            isValid = false;
        }

        // Validate date of birth
        if (!dateInput || dateInput.length !== 10) {
            newErrors.date = 'Vui lòng nhập đúng định dạng ngày sinh DD/MM/YYYY';
            isValid = false;
        }

        // Validate gender
        if (!gender) {
            newErrors.gender = 'Vui lòng chọn giới tính';
            isValid = false;
        }

        // Validate phone number (basic validation)
        if (!textInput2 || textInput2.trim() === '') {
            newErrors.phone = 'Vui lòng nhập số điện thoại';
            isValid = false;
        } else if (!/^\d{10,11}$/.test(textInput2.trim())) {
            newErrors.phone = 'Số điện thoại phải có từ 10-11 chữ số';
            isValid = false;
        }

        // Validate address
        if (!textInput3 || textInput3.trim() === '') {
            newErrors.address = 'Vui lòng nhập địa chỉ';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    // Handle manual date input with automatic formatting
    const handleDateInput = (text) => {
        // Remove any non-numeric characters
        const cleaned = text.replace(/[^0-9]/g, '');

        // Format with slashes
        let formatted = '';
        if (cleaned.length <= 2) {
            formatted = cleaned;
        } else if (cleaned.length <= 4) {
            formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
        } else {
            formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
        }

        setDateInput(formatted);

        // Validate date if complete format is entered
        if (formatted.length === 10) {
            let [day, month, year] = formatted.split('/');
            const validatedDate = validateDateValues(day, month, year);

            const formattedDate = `${validatedDate.day}/${validatedDate.month}/${validatedDate.year}`;
            if (formattedDate !== formatted) {
                setDateInput(formattedDate);
            }
        }
    };

    const handleStartButton = async () => {
        if (!email || !password) {
            alert('Không thể tạo tài khoản: Thiếu thông tin email hoặc mật khẩu.');
            return;
        }

        if (validateFormFields()) {
            // All fields are valid, proceed with account creation
            setIsLoading(true);

            try {
                // 1. Create authentication account with Firebase
                const userCredential = await auth().createUserWithEmailAndPassword(email, password);
                const uid = userCredential.user.uid;

                // 2. Format date of birth
                const [day, month, year] = dateInput.split('/');
                const dateOfBirth = `${year}-${month}-${day}`;

                // 3. Create user document in Firestore
                await firestore().collection('users').doc(uid).set({
                    uid: uid,
                    email: email.toLowerCase(),
                    fullName: textInput1.trim(),
                    dateOfBirth: dateOfBirth,
                    gender: gender,
                    phoneNumber: textInput2.trim(),
                    address: textInput3.trim(),
                    createdAt: firestore.FieldValue.serverTimestamp()
                });

                // 4. Show success message and navigate to login screen
                await auth().signOut();
                alert('Tài khoản đã được tạo thành công!');
                // Navigate back to Login screen instead of using reset
                // This fixes the "action was not handled by any navigator" error

            } catch (error) {
                // Handle errors
                let errorMessage = 'Đã xảy ra lỗi khi tạo tài khoản: ';

                switch(error.code) {
                    case 'auth/email-already-in-use':
                        errorMessage += 'Email này đã được sử dụng.';
                        break;
                    case 'auth/invalid-email':
                        errorMessage += 'Email không hợp lệ.';
                        break;
                    case 'auth/weak-password':
                        errorMessage += 'Mật khẩu không đủ mạnh.';
                        break;
                    default:
                        errorMessage += error.message;
                }

                alert(errorMessage);
                console.error('Error creating user:', error);
            } finally {
                setIsLoading(false);
            }
        } else {
            // Show error message for invalid fields
            let errorMessage = 'Vui lòng điền đầy đủ thông tin:\n';
            Object.values(errors).forEach(error => {
                errorMessage += `- ${error}\n`;
            });
            alert(errorMessage);
        }
    };

    const handleBackButton = () => {
        if (props.navigation) {
            props.navigation.goBack();
        } else {
            console.log('Navigation prop is not available');
        }
    };

    return {
        textInput1,
        onChangeTextInput1,
        textInput2,
        onChangeTextInput2,
        textInput3,
        onChangeTextInput3,
        dateInput,
        handleDateInput,
        handleStartButton,
        handleBackButton,
        gender,
        setGender,
        errors,
        isLoading
    };
};
