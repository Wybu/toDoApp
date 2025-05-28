# Todo App - Group Interaction Feature

Ứng dụng Todo với tính năng tương tác nhóm, cho phép người dùng tạo và quản lý các nhóm, đăng bài, bình luận và tương tác với nhau.

## Tính năng chính

- Đăng nhập/Đăng ký với Firebase Authentication
- Tạo và quản lý nhóm
- Đăng bài và tương tác (thích, bình luận)
- Quản lý thành viên nhóm
- Thông báo thời gian thực
- Giao diện người dùng hiện đại

## Yêu cầu hệ thống

- Node.js >= 18
- React Native CLI
- Android Studio (cho Android)
- Xcode (cho iOS)
- Firebase project

## Cài đặt

1. Clone repository:
```bash
git clone <repository-url>
cd todo-app
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Cấu hình Firebase:
- Tạo project trên Firebase Console
- Tải file cấu hình `google-services.json` (Android) và `GoogleService-Info.plist` (iOS)
- Đặt các file cấu hình vào thư mục tương ứng:
  - Android: `android/app/google-services.json`
  - iOS: `ios/GoogleService-Info.plist`

4. Cài đặt pods (iOS):
```bash
cd ios
pod install
cd ..
```

## Chạy ứng dụng

### Android

```bash
npm run android
```

### iOS

```bash
npm run ios
```

## Cấu trúc thư mục

```
src/
  ├── tuongtacnhom/
  │   ├── components/     # Các component tái sử dụng
  │   ├── screens/        # Các màn hình
  │   ├── services/       # Logic xử lý với Firebase
  │   └── navigation/     # Cấu hình navigation
  └── ...
```

## Công nghệ sử dụng

- React Native
- Firebase (Authentication, Firestore, Storage)
- React Navigation
- React Native Image Picker

## Đóng góp

Mọi đóng góp đều được hoan nghênh. Vui lòng tạo issue hoặc pull request để cải thiện ứng dụng.
