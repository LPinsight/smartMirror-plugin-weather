## 🌦️ SmartMirror Weather Plugin

Ein Plugin für das [SmartMirror-Projekt](https://github.com/LPinsight/smartMirror), das aktuelle Wetterdaten sowie eine 5-Tage-Vorhersage auf deinem Spiegel anzeigt.
Das Plugin nutzt die API von ?? und lässt sich vollständig über die SmartMirror-Oberfläche konfigurieren.

## ✨ Funktionen

- Anzeige des aktuellen Wetters
- 5-Tage-Vorhersage mit Tageshöchst- und Tiefsttemperaturen
- Darstellung von Wettericons
- Anpassbarer Ort
- Auswahl zwischen verschiedenen Temperatureinheiten (°C / °F)

## 📁 Projektstruktur

``` pgsql
smartMirror-plugin-weather/
├── ui/
│   ├── main.js
│   ├── style.css
│   └── template.html
└── config.json
└── plugin.json
```

### Erklärung

- config.json:
Konfigurationsoptionen für Nutzer, die in der SmartMirror-UI angezeigt werden
- plugin.json:
Metadaten des Plugins (Name, Version, Beschreibung, Autor usw.)
- ui/:
Darstellung & Logik des Frontends (HTML, CSS, JavaScript)

## 🚀 Schnellstart

### 1. Plugin installieren

Das Plugin einfach über die Weboberfläche der Hauptanwendung mittels GitHub-Link installieren

### 2. Plugin dem Display hinzufügen

Nach der Installation kann das Plugin als Widget einem Display hinzugefügt und Konfiguriert werden.

## 🐞 Fehler & Vorschläge

Issues, Feedback oder Erweiterungswünsche kannst du direkt im GitHub-Repository melden.

👉 https://github.com/LPinsight/smartMirror-plugin-weather/issues

## 📄 Lizenz

Für die Wetter-Icons wurde das GitHub Repository [weather-icons von basmilius](https://github.com/basmilius/weather-icons) verwendet.  
Die Icons stehen unter der **MIT-Lizenz**, die Lizenzbedingungen sind [hier](https://github.com/basmilius/weather-icons/blob/master/LICENSE) einsehbar.
Dieses Projekt steht unter der **MIT-Lizenz**.
