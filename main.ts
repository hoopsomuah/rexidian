import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

// Recipe-related interfaces
interface Recipe {
	id: string;
	name: string;
	ingredients: Ingredient[];
	instructions: string[];
	servings?: number;
	prepTime?: number;
	cookTime?: number;
	tags?: string[];
}

interface Ingredient {
	name: string;
	amount: string;
	unit?: string;
	optional?: boolean;
}

interface RexidianSettings {
	conversationHistory: ConversationMessage[];
	defaultServings: number;
	showCookingTips: boolean;
}

interface ConversationMessage {
	role: 'user' | 'assistant';
	content: string;
	timestamp: number;
}

const DEFAULT_SETTINGS: RexidianSettings = {
	conversationHistory: [],
	defaultServings: 4,
	showCookingTips: true
}

export default class RexidianPlugin extends Plugin {
	settings: RexidianSettings;

	async onload() {
		await this.loadSettings();

		// Add ribbon icon
		const ribbonIconEl = this.addRibbonIcon('chef-hat', 'Rexidian Recipe Assistant', (evt: MouseEvent) => {
			new RecipeConversationModal(this.app, this).open();
		});
		ribbonIconEl.addClass('rexidian-ribbon-class');

		// Add command to open recipe assistant
		this.addCommand({
			id: 'open-recipe-assistant',
			name: 'Open Recipe Assistant',
			callback: () => {
				new RecipeConversationModal(this.app, this).open();
			}
		});

		// Add command to create new recipe
		this.addCommand({
			id: 'create-new-recipe',
			name: 'Create New Recipe',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				this.createNewRecipe(editor);
			}
		});

		// Add settings tab
		this.addSettingTab(new RexidianSettingTab(this.app, this));

		console.log('Rexidian Recipe Assistant loaded');
	}

	onunload() {
		console.log('Rexidian Recipe Assistant unloaded');
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	private createNewRecipe(editor: Editor) {
		const recipeTemplate = `# Recipe Name

## Ingredients
- 

## Instructions
1. 

## Notes
- Prep time: 
- Cook time: 
- Servings: ${this.settings.defaultServings}

---
*Created with Rexidian Recipe Assistant*`;

		editor.replaceSelection(recipeTemplate);
		new Notice('Recipe template created');
	}
}

class RecipeConversationModal extends Modal {
	plugin: RexidianPlugin;
	chatContainer: HTMLElement;
	inputEl: HTMLInputElement;

	constructor(app: App, plugin: RexidianPlugin) {
		super(app);
		this.plugin = plugin;
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.empty();
		contentEl.addClass('rexidian-modal');

		// Modal header
		const headerEl = contentEl.createEl('div', { cls: 'rexidian-header' });
		headerEl.createEl('h2', { text: 'Recipe Assistant' });
		headerEl.createEl('p', { 
			text: 'Ask me anything about recipes, cooking techniques, or ingredient substitutions!',
			cls: 'rexidian-subtitle'
		});

		// Chat container
		this.chatContainer = contentEl.createEl('div', { cls: 'rexidian-chat-container' });
		
		// Load conversation history
		this.loadConversationHistory();

		// Input container
		const inputContainer = contentEl.createEl('div', { cls: 'rexidian-input-container' });
		
		this.inputEl = inputContainer.createEl('input', {
			type: 'text',
			placeholder: 'Ask about recipes, ingredients, or cooking tips...',
			cls: 'rexidian-input'
		});

		const sendButton = inputContainer.createEl('button', {
			text: 'Send',
			cls: 'rexidian-send-button'
		});

		// Event listeners
		this.inputEl.addEventListener('keypress', (e) => {
			if (e.key === 'Enter') {
				this.sendMessage();
			}
		});

		sendButton.addEventListener('click', () => {
			this.sendMessage();
		});

		// Focus input
		this.inputEl.focus();

		// Add initial greeting if no conversation history
		if (this.plugin.settings.conversationHistory.length === 0) {
			this.addAssistantMessage("Hello! I'm your recipe assistant. I can help you with:\n\n• Recipe suggestions and modifications\n• Ingredient substitutions\n• Cooking techniques and tips\n• Meal planning ideas\n\nWhat would you like to cook today?");
		}
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}

	private async sendMessage() {
		const message = this.inputEl.value.trim();
		if (!message) return;

		// Add user message
		this.addUserMessage(message);
		
		// Clear input
		this.inputEl.value = '';

		// Simulate assistant response (in a real implementation, this would connect to an AI service)
		setTimeout(() => {
			this.handleAssistantResponse(message);
		}, 1000);
	}

	private addUserMessage(content: string) {
		const messageEl = this.chatContainer.createEl('div', { cls: 'rexidian-message rexidian-user-message' });
		messageEl.createEl('div', { text: content, cls: 'rexidian-message-content' });
		
		const timestamp = Date.now();
		this.plugin.settings.conversationHistory.push({
			role: 'user',
			content,
			timestamp
		});
		
		this.plugin.saveSettings();
		this.scrollToBottom();
	}

	private addAssistantMessage(content: string) {
		const messageEl = this.chatContainer.createEl('div', { cls: 'rexidian-message rexidian-assistant-message' });
		messageEl.createEl('div', { text: content, cls: 'rexidian-message-content' });
		
		const timestamp = Date.now();
		this.plugin.settings.conversationHistory.push({
			role: 'assistant',
			content,
			timestamp
		});
		
		this.plugin.saveSettings();
		this.scrollToBottom();
	}

	private handleAssistantResponse(userMessage: string) {
		// Simple mock responses - in real implementation, this would use AI
		const responses = [
			"That sounds delicious! Let me help you with that recipe. What ingredients do you have available?",
			"Great choice! I can suggest some variations or help you adjust the recipe for different dietary needs.",
			"I'd be happy to help! Could you tell me more about what you're looking for - something quick, healthy, or perhaps for a special occasion?",
			"Excellent question! Here are some tips that might help you with that cooking technique.",
			"For ingredient substitutions, I recommend checking what you have in your pantry first. What are you trying to replace?"
		];
		
		const randomResponse = responses[Math.floor(Math.random() * responses.length)];
		this.addAssistantMessage(randomResponse);
	}

	private loadConversationHistory() {
		this.plugin.settings.conversationHistory.forEach(message => {
			const messageEl = this.chatContainer.createEl('div', { 
				cls: `rexidian-message rexidian-${message.role}-message` 
			});
			messageEl.createEl('div', { text: message.content, cls: 'rexidian-message-content' });
		});
		this.scrollToBottom();
	}

	private scrollToBottom() {
		setTimeout(() => {
			this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
		}, 100);
	}
}

class RexidianSettingTab extends PluginSettingTab {
	plugin: RexidianPlugin;

	constructor(app: App, plugin: RexidianPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		containerEl.createEl('h2', { text: 'Rexidian Recipe Assistant Settings' });

		new Setting(containerEl)
			.setName('Default servings')
			.setDesc('Default number of servings for new recipes')
			.addText(text => text
				.setPlaceholder('4')
				.setValue(this.plugin.settings.defaultServings.toString())
				.onChange(async (value) => {
					const num = parseInt(value);
					if (!isNaN(num) && num > 0) {
						this.plugin.settings.defaultServings = num;
						await this.plugin.saveSettings();
					}
				}));

		new Setting(containerEl)
			.setName('Show cooking tips')
			.setDesc('Display helpful cooking tips in conversations')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.showCookingTips)
				.onChange(async (value) => {
					this.plugin.settings.showCookingTips = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Clear conversation history')
			.setDesc('Remove all conversation history')
			.addButton(button => button
				.setButtonText('Clear History')
				.setWarning()
				.onClick(async () => {
					this.plugin.settings.conversationHistory = [];
					await this.plugin.saveSettings();
					new Notice('Conversation history cleared');
				}));
	}
}