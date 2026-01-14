# 更新程式碼到 GitHub 的 PowerShell 腳本

Write-Host "====================================" -ForegroundColor Cyan
Write-Host "更新程式碼到 GitHub" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# 切換到腳本所在目錄
Set-Location $PSScriptRoot

# 顯示目前狀態
Write-Host "正在檢查變更..." -ForegroundColor Yellow
git status

Write-Host ""
Write-Host "正在添加所有變更..." -ForegroundColor Yellow
git add .

Write-Host ""
$commitMsg = Read-Host "請輸入更新說明（或按 Enter 使用預設訊息）"
if ([string]::IsNullOrWhiteSpace($commitMsg)) {
    $commitMsg = "更新內容"
}

Write-Host ""
Write-Host "正在提交變更..." -ForegroundColor Yellow
git commit -m $commitMsg

Write-Host ""
Write-Host "正在推送到 GitHub..." -ForegroundColor Yellow
git push

Write-Host ""
Write-Host "====================================" -ForegroundColor Green
Write-Host "更新完成！" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Green
Write-Host ""
Write-Host "按任意鍵繼續..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
