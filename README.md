# Pokémon Features

A comprehensive Vue 3 application showcasing all Pokémon features including Pokémon browsing, types, abilities, and detailed statistics.

## Features

- **Browse all Pokémon** with pagination and search
- **Detailed Pokémon information** including stats, abilities, types, and sprites
- **Type effectiveness chart** with damage relationships
- **Ability database** with detailed descriptions and usage
- **Responsive design** with Tailwind CSS
- **Modern Vue 3** with Composition API, TypeScript, and Pinia for state management

## Tech Stack

- **Vue 3** with Composition API
- **TypeScript** for type safety
- **Vite** as the build tool (with Rolldon under the hood)
- **Pinia** for state management
- **Vue Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API calls
- **PokéAPI** for Pokémon data

## Getting Started

### Prerequisites

- Node.js (v20 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
src/
├── assets/
│   └── css/
│       └── main.css          # Tailwind CSS imports
├── components/               # Reusable components
├── router/
│   └── index.ts             # Vue Router configuration
├── services/                # API service layer
│   ├── pokemonService.ts    # Pokémon API calls
│   ├── typeService.ts       # Types API calls
│   ├── abilityService.ts    # Abilities API calls
│   └── index.ts             # Service exports
├── stores/                  # Pinia state management
│   ├── pokemon.ts           # Pokémon store
│   ├── types.ts             # Types store
│   ├── abilities.ts         # Abilities store
│   └── index.ts             # Store exports
├── types/                   # TypeScript type definitions
│   ├── pokemon.ts           # Pokémon-related types
│   ├── types.ts             # Type-related types
│   ├── ability.ts           # Ability-related types
│   └── index.ts             # Type exports
├── views/                   # Page components
│   ├── HomeView.vue         # Home page
│   ├── PokemonView.vue      # Pokémon listing
│   ├── PokemonDetailView.vue # Pokémon details
│   ├── TypesView.vue        # Types listing
│   └── AbilitiesView.vue    # Abilities listing
├── App.vue                  # Root component
└── main.ts                  # Application entry point
```

## API Integration

The application uses the [PokéAPI](https://pokeapi.co/) to fetch Pokémon data:

- **Pokémon endpoint**: `/pokemon`
- **Types endpoint**: `/type`
- **Abilities endpoint**: `/ability`
- **Species endpoint**: `/pokemon-species`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is for educational purposes only. Not affiliated with The Pokémon Company or Nintendo.