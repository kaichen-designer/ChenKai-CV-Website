# PDF 作品集設置指南

為了讓作品集的 PDF 查看功能正常運作，請按照以下步驟操作：

## 1. 準備 PDF 文件

確保您有以下 PDF 文件：
- `Cradle.pdf` - Cradle 海龜復育箱作品集
- `Wave Haven.pdf` - Wave Haven 作品集
- `公益行動.pdf` - IPASS MONEY 公益行動作品集
- `Navora.pdf` - Navora 等車空間作品集

## 2. 放置文件位置

將所有 PDF 文件放置在 `ChenKai CV Website` 資料夾的**根目錄**下，與 `index.html`、`style.css`、`script.js` 等檔案位於同一層。

## 3. 文件結構應該如下：

```
ChenKai CV Website/
├── index.html
├── style.css
├── script.js
├── Cradle.pdf          ← PDF 文件
├── Wave Haven.pdf      ← PDF 文件
├── 公益行動.pdf        ← PDF 文件
├── Navora.pdf          ← PDF 文件
├── profile-photo.jpg.jpg
└── ... (其他圖片文件)
```

## 4. 功能說明

- 點擊 **Cradle - 海龜復育箱** 作品時，會打開 `Cradle.pdf`
- 點擊 **Wave Haven** 作品時，會打開 `Wave Haven.pdf`
- 點擊 **IPASS MONEY 公益行動** 作品時，會打開 `公益行動.pdf`
- 點擊 **Navora - 等車空間** 作品時，會打開 `Navora.pdf`
- 其他作品（如生紅調酒、AD-03）仍會顯示圖片放大效果

## 5. 測試

在瀏覽器中打開網站，點擊上述作品，應該能夠在彈出的視窗中查看 PDF 內容。

如果無法顯示 PDF，請檢查：
1. PDF 文件是否正確命名（注意大小寫和空格）
2. PDF 文件是否在正確的位置（專案根目錄）
3. 瀏覽器是否支持 PDF 查看（大多數現代瀏覽器都支持）
4. 文件權限是否正確
