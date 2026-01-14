# Chen Kai CV Website

一個現代化、極簡風格的個人履歷網站，採用純前端技術打造，具備流暢的動畫效果與響應式設計。

## 📋 專案簡介

這是 Chen Kai 的個人履歷與作品集網站，採用極簡的黑白設計風格，專注於內容呈現與使用者體驗。網站完全使用原生 HTML、CSS 和 JavaScript 開發，無需任何建置工具或框架，可直接在瀏覽器中運行。

## ✨ 功能特色

- 🎨 **極簡設計風格** - 參考現代設計趨勢，採用黑白灰配色與大量留白
- 📱 **完全響應式** - 適配桌面、平板與手機等各種裝置
- 🎭 **流暢動畫效果** - 包含滑入動畫、浮動效果與滾動觸發動畫
- 🎯 **清晰的導航結構** - Performance Indicators、Strategic Objectives、IDP、Portfolio 等區塊
- 💼 **作品展示** - 展示個人專案與技能專長
- 📧 **聯絡表單** - 提供聯絡表單方便訪客與你聯繫

## 🛠️ 技術棧

### 核心技術
- **HTML5** - 語義化標籤，提升 SEO 與可訪問性
- **CSS3** - 現代 CSS 特性（Grid、Flexbox、CSS Variables、Animations）
- **JavaScript (ES6+)** - 原生 JavaScript，無依賴外部框架

### 外部資源（CDN）
- **Google Fonts** - Poppins 字體
- **Font Awesome** - 圖示庫

## 📁 專案結構

```
ChenKai CV Website/
│
├── index.html          # 主 HTML 檔案
├── style.css           # 樣式表
├── script.js           # JavaScript 邏輯
└── README.md           # 專案說明文件
```

## 🚀 快速開始

### 方法一：直接開啟
1. 下載或克隆此專案
2. 直接用瀏覽器開啟 `index.html` 檔案即可

### 方法二：使用本地伺服器（推薦）
為了獲得最佳體驗，建議使用本地伺服器：

#### 使用 Python
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### 使用 Node.js (http-server)
```bash
# 安裝 http-server
npm install -g http-server

# 在專案目錄執行
http-server
```

#### 使用 VS Code Live Server
1. 安裝 VS Code 的 "Live Server" 擴充功能
2. 在 `index.html` 上右鍵選擇 "Open with Live Server"

然後在瀏覽器中訪問 `http://localhost:8000`（或 Live Server 提供的網址）

## 🎨 自訂內容

### 修改個人資訊
編輯 `index.html` 中的以下區塊：

- **Hero 區塊**（第 45-51 行）：修改主標題與描述
- **關於我**（第 86-113 行）：更新個人介紹
- **技能專長**（第 115-171 行）：調整技能列表與掌握度
- **經歷**（第 173-201 行）：更新工作經歷與學習歷程
- **作品展示**（第 203-239 行）：替換為你的實際專案
- **聯絡資訊**（第 241-292 行）：更新 Email 與聯絡方式

### 調整樣式
編輯 `style.css` 中的 CSS 變數（第 1-17 行）來快速調整顏色主題：

```css
:root {
  --bg: #f2f4ff;           /* 背景色 */
  --text: #191a33;          /* 文字顏色 */
  --accent: #46c2ff;        /* 強調色 */
  /* ... 更多變數 */
}
```

## 🌐 瀏覽器支援

- ✅ Chrome (最新版)
- ✅ Firefox (最新版)
- ✅ Safari (最新版)
- ✅ Edge (最新版)
- ⚠️ IE11 不支援（使用現代 CSS 特性）

## 📝 授權

此專案採用 MIT 授權條款。你可以自由使用、修改與分發此專案。

## 👤 作者

**Chen Kai**

- 個人網站：[你的網站網址]
- Email：[your.email@example.com]
- GitHub：[@yourusername](https://github.com/yourusername)

## 🙏 致謝

- 設計靈感來自現代極簡風格的作品集網站
- 使用 [Poppins](https://fonts.google.com/specimen/Poppins) 字體
- 使用 [Font Awesome](https://fontawesome.com/) 圖示庫

---

⭐ 如果這個專案對你有幫助，歡迎給個 Star！
