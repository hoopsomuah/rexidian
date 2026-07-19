#!/bin/bash

# Rexidian Recipe Assistant - Verification Script
# This script verifies that all required files are present and ready for installation

set -e

echo "🔍 Rexidian Recipe Assistant - Plugin Verification"
echo "=================================================="

# Track if any issues are found
ISSUES_FOUND=0

# Check for required files
echo ""
echo "📋 Checking required files..."

if [ -f "main.js" ]; then
    SIZE=$(stat -f%z "main.js" 2>/dev/null || stat -c%s "main.js" 2>/dev/null || echo "0")
    echo "✅ main.js found (${SIZE} bytes)"
    if [ "$SIZE" -lt 1000 ]; then
        echo "⚠️  Warning: main.js seems small, make sure the build completed successfully"
    fi
else
    echo "❌ main.js not found"
    ISSUES_FOUND=$((ISSUES_FOUND + 1))
fi

if [ -f "manifest.json" ]; then
    echo "✅ manifest.json found"
    # Validate JSON syntax
    if command -v node >/dev/null 2>&1; then
        if node -e "JSON.parse(require('fs').readFileSync('manifest.json', 'utf8'))" 2>/dev/null; then
            echo "   📝 JSON syntax is valid"
        else
            echo "   ❌ JSON syntax error in manifest.json"
            ISSUES_FOUND=$((ISSUES_FOUND + 1))
        fi
    fi
else
    echo "❌ manifest.json not found"
    ISSUES_FOUND=$((ISSUES_FOUND + 1))
fi

if [ -f "styles.css" ]; then
    echo "✅ styles.css found"
else
    echo "❌ styles.css not found"
    ISSUES_FOUND=$((ISSUES_FOUND + 1))
fi

# Check for development setup
echo ""
echo "🛠️  Checking development setup..."

if [ -f "package.json" ]; then
    echo "✅ package.json found"
else
    echo "⚠️  package.json not found"
fi

if [ -d "node_modules" ]; then
    echo "✅ node_modules directory found"
else
    echo "⚠️  node_modules not found - run 'npm install' first"
fi

# Final status
echo ""
echo "📊 Verification Results:"
echo "======================="

if [ $ISSUES_FOUND -eq 0 ]; then
    echo "🎉 All checks passed! Plugin is ready for installation."
    echo ""
    echo "📦 To install:"
    echo "   • Run ./install.sh (Linux/macOS) or install.bat (Windows)"
    echo "   • Or manually copy main.js, manifest.json, and styles.css to your vault"
    echo ""
    echo "🧪 To test after installation:"
    echo "   • Look for the chef hat (🍳) icon in Obsidian's ribbon"
    echo "   • Use Command Palette: 'Open Recipe Assistant'"
    echo "   • Try the 'Create New Recipe' command"
else
    echo "❌ Found $ISSUES_FOUND issue(s). Please fix them before installing."
    echo ""
    echo "💡 Common fixes:"
    echo "   • Run 'npm install' to install dependencies"
    echo "   • Run 'npm run build' to build the plugin"
    echo "   • Make sure you're in the correct directory"
fi

echo ""