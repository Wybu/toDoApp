import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    NativeScrollEvent,
    NativeSyntheticEvent,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- 1. ĐỊNH NGHĨA KIỂU DỮ LIỆU ---
interface StaticTask { id: string; categoryId: string; title: string; startDayIndex: number; durationInDays: number; color: string; assigneeAvatar?: string; trackIndex?: number; }
interface Category { id: string; name: string; }
interface DayDisplayData { dayNumber: string; dayName: string; isToday?: boolean; fullDate: string; }

// --- 2. HẰNG SỐ VÀ DỮ LIỆU MẪU ---
const TOTAL_DAYS_TO_DISPLAY = 21;
const TODAY_VIEW_INDEX = 3;

const generateWeekDates = (totalDays: number, todayActualIndex: number): DayDisplayData[] => {
    const days: DayDisplayData[] = [];
    const baseDate = new Date(); // Lấy ngày thực tế làm mốc
    baseDate.setDate(baseDate.getDate() - todayActualIndex); // Thiết lập ngày bắt đầu
    for (let i = 0; i < totalDays; i++) {
        const currentDate = new Date(baseDate);
        currentDate.setDate(baseDate.getDate() + i);
        days.push({
            fullDate: currentDate.toISOString().split('T')[0],
            dayNumber: currentDate.getDate().toString(),
            dayName: currentDate.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase().substring(0, 3),
            isToday: i === todayActualIndex,
        });
    }
    return days;
};

const EXTENDED_WEEK_DATES: DayDisplayData[] = generateWeekDates(TOTAL_DAYS_TO_DISPLAY, TODAY_VIEW_INDEX);
const CATEGORIES_DATA: Category[] = [
    { id: "cat1", name: "New Ideas and Request" }, { id: "cat2", name: "Assigned" },
    { id: "cat3", name: "In Progress" }, { id: "cat4", name: "QA / QC" },
    { id: "cat5", name: "Recently Completed" },
];
const STATIC_TASKS_DATA: StaticTask[] = [
    { id: "t1", categoryId: "cat1", title: "User Research Phase 1", startDayIndex: TODAY_VIEW_INDEX - 2, durationInDays: 3, color: "#FF69B4", assigneeAvatar: "https://i.pravatar.cc/40?u=userA" },
    { id: "t1a", categoryId: "cat1", title: "Market Analysis", startDayIndex: TODAY_VIEW_INDEX - 1, durationInDays: 2, color: "#FF69B4", assigneeAvatar: "https://i.pravatar.cc/40?u=userB" },
    { id: "t2", categoryId: "cat1", title: "Brainstorming Session", startDayIndex: TODAY_VIEW_INDEX + 1, durationInDays: 5, color: "#00FF7F", assigneeAvatar: "https://i.pravatar.cc/40?u=userC" },
    { id: "t3", categoryId: "cat2", title: "API Development", startDayIndex: TODAY_VIEW_INDEX - 1, durationInDays: 4, color: "#1E90FF", assigneeAvatar: "https://i.pravatar.cc/40?u=userE" },
    { id: "t4", categoryId: "cat2", title: "UI Mockups", startDayIndex: TODAY_VIEW_INDEX + 3, durationInDays: 3, color: "#FAFAFA", assigneeAvatar: "https://i.pravatar.cc/40?u=userF" },
    { id: "t5", categoryId: "cat3", title: "Feature A Impl.", startDayIndex: TODAY_VIEW_INDEX, durationInDays: 3, color: "#8A2BE2", assigneeAvatar: "https://i.pravatar.cc/40?u=userH" },
    { id: "t6", categoryId: "cat3", title: "Feature B Impl.", startDayIndex: TODAY_VIEW_INDEX, durationInDays: 5, color: "#FF8C00", assigneeAvatar: "https://i.pravatar.cc/40?u=userI" },
    { id: "t6c", categoryId: "cat3", title: "Refactor Module X", startDayIndex: TODAY_VIEW_INDEX, durationInDays: 2, color: "#FF8C00", assigneeAvatar: "https://i.pravatar.cc/40?u=userJ" },
];

// --- 3. CÁC HẰNG SỐ LAYOUT ---
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const APP_HORIZONTAL_PADDING = 10; // Padding chung cho nội dung bên trong Cột Phải
const CATEGORY_LABEL_WIDTH = 110;
const DAY_CELL_WIDTH = 80;
const TASK_BAR_HEIGHT = 28;
const TASK_BAR_MARGIN_TOP = 6;
const TASK_AVATAR_SIZE = TASK_BAR_HEIGHT - 8;
const APP_HEADER_HEIGHT = 55;
const WEEK_DAYS_HEADER_HEIGHT = 60;
const FOOTER_BUTTON_HEIGHT = 80;
const MIN_CATEGORY_ROW_HEIGHT = 70;

// --- 4. LOGIC XẾP CHỒNG TASK VÀ TÍNH CHIỀU CAO ---
const getProcessedTasksForCategory = (categoryId: string): StaticTask[] => {
    const categoryTasks = STATIC_TASKS_DATA.filter(task => task.categoryId === categoryId)
        .sort((a, b) => {
            if (a.startDayIndex === b.startDayIndex) { return (b.startDayIndex + b.durationInDays) - (a.startDayIndex + a.durationInDays); }
            return a.startDayIndex - b.startDayIndex;
        });
    const tracks: { endIndex: number }[] = [];
    return categoryTasks.map(task => {
        let assignedTrack = -1;
        for (let i = 0; i < tracks.length; i++) { if (task.startDayIndex >= tracks[i].endIndex) { assignedTrack = i; tracks[i].endIndex = task.startDayIndex + task.durationInDays; break; } }
        if (assignedTrack === -1) { assignedTrack = tracks.length; tracks.push({ endIndex: task.startDayIndex + task.durationInDays }); }
        return { ...task, trackIndex: assignedTrack };
    });
};
const calculateCategoryRowHeight = (categoryId: string): number => {
    const processedTasks = getProcessedTasksForCategory(categoryId);
    const maxTrack = processedTasks.reduce((max, task) => Math.max(max, task.trackIndex || 0), -1);
    const calculatedHeight = (maxTrack + 1) * (TASK_BAR_HEIGHT + TASK_BAR_MARGIN_TOP) + TASK_BAR_MARGIN_TOP;
    return Math.max(MIN_CATEGORY_ROW_HEIGHT, calculatedHeight);
};

// --- 5. COMPONENT TASKBAR ---
interface TaskBarItemProps { task: StaticTask; topOffset: number; }
const TaskBarItem: React.FC<TaskBarItemProps> = ({ task, topOffset }) => {
    const left = task.startDayIndex * DAY_CELL_WIDTH;
    const width = task.durationInDays * DAY_CELL_WIDTH - 4;
    if (width <= 0) return null;
    const getTextColor = (backgroundColor: string): string => {
        if (!backgroundColor || backgroundColor.length < 7 || !backgroundColor.startsWith("#")) return "#000000";
        const hex = backgroundColor.replace("#", "");
        const r = parseInt(hex.substring(0, 2), 16); const g = parseInt(hex.substring(2, 4), 16); const b = parseInt(hex.substring(4, 6), 16);
        if (isNaN(r) || isNaN(g) || isNaN(b)) return "#000000";
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 128 ? "#000000" : "#FFFFFF";
    };
    const textColor = getTextColor(task.color);
    return (
        <View style={[styles.taskBar, { backgroundColor: task.color, left, width, height: TASK_BAR_HEIGHT, top: topOffset }]}>
            {task.assigneeAvatar && (<Image source={{ uri: task.assigneeAvatar }} style={styles.taskAvatar} />)}
            {width > TASK_AVATAR_SIZE + 40 && (<Text style={[styles.taskTitle, { color: textColor }]} numberOfLines={1}>{task.title}</Text>)}
        </View>
    );
};


// --- 6. COMPONENT MÀN HÌNH CHÍNH ---
const TimelineTestScreen: React.FC = () => {
    const headerBackgroundColor = "#04247C";
    const mainAppBackgroundColor = "#0A1936";

    const horizontalScroll = useRef(new Animated.Value(0)).current;
    const verticalScroll = useRef(new Animated.Value(0)).current;

    const categoryLabelsScrollRef = useRef<ScrollView>(null);
    const taskGridVerticalScrollRef = useRef<ScrollView>(null);
    const taskGridHorizontalScrollRef = useRef<ScrollView>(null);
    const dateHeaderAndTaskGridHorizontalScrollRef = useRef<ScrollView>(null);

    const isProgrammaticScroll = useRef({ x: false, y: false });


    // Đồng bộ cuộn (một chiều từ "master" scroller)
    // Khi master scroller (dateHeader hoặc categoryLabels) cuộn, các slave scroller sẽ cuộn theo
    useEffect(() => {
        const hListenerId = horizontalScroll.addListener(({ value }) => {
            taskGridHorizontalScrollRef.current?.scrollTo({ x: value, animated: false });
        });
        // Không cần listener cho taskGridHorizontalScrollRef vì nó được điều khiển bởi dateHeaderScrollRef

        const vListenerId = verticalScroll.addListener(({ value }) => {
            if (isProgrammaticScroll.current.y) return; // Nếu đang cuộn do code thì bỏ qua
            taskGridVerticalScrollRef.current?.scrollTo({ y: value, animated: false });
        });

        return () => {
            horizontalScroll.removeListener(hListenerId);
            verticalScroll.removeListener(vListenerId);
        };
    }, []); // Chạy 1 lần

    const onDateHeaderScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: horizontalScroll } } }],
        { useNativeDriver: false }
    );

    // Xử lý cuộn cho CategoryLabels và TaskGrid (dọc)
    // Ý tưởng: Một cái cuộn sẽ cập nhật Animated.Value, useEffect sẽ cuộn cái còn lại
    // Cần cờ để tránh vòng lặp
    const onCategoryLabelsScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        if (!isProgrammaticScroll.current.y) {
            isProgrammaticScroll.current.y = true;
            verticalScroll.setValue(offsetY); // Cập nhật giá trị chung
            taskGridVerticalScrollRef.current?.scrollTo({ y: offsetY, animated: false });
            requestAnimationFrame(() => { isProgrammaticScroll.current.y = false; });
        } else {
            isProgrammaticScroll.current.y = false; // Reset cờ nếu đây là cuộn do code
        }
    };

    const onTaskGridVerticalScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        if (!isProgrammaticScroll.current.y) {
            isProgrammaticScroll.current.y = true;
            verticalScroll.setValue(offsetY); // Cập nhật giá trị chung
            categoryLabelsScrollRef.current?.scrollTo({ y: offsetY, animated: false });
            requestAnimationFrame(() => { isProgrammaticScroll.current.y = false; });
        } else {
            isProgrammaticScroll.current.y = false; // Reset cờ
        }
    };


    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: mainAppBackgroundColor }]}>
            <StatusBar barStyle="light-content" backgroundColor={headerBackgroundColor} />
            <View style={[styles.appHeader, { backgroundColor: headerBackgroundColor }]}>
                <TouchableOpacity style={styles.headerButton} onPress={() => console.log("Back pressed")}><Ionicons name="chevron-back" size={28} color="#FFFFFF" style={{ marginLeft: -5 }} /><Ionicons name="chevron-back" size={28} color="#FFFFFF" style={{ marginLeft: -18 }} /></TouchableOpacity>
                <View style={styles.headerTitleGroup}><MaterialCommunityIcons name="chart-bar" size={22} color="#FFFFFF" style={{ marginRight: 8 }} /><Text style={styles.headerTitleText}>Tiến độ công việc</Text></View>
                <TouchableOpacity style={styles.headerButton} onPress={() => console.log("Search pressed")}><Ionicons name="search" size={26} color="#FFFFFF" /></TouchableOpacity>
            </View>

            {/* Main Content Body */}
            <View style={styles.timelineBody}>
                {/* Cột 1: Khoảng trống trên và Category Labels (Cố định ngang, cuộn dọc) */}
                <View style={[styles.categoryLabelsColumnContainer, { backgroundColor: mainAppBackgroundColor }]}>
                    <View style={[styles.headerPlaceholder, { height: WEEK_DAYS_HEADER_HEIGHT, backgroundColor: mainAppBackgroundColor }]} />
                    <Animated.ScrollView
                        ref={categoryLabelsScrollRef}
                        showsVerticalScrollIndicator={false}
                        onScroll={onCategoryLabelsScroll}
                        scrollEventThrottle={16}
                        bounces={false}
                        style={styles.categoryLabelsScroll}
                    >
                        <View style={{ paddingTop: APP_HORIZONTAL_PADDING / 2 }} />
                        {CATEGORIES_DATA.map((category) => {
                            const rowHeight = calculateCategoryRowHeight(category.id);
                            return (
                                <View key={`label-${category.id}`} style={[styles.categoryLabelItemContainer, { height: rowHeight }]}>
                                    <Text style={styles.categoryLabel}>{category.name}</Text>
                                </View>
                            );
                        })}
                    </Animated.ScrollView>
                </View>

                {/* Cột 2: Header Ngày và Lưới Task (Cuộn ngang toàn bộ, phần lưới task cuộn dọc đồng bộ) */}
                <Animated.ScrollView // ScrollView ngang chính cho cột phải
                    ref={dateHeaderAndTaskGridHorizontalScrollRef} // Đổi tên ref cho rõ
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.timelineScrollableArea}
                    onScroll={onDateHeaderScroll} // Header ngày là master cho cuộn ngang
                    scrollEventThrottle={16}
                    bounces={false}
                >
                    {/* Container cho nội dung cuộn ngang (Header ngày + Lưới task) */}
                    <View>
                        <View style={[styles.weekDaysContainer, { backgroundColor: mainAppBackgroundColor }]}>
                            {EXTENDED_WEEK_DATES.map((day, index) => (
                                <View key={`header-date-${index}`} style={[styles.dayCell, { width: DAY_CELL_WIDTH }]}>
                                    <Text style={[styles.dayNumber, day.isToday && styles.todayText]}>{day.dayNumber}</Text>
                                    <Text style={[styles.dayName, day.isToday && styles.todayText]}>{day.dayName}</Text>
                                </View>
                            ))}
                        </View>

                        <Animated.ScrollView // ScrollView dọc cho lưới task
                            ref={taskGridVerticalScrollRef}
                            showsVerticalScrollIndicator={false}
                            onScroll={onTaskGridVerticalScroll}
                            scrollEventThrottle={16}
                            bounces={false}
                        >
                            <View style={{ paddingTop: APP_HORIZONTAL_PADDING / 2 }} />
                            <View style={{ width: EXTENDED_WEEK_DATES.length * DAY_CELL_WIDTH }}>
                                {CATEGORIES_DATA.map((category) => {
                                    const processedTasks = getProcessedTasksForCategory(category.id);
                                    const rowHeight = calculateCategoryRowHeight(category.id);
                                    return (
                                        <View key={`lane-content-${category.id}`} style={[styles.taskLane, { height: rowHeight }]}>
                                            {EXTENDED_WEEK_DATES.map((_day, dayIndex) => (<View key={`line-${category.id}-${dayIndex}`} style={[styles.daySeparatorLine, { left: dayIndex * DAY_CELL_WIDTH }]} />))}
                                            {EXTENDED_WEEK_DATES[TODAY_VIEW_INDEX]?.isToday && (<View style={[styles.todayMarker, { left: (TODAY_VIEW_INDEX * DAY_CELL_WIDTH) + (DAY_CELL_WIDTH / 2) - 1, height: rowHeight }]} />)}
                                            {processedTasks.map((task) => (<TaskBarItem key={task.id} task={task} topOffset={(task.trackIndex || 0) * (TASK_BAR_HEIGHT + TASK_BAR_MARGIN_TOP) + TASK_BAR_MARGIN_TOP} />))}
                                        </View>
                                    );
                                })}
                            </View>
                        </Animated.ScrollView>
                    </View>
                </Animated.ScrollView>
            </View>

            <View style={[styles.addButtonContainer, { backgroundColor: mainAppBackgroundColor }]}>
                <TouchableOpacity style={styles.addButton} onPress={() => console.log("Add Progress pressed")}><LinearGradient colors={['#535DE8', '#2A2DE5']} style={styles.addButtonGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}><Text style={styles.addButtonText}>Cập nhật tiến độ</Text><Ionicons name="add" size={24} color="#FFFFFF" /></LinearGradient></TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default TimelineTestScreen;

// --- 7. STYLESHEET ---
const styles = StyleSheet.create({
    safeArea: { flex: 1 },
    appHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: APP_HORIZONTAL_PADDING, paddingVertical: 10, height: APP_HEADER_HEIGHT },
    headerButton: { padding: 8 },
    headerTitleGroup: { flexDirection: "row", alignItems: "center" },
    headerTitleText: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" },

    timelineBody: { flexDirection: 'row', flex: 1, overflow: 'hidden' },
    categoryLabelsColumnContainer: { // Đổi tên từ categoryLabelsColumn để bao gồm cả placeholder
        width: CATEGORY_LABEL_WIDTH,
        borderRightWidth: 1,
        borderRightColor: 'rgba(255,255,255,0.2)',
    },
    categoryLabelsScroll: { // ScrollView cho các label
        flex: 1, // Để nó chiếm phần còn lại của cột sau placeholder
    },
    headerPlaceholder: { width: '100%', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.2)' },
    categoryLabelItemContainer: { paddingVertical: 8, paddingHorizontal: 8, justifyContent: 'flex-start', paddingTop: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)', width: '100%' },
    categoryLabel: { color: '#A2C1EE', fontSize: 12 },

    timelineScrollableArea: { flex: 1 }, // ScrollView ngang cho cột phải
    weekDaysContainer: { flexDirection: 'row', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.2)', height: WEEK_DAYS_HEADER_HEIGHT, alignItems: 'center' },
    dayCell: { alignItems: 'center', justifyContent: 'center', height: '100%', paddingHorizontal: 4 },
    dayNumber: { fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' },
    dayName: { fontSize: 11, color: '#A2C1EE', textTransform: 'uppercase', marginTop: 2 },
    todayText: { color: '#FFD700' },

    taskLane: { position: 'relative', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)' },
    taskBar: { position: 'absolute', borderRadius: 14, flexDirection: 'row', alignItems: 'center', paddingLeft: TASK_AVATAR_SIZE / 2 + 2, paddingRight: 6, justifyContent: 'flex-start', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1 },
    taskAvatar: { width: TASK_AVATAR_SIZE, height: TASK_AVATAR_SIZE, borderRadius: TASK_AVATAR_SIZE / 2, position: 'absolute', left: -(TASK_AVATAR_SIZE / 3), top: (TASK_BAR_HEIGHT - TASK_AVATAR_SIZE) / 2, borderWidth: 1.5, borderColor: '#FFFFFF' },
    taskTitle: { fontSize: 10, marginLeft: TASK_AVATAR_SIZE * 0.6, fontWeight: '500', flexShrink: 1 },
    daySeparatorLine: { position: 'absolute', top: 0, bottom: 0, width: 1, backgroundColor: 'rgba(255,255,255,0.08)' },
    todayMarker: { position: 'absolute', top: 0, width: 2.5, backgroundColor: '#FF6347', zIndex: 10 }, // height sẽ theo rowHeight
    addButtonContainer: { paddingVertical: 10, paddingBottom: Platform.OS === 'ios' ? 30 : 20, alignItems: 'center', height: FOOTER_BUTTON_HEIGHT, justifyContent: 'center' },
    addButton: { borderRadius: 28, overflow: 'hidden', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 3 },
    addButtonGradient: { paddingVertical: 14, paddingHorizontal: 30, borderRadius: 28, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    addButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold', marginRight: 10 },
});