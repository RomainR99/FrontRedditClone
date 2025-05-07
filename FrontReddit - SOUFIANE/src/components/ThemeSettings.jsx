import React, { useState, useEffect } from 'react';
import "../ThemeSettings.css";

function ThemeSettings() {
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState('dark');
    const [fontSize, setFontSize] = useState('medium');
    const [compactMode, setCompactMode] = useState(false);

    useEffect(() => {
        // Charger les préférences depuis le localStorage
        const savedTheme = localStorage.getItem('theme') || 'dark';
        const savedFontSize = localStorage.getItem('fontSize') || 'medium';
        const savedCompactMode = localStorage.getItem('compactMode') === 'true';

        setTheme(savedTheme);
        setFontSize(savedFontSize);
        setCompactMode(savedCompactMode);

        // Appliquer les préférences
        document.documentElement.setAttribute('data-theme', savedTheme);
        document.documentElement.setAttribute('data-font-size', savedFontSize);
        document.documentElement.setAttribute('data-compact-mode', savedCompactMode);
    }, []);

    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    const handleFontSizeChange = (newSize) => {
        setFontSize(newSize);
        localStorage.setItem('fontSize', newSize);
        document.documentElement.setAttribute('data-font-size', newSize);
    };

    const handleCompactModeChange = (newValue) => {
        setCompactMode(newValue);
        localStorage.setItem('compactMode', newValue);
        document.documentElement.setAttribute('data-compact-mode', newValue);
    };

    return (
        <div className="theme-settings-container">
            <button className="theme-settings-button" onClick={() => setIsOpen(!isOpen)}>
                <i className="bi bi-palette"></i>
            </button>

            {isOpen && (
                <div className="theme-settings-dropdown">
                    <div className="theme-settings-header">
                        <h3>Personnalisation</h3>
                        <button className="close-button" onClick={() => setIsOpen(false)}>
                            <i className="bi bi-x"></i>
                        </button>
                    </div>

                    <div className="theme-settings-section">
                        <h4>Thème</h4>
                        <div className="theme-options">
                            <button 
                                className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
                                onClick={() => handleThemeChange('dark')}
                            >
                                <i className="bi bi-moon"></i>
                                <span>Sombre</span>
                            </button>
                            <button 
                                className={`theme-option ${theme === 'light' ? 'active' : ''}`}
                                onClick={() => handleThemeChange('light')}
                            >
                                <i className="bi bi-sun"></i>
                                <span>Clair</span>
                            </button>
                        </div>
                    </div>

                    <div className="theme-settings-section">
                        <h4>Taille du texte</h4>
                        <div className="font-size-options">
                            <button 
                                className={`font-size-option ${fontSize === 'small' ? 'active' : ''}`}
                                onClick={() => handleFontSizeChange('small')}
                            >
                                Petit
                            </button>
                            <button 
                                className={`font-size-option ${fontSize === 'medium' ? 'active' : ''}`}
                                onClick={() => handleFontSizeChange('medium')}
                            >
                                Moyen
                            </button>
                            <button 
                                className={`font-size-option ${fontSize === 'large' ? 'active' : ''}`}
                                onClick={() => handleFontSizeChange('large')}
                            >
                                Grand
                            </button>
                        </div>
                    </div>

                    <div className="theme-settings-section">
                        <h4>Mode compact</h4>
                        <div className="toggle-switch">
                            <input
                                type="checkbox"
                                id="compact-mode"
                                checked={compactMode}
                                onChange={(e) => handleCompactModeChange(e.target.checked)}
                            />
                            <label htmlFor="compact-mode"></label>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ThemeSettings; 