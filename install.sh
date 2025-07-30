#!/bin/bash

# Rexidian Recipe Assistant - Installation Script
# This script helps install the plugin to your Obsidian vault

set -e

echo "🍳 Rexidian Recipe Assistant - Installation Script"
echo "================================================="

# Check if we have the required files
if [ ! -f "main.js" ] || [ ! -f "manifest.json" ] || [ ! -f "styles.css" ]; then
    echo "❌ Error: Required plugin files not found!"
    echo "   Make sure you have built the plugin first:"
    echo "   npm install && npm run build"
    exit 1
fi

# Ask for vault path
echo ""
echo "📁 Please enter the path to your Obsidian vault:"
echo "   (e.g., /Users/username/Documents/MyVault or C:\\Users\\username\\Documents\\MyVault)"
read -p "Vault path: " VAULT_PATH

# Validate vault path
if [ ! -d "$VAULT_PATH" ]; then
    echo "❌ Error: Vault directory does not exist: $VAULT_PATH"
    exit 1
fi

# Check for .obsidian directory
OBSIDIAN_DIR="$VAULT_PATH/.obsidian"
if [ ! -d "$OBSIDIAN_DIR" ]; then
    echo "❌ Error: .obsidian directory not found in $VAULT_PATH"
    echo "   Make sure this is a valid Obsidian vault."
    exit 1
fi

# Create plugins directory if it doesn't exist
PLUGINS_DIR="$OBSIDIAN_DIR/plugins"
if [ ! -d "$PLUGINS_DIR" ]; then
    echo "📂 Creating plugins directory..."
    mkdir -p "$PLUGINS_DIR"
fi

# Create rexidian plugin directory
PLUGIN_DIR="$PLUGINS_DIR/rexidian"
echo "📂 Creating plugin directory: $PLUGIN_DIR"
mkdir -p "$PLUGIN_DIR"

# Copy files
echo "📋 Copying plugin files..."
cp main.js "$PLUGIN_DIR/"
cp manifest.json "$PLUGIN_DIR/"
cp styles.css "$PLUGIN_DIR/"

echo ""
echo "✅ Installation complete!"
echo ""
echo "📝 Next steps:"
echo "1. Restart Obsidian or press Ctrl+R (Cmd+R on macOS) to reload"
echo "2. Go to Settings → Community Plugins"
echo "3. Find 'Rexidian Recipe Assistant' and toggle it on"
echo "4. Look for the chef hat (🍳) icon in the ribbon!"
echo ""
echo "🧪 To test the plugin:"
echo "- Click the chef hat icon to open the Recipe Assistant"
echo "- Use Command Palette and search for 'Recipe' commands"
echo ""
echo "📚 For more help, see README.md"