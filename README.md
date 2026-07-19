# Rexidian Recipe Assistant

A conversational interface for recipe management and cooking assistance in Obsidian, inspired by the caret plugin but focused on [recipe tools](https://github.com/hoopsomuah/recipe-tool) and cooking workflows.

## Features

- **Conversational Interface**: Ask questions about recipes, cooking techniques, and ingredient substitutions
- **Recipe Templates**: Quickly create structured recipe notes
- **Smart Assistant**: Get cooking tips and recipe suggestions
- **Conversation History**: Persistent chat history across sessions
- **Customizable Settings**: Configure default servings and preferences

## Usage

### Opening the Recipe Assistant

- Click the chef hat icon in the ribbon
- Use the command palette: "Open Recipe Assistant"
- Use the hotkey (if configured)

### Creating New Recipes

- Use the command palette: "Create New Recipe"
- The plugin will insert a structured recipe template at your cursor

### Conversational Interface

The recipe assistant provides a chat-like interface where you can:

- Ask for recipe suggestions
- Get help with ingredient substitutions
- Learn about cooking techniques
- Get meal planning ideas
- Modify existing recipes

## Installation

### Method 1: Manual Installation (Recommended)

1. **Download the plugin files**:
   - Download the latest release from the GitHub repository
   - Or clone this repository and build it (see Development section below)

2. **Locate your Obsidian vault's plugins folder**:
   ```
   YourVault/.obsidian/plugins/
   ```
   - On Windows: `%USERPROFILE%\Documents\YourVault\.obsidian\plugins\`
   - On macOS: `~/Documents/YourVault/.obsidian/plugins/`
   - On Linux: `~/Documents/YourVault/.obsidian/plugins/`

3. **Create the plugin directory**:
   ```
   YourVault/.obsidian/plugins/rexidian/
   ```

4. **Copy the required files**:
   Copy these three files to the `rexidian` folder:
   - `main.js` (the compiled plugin code)
   - `manifest.json` (plugin metadata)
   - `styles.css` (plugin styling)

5. **Restart Obsidian**:
   - Close and reopen Obsidian
   - Or use Ctrl+R (Cmd+R on macOS) to reload

6. **Enable the plugin**:
   - Go to Settings → Community Plugins
   - Find "Rexidian Recipe Assistant" in the list
   - Toggle it on

### Method 1b: Using Installation Scripts

For easier installation, you can use the provided scripts after building the plugin:

**First, verify the plugin is ready:**
```bash
# Verify all files are present and valid
./verify.sh
```

**Then install:**

**On Windows:**
```bash
# After building the plugin
install.bat
```

**On macOS/Linux:**
```bash
# After building the plugin
./install.sh
```

These scripts will:
- Verify all required files are present
- Prompt you for your vault location
- Automatically copy files to the correct directory
- Provide next steps for enabling the plugin

### Method 2: Development Installation

If you want to build from source or contribute to development:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/hoopsomuah/rexidian.git
   cd rexidian
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Build the plugin**:
   ```bash
   npm run build
   ```

4. **Copy files to your vault**:
   ```bash
   # Replace 'YourVault' with your actual vault name
   cp main.js manifest.json styles.css "/path/to/YourVault/.obsidian/plugins/rexidian/"
   ```

5. **Restart and enable** (same as Method 1, steps 5-6)

## Testing the Plugin

After installation, verify that the plugin is working correctly by following these steps:

### Basic Functionality Test

1. **Verify plugin is loaded**:
   - Look for the chef hat (🍳) icon in the ribbon (left sidebar)
   - If you don't see it, check Settings → Community Plugins and ensure "Rexidian Recipe Assistant" is enabled

2. **Test the Recipe Assistant dialog**:
   - Click the chef hat icon in the ribbon, OR
   - Open Command Palette (Ctrl+P / Cmd+P) and type "Open Recipe Assistant"
   - A modal dialog should open with the title "Recipe Assistant"
   - You should see a welcome message from the assistant

3. **Test the conversational interface**:
   - Type a message like "I want to cook pasta" in the input field
   - Press Enter or click "Send"
   - The assistant should respond with a helpful message
   - Your message should appear on the right (blue), assistant's on the left (gray)

4. **Test recipe template creation**:
   - Open any note in Obsidian
   - Open Command Palette (Ctrl+P / Cmd+P)
   - Type "Create New Recipe" and select the command
   - A recipe template should be inserted at your cursor position

### Settings Test

1. **Open plugin settings**:
   - Go to Settings → Community Plugins
   - Find "Rexidian Recipe Assistant" and click the gear icon

2. **Test settings functionality**:
   - Change "Default servings" from 4 to 6
   - Toggle "Show cooking tips" on/off
   - Create a new recipe template to verify the serving count updated

3. **Test conversation history**:
   - Have a conversation with the assistant (send a few messages)
   - Close the modal and reopen it
   - Your conversation history should persist
   - Use "Clear History" button in settings to reset

### Troubleshooting

**Plugin not appearing in ribbon:**
- Check if the plugin is enabled in Settings → Community Plugins
- Restart Obsidian (Ctrl+R / Cmd+R)
- Verify all three files (main.js, manifest.json, styles.css) are in the correct folder

**Plugin not responding:**
- Open Developer Console (Ctrl+Shift+I / Cmd+Option+I)
- Look for any error messages in the Console tab
- Try disabling and re-enabling the plugin

**Template not inserting:**
- Make sure you have a note open and the cursor is positioned in the editor
- Try clicking in the note editor before using the command

**Conversation not saving:**
- Check if you have write permissions to your vault folder
- Look for error messages in the Developer Console

### Advanced Testing (For Developers)

If you're developing or want to test the plugin thoroughly:

1. **Enable Developer Tools**:
   ```
   View → Toggle Developer Tools (or Ctrl+Shift+I / Cmd+Option+I)
   ```

2. **Check for console errors**:
   - Monitor the Console tab for any error messages
   - Plugin should log "Rexidian Recipe Assistant loaded" on startup

3. **Test with different themes**:
   - Switch between light and dark themes
   - Verify the plugin UI adapts correctly

4. **Test responsive design**:
   - Resize the Obsidian window to different sizes
   - The modal should adapt for smaller screens

### Expected Behavior Summary

✅ **What should work:**
- Chef hat icon appears in ribbon
- Modal opens when icon is clicked
- Conversation interface accepts and responds to messages
- Recipe template inserts properly formatted content
- Settings persist between sessions
- Conversation history is maintained
- UI is responsive and follows Obsidian's theme

❌ **Known limitations:**
- Assistant responses are mock responses (not connected to AI service)
- No external API integration yet
- Limited recipe parsing/analysis functionality

## Settings

Configure the plugin behavior in Settings → Community Plugins → Rexidian Recipe Assistant (gear icon):

- **Default Servings**: Set the default number of servings for new recipes (default: 4)
- **Show Cooking Tips**: Toggle helpful cooking tips in conversations (default: enabled)
- **Clear History**: Remove all conversation history (warning: this cannot be undone)

## Development

This plugin is built with TypeScript and uses esbuild for bundling.

### Development Setup

1. **Prerequisites**:
   - Node.js (version 16 or higher)
   - npm (comes with Node.js)
   - Git

2. **Clone and setup**:
   ```bash
   git clone https://github.com/hoopsomuah/rexidian.git
   cd rexidian
   npm install
   ```

3. **Development workflow**:
   ```bash
   # Start development mode with file watching
   npm run dev
   
   # Build for production
   npm run build
   
   # Type checking only (no build)
   npx tsc --noEmit --skipLibCheck
   ```

4. **Testing during development**:
   - Make changes to `main.ts`
   - Run `npm run build` to compile
   - Copy the generated files to your test vault:
     ```bash
     cp main.js manifest.json styles.css "/path/to/TestVault/.obsidian/plugins/rexidian/"
     ```
   - Reload Obsidian (Ctrl+R / Cmd+R) to test changes

### Build Commands

- `npm run dev` - Start development mode with file watching
- `npm run build` - Build for production
- `npm run version` - Bump version and update manifest

### Project Structure

- `main.ts` - Main plugin code with conversational interface
- `manifest.json` - Plugin manifest for Obsidian
- `styles.css` - CSS styles for the conversational UI
- `esbuild.config.mjs` - Build configuration
- `install.sh` / `install.bat` - Installation helper scripts
- `verify.sh` - Plugin verification script

## Roadmap

- [ ] Integration with external recipe APIs
- [ ] AI-powered recipe suggestions
- [ ] Shopping list generation
- [ ] Meal planning calendar
- [ ] Recipe scaling and unit conversion
- [ ] Nutritional information display
- [ ] Recipe sharing and export

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details