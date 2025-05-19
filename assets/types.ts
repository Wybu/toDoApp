// Ví dụ về kiểu dữ liệu (bạn nên đặt trong file riêng, ví dụ: types.ts)
interface Task {
    id: string;
    categoryId: string;
    title: string;
    startDate: string; // Ví dụ: "2025-05-21" (YYYY-MM-DD)
    endDate: string;   // Ví dụ: "2025-05-23"
    color: string;
    assigneeAvatar?: string; // URL tới avatar
}

interface Category {
    id: string;
    name: string;
}

// Dữ liệu mẫu (bạn sẽ lấy từ state, props, hoặc API)
const CATEGORIES_DATA: Category[] = [
    { id: "cat1", name: "New Ideas and Request" },
    { id: "cat2", name: "Assigned" },
    { id: "cat3", name: "In Progress" },
    { id: "cat4", name: "QA / QC" },
    { id: "cat5", name: "Recently Completed" },
];

const TASKS_DATA: Task[] = [
    { id: "t1", categoryId: "cat1", title: "New landing page design", startDate: "2025-05-21", endDate: "2025-05-23", color: "#FFC0CB", assigneeAvatar: "https://i.pravatar.cc/40?u=a" }, // Pink
    { id: "t2", categoryId: "cat1", title: "User survey", startDate: "2025-05-22", endDate: "2025-05-26", color: "#90EE90", assigneeAvatar: "https://i.pravatar.cc/40?u=b" }, // LightGreen
    { id: "t3", categoryId: "cat2", title: "Develop feature X", startDate: "2025-05-24", endDate: "2025-05-27", color: "#FFFFE0", assigneeAvatar: "https://i.pravatar.cc/40?u=c" }, // LightYellow
    { id: "t4", categoryId: "cat2", title: "Fix bug #123", startDate: "2025-05-22", endDate: "2025-05-24", color: "#ADD8E6", assigneeAvatar: "https://i.pravatar.cc/40?u=d" }, // LightBlue
    { id: "t5", categoryId: "cat3", title: "Testing new API", startDate: "2025-05-23", endDate: "2025-05-23", color: "#E6E6FA", assigneeAvatar: "https://i.pravatar.cc/40?u=e" }, // Lavender
    { id: "t6", categoryId: "cat3", title: "Documentation update", startDate: "2025-05-24", endDate: "2025-05-26", color: "#FFA07A", assigneeAvatar: "https://i.pravatar.cc/40?u=f" }, // LightSalmon
    { id: "t7", categoryId: "cat3", title: "User profile screen", startDate: "2025-05-24", endDate: "2025-05-27", color: "#98FB98", assigneeAvatar: "https://i.pravatar.cc/40?u=g" }, // PaleGreen
    { id: "t8", categoryId: "cat4", title: "Perform regression tests", startDate: "2025-05-25", endDate: "2025-05-26", color: "#FF6347", assigneeAvatar: "https://i.pravatar.cc/40?u=h" }, // Tomato
];

// Định nghĩa một tuần cụ thể (ví dụ: từ 21/05/2025 đến 27/05/2025)
const WEEK_DATES = [
    { fullDate: "2025-05-21", dayNumber: "21", dayName: "Mon" },
    { fullDate: "2025-05-22", dayNumber: "22", dayName: "Tue" },
    { fullDate: "2025-05-23", dayNumber: "23", dayName: "Wed" },
    { fullDate: "2025-05-24", dayNumber: "24", dayName: "Thu" },
    { fullDate: "2025-05-25", dayNumber: "25", dayName: "Fri" },
    { fullDate: "2025-05-26", dayNumber: "26", dayName: "Sat" },
    { fullDate: "2025-05-27", dayNumber: "27", dayName: "Sun" },
];