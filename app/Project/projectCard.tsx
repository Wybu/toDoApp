import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from "react";
import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar, // Thêm StatusBar
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

// --- Định nghĩa kiểu và ProjectCard component giữ nguyên như trước ---
interface TeamMember {
    name: string;
    image: string;
}

interface Deadline {
    time: string;
    date: string;
}

interface ProjectCardProps {
    title?: string;
    deadline: Deadline;
    teamMembers: TeamMember[];
    onViewMore: () => void;
}

const MAX_VISIBLE_MEMBERS = 4;

const ProjectCard: React.FC<ProjectCardProps> = ({ title, deadline, teamMembers, onViewMore }) => {
    return (
        <View style={styles.projectCard}>
            <View style={styles.projectHeader}>
                <Text style={styles.projectTitle}>{title || "Dự án không tên"}</Text>
                <TouchableOpacity style={styles.viewMoreButton}>
                    <Text style={styles.viewMoreText}>{"Xem thêm"}</Text>
                    <Image
                        source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/597fe193-fc8c-4ca1-a456-3fca72c72b70" }}
                        resizeMode={"stretch"}
                        style={styles.viewMoreIcon}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.teamMembersContainer}>
                {teamMembers.slice(0, MAX_VISIBLE_MEMBERS).map((member, index) => (
                    <View key={member.name + index} style={styles.memberContainer}>
                        <Image
                            source={{ uri: member.image }}
                            resizeMode={"cover"}
                            style={styles.memberImage}
                        />
                        <Text style={styles.memberName}>{member.name}</Text>
                    </View>
                ))}
                {teamMembers.length > MAX_VISIBLE_MEMBERS && (
                    <Text style={styles.additionalMembers}>
                        {`+${teamMembers.length - MAX_VISIBLE_MEMBERS}`}
                    </Text>
                )}
            </View>
            <View style={styles.separatorInCard} />
            <View style={styles.deadlineContainer}>
                <Text style={styles.deadlineText}>{"Deadline:"}</Text>
                <Text style={styles.deadlineTime}>{deadline.time}</Text>
                <Text style={styles.deadlineDate}>{deadline.date}</Text>
            </View>
        </View>
    );
};
// --- Kết thúc ProjectCard ---


const ProjectsScreen: React.FC = () => {
    const projectsData: ProjectCardProps[] = [
        {
            title: "Mobile App Wireframe",
            deadline: { time: "10:05 am", date: "24th April" },
            teamMembers: [
                { name: "Gianni", image: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/cd95f39a-87d0-4b22-9b09-944ea7eba912" },
                { name: "Tod", image: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/af2ce703-75e1-4ada-a686-93dbe923f984" },
                { name: "Elta", image: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/d18e2f7d-fddd-4540-952b-992c783411b0" },
                { name: "Elmo", image: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/4d45a536-81bd-445e-a1cf-1dc198ad9d26" },
                { name: "Hayden", image: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/b4e6329f-6008-4d96-baf2-85ffe4490dbd" },
            ],
            onViewMore: () => console.log("View more Mobile App Wireframe"),
        },
    ];

    // Giả sử màu nền chính của bạn là màu này
    const mainAppBackgroundColor = "#04247C";

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: mainAppBackgroundColor }]}>
            <StatusBar barStyle="light-content" backgroundColor={mainAppBackgroundColor} />
            <View style={styles.appHeader}>
                <TouchableOpacity style={styles.headerButton}>
                    <Ionicons name="chevron-back" size={28} color="#FFFFFF" style={{ marginLeft: -5 }} />
                </TouchableOpacity>
                <View style={styles.headerTitleGroup}>
                    {/* Icon biểu đồ/tiến độ */}
                    <MaterialCommunityIcons name="chart-bar" size={22} color="#FFFFFF" style={{ marginRight: 8 }} />
                    <Text style={styles.headerTitleText}>Tiến độ công việc</Text>
                </View>
                <TouchableOpacity style={styles.headerButton}>
                    <Ionicons name="search" size={26} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            <View style={[styles.contentArea, { backgroundColor: mainAppBackgroundColor }]}>
                <View style={styles.headerSeparator} />
                <Text style={styles.sectionTitle}>Dự Án</Text>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.projectList}>
                        {projectsData.map((project) => (
                            <ProjectCard key={project.title} {...project} />
                        ))}
                    </View>
                    {/* LinearGradient này có thể cần điều chỉnh vị trí hoặc bỏ đi nếu không cần thiết nữa */}
                    <LinearGradient
                        start={{ x: 1, y: -0 }}
                        end={{ x: 1, y: 1 }}
                        colors={["#41404100", "#3D2374"]}
                        style={styles.gradient}
                    />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default ProjectsScreen;

const styles = StyleSheet.create({
    container: { // Cho SafeAreaView
        flex: 1,
        // backgroundColor: "#FFFFFF", // Màu nền của SafeAreaView sẽ là màu nền chính
    },
    contentArea: { // View chính chứa toàn bộ nội dung dưới StatusBar
        flex: 1,
    },
    appHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: "#04247C", // Màu nền header, đã chuyển lên SafeAreaView
    },
    headerButton: {
        padding: 6, // Tăng vùng chạm
    },
    headerTitleGroup: {
        flexDirection: "row",
        alignItems: "center",
    },
    headerTitleText: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "bold",
    },
    headerSeparator: {
        height: 1,
        backgroundColor: "rgba(255, 255, 255, 0.2)", // Màu trắng mờ hơn
        marginHorizontal: 0, // Hoặc theo padding của content
        marginTop: 4, // Khoảng cách từ header xuống
        marginBottom: 16, // Khoảng cách tới chữ "Dự Án"
    },
    sectionTitle: {
        color: "#A2C1EE", // Màu như trong code cũ của bạn cho "Dự Án"
        fontSize: 24, // Tăng kích thước
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 16, // Khoảng cách tới danh sách project
    },
    scrollView: {
        flex: 1,
        // backgroundColor: "#04247C", // ScrollView không cần màu nền riêng nếu contentArea đã có
    },
    projectList: {
        paddingHorizontal: 21,
        paddingBottom: 50, // Giảm padding bottom nếu gradient được điều chỉnh hoặc bỏ
    },
    projectCard: {
        backgroundColor: "#5375DE",
        borderRadius: 16,
        paddingVertical: 14,
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    projectHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    projectTitle: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "bold",
        flex: 1,
        marginRight: 8,
    },
    viewMoreButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    viewMoreText: {
        color: "#EBFF0F",
        fontSize: 14,
        fontWeight: "bold",
        marginRight: 8,
    },
    viewMoreIcon: {
        width: 18,
        height: 18,
    },
    teamMembersContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        flexWrap: 'wrap',
    },
    memberContainer: {
        alignItems: "center",
        marginRight: 10,
        marginBottom: 8,
    },
    memberImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    memberName: {
        color: "#FFFFFF",
        fontSize: 10,
        marginTop: 4,
        textAlign: 'center',
        width: 50,
    },
    additionalMembers: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "bold",
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.2)',
        textAlign: 'center',
        lineHeight: 40,
        marginLeft: 4,
    },
    separatorInCard: { // Đổi tên từ separator
        height: 1,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        marginVertical: 12,
    },
    deadlineContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'flex-end',
    },
    deadlineText: {
        color: "#FFFFFF",
        fontSize: 14,
        marginRight: 10,
    },
    deadlineTime: {
        color: "#FFFFFF",
        fontSize: 14,
        marginRight: 8,
    },
    deadlineDate: {
        color: "#FFFFFF",
        fontSize: 12,
    },
    gradient: {
        height: 138, // Cần xem xét lại vị trí và tác dụng của gradient này
    },
});