import { useEffect, useState } from "react";
import axios from "axios";

import "./NotificationSettings.css";

function NotificationSettings() {

  const [settings, setSettings] = useState({
    company_email: "",
    notifications_enabled: true,
    notify_negative: true,
    notify_neutral: false,
    notify_positive: false,
    minimum_confidence: 0.8,
    daily_summary_enabled: true,
    daily_summary_time: "20:00",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {

    const response = await axios.get(
      "http://127.0.0.1:5000/api/settings"
    );

    setSettings(response.data);
  };

  const handleChange = (e) => {

    const { name, value, checked, type } = e.target;

    setSettings({
      ...settings,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });

  };

  const saveSettings = async () => {

    if (
      settings.notifications_enabled &&
      !settings.notify_positive &&
      !settings.notify_neutral &&
      !settings.notify_negative
    ) {

      alert(
        "Please enable at least one review notification type."
      );

      return;

    }

    try {

      await axios.put(
        "http://127.0.0.1:5000/api/settings",
        settings
      );

      alert("Settings saved successfully!");

    }

    catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to save settings."
      );

    }

  };

  return (

    <section className="notification-settings">

      <h2>Notification Settings</h2>

      <div className="settings-form">

        <label>

          Company Email

          <input
            type="email"
            name="company_email"
            value={settings.company_email}
            onChange={handleChange}
          />

        </label>

        <label>

          <input
            type="checkbox"
            name="notifications_enabled"
            checked={settings.notifications_enabled}
            onChange={handleChange}
          />

          Enable Email Notifications

        </label>

        <label>

          <input
            type="checkbox"
            name="notify_negative"
            checked={settings.notify_negative}
            onChange={handleChange}
          />

          Notify Negative Reviews

        </label>

        <label>

          <input
            type="checkbox"
            name="notify_neutral"
            checked={settings.notify_neutral}
            onChange={handleChange}
          />

          Notify Neutral Reviews

        </label>

        <label>

          <input
            type="checkbox"
            name="notify_positive"
            checked={settings.notify_positive}
            onChange={handleChange}
          />

          Notify Positive Reviews

        </label>

        <label>

          Minimum AI Confidence

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            name="minimum_confidence"
            value={settings.minimum_confidence}
            onChange={handleChange}
          />

          <span>

            {(settings.minimum_confidence * 100).toFixed(0)}%

          </span>

        </label>

        <hr />

        <h3>Daily Summary Report</h3>

        <label>

          <input
            type="checkbox"
            name="daily_summary_enabled"
            checked={settings.daily_summary_enabled}
            onChange={handleChange}
          />

          Enable Daily Summary Email

        </label>

        <label>

          Daily Summary Time

          <input
            type="time"
            name="daily_summary_time"
            value={settings.daily_summary_time}
            onChange={handleChange}
          />

        </label>

        <button
          className="save-btn"
          onClick={saveSettings}
        >

          Save Settings

        </button>

      </div>

    </section>

  );

}

export default NotificationSettings;