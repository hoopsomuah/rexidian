# Rexidian Recipe Assistant

A conversational interface for recipe management and cooking assistance in Obsidian, inspired by the caret plugin but focused on recipe tools and cooking workflows.

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

### Manual Installation

1. Download the latest release
2. Extract the files to your vault's plugins folder: `VaultFolder/.obsidian/plugins/rexidian/`
3. Reload Obsidian
4. Enable the plugin in Settings > Community Plugins

### Development

1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm run build` to build the plugin
4. Copy `main.js`, `manifest.json`, and `styles.css` to your vault's plugins folder

## Settings

- **Default Servings**: Set the default number of servings for new recipes
- **Show Cooking Tips**: Toggle helpful cooking tips in conversations
- **Clear History**: Remove all conversation history

## Development

This plugin is built with TypeScript and uses esbuild for bundling.

### Build Commands

- `npm run dev` - Start development mode with file watching
- `npm run build` - Build for production

### Project Structure

- `main.ts` - Main plugin code with conversational interface
- `manifest.json` - Plugin manifest for Obsidian
- `styles.css` - CSS styles for the conversational UI
- `esbuild.config.mjs` - Build configuration

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