@echo off
echo ====================================
echo 更新程式碼到 GitHub
echo ====================================
echo.

cd /d "%~dp0"

echo 正在檢查變更...
git status

echo.
echo 正在添加所有變更...
git add .

echo.
set /p commit_msg="請輸入更新說明（或按 Enter 使用預設訊息）: "
if "%commit_msg%"=="" set commit_msg=更新內容

echo.
echo 正在提交變更...
git commit -m "%commit_msg%"

echo.
echo 正在推送到 GitHub...
git push

echo.
echo ====================================
echo 更新完成！
echo ====================================
pause
