export type Theme = 'light' | 'dark' | 'system'

export interface Settings {
  displayName: string
  email: string
  theme: Theme
  emailNotifications: boolean
  apiKey: string
}

export const defaultSettings: Settings = {
  displayName: '',
  email: '',
  theme: 'system',
  emailNotifications: true,
  apiKey: '',
}
