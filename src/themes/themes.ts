export interface ThemeColors {
  bg: string
  bg2: string
  bg3: string
  bg4: string
  border: string
  text: string
  bright: string
  dim: string
  blue: string
  blue2: string
  accent: string
  green: string
  red: string
  yellow: string
}

export interface Theme {
  id: string
  label: string
  colors: ThemeColors
}

export const themes: Theme[] = [
  {
    id: 'dark-plus',
    label: 'Dark+ (default)',
    colors: {
      bg: '#1e1e1e',
      bg2: '#252526',
      bg3: '#2d2d2d',
      bg4: '#333333',
      border: '#3c3c3c',
      text: '#cccccc',
      bright: '#ffffff',
      dim: '#858585',
      blue: '#007acc',
      blue2: '#4fc1ff',
      accent: '#6e40c9',
      green: '#6a9955',
      red: '#f44747',
      yellow: '#dcdcaa',
    },
  },
  {
    id: 'dracula',
    label: 'Dracula',
    colors: {
      bg: '#282a36',
      bg2: '#21222c',
      bg3: '#191a21',
      bg4: '#343746',
      border: '#44475a',
      text: '#f8f8f2',
      bright: '#ffffff',
      dim: '#6272a4',
      blue: '#6272a4',
      blue2: '#8be9fd',
      accent: '#bd93f9',
      green: '#50fa7b',
      red: '#ff5555',
      yellow: '#f1fa8c',
    },
  },
  {
    id: 'nord',
    label: 'Nord',
    colors: {
      bg: '#2e3440',
      bg2: '#3b4252',
      bg3: '#434c5e',
      bg4: '#4c566a',
      border: '#4c566a',
      text: '#d8dee9',
      bright: '#eceff4',
      dim: '#7b88a1',
      blue: '#88c0d0',
      blue2: '#81a1c1',
      accent: '#b48ead',
      green: '#a3be8c',
      red: '#bf616a',
      yellow: '#ebcb8b',
    },
  },
  {
    id: 'tokyo-night',
    label: 'Tokyo Night',
    colors: {
      bg: '#1a1b26',
      bg2: '#16161e',
      bg3: '#1f2335',
      bg4: '#292e42',
      border: '#292e42',
      text: '#a9b1d6',
      bright: '#c0caf5',
      dim: '#565f89',
      blue: '#7aa2f7',
      blue2: '#7dcfff',
      accent: '#bb9af7',
      green: '#9ece6a',
      red: '#f7768e',
      yellow: '#e0af68',
    },
  },
  {
    id: 'catppuccin',
    label: 'Catppuccin Mocha',
    colors: {
      bg: '#1e1e2e',
      bg2: '#181825',
      bg3: '#11111b',
      bg4: '#313244',
      border: '#313244',
      text: '#cdd6f4',
      bright: '#ffffff',
      dim: '#6c7086',
      blue: '#89b4fa',
      blue2: '#89dceb',
      accent: '#cba6f7',
      green: '#a6e3a1',
      red: '#f38ba8',
      yellow: '#f9e2af',
    },
  },
]

export const defaultThemeId = 'dark-plus'
