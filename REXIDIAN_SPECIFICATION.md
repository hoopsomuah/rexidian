# Rexidian: Recipe Automation for Obsidian

**Transform your Obsidian vault into an intelligent workflow engine** - Rexidian brings the power of Microsoft's recipe-tool to Obsidian, enabling you to create, view, and execute automated workflows directly within your notes. Turn natural language ideas into reliable, repeatable processes that work seamlessly with your knowledge management system.

## Project Overview

Rexidian is an Obsidian plugin inspired by [Microsoft's recipe-tool](https://github.com/microsoft/recipe-tool) that enables users to:

- **Create recipes from natural language** - Write workflow ideas in plain English within Obsidian notes
- **Execute automated workflows** - Run multi-step processes that can read files, generate content, call APIs, and more
- **Integrate with Obsidian ecosystem** - Work seamlessly with notes, templates, tags, and Obsidian's plugin ecosystem
- **Self-regenerate** - Eventually regenerate its own code using recipes, following the recipe-tool philosophy

### Core Philosophy

Rexidian follows the modular, AI-driven approach of recipe-tool:
- **Obsidian-Native**: Designed specifically for Obsidian's note-centric workflow
- **TypeScript-First**: Built entirely in TypeScript for type safety and maintainability
- **Recipe-Driven**: Uses JSON recipes as the core automation format
- **Self-Hosting**: Capable of regenerating its own code from specifications
- **Human as Architect**: Users design workflows, Rexidian executes them reliably

## Core Features

### 1. Recipe Creation
- **Natural Language to Recipe**: Convert Obsidian notes containing workflow descriptions into executable JSON recipes
- **Recipe Templates**: Pre-built recipe templates for common Obsidian workflows
- **Interactive Recipe Builder**: GUI for creating recipes without writing JSON
- **Recipe Validation**: Real-time validation and error checking for recipe syntax

### 2. Recipe Execution
- **Background Execution**: Run recipes in the background without blocking Obsidian
- **Step-by-Step Execution**: Execute recipes with progress tracking and intermediate results
- **Context Preservation**: Maintain state and context between recipe steps
- **Error Handling**: Robust error handling with detailed logging and recovery options

### 3. Obsidian Integration
- **Note Processing**: Read, write, and modify Obsidian notes and attachments
- **Template Integration**: Work with Obsidian's template system and community template plugins
- **Tag and Metadata**: Manipulate note tags, frontmatter, and metadata
- **Graph Integration**: Interact with Obsidian's graph structure and relationships
- **Plugin Ecosystem**: Integrate with popular Obsidian plugins (Dataview, Templater, etc.)

### 4. User Interface
- **Recipe Library**: Browse, search, and organize recipes within Obsidian
- **Execution Dashboard**: Monitor running recipes and view execution history
- **Recipe Editor**: Visual editor for creating and modifying recipes
- **Command Palette Integration**: Access recipe functions through Obsidian's command palette
- **Status Bar Integration**: Show recipe execution status in Obsidian's status bar

## Technical Architecture

### Plugin Structure

```
rexidian/
├── src/
│   ├── main.ts                    # Main plugin entry point
│   ├── core/
│   │   ├── recipe-executor.ts     # Core recipe execution engine
│   │   ├── recipe-parser.ts       # Recipe JSON parsing and validation
│   │   ├── context-manager.ts     # Execution context management
│   │   └── error-handler.ts       # Error handling and logging
│   ├── steps/
│   │   ├── base-step.ts           # Base class for all recipe steps
│   │   ├── note-steps.ts          # Note reading/writing operations
│   │   ├── llm-steps.ts           # LLM integration steps
│   │   ├── template-steps.ts      # Template processing steps
│   │   ├── file-steps.ts          # File system operations
│   │   └── obsidian-steps.ts      # Obsidian-specific operations
│   ├── ui/
│   │   ├── recipe-library.ts      # Recipe management interface
│   │   ├── recipe-editor.ts       # Visual recipe editor
│   │   ├── execution-dashboard.ts # Execution monitoring
│   │   └── components/            # Reusable UI components
│   ├── services/
│   │   ├── llm-service.ts         # LLM API integration
│   │   ├── template-service.ts    # Template processing service
│   │   └── vault-service.ts       # Obsidian vault operations
│   ├── types/
│   │   ├── recipe.ts              # Recipe type definitions
│   │   ├── step.ts                # Step type definitions
│   │   └── context.ts             # Context type definitions
│   └── utils/
│       ├── liquid-processor.ts    # Liquid template processing
│       ├── note-parser.ts         # Note content parsing
│       └── recipe-generator.ts    # Natural language to recipe conversion
├── recipes/
│   ├── built-in/                  # Built-in recipe templates
│   └── examples/                  # Example recipes
├── styles.css                     # Plugin styles
├── manifest.json                  # Obsidian plugin manifest
└── package.json                   # Node.js dependencies
```

### Recipe Format

Rexidian recipes extend the recipe-tool format with Obsidian-specific capabilities:

```json
{
  "name": "daily_note_summary",
  "description": "Generate a summary of daily notes for the week",
  "version": "1.0.0",
  "inputs": {
    "date_range": {
      "type": "string",
      "description": "Date range in YYYY-MM-DD format",
      "default": "{{ 'now' | date: '%Y-%m-%d' }}"
    }
  },
  "steps": [
    {
      "step_type": "obsidian_query",
      "query": "path:Daily\\ Notes created:{{ date_range }}",
      "output_key": "daily_notes"
    },
    {
      "step_type": "read_notes",
      "notes": "{{ daily_notes }}",
      "output_key": "note_contents"
    },
    {
      "step_type": "llm_generate",
      "prompt": "Create a weekly summary of these daily notes:\n\n{% for note in note_contents %}## {{ note.title }}\n{{ note.content }}\n\n{% endfor %}",
      "output_key": "summary"
    },
    {
      "step_type": "create_note",
      "title": "Weekly Summary - {{ date_range }}",
      "content": "{{ summary }}",
      "folder": "Summaries",
      "tags": ["summary", "weekly"]
    }
  ]
}
```

### Core Step Types

#### Obsidian-Specific Steps
- **`obsidian_query`**: Query notes using Obsidian's search syntax
- **`read_notes`**: Read content from one or more notes
- **`create_note`**: Create a new note with specified content
- **`update_note`**: Modify existing note content
- **`add_tags`**: Add tags to notes
- **`update_frontmatter`**: Modify note frontmatter/metadata
- **`create_folder`**: Create folders in the vault
- **`move_note`**: Move notes between folders

#### LLM Integration Steps
- **`llm_generate`**: Generate text using configured LLM APIs
- **`llm_analyze`**: Analyze content and extract structured data
- **`llm_transform`**: Transform content according to instructions

#### Template Steps
- **`apply_template`**: Apply Obsidian templates to content
- **`process_liquid`**: Process Liquid template syntax
- **`generate_from_template`**: Create content using template files

#### File Operations
- **`read_files`**: Read files from the vault or system
- **`write_files`**: Write files to the vault or system
- **`copy_files`**: Copy files within the vault
- **`delete_files`**: Delete files from the vault

#### Control Flow Steps
- **`conditional`**: Execute steps based on conditions
- **`loop`**: Iterate over collections
- **`sub_recipe`**: Execute another recipe as a step
- **`parallel`**: Execute multiple steps in parallel
- **`delay`**: Add delays between steps

## User Interface Design

### 1. Recipe Library Panel

A dedicated panel accessible from Obsidian's left sidebar:

```
┌─ Recipe Library ──────────────────────┐
│ 🔍 Search recipes...                  │
├────────────────────────────────────────┤
│ 📁 Categories                          │
│   ├─ 📄 Note Processing (5)           │
│   ├─ 🤖 AI Generation (3)             │
│   ├─ 📊 Data Analysis (2)             │
│   └─ 🔄 Maintenance (4)               │
├────────────────────────────────────────┤
│ ⭐ Recent                              │
│   • Daily Note Summary                │
│   • Tag Cleanup                       │
│   • Weekly Review Generator           │
├────────────────────────────────────────┤
│ ▶️ Quick Actions                       │
│   • Run Recipe                        │
│   • Create New Recipe                 │
│   • Import Recipe                     │
└────────────────────────────────────────┘
```

### 2. Recipe Editor Modal

A comprehensive editor for creating and modifying recipes:

```
┌─ Recipe Editor ───────────────────────────────────────┐
│ Recipe Name: [Daily Note Summary              ]       │
│ Description: [Generate weekly summaries...    ]       │
├───────────────────────────────────────────────────────┤
│ 📝 Natural Language Input                             │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ I want to find all daily notes from this week,     │ │
│ │ read their content, and create a summary using AI  │ │
│ │ that gets saved to a new note in the Summaries     │ │
│ │ folder with appropriate tags.                       │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                       │
│ 🔄 Generate Recipe    📋 Edit JSON    👁️ Preview      │
├───────────────────────────────────────────────────────┤
│ 🔧 Generated Recipe Steps                             │
│ ┌─ Step 1: Query Daily Notes ─────────────────────────┐ │
│ │ Type: obsidian_query                               │ │
│ │ Query: path:Daily\ Notes created:this-week         │ │
│ └─────────────────────────────────────────────────────┘ │
│ ┌─ Step 2: Read Note Contents ─────────────────────────┐ │
│ │ Type: read_notes                                   │ │
│ │ Input: {{ daily_notes }}                           │ │
│ └─────────────────────────────────────────────────────┘ │
│ ┌─ Step 3: Generate Summary ───────────────────────────┐ │
│ │ Type: llm_generate                                 │ │
│ │ Model: gpt-4                                       │ │
│ └─────────────────────────────────────────────────────┘ │
├───────────────────────────────────────────────────────┤
│                    💾 Save    ✅ Test    ❌ Cancel     │
└───────────────────────────────────────────────────────┘
```

### 3. Execution Dashboard

Monitor running recipes and view execution history:

```
┌─ Recipe Execution Dashboard ──────────────────────────┐
│ 🟢 Active Executions (2)                             │
│ ┌─ Daily Note Summary ─────────────────────────────────┐ │
│ │ ████████████████████░░ 80% Step 4/5               │ │
│ │ Currently: Generating AI summary...                │ │
│ │ ⏸️ Pause  ⏹️ Stop  📋 View Log                      │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                       │
│ 📊 Recent Executions                                  │
│ • Weekly Review Generator  ✅ 2 min ago               │
│ • Tag Cleanup             ✅ 1 hour ago              │
│ • Note Backup             ❌ 3 hours ago             │
│                                                       │
│ 📈 Statistics                                         │
│ • Total Executions: 127                              │
│ • Success Rate: 94%                                   │
│ • Avg Duration: 45s                                   │
└───────────────────────────────────────────────────────┘
```

### 4. Command Palette Integration

Integrate seamlessly with Obsidian's command palette:

- `Rexidian: Run recipe...` - Quick recipe execution
- `Rexidian: Create new recipe` - Open recipe editor
- `Rexidian: Open recipe library` - Show recipe library panel
- `Rexidian: Convert note to recipe` - Transform current note into recipe
- `Rexidian: Show execution dashboard` - Open execution monitor
- `Rexidian: Pause all recipes` - Emergency stop for all running recipes

## Implementation Plan

### Phase 1: Core Infrastructure (MVP)
1. **Plugin Foundation**
   - Set up Obsidian plugin boilerplate with TypeScript
   - Implement basic plugin lifecycle (load, unload, settings)
   - Create core recipe data structures and types

2. **Recipe Executor Engine**
   - Build the core recipe execution engine
   - Implement basic step types (read_notes, create_note, llm_generate)
   - Add context management and error handling

3. **Basic UI**
   - Create simple recipe library panel
   - Implement basic recipe editor (JSON-based)
   - Add command palette integration

### Phase 2: Enhanced Functionality
1. **Advanced Step Types**
   - Implement all Obsidian-specific steps
   - Add template processing capabilities
   - Include file operations and control flow steps

2. **Natural Language Processing**
   - Integrate LLM service for recipe generation
   - Implement natural language to recipe conversion
   - Add recipe validation and optimization

3. **Enhanced UI**
   - Build visual recipe editor with drag-and-drop
   - Create execution dashboard with real-time monitoring
   - Add recipe categorization and search

### Phase 3: Advanced Features
1. **Plugin Ecosystem Integration**
   - Integrate with Dataview plugin for queries
   - Support Templater plugin syntax
   - Add compatibility with popular community plugins

2. **Recipe Marketplace**
   - Create system for sharing recipes
   - Implement recipe import/export
   - Add community recipe repository

3. **Performance Optimization**
   - Implement recipe caching and optimization
   - Add parallel execution capabilities
   - Optimize memory usage for large vaults

### Phase 4: Self-Regeneration
1. **Blueprint System**
   - Create markdown blueprints for plugin components
   - Implement blueprint to TypeScript code generation
   - Add self-regeneration recipes

2. **Code Generation**
   - Build recipes that can modify plugin source code
   - Implement automatic code formatting and validation
   - Add version control integration for generated code

3. **Meta-Programming**
   - Enable recipes to create other recipes
   - Implement recipe composition and inheritance
   - Add automatic plugin updates via recipes

## Recipe Examples

### Example 1: Daily Note Template
```markdown
I want to create a daily note template that includes:
- Today's date as the title
- A weather widget
- My calendar events for today
- A section for daily goals
- A section for reflections
```

**Generated Recipe:**
```json
{
  "name": "create_daily_note",
  "description": "Create a comprehensive daily note with weather, calendar, and planning sections",
  "steps": [
    {
      "step_type": "create_note",
      "title": "{{ 'now' | date: '%Y-%m-%d' }}",
      "folder": "Daily Notes",
      "content": "# {{ 'now' | date: '%A, %B %d, %Y' }}\n\n## Weather\n{{ weather }}\n\n## Calendar Events\n{{ calendar_events }}\n\n## Daily Goals\n- [ ] \n\n## Reflections\n\n"
    },
    {
      "step_type": "llm_generate",
      "prompt": "Get today's weather for my location",
      "output_key": "weather"
    },
    {
      "step_type": "calendar_fetch",
      "date": "{{ 'now' | date: '%Y-%m-%d' }}",
      "output_key": "calendar_events"
    }
  ]
}
```

### Example 2: Knowledge Graph Analysis
```markdown
Analyze my vault's structure and create a report showing:
- Most connected notes
- Orphaned notes without links
- Tag usage statistics
- Suggestions for new connections
```

**Generated Recipe:**
```json
{
  "name": "vault_analysis",
  "description": "Comprehensive analysis of vault structure and connections",
  "steps": [
    {
      "step_type": "obsidian_query",
      "query": "*",
      "output_key": "all_notes"
    },
    {
      "step_type": "analyze_graph",
      "notes": "{{ all_notes }}",
      "output_key": "graph_data"
    },
    {
      "step_type": "llm_analyze",
      "prompt": "Analyze this vault structure data and provide insights:\n{{ graph_data | json }}",
      "output_key": "analysis"
    },
    {
      "step_type": "create_note",
      "title": "Vault Analysis - {{ 'now' | date: '%Y-%m-%d' }}",
      "content": "{{ analysis }}",
      "folder": "Meta",
      "tags": ["analysis", "vault-stats"]
    }
  ]
}
```

### Example 3: Content Maintenance
```markdown
Find all notes that haven't been updated in 30 days, check if they're still relevant using AI, and either suggest updates or flag them for review.
```

**Generated Recipe:**
```json
{
  "name": "content_maintenance",
  "description": "Identify and review stale content in the vault",
  "steps": [
    {
      "step_type": "obsidian_query",
      "query": "modified:<30days",
      "output_key": "stale_notes"
    },
    {
      "step_type": "loop",
      "items": "{{ stale_notes }}",
      "steps": [
        {
          "step_type": "read_notes",
          "notes": "{{ item }}",
          "output_key": "note_content"
        },
        {
          "step_type": "llm_analyze",
          "prompt": "Assess if this note content is still relevant and suggest updates:\n{{ note_content }}",
          "output_key": "relevance_check"
        },
        {
          "step_type": "conditional",
          "condition": "{{ relevance_check.needs_update }}",
          "if_true": {
            "step_type": "add_tags",
            "notes": "{{ item }}",
            "tags": ["needs-review"]
          }
        }
      ]
    }
  ]
}
```

## Self-Regeneration Architecture

Following the recipe-tool philosophy, Rexidian will be capable of regenerating its own code:

### 1. Blueprint System
- **Component Blueprints**: Markdown specifications for each plugin component
- **API Blueprints**: Detailed specifications for TypeScript interfaces and classes
- **UI Blueprints**: Descriptions of user interface components and interactions

### 2. Code Generation Recipes
- **TypeScript Generator**: Recipe that converts blueprints to TypeScript code
- **Component Generator**: Specialized recipes for different component types
- **Test Generator**: Recipes that create unit tests from specifications

### 3. Meta-Programming Capabilities
- **Recipe Self-Modification**: Recipes that can modify other recipes
- **Plugin Self-Update**: Recipes that can update the plugin's own code
- **Feature Generator**: Recipes that add new features based on user requests

### Example Self-Regeneration Recipe
```json
{
  "name": "regenerate_plugin",
  "description": "Regenerate Rexidian plugin code from blueprints",
  "steps": [
    {
      "step_type": "read_files",
      "paths": ["blueprints/**/*.md"],
      "output_key": "blueprints"
    },
    {
      "step_type": "llm_generate",
      "prompt": "Convert these TypeScript component blueprints to working code:\n{{ blueprints | json }}",
      "output_key": "generated_code"
    },
    {
      "step_type": "write_files",
      "files": "{{ generated_code.files }}",
      "base_path": "src/"
    },
    {
      "step_type": "run_tests",
      "test_command": "npm test"
    }
  ]
}
```

## Integration Points

### Obsidian Core Features
- **File System**: Deep integration with Obsidian's file management
- **Search**: Leverage Obsidian's powerful search capabilities
- **Graph View**: Interact with and analyze note relationships
- **Templates**: Extend Obsidian's template system
- **Tags**: Manipulate and analyze tag structures
- **Metadata**: Work with frontmatter and note properties

### Community Plugin Ecosystem
- **Dataview**: Execute Dataview queries within recipes
- **Templater**: Use Templater syntax in recipe templates
- **Calendar**: Integrate with calendar plugins for scheduling
- **Kanban**: Create and modify Kanban boards
- **Tasks**: Manage task lists and recurring todos
- **Charts**: Generate charts and visualizations

### External Services
- **LLM APIs**: OpenAI, Anthropic, Cohere, local models
- **Automation Tools**: Zapier, IFTTT, webhooks
- **Cloud Services**: Google Drive, Dropbox, OneDrive
- **Developer Tools**: GitHub, GitLab, API endpoints
- **Data Sources**: RSS feeds, web scraping, databases

## Configuration and Settings

### Plugin Settings Panel
```typescript
interface RexidianSettings {
  // LLM Configuration
  llm: {
    provider: 'openai' | 'anthropic' | 'cohere' | 'local';
    apiKey: string;
    model: string;
    temperature: number;
    maxTokens: number;
  };
  
  // Execution Settings
  execution: {
    maxConcurrentRecipes: number;
    defaultTimeout: number;
    enableBackgroundExecution: boolean;
    logLevel: 'debug' | 'info' | 'warn' | 'error';
  };
  
  // UI Preferences
  ui: {
    showExecutionNotifications: boolean;
    autoSaveRecipes: boolean;
    defaultRecipeFolder: string;
    enableAdvancedEditor: boolean;
  };
  
  // Security Settings
  security: {
    allowFileSystemAccess: boolean;
    allowNetworkRequests: boolean;
    trustedDomains: string[];
    enableSafeMode: boolean;
  };
}
```

### Recipe Storage
- **Local Storage**: Recipes stored in `.obsidian/plugins/rexidian/recipes/`
- **Note-based Storage**: Option to store recipes as special notes in the vault
- **Export/Import**: JSON export for sharing recipes between vaults
- **Version Control**: Git integration for recipe version management

## Security Considerations

### Execution Safety
- **Sandboxing**: Limit recipe execution to safe operations
- **Permission System**: Explicit permissions for file access and network requests
- **Code Review**: Automatic analysis of recipe code for security issues
- **Safe Mode**: Restricted execution mode for untrusted recipes

### Data Privacy
- **Local Execution**: Default to local-only processing where possible
- **API Key Management**: Secure storage and handling of API credentials
- **Data Encryption**: Encrypt sensitive recipe data at rest
- **Audit Logging**: Track all recipe executions and file modifications

## Development Guidelines

### TypeScript Best Practices
- **Strict Type Checking**: Enable all TypeScript strict mode options
- **Interface-Driven Design**: Define clear interfaces for all components
- **Dependency Injection**: Use DI for better testing and modularity
- **Error Handling**: Comprehensive error handling with typed exceptions

### Testing Strategy
- **Unit Tests**: Test individual components and functions
- **Integration Tests**: Test recipe execution end-to-end
- **Performance Tests**: Ensure recipes execute efficiently
- **User Acceptance Tests**: Validate UI interactions and workflows

### Code Organization
- **Modular Architecture**: Small, focused modules with clear responsibilities
- **Plugin Architecture**: Extensible system for adding new step types
- **Event-Driven Design**: Use events for loose coupling between components
- **Configuration-Driven**: Make behavior configurable rather than hard-coded

## Future Enhancements

### Advanced AI Integration
- **Multi-Modal AI**: Support for image and audio processing
- **Fine-Tuned Models**: Custom models trained on vault content
- **Agentic Workflows**: AI agents that can make decisions and adapt recipes
- **Natural Language Debugging**: AI-powered recipe troubleshooting

### Collaboration Features
- **Recipe Sharing**: Community marketplace for recipes
- **Collaborative Editing**: Multi-user recipe development
- **Team Vaults**: Shared recipes across team members
- **Recipe Reviews**: Peer review system for recipe quality

### Advanced Automation
- **Scheduled Execution**: Cron-like scheduling for recurring recipes
- **Trigger-Based Execution**: Execute recipes based on vault events
- **Workflow Orchestration**: Complex multi-recipe workflows
- **Real-Time Processing**: Live processing of note changes

## Success Metrics

### User Adoption
- **Active Users**: Number of daily active users
- **Recipe Creation**: Number of recipes created per user
- **Recipe Execution**: Frequency of recipe usage
- **Community Growth**: Recipe sharing and collaboration metrics

### Technical Performance
- **Execution Speed**: Average recipe execution time
- **Memory Usage**: Plugin memory footprint
- **Error Rates**: Recipe failure and error frequencies
- **Plugin Stability**: Crash rates and stability metrics

### Feature Usage
- **Step Type Popularity**: Most used recipe step types
- **UI Engagement**: Usage of different interface components
- **Advanced Features**: Adoption of complex recipe features
- **Self-Regeneration**: Usage of meta-programming capabilities

## Conclusion

Rexidian represents a new paradigm for knowledge management automation within Obsidian. By bringing the power of recipe-tool's workflow automation to the note-taking environment, users can create sophisticated, repeatable processes that enhance their productivity and knowledge work.

The plugin's self-regenerating architecture ensures it can evolve and improve over time, while its deep integration with Obsidian's ecosystem makes it a natural extension of users' existing workflows. Whether automating simple note creation tasks or building complex knowledge analysis pipelines, Rexidian empowers users to transform their Obsidian vault into an intelligent, automated workspace.

Through careful attention to user experience, security, and extensibility, Rexidian will establish itself as an essential tool for power users who want to unlock the full potential of their Obsidian vault through intelligent automation.

---

*This specification serves as a comprehensive blueprint for developing the Rexidian Obsidian plugin. It should be used by AI coding agents and developers to implement a fully-functional recipe automation system for Obsidian that maintains the philosophy and capabilities of Microsoft's recipe-tool while providing deep integration with Obsidian's unique features and ecosystem.*