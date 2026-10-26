class WeatherPlugin extends HTMLElement {
  async connectedCallback() {
    const config = this.config || {};

    // Basis-URL aus Attribut
    const baseUrl = this.getAttribute('base-url');
    if (!baseUrl) throw new Error("base-url attribute is required");
    this.baseUrl = baseUrl 

    // 1. CSS laden
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = `${baseUrl}/style.css`;
    this.appendChild(style);

    // 2. HTML laden
    const htmlResponse = await fetch(`${baseUrl}/template.html`);
    let html = await htmlResponse.text();

    // Asset-Pfade ersetzen: ./assets/... → ${baseUrl}/assets/...
    html = html.replace(/\.\/assets\//g, `${baseUrl}/assets/`);

    this.innerHTML += html; // HTML in Shadow DOM oder direkt ins Element

    // 3. Logik

    //Module laden
    const weatherModule = await import(`${baseUrl}/logic/weather.js`);
    
    this.weather = weatherModule;

    this.updateView()

    setInterval(() => this.updateView(), 1000*60*60* config["updateInterval"]); // alle x Stunden
  }

  updateView() {
    this.weather.getWeatherData(this, this.config, this.baseUrl)
  }
}

customElements.define('smartmirror-plugin-weather', WeatherPlugin);