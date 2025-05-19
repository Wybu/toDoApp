import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import {
    Dimensions,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // Sử dụng SafeAreaView này cho phép tùy chỉnh tốt hơn

const TASK_CATEGORIES = [
    { label: "Ý tưởng", value: "idea" },
    { label: "Thiết kế", value: "design" },
    { label: "Lập trình", value: "development" },
    { label: "QA / QC", value: "qa_qc" },
    { label: "Hoàn thành", value: "completed" },
];

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const APP_HORIZONTAL_PADDING = 10;
const APP_HEADER_HEIGHT = 55;
const FOOTER_BUTTON_HEIGHT = 90;
const FORM_TOP_BORDER_RADIUS = 20; // Bán kính bo góc

const UpdateProgressScreen: React.FC = () => {
    const [label, setLabel] = useState("Dev FrontEnd Web");
    const [selectedTaskCategory, setSelectedTaskCategory] = useState<string | undefined>(TASK_CATEGORIES[0].value);
    const [fromDate, setFromDate] = useState("21 / 04 / 2023");
    const [toDate, setToDate] = useState("03 / 05 / 2023");
    const [remindMe, setRemindMe] = useState(false);

    const handleSelectFromDate = () => console.log("Navigate to select 'From' date");
    const handleSelectToDate = () => console.log("Navigate to select 'To' date");
    const handleCancel = () => console.log("Cancel pressed");
    const handleSubmit = () => {
        console.log("Submit pressed", { label, selectedTaskCategory, fromDate, toDate, remindMe });
    };

    const headerBackgroundColor = "#04247C";
    const mainAppBackgroundColor = "#0A1936"; // Màu nền chính của form (xanh đậm)

    return (
        // Đặt màu nền chính cho SafeAreaView để phần bo góc của formContainer hiển thị đúng màu nền này
        <SafeAreaView style={[styles.safeArea, { backgroundColor: mainAppBackgroundColor }]}>
            <StatusBar barStyle="light-content" backgroundColor={headerBackgroundColor} />

            {/* App Header */}
            <View style={[styles.appHeader, { backgroundColor: headerBackgroundColor }]}>
                <TouchableOpacity
                    style={styles.headerButton}
                    onPress={() => console.log("Back from UpdateProgress pressed")}
                >
                    <Ionicons name="chevron-back" size={28} color="#FFFFFF" style={{ marginLeft: -5 }} />
                    <Ionicons name="chevron-back" size={28} color="#FFFFFF" style={{ marginLeft: -18 }} />
                </TouchableOpacity>
                <View style={styles.headerTitleGroup}>
                    <MaterialCommunityIcons name="chart-bar" size={22} color="#FFFFFF" style={{ marginRight: 8 }} />
                    <Text style={styles.headerTitleText}>Tiến độ công việc</Text>
                </View>
                <TouchableOpacity
                    style={styles.headerButton}
                    onPress={() => console.log("Search on UpdateProgress pressed")}
                >
                    <Ionicons name="search" size={26} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            {/* Phần nội dung Form, chiếm không gian còn lại và có bo góc trên */}
            <View style={[styles.formContainer, { backgroundColor: mainAppBackgroundColor }]}>
                <ScrollView
                    style={styles.scrollView} // ScrollView không cần bo góc, formContainer sẽ bo
                    contentContainerStyle={styles.scrollContentContainer}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={styles.formTitle}>Cập nhật tiến độ</Text>

                    {/* Các trường input giữ nguyên như trước */}
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>Nhãn</Text>
                        <TextInput style={styles.textInput} value={label} onChangeText={setLabel} placeholder="Nhập tên công việc hoặc nhãn..." placeholderTextColor="#8A8A8E" />
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>Công việc</Text>
                        <View style={styles.pickerContainer}>
                            <Picker selectedValue={selectedTaskCategory} onValueChange={(itemValue) => setSelectedTaskCategory(itemValue || undefined)} style={styles.picker} dropdownIconColor="#FFFFFF">
                                {TASK_CATEGORIES.map((category) => (<Picker.Item key={category.value} label={category.label} value={category.value} style={styles.pickerItem} />))}
                            </Picker>
                        </View>
                    </View>

                    <View style={styles.dateRowContainer}>
                        <View style={styles.dateFieldContainer}><Text style={styles.fieldLabel}>Từ</Text><TouchableOpacity style={styles.dateButton} onPress={handleSelectFromDate}><Ionicons name="calendar-outline" size={20} color="#A2C1EE" style={styles.dateIcon} /><Text style={styles.dateText}>{fromDate}</Text></TouchableOpacity></View>
                        <View style={[styles.dateFieldContainer, { marginLeft: 10 }]}><Text style={styles.fieldLabel}>Đến</Text><TouchableOpacity style={styles.dateButton} onPress={handleSelectToDate}><Ionicons name="calendar-outline" size={20} color="#A2C1EE" style={styles.dateIcon} /><Text style={styles.dateText}>{toDate}</Text></TouchableOpacity></View>
                    </View>

                    <View style={styles.reminderContainer}>
                        <Text style={styles.reminderText}>Nhắc tôi khi gần đến hạn</Text>
                        <Switch trackColor={{ false: "#3e3e3e", true: "#5375DE" }} thumbColor={remindMe ? "#f4f3f4" : "#f4f3f4"} ios_backgroundColor="#3e3e3e" onValueChange={setRemindMe} value={remindMe} />
                    </View>
                </ScrollView>
            </View>

            {/* Buttons Hủy và Đồng ý - Nằm cố định ở dưới */}
            <View style={[styles.footerButtonsContainer, { backgroundColor: mainAppBackgroundColor }]}>
                <TouchableOpacity style={[styles.footerButton, styles.cancelButton]} onPress={handleCancel}><Text style={[styles.footerButtonText, styles.cancelButtonText]}>Hủy</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.footerButton, styles.submitButton]} onPress={handleSubmit}><Text style={[styles.footerButtonText, styles.submitButtonText]}>Đồng ý</Text></TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default UpdateProgressScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        // backgroundColor được set động trong component để khớp với màu nền form
    },
    appHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: APP_HORIZONTAL_PADDING,
        paddingVertical: 10,
        height: APP_HEADER_HEIGHT,
        // backgroundColor được set động
    },
    headerButton: { padding: 8 },
    headerTitleGroup: { flexDirection: "row", alignItems: "center" },
    headerTitleText: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" },

    formContainer: {
        flex: 1, // Quan trọng để chiếm không gian còn lại
        // backgroundColor được set động
        borderTopLeftRadius: FORM_TOP_BORDER_RADIUS, // BO GÓC TRÁI TRÊN
        borderTopRightRadius: FORM_TOP_BORDER_RADIUS, // BO GÓC PHẢI TRÊN
        marginTop: - (FORM_TOP_BORDER_RADIUS / 2) + 1, // Kéo lên một chút để che phần giao với header (tùy chỉnh)
        // Hoặc có thể không cần nếu header không có bo góc dưới
        // Nếu header cũng có bo góc dưới thì cần tính toán kỹ hơn hoặc dùng kỹ thuật che phủ khác
        // Để đơn giản, nếu header là phẳng, chỉ cần bo góc formContainer
        overflow: 'hidden', // Cần thiết nếu có hiệu ứng đổ bóng hoặc phần tử con tràn ra ngoài bo góc
    },
    scrollView: {
        flex: 1,
    },
    scrollContentContainer: {
        paddingTop: FORM_TOP_BORDER_RADIUS / 2 + 20, // Thêm padding top để tiêu đề form không quá sát mép bo góc
        paddingHorizontal: 20,
        paddingBottom: 20, // Padding dưới cho nội dung cuối
    },
    formTitle: { fontSize: 26, fontWeight: 'bold', color: '#FFFFFF', textAlign: 'center', marginBottom: 30, marginTop: 10 },
    fieldContainer: { marginBottom: 25 },
    fieldLabel: { fontSize: 16, color: '#A2C1EE', marginBottom: 8 },
    textInput: { backgroundColor: '#1C2A4F', borderRadius: 12, paddingHorizontal: 15, paddingVertical: Platform.OS === 'ios' ? 15 : 12, fontSize: 16, color: '#FFFFFF', borderWidth: 1, borderColor: 'rgba(186, 163, 251, 0.3)' },
    pickerContainer: { backgroundColor: '#1C2A4F', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(186, 163, 251, 0.3)', overflow: Platform.OS === 'android' ? 'hidden' : undefined, justifyContent: 'center' },
    picker: { height: Platform.OS === 'ios' ? undefined : 50, color: '#FFFFFF' },
    pickerItem: { color: Platform.OS === 'ios' ? '#FFFFFF' : undefined },
    dateRowContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
    dateFieldContainer: { flex: 1 },
    dateButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1C2A4F', borderRadius: 12, paddingHorizontal: 15, paddingVertical: Platform.OS === 'ios' ? 15 : 12, borderWidth: 1, borderColor: 'rgba(186, 163, 251, 0.3)' },
    dateIcon: { marginRight: 10 },
    dateText: { fontSize: 16, color: '#FFFFFF' },
    reminderContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30, paddingVertical: 10 },
    reminderText: { fontSize: 16, color: '#A2C1EE' },
    footerButtonsContainer: { flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 12, height: FOOTER_BUTTON_HEIGHT, alignItems: 'center', borderTopWidth: 1, borderTopColor: 'rgba(40, 58, 105, 0.5)' /* Màu đường kẻ tinh tế hơn */ },
    footerButton: { flex: 1, paddingVertical: 12, borderRadius: 25, alignItems: 'center', justifyContent: 'center', marginHorizontal: 8 },
    cancelButton: { backgroundColor: '#1C2A4F', borderWidth: 1, borderColor: '#5375DE' },
    submitButton: { backgroundColor: '#5375DE' },
    footerButtonText: { fontSize: 16, fontWeight: 'bold' },
    cancelButtonText: { color: '#A2C1EE' },
    submitButtonText: { color: '#FFFFFF' },
});