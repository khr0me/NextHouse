// Dati dei punti informativi
const pointsInfo = {
    doorSystem: {
        title: "Sistema Porta Smart",
        icon: "🚪",
        description: "Accesso biometrico con riconoscimento facciale e controllo vocale integrato.",
        specs: [
            { label: "Materiale", value: "Legno di quercia e compositi" },
            { label: "Sicurezza", value: "Grado 4 - Professionale" },
            { label: "Sensori", value: "Movimento, termico, pressione" },
            { label: "Connettività", value: "Wi-Fi 6E, Bluetooth 5.2" },
            { label: "Autonomia", value: "72 ore in caso di blackout" },
            { label: "Notifiche", value: "Push, email, chiamata" },
            { label: "Certificazioni", value: "ISO27001, Smart Home Ready" },
            { label: "Consumi", value: "0.8W standby, 3.2W attivo" }
        ]
    },
    windowSystem: {
        title: "Finestra Intelligente",
        icon: "🪟",
        description: "Vetri fotocromici che regolano automaticamente la trasparenza in base alla luce solare e alle preferenze dell'utente.",
        specs: [
            { label: "Materiale", value: "Vetro stratificato fotocromico" },
            { label: "Isolamento", value: "Termico R-10, Acustico 45dB" },
            { label: "Controllo", value: "App, vocale, automatico" },
            { label: "Opacità", value: "10-95% regolabile" },
            { label: "Filtro UV", value: "99.8% bloccato" },
            { label: "Resistenza", value: "Uragani classe 5, antieffrazione" },
            { label: "Display AR", value: "Integrato, 120Hz refresh" },
            { label: "Energia", value: "Pannelli solari integrati nel telaio" }
        ]
    },
    roofSystem: {
        title: "Tetto Isolante Smart",
        icon: "🏠",
        description: "Sistema di copertura intelligente con isolamento termico avanzato e gestione automatica della ventilazione.",
        specs: [
            { label: "Materiale", value: "Tegole composite fotocatalitiche" },
            { label: "Isolamento", value: "R-60 con aerogel" },
            { label: "Purificazione", value: "Scomposizione inquinanti atmosferici" },
            { label: "Ventilazione", value: "Automatica con sensori CO2" },
            { label: "Resistenza", value: "250 km/h vento, grandine 8cm" },
            { label: "Durata", value: "80+ anni garantiti" },
            { label: "Manutenzione", value: "Auto-diagnostica e pulizia" },
            { label: "Raccolta acqua", value: "Sistema integrato di filtraggio" }
        ]
    },
    gardenSystem: {
        title: "Giardino Smart",
        icon: "🌳",
        description: "Sistema di gestione automatizzata del verde con irrigazione intelligente e controllo della biodiversità.",
        specs: [
            { label: "Irrigazione", value: "Precisione zone con sensori" },
            { label: "Risparmio", value: "85% acqua rispetto a sistemi tradizionali" },
            { label: "Sensori", value: "Umidità, pH, nutrienti, luce" },
            { label: "Flora", value: "Autoctona ad alta efficienza CO2" },
            { label: "Monitoraggio", value: "24/7 con AI botanica" },
            { label: "Biodiversità", value: "Habitat per 20+ specie locali" },
            { label: "Raccolta", value: "Orto automatizzato con rotazione colture" },
            { label: "Compost", value: "Sistema integrato di gestione rifiuti" }
        ]
    },
    poolSystem: {
        title: "Piscina Climatizzata",
        icon: "🏊",
        description: "Sistema acquatico ad energia solare con purificazione avanzata e controllo della temperatura automatico.",
        specs: [
            { label: "Dimensioni", value: "6 x 4 m con profondità variabile" },
            { label: "Riscaldamento", value: "Solare con pompa di calore" },
            { label: "Purificazione", value: "UV + Ozono + Elettrolisi" },
            { label: "Temperatura", value: "Regolabile 18-38°C" },
            { label: "Copertura", value: "Automatica con isolamento termico" },
            { label: "Consumo", value: "80% meno di piscine tradizionali" },
            { label: "Illuminazione", value: "LED RGB a basso consumo" },
            { label: "Accessibilità", value: "Rampa e sollevatore integrati" }
        ]
    },
    garageSystem: {
        title: "Garage Automatico",
        icon: "🚗",
        description: "Sistema di parcheggio intelligente con ricarica wireless per veicoli elettrici e gestione climatica.",
        specs: [
            { label: "Capacità", value: "2 veicoli con sistema rotante" },
            { label: "Ricarica", value: "Wireless 22kW, cablata 50kW" },
            { label: "Accesso", value: "Automatico con riconoscimento veicolo" },
            { label: "Storage", value: "Sistema automatizzato per attrezzi" },
            { label: "Sicurezza", value: "Sensori di movimento e videocamere IR" },
            { label: "Clima", value: "Controllo umidità e temperatura" },
            { label: "Extra", value: "Stazione manutenzione robotica" },
            { label: "Pavimento", value: "Auto-pulente con raccolta liquidi" }
        ]
    },
    solarSystem: {
        title: "Sistema Pannelli Solari",
        icon: "☀️",
        description: "Impianto fotovoltaico ad alta efficienza con accumulo energetico e gestione intelligente dei carichi.",
        specs: [
            { label: "Potenza", value: "12 kWp con celle bifacciali" },
            { label: "Efficienza", value: "26.4% conversione" },
            { label: "Accumulo", value: "20 kWh batterie stato solido" },
            { label: "Autoconsumo", value: "98% energia prodotta" },
            { label: "Gestione", value: "AI per ottimizzazione carichi" },
            { label: "Monitoraggio", value: "Pannello per pannello in tempo reale" },
            { label: "Pulizia", value: "Sistema automatico anti-polvere" },
            { label: "Backup", value: "Fuel cell idrogeno 10 kW" }
        ]
    },
    smartSystem: {
        title: "Sistema Domotico Centrale",
        icon: "🧠",
        description: "Cervello della casa intelligente con AI avanzata per ottimizzare comfort, sicurezza ed efficienza energetica.",
        specs: [
            { label: "Processore", value: "Neural Core 7 con 12 TFLOPS" },
            { label: "Memoria", value: "64GB LPDDR6 + 4TB SSD" },
            { label: "AI", value: "Apprendimento contestuale locale" },
            { label: "Privacy", value: "Elaborazione locale, zero cloud" },
            { label: "Connettività", value: "Wi-Fi 7, 5G, Thread, Zigbee" },
            { label: "Ridondanza", value: "Sistema triplicato con auto-repair" },
            { label: "Interfaccia", value: "Ologrammi, voce, gesture, app" },
            { label: "Consumi", value: "5W media, 20W picco" }
        ]
    }
};

// Elementi DOM
const loader = document.getElementById('loader');
const loaderBar = document.getElementById('loaderBar');
const hologram = document.getElementById('hologram');
const hologramContainer = document.getElementById('hologramContainer');
const infoPanel = document.getElementById('infoPanel');
const infoPanelTitle = document.getElementById('infoPanelTitle');
const infoPanelContent = document.getElementById('infoPanelContent');
const closePanel = document.getElementById('closePanel');
const resetButton = document.getElementById('resetView');
const toggleHUDButton = document.getElementById('toggleHUD');
const hud = document.getElementById('hud');
const hudToggle = document.getElementById('hudToggle');
const effectsToggle = document.getElementById('effectsToggle');
const labelsToggle = document.getElementById('labelsToggle');
const autoRotateToggle = document.getElementById('autoRotateToggle');
const mousePosition = document.getElementById('mousePosition');
const modelStatus = document.getElementById('modelStatus');
const fpsCounter = document.getElementById('fpsCounter');
const pointLabels = document.querySelectorAll('.point-label');

// Variabili per controllo rotazione manuale
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let currentRotation = { x: 10, y: 0 };
let targetRotation = { x: 10, y: 0 };
let autoRotate = false;
let autoRotateSpeed = 0.2;
let activePoint = null;
let showLabels = false;
let fpsValues = [];
let lastFrameTime = performance.now();
let visiblePanel = false;

// Funzione per mostrare il loader
function initLoader() {
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 1000);
            }, 500);
        }
        loaderBar.style.width = `${progress}%`;
    }, 200);
}

// Funzione per mostrare le informazioni nel pannello
function showInfoPanel(pointId) {
    const info = pointsInfo[pointId];
    if (!info) return;

    infoPanelTitle.innerHTML = `${info.icon} ${info.title}`;
    
    let content = `
        <div class="description">${info.description}</div>
        <div class="specs">
    `;
    
    info.specs.forEach(spec => {
        content += `
            <div class="spec-item">
                <div class="spec-label">${spec.label}</div>
                <div class="spec-value">${spec.value}</div>
            </div>
        `;
    });
    
    content += `</div>`;
    
    infoPanelContent.innerHTML = content;
    infoPanel.classList.add('visible');
    visiblePanel = true;
}

// Funzione per nascondere il pannello informativo
function hideInfoPanel() {
    infoPanel.classList.remove('visible');
    visiblePanel = false;
}

// Funzione per gestire i punti informativi
function setupInfoPoints() {
    const infoPoints = document.querySelectorAll('.info-point');
    
    infoPoints.forEach(point => {
        point.addEventListener('click', function() {
            // Rimuovi la classe active da tutti i punti
            infoPoints.forEach(p => p.classList.remove('active'));
            
            const pointId = this.getAttribute('data-id');
            
            // Se il punto cliccato era già attivo, disattivalo
            if (activePoint === pointId && visiblePanel) {
                activePoint = null;
                hideInfoPanel();
                modelStatus.textContent = "Stato: In attesa interazione";
                return;
            }
            
            // Attiva il punto cliccato
            this.classList.add('active');
            activePoint = pointId;
            
            // Mostra le informazioni nel pannello
            showInfoPanel(pointId);
            modelStatus.textContent = `Stato: Visualizzazione ${pointsInfo[pointId].title}`;
        });
    });
}

// Funzione per gestire la rotazione con il mouse
function setupMouseRotation() {
    hologramContainer.addEventListener('mousedown', function(e) {
        isDragging = true;
        previousMousePosition = { x: e.clientX, y: e.clientY };
        hologramContainer.classList.add('grabbing');
    });
    
    document.addEventListener('mousemove', function(e) {
        // Aggiorna posizione mouse nella barra di stato
        mousePosition.textContent = `Pos: X:${Math.round(e.clientX)} Y:${Math.round(e.clientY)}`;
        
        if (!isDragging) return;
        
        const deltaMove = {
            x: e.clientX - previousMousePosition.x,
            y: e.clientY - previousMousePosition.y
        };
        
        // Calcola la nuova rotazione
        targetRotation.y += deltaMove.x * 0.5;
        targetRotation.x = Math.max(-30, Math.min(40, targetRotation.x + deltaMove.y * 0.5));
        
        previousMousePosition = { x: e.clientX, y: e.clientY };
    });
    
    document.addEventListener('mouseup', function() {
        isDragging = false;
        hologramContainer.classList.remove('grabbing');
    });
    
    document.addEventListener('mouseleave', function() {
        isDragging = false;
        hologramContainer.classList.remove('grabbing');
    });
    
    // Per il controllo touch su dispositivi mobili
    hologramContainer.addEventListener('touchstart', function(e) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        e.preventDefault();
    });
    
    document.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        
        const deltaMove = {
            x: e.touches[0].clientX - previousMousePosition.x,
            y: e.touches[0].clientY - previousMousePosition.y
        };
        
        // Calcola la nuova rotazione
        targetRotation.y += deltaMove.x * 0.5;
        targetRotation.x = Math.max(-30, Math.min(40, targetRotation.x + deltaMove.y * 0.5));
        
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        e.preventDefault();
    });
    
    document.addEventListener('touchend', function() {
        isDragging = false;
    });
}

// Aggiorna la rotazione con animazione fluida
function updateRotation() {
    // Auto rotazione se abilitata
    if (autoRotate && !isDragging) {
        targetRotation.y += autoRotateSpeed;
    }
    
    // Applica rotazione con smoothing
    currentRotation.x += (targetRotation.x - currentRotation.x) * 0.1;
    currentRotation.y += (targetRotation.y - currentRotation.y) * 0.1;
    
    hologram.style.transform = `rotateX(${currentRotation.x}deg) rotateY(${currentRotation.y}deg)`;
}

// Funzione per resettare la vista
function setupResetView() {
    resetButton.addEventListener('click', function() {
        targetRotation = { x: 10, y: 0 };
        
        // Se c'è un punto attivo, disattivalo
        if (activePoint) {
            document.querySelectorAll('.info-point').forEach(p => p.classList.remove('active'));
            activePoint = null;
            hideInfoPanel();
        }
        
        modelStatus.textContent = "Stato: Vista reinizializzata";
        setTimeout(() => {
            modelStatus.textContent = "Stato: In attesa interazione";
        }, 2000);
    });
}

// Funzione per mostrare/nascondere l'HUD
function setupHUD() {
    toggleHUDButton.addEventListener('click', function() {
        hud.classList.toggle('visible');
    });
    
    hudToggle.addEventListener('click', function() {
        hud.classList.toggle('visible');
    });
    
    // Toggle per gli effetti
    effectsToggle.addEventListener('change', function() {
        const effects = [
            document.querySelector('.scanline'),
            document.querySelector('.noise'),
            document.querySelector('.hologram-lines')
        ];
        
        effects.forEach(effect => {
            if (effect) {
                effect.style.opacity = this.checked ? '1' : '0';
            }
        });
    });
    
    // Toggle per le etichette
    labelsToggle.addEventListener('change', function() {
        showLabels = this.checked;
        pointLabels.forEach(label => {
            label.style.opacity = showLabels ? '1' : '0';
        });
    });
    
    // Toggle per auto-rotazione
    autoRotateToggle.addEventListener('change', function() {
        autoRotate = this.checked;
    });
}

// Funzione per chiudere il pannello informativo
function setupClosePanel() {
    closePanel.addEventListener('click', function() {
        hideInfoPanel();
        
        // Se c'è un punto attivo, disattivalo
        if (activePoint) {
            document.querySelectorAll('.info-point').forEach(p => p.classList.remove('active'));
            activePoint = null;
        }
        
        modelStatus.textContent = "Stato: In attesa interazione";
    });
}

// Calcola FPS
function calculateFPS() {
    const now = performance.now();
    const delta = now - lastFrameTime;
    lastFrameTime = now;
    
    const fps = 1000 / delta;
    
    // Mantieni ultimi 10 valori FPS per creare una media stabile
    fpsValues.push(fps);
    if (fpsValues.length > 10) {
        fpsValues.shift();
    }
    
    // Calcola media FPS
    const averageFPS = Math.round(fpsValues.reduce((sum, value) => sum + value, 0) / fpsValues.length);
    
    // Aggiorna contatore FPS ogni 10 frame
    if (fpsValues.length % 5 === 0) {
        fpsCounter.textContent = averageFPS;
    }
}

// Loop di animazione
function animate() {
    calculateFPS();
    updateRotation();
    requestAnimationFrame(animate);
}

// Eventi da eseguire al caricamento della pagina
function init() {
    // Mostra il loader
    initLoader();
    
    // Imposta lo stile del cursore
    hologramContainer.style.cursor = 'grab';
    
    // Inizializza le funzionalità
    setupInfoPoints();
    setupMouseRotation();
    setupResetView();
    setupHUD();
    setupClosePanel();
    
    // Stato iniziale
    hud.classList.add('visible');
    
    // Nascondi le etichette inizialmente
    pointLabels.forEach(label => {
        label.style.opacity = '0';
    });
    
    // Avvia l'animazione
    animate();
}

// Inizializza l'applicazione
init();