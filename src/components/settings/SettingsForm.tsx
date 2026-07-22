import { useState, type FormEvent } from 'react'
import { useSettings } from '../../hooks/useSettings'
import { defaultSettings, type Settings, type Theme } from '../../types/settings'
import './SettingsForm.css'

export default function SettingsForm() {
  const { settings, save, reset, saved } = useSettings()
  const [form, setForm] = useState<Settings>(settings)

  function updateField<K extends keyof Settings>(key: K, value: Settings[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    save(form)
  }

  function handleReset() {
    reset()
    setForm(defaultSettings)
  }

  return (
    <form className="settings-form" onSubmit={handleSubmit}>
      <header className="settings-form__header">
        <h1>Settings</h1>
        <p>Manage your profile and preferences.</p>
      </header>

      <section className="settings-form__section" aria-labelledby="profile-heading">
        <h2 id="profile-heading" className="settings-form__section-title">
          Profile
        </h2>
        <p className="settings-form__section-desc">
          Your public display information.
        </p>

        <div className="settings-form__field">
          <label className="settings-form__label" htmlFor="displayName">
            Display name
          </label>
          <input
            id="displayName"
            className="settings-form__input"
            type="text"
            value={form.displayName}
            onChange={(e) => updateField('displayName', e.target.value)}
            placeholder="Jane Doe"
            autoComplete="name"
          />
        </div>

        <div className="settings-form__field">
          <label className="settings-form__label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className="settings-form__input"
            type="email"
            value={form.email}
            onChange={(e) => updateField('email', e.target.value)}
            placeholder="jane@example.com"
            autoComplete="email"
          />
        </div>
      </section>

      <section
        className="settings-form__section"
        aria-labelledby="preferences-heading"
      >
        <h2 id="preferences-heading" className="settings-form__section-title">
          Preferences
        </h2>
        <p className="settings-form__section-desc">
          Customize how the app looks and notifies you.
        </p>

        <div className="settings-form__field">
          <label className="settings-form__label" htmlFor="theme">
            Theme
          </label>
          <select
            id="theme"
            className="settings-form__select"
            value={form.theme}
            onChange={(e) => updateField('theme', e.target.value as Theme)}
          >
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div className="settings-form__toggle">
          <div className="settings-form__toggle-label">
            <span className="settings-form__toggle-name">
              Email notifications
            </span>
            <span className="settings-form__toggle-desc">
              Receive updates about your account activity.
            </span>
          </div>
          <label className="settings-form__switch">
            <input
              type="checkbox"
              checked={form.emailNotifications}
              onChange={(e) =>
                updateField('emailNotifications', e.target.checked)
              }
            />
            <span className="settings-form__switch-track">
              <span className="settings-form__switch-thumb" />
            </span>
          </label>
        </div>
      </section>

      <section className="settings-form__section" aria-labelledby="api-heading">
        <h2 id="api-heading" className="settings-form__section-title">
          API
        </h2>
        <p className="settings-form__section-desc">
          Connect to AI services for enhanced features.
        </p>

        <div className="settings-form__field">
          <label className="settings-form__label" htmlFor="apiKey">
            API key
          </label>
          <input
            id="apiKey"
            className="settings-form__input"
            type="password"
            value={form.apiKey}
            onChange={(e) => updateField('apiKey', e.target.value)}
            placeholder="sk-..."
            autoComplete="off"
          />
        </div>
      </section>

      <div className="settings-form__actions">
        <button
          type="submit"
          className="settings-form__button settings-form__button--primary"
        >
          Save changes
        </button>
        <button
          type="button"
          className="settings-form__button settings-form__button--secondary"
          onClick={handleReset}
        >
          Reset to defaults
        </button>
      </div>

      <p className="settings-form__feedback" role="status" aria-live="polite">
        {saved ? 'Settings saved successfully.' : ''}
      </p>
    </form>
  )
}
