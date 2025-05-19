import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; // Sử dụng Ionicons cho ArrowDown2
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import {
    Button,
    Dimensions,
    Modal,
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
import DatePicker from 'react-native-date-picker';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- ĐỊNH NGHĨA CÁC HẰNG SỐ VÀ COMPONENT CON ĐƯỢC YÊU CẦU ---
const SCREEN_WIDTH = Dimensions.get('window').width; // Lấy chiều rộng màn hình

const colors = {
    text: '#FFFFFF',
    primary: '#5375DE',     // Màu xanh dương chính
    secondaryText: '#A2C1EE', // Màu chữ phụ (cho label)
    inputBackground: '#1C2A4F',
    borderColor: 'rgba(186, 163, 251, 0.3)',
    white: '#FFFFFF',
    blue: '#5375DE', // Dùng cho title trong modal DateTimePicker
    modalOverlay: 'rgba(0,0,0,0.5)',
    buttonDisabled: '#888888',
    cancelButtonBackground: '#1C2A4F',
    cancelButtonBorder: '#5375DE',
};

const globalStyles = StyleSheet.create({
    inputContainer: {
        backgroundColor: colors.inputBackground,
        borderRadius: 12,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: colors.borderColor,
        // paddingVertical đã được set trong DateTimePickerComponent nên không cần ở đây nữa
    },
});

interface TitleComponentProps {
    text: string;
    color?: string;
    style?: object;
}
const TitleComponent: React.FC<TitleComponentProps> = ({ text, color, style }) => (
    <Text style={[{ fontSize: 16, color: color || colors.secondaryText, marginBottom: 8, fontWeight: '500' }, style]}>
        {text}
    </Text>
);
TitleComponent.displayName = 'TitleComponent';


interface RowComponentProps {
    children: React.ReactNode;
    onPress?: () => void;
    styles?: any[];
    style?: object;
}
const RowComponent: React.FC<RowComponentProps> = ({ children, onPress, styles: customStylesArray = [], style: customSingleStyle }) => {
    const combinedStyles = [...customStylesArray];
    if (customSingleStyle) {
        combinedStyles.push(customSingleStyle);
    }

    const content = <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>{children}</View>;

    if (onPress) {
        return (
            <TouchableOpacity onPress={onPress} style={combinedStyles}>
                {content}
            </TouchableOpacity>
        );
    }
    return (
        <View style={[{ flexDirection: 'row', alignItems: 'center', width: '100%' }, ...combinedStyles]}>
            {content}
        </View>
    );
};
RowComponent.displayName = 'RowComponent';


interface TextComponentProps {
    text: string | undefined | null;
    color?: string;
    flex?: number;
    style?: object;
}
const TextComponent: React.FC<TextComponentProps> = ({ text, color, flex, style }) => (
    <Text style={[{ color: color || colors.text, flex: flex || undefined, fontSize: 16 }, style]}>
        {text || ''}
    </Text>
);
TextComponent.displayName = 'TextComponent';


interface SpaceComponentProps {
    height?: number;
    width?: number;
}
const SpaceComponent: React.FC<SpaceComponentProps> = ({ height, width }) => (
    <View style={{ height: height, width: width }} />
);
SpaceComponent.displayName = 'SpaceComponent';


// Icon ArrowDown2 (thay thế bằng Ionicons)
const ArrowDown2: React.FC<{ size: number, color: string, variant?: string }> = ({ size, color }) => {
    return <Ionicons name="chevron-down" size={size} color={color} />;
}
ArrowDown2.displayName = 'ArrowDown2';

// --- KẾT THÚC ĐỊNH NGHĨA COMPONENT CON VÀ HẰNG SỐ ---


// --- DateTimePickerComponent (Như bạn đã cung cấp, có chỉnh sửa nhỏ) ---
interface DateTimePickerProps {
    type?: 'date' | 'time' | 'datetime';
    title?: string;
    placeholder?: string;
    selected?: Date;
    onSelect: (val: Date) => void;
}

const DateTimePickerComponent: React.FC<DateTimePickerProps> = (props) => {
    const { selected, onSelect, placeholder, title, type } = props;
    const [isVisibleModalDateTime, setIsVisibleModalDateTime] = useState(false);
    const [date, setDate] = useState(selected ? new Date(selected) : new Date());

    useEffect(() => {
        if (selected) {
            setDate(new Date(selected));
        } else {
            setDate(new Date());
        }
    }, [selected]);

    return (
        <>
            <View style={{ marginBottom: 16 }}>
                {title && <TitleComponent text={title} />}
                <RowComponent
                    onPress={() => {
                        setDate(selected ? new Date(selected) : new Date());
                        setIsVisibleModalDateTime(true);
                    }}
                    styles={[
                        globalStyles.inputContainer,
                        { marginTop: title ? 8 : 0, paddingVertical: 16 },
                    ]}
                >
                    <TextComponent
                        flex={1}
                        text={
                            selected
                                ? type === 'time'
                                    ? `${selected.getHours().toString().padStart(2, '0')}:${selected.getMinutes().toString().padStart(2, '0')}`
                                    : `${selected.getDate().toString().padStart(2, '0')}/${(selected.getMonth() + 1).toString().padStart(2, '0')}/${selected.getFullYear()}`
                                : placeholder
                                    ? placeholder
                                    : (type === 'time' ? 'Chọn giờ' : 'Chọn ngày')
                        }
                        color={selected ? colors.text : colors.secondaryText}
                    />
                    <ArrowDown2 size={20} color={colors.text} />
                </RowComponent>
            </View>

            <Modal visible={isVisibleModalDateTime} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TitleComponent text={type === 'date' ? "Chọn Ngày" : type === 'time' ? "Chọn Giờ" : "Chọn Ngày & Giờ"} color={colors.text} style={styles.modalTitle} />
                        <View style={styles.datePickerWrapper}>
                            <DatePicker
                                mode={type ? type : 'datetime'}
                                date={date}
                                onDateChange={val => setDate(val)}
                                locale="vi"
                                minimumDate={type !== 'time' ? new Date() : undefined} // Không cho chọn ngày quá khứ
                                style={{ backgroundColor: colors.white }} // Đảm bảo DatePicker có nền trắng trên iOS
                            />
                        </View>
                        <SpaceComponent height={20} />
                        <View style={styles.modalButtonContainer}>
                            <View style={{ flex: 1, marginRight: 5 }}>
                                <Button
                                    title="Đóng"
                                    color={Platform.OS === 'ios' ? colors.blue : colors.buttonDisabled} // iOS dùng màu chữ, Android dùng màu nền nút
                                    onPress={() => setIsVisibleModalDateTime(false)}
                                />
                            </View>
                            <View style={{ flex: 1, marginLeft: 5 }}>
                                <Button
                                    title="Xác nhận"
                                    color={colors.primary}
                                    onPress={() => {
                                        onSelect(date);
                                        setIsVisibleModalDateTime(false);
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};
DateTimePickerComponent.displayName = 'DateTimePickerComponent';
// --- Kết thúc DateTimePickerComponent ---


// --- Component chính: UpdateProgressScreen ---
const TASK_CATEGORIES = [
    { label: "Ý tưởng", value: "idea" }, { label: "Thiết kế", value: "design" },
    { label: "Lập trình", value: "development" }, { label: "QA / QC", value: "qa_qc" },
    { label: "Hoàn thành", value: "completed" },
];

const APP_HEADER_HEIGHT = 55; // Khai báo nếu chưa có ở global
const FOOTER_BUTTON_HEIGHT = 70; // Khai báo nếu chưa có ở global
const FORM_TOP_BORDER_RADIUS = 20;

const UpdateProgressScreen: React.FC = () => {
    const today = new Date();
    const [label, setLabel] = useState("Dev FrontEnd Web");
    const [selectedTaskCategory, setSelectedTaskCategory] = useState<string | undefined>(TASK_CATEGORIES[0].value);
    const [fromDate, setFromDate] = useState<Date>(today);
    const [toDate, setToDate] = useState<Date>(() => { const nextWeek = new Date(today); nextWeek.setDate(today.getDate() + 7); return nextWeek; });
    const [remindMe, setRemindMe] = useState(false);

    const handleCancel = () => console.log("Cancel pressed");
    const handleSubmit = () => console.log("Submit pressed", { label, selectedTaskCategory, fromDate, toDate, remindMe });

    const headerBackgroundColor = "#04247C";
    const mainAppBackgroundColor = "#0A1936";

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: mainAppBackgroundColor }]}>
            <StatusBar barStyle="light-content" backgroundColor={headerBackgroundColor} />
            <View style={[styles.appHeader, { backgroundColor: headerBackgroundColor }]}>
                <TouchableOpacity style={styles.headerButton} onPress={() => console.log("Back")}><Ionicons name="chevron-back" size={28} color={colors.white} /></TouchableOpacity>
                <Text style={styles.headerTitleText}>Tiến độ công việc</Text>
                <TouchableOpacity style={styles.headerButton} onPress={() => console.log("Open Calendar")}><MaterialCommunityIcons name="calendar-month" size={24} color={colors.white} /></TouchableOpacity>
            </View>

            <View style={[styles.formContainer, { backgroundColor: mainAppBackgroundColor }]}>
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContentContainer}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <TitleComponent text="Cập nhật tiến độ" color={colors.white} style={styles.formTitleMain} />
                    <View style={styles.fieldContainer}>
                        <TitleComponent text="Nhãn" color={colors.secondaryText} />
                        <TextInput
                            style={styles.textInput} value={label} onChangeText={setLabel}
                            placeholder="Nhập tên công việc hoặc nhãn..." placeholderTextColor={colors.secondaryText}
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <TitleComponent text="Công việc" color={colors.secondaryText} />
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={selectedTaskCategory}
                                onValueChange={(itemValue) => setSelectedTaskCategory(itemValue || undefined)}
                                style={styles.picker} dropdownIconColor={colors.white}
                            >
                                {TASK_CATEGORIES.map((category) => (<Picker.Item key={category.value} label={category.label} value={category.value} style={styles.pickerItem} />))}
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.dateRowContainer}>
                        <View style={styles.dateFieldContainer}>
                            <DateTimePickerComponent title="Từ" selected={fromDate} onSelect={setFromDate} type="date" placeholder="Chọn ngày bắt đầu" />
                        </View>
                        <View style={styles.dateFieldContainer}>
                            <DateTimePickerComponent title="Đến" selected={toDate} onSelect={setToDate} type="date" placeholder="Chọn ngày kết thúc" />
                        </View>
                    </View>
                    <View style={styles.reminderContainer}>
                        <TextComponent text="Nhắc tôi khi gần đến hạn" color={colors.secondaryText} style={styles.reminderTextActual} />
                        <Switch trackColor={{ false: "#3e3e3e", true: colors.primary }} thumbColor={remindMe ? colors.white : "#f4f3f4"} ios_backgroundColor="#3e3e3e" onValueChange={setRemindMe} value={remindMe} />
                    </View>
                </ScrollView>
            </View>
            <View style={[styles.footerButtonsContainer, { backgroundColor: mainAppBackgroundColor }]}>
                <TouchableOpacity style={[styles.footerButton, styles.cancelButton]} onPress={handleCancel}><Text style={[styles.footerButtonText, styles.cancelButtonText]}>Hủy</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.footerButton, styles.submitButton]} onPress={handleSubmit}><Text style={[styles.footerButtonText, styles.submitButtonText]}>Đồng ý</Text></TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};
export default UpdateProgressScreen;

// --- STYLESHEET ---
const styles = StyleSheet.create({
    safeArea: { flex: 1 },
    appHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 15 /* APP_HORIZONTAL_PADDING thay bằng giá trị cụ thể */, paddingVertical: 10, height: APP_HEADER_HEIGHT },
    headerButton: { padding: 8 },
    headerTitleText: { color: colors.white, fontSize: 18, fontWeight: "bold" },
    formContainer: { flex: 1, borderTopLeftRadius: FORM_TOP_BORDER_RADIUS, borderTopRightRadius: FORM_TOP_BORDER_RADIUS, marginTop: - (FORM_TOP_BORDER_RADIUS / 2) + 1, overflow: 'hidden' }, // +1 để tránh đường kẻ nhỏ
    scrollView: { flex: 1 },
    scrollContentContainer: { paddingTop: FORM_TOP_BORDER_RADIUS / 2 + 20, paddingHorizontal: 20, paddingBottom: 20 },
    formTitleMain: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 30, marginTop: 10 },
    fieldContainer: { marginBottom: 20 },
    textInput: { backgroundColor: colors.inputBackground, borderRadius: 12, paddingHorizontal: 15, paddingVertical: Platform.OS === 'ios' ? 15 : 12, fontSize: 16, color: colors.text, borderWidth: 1, borderColor: colors.borderColor },
    pickerContainer: { backgroundColor: colors.inputBackground, borderRadius: 12, borderWidth: 1, borderColor: colors.borderColor, overflow: Platform.OS === 'android' ? 'hidden' : undefined, justifyContent: 'center', marginTop: 8 },
    picker: { height: Platform.OS === 'ios' ? undefined : 50, color: colors.white },
    pickerItem: { color: Platform.OS === 'ios' ? colors.white : undefined },
    dateRowContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
    dateFieldContainer: { flex: 1, marginHorizontal: 5 },
    reminderContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30, paddingVertical: 10 },
    reminderTextActual: { fontSize: 16 },
    footerButtonsContainer: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, paddingHorizontal: 12, borderTopWidth: 1, borderTopColor: 'rgba(40, 58, 105, 0.5)', height: FOOTER_BUTTON_HEIGHT, alignItems: 'center' },
    footerButton: { flex: 1, paddingVertical: 12, borderRadius: 25, alignItems: 'center', justifyContent: 'center', marginHorizontal: 8 },
    cancelButton: { backgroundColor: colors.cancelButtonBackground, borderWidth: 1, borderColor: colors.cancelButtonBorder },
    submitButton: { backgroundColor: colors.primary },
    footerButtonText: { fontSize: 16, fontWeight: 'bold' },
    cancelButtonText: { color: colors.secondaryText },
    submitButtonText: { color: colors.white },
    modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.modalOverlay },
    modalContent: { margin: 20, width: SCREEN_WIDTH * 0.9, backgroundColor: colors.white, padding: 20, borderRadius: 20, alignItems: 'center' },
    modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#333' }, // Màu chữ cho title trong modal
    datePickerWrapper: { width: '100%', alignItems: 'center', backgroundColor: colors.white /* Để DatePicker trên iOS có nền */ },
    modalButtonContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, width: '100%' }
});