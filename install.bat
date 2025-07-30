@echo off
:: Rexidian Recipe Assistant - Installation Script for Windows
:: This script helps install the plugin to your Obsidian vault

echo.
echo 🍳 Rexidian Recipe Assistant - Installation Script
echo =================================================

:: Check if we have the required files
if not exist "main.js" (
    echo ❌ Error: main.js not found!
    goto :error_missing_files
)
if not exist "manifest.json" (
    echo ❌ Error: manifest.json not found!
    goto :error_missing_files
)
if not exist "styles.css" (
    echo ❌ Error: styles.css not found!
    goto :error_missing_files
)

:: Ask for vault path
echo.
echo 📁 Please enter the path to your Obsidian vault:
echo    (e.g., C:\Users\username\Documents\MyVault)
set /p VAULT_PATH="Vault path: "

:: Remove quotes if present
set VAULT_PATH=%VAULT_PATH:"=%

:: Validate vault path
if not exist "%VAULT_PATH%" (
    echo ❌ Error: Vault directory does not exist: %VAULT_PATH%
    pause
    exit /b 1
)

:: Check for .obsidian directory
set OBSIDIAN_DIR=%VAULT_PATH%\.obsidian
if not exist "%OBSIDIAN_DIR%" (
    echo ❌ Error: .obsidian directory not found in %VAULT_PATH%
    echo    Make sure this is a valid Obsidian vault.
    pause
    exit /b 1
)

:: Create plugins directory if it doesn't exist
set PLUGINS_DIR=%OBSIDIAN_DIR%\plugins
if not exist "%PLUGINS_DIR%" (
    echo 📂 Creating plugins directory...
    mkdir "%PLUGINS_DIR%"
)

:: Create rexidian plugin directory
set PLUGIN_DIR=%PLUGINS_DIR%\rexidian
echo 📂 Creating plugin directory: %PLUGIN_DIR%
if not exist "%PLUGIN_DIR%" mkdir "%PLUGIN_DIR%"

:: Copy files
echo 📋 Copying plugin files...
copy main.js "%PLUGIN_DIR%\" >nul
copy manifest.json "%PLUGIN_DIR%\" >nul
copy styles.css "%PLUGIN_DIR%\" >nul

echo.
echo ✅ Installation complete!
echo.
echo 📝 Next steps:
echo 1. Restart Obsidian or press Ctrl+R to reload
echo 2. Go to Settings → Community Plugins
echo 3. Find 'Rexidian Recipe Assistant' and toggle it on
echo 4. Look for the chef hat (🍳) icon in the ribbon!
echo.
echo 🧪 To test the plugin:
echo - Click the chef hat icon to open the Recipe Assistant
echo - Use Command Palette and search for 'Recipe' commands
echo.
echo 📚 For more help, see README.md
echo.
pause
exit /b 0

:error_missing_files
echo    Make sure you have built the plugin first:
echo    npm install && npm run build
echo.
pause
exit /b 1