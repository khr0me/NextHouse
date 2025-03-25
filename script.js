/**
 * SmartHome Control Center - Script Principale (Versione Concisa)
 * Versione: 1.0.0
 */

// Namespace principale
const SmartHome = {
    // Configurazione base
    config: {
        updateInterval: 5000,
        simulationSpeed: 1000,
        notifications: true,
        debugMode: false,
        temperatureUnit: 'C'
    },
    
    // Stato del sistema
    state: {
        isInitialized: false,
        activeView: 'dashboard',
        deviceStatus: {},
        sceneStatus: {},
        temperatureTrend: 'stable',
        dayMode: true
    },
    
    // Cache del DOM
    elements: {},
    
    // Inizializzazione
    init: function() {
        if (this.state.isInitialized) return;
        console.log('Inizializzazione SmartHome Control Center...');
        
        this.cacheElements();
        this.setupEventListeners();
        this.startDataSimulation();
        
        this.state.isInitialized = true;
        this.loadView('dashboard');
        
        console.log('SmartHome Control Center inizializzato con successo!');
        this.showWelcomeNotification();
    },
    
    // Cache elementi DOM principali
    cacheElements: function() {
        this.elements = {
            // Elementi principali
            navLinks: document.querySelectorAll('.nav-menu a'),
            mainContent: document.querySelector('main'),
            navToggle: document.getElementById('navToggle'),
            navMenu: document.querySelector('.nav-menu'),
            
            // Dashboard
            temperatureDisplay: document.getElementById('temperature'),
            humidityDisplay: document.getElementById('humidity'),
            activeDevicesDisplay: document.getElementById('activeDevices'),
            energyConsumptionDisplay: document.getElementById('energyConsumption'),
            
            // Controlli
            livingRoomLights: document.getElementById('livingRoomLights'),
            airConditioner: document.getElementById('airConditioner'),
            securitySystem: document.getElementById('securitySystem'),
            frontDoor: document.getElementById('frontDoor'),
            
            // Sezioni
            dashboardSection: document.getElementById('dashboard'),
            roomsSection: document.getElementById('rooms'),
            scenesSection: document.getElementById('scenes'),
            devicesSection: document.getElementById('devices'),
            settingsSection: document.getElementById('settings'),
            
            // Altri elementi
            roomsGrid: document.querySelector('.rooms-grid'),
            scenesGrid: document.querySelector('.scenes-grid'),
            devicesList: document.querySelector('.devices-list'),
            deviceFilters: document.querySelector('.device-filters')
        };
    },
    
    // Setup di tutti gli event listeners
    setupEventListeners: function() {
        const self = this;
        
        // Navigazione
        this.elements.navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetView = this.getAttribute('href').substring(1);
                self.loadView(targetView);
                
                self.elements.navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
                
                if (self.elements.navMenu.classList.contains('active')) {
                    self.elements.navMenu.classList.remove('active');
                }
            });
        });
        
        // Toggle menu mobile
        if (this.elements.navToggle) {
            this.elements.navToggle.addEventListener('click', function() {
                self.elements.navMenu.classList.toggle('active');
            });
        }
        
        // Controllo luci soggiorno
        if (this.elements.livingRoomLights) {
            this.elements.livingRoomLights.addEventListener('change', function() {
                self.toggleDevice('livingRoom_lights', this.checked);
            });
        }
        
        // Controllo climatizzatore
        if (this.elements.airConditioner) {
            this.elements.airConditioner.addEventListener('change', function() {
                self.toggleDevice('airConditioner', this.checked);
            });
        }
        
        // Controllo sistema sicurezza
        if (this.elements.securitySystem) {
            this.elements.securitySystem.addEventListener('change', function() {
                self.toggleDevice('securitySystem', this.checked);
                
                if (this.checked) {
                    self.showNotification('Sicurezza', 'Sistema di sicurezza attivato', 'success');
                } else {
                    self.showNotification('Sicurezza', 'Sistema di sicurezza disattivato', 'info');
                }
            });
        }
        
        // Controllo porta principale
        if (this.elements.frontDoor) {
            this.elements.frontDoor.addEventListener('change', function() {
                self.toggleDevice('frontDoor', this.checked);
                
                if (this.checked && self.elements.securitySystem.checked) {
                    self.showAlert('Attenzione', 'Hai aperto la porta con il sistema di sicurezza attivo.', 'warning');
                }
            });
        }
        
        // Stanze
        const roomCards = document.querySelectorAll('.room-card:not(.add-room)');
        roomCards.forEach(card => {
            card.addEventListener('click', function() {
                const roomId = this.getAttribute('data-room');
                self.openRoomDetail(roomId);
            });
        });
        
        // Scenari
        const sceneButtons = document.querySelectorAll('.activate-scene');
        sceneButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const sceneId = this.closest('.scene-card').getAttribute('data-scene');
                self.activateScene(sceneId);
            });
        });
        
        // Filtri dispositivi
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                self.filterDevices(filter);
            });
        });
        
        // Toggle dispositivi
        const deviceSwitches = document.querySelectorAll('.device-item .switch input');
        deviceSwitches.forEach(switchElem => {
            switchElem.addEventListener('change', function() {
                const deviceItem = this.closest('.device-item');
                const deviceType = deviceItem.getAttribute('data-type');
                const deviceRoom = deviceItem.getAttribute('data-room');
                const deviceId = `${deviceRoom}_${deviceType}`;
                
                self.toggleDevice(deviceId, this.checked);
            });
        });
        
        // Slider luminosità
        const brightnessSliders = document.querySelectorAll('.brightness-slider');
        brightnessSliders.forEach(slider => {
            slider.addEventListener('input', function() {
                const deviceItem = this.closest('.device-item');
                const deviceId = `${deviceItem.getAttribute('data-room')}_${deviceItem.getAttribute('data-type')}`;
                self.setBrightness(deviceId, this.value);
            });
        });
        
        // Controlli temperatura
        const tempButtons = document.querySelectorAll('.temp-btn');
        tempButtons.forEach(button => {
            button.addEventListener('click', function() {
                const deviceItem = this.closest('.device-item');
                const tempDisplay = deviceItem.querySelector('.current-temp');
                const currentTemp = parseInt(tempDisplay.textContent);
                const newTemp = button.classList.contains('temp-up') ? currentTemp + 1 : currentTemp - 1;
                
                tempDisplay.textContent = `${newTemp}°C`;
            });
        });
    },
    
    // Simulazione dati in tempo reale
    startDataSimulation: function() {
        const self = this;
        
        function simulateChanges() {
            // Simulazione variazioni di temperatura
            const tempChange = (Math.random() * 0.6) - 0.3;
            const currentTemp = parseFloat(self.elements.temperatureDisplay.textContent);
            const newTemp = Math.round((currentTemp + tempChange) * 10) / 10;
            self.elements.temperatureDisplay.textContent = `${newTemp.toFixed(1)}°C`;
            
            // Tendenza temperatura
            if (tempChange > 0.1) {
                self.state.temperatureTrend = 'up';
            } else if (tempChange < -0.1) {
                self.state.temperatureTrend = 'down';
            } else {
                self.state.temperatureTrend = 'stable';
            }
            
            // Simulazione variazioni di umidità
            const humidityChange = (Math.random() * 2) - 1;
            const currentHumidity = parseInt(self.elements.humidityDisplay.textContent);
            const newHumidity = Math.max(30, Math.min(70, Math.round(currentHumidity + humidityChange)));
            self.elements.humidityDisplay.textContent = `${newHumidity}%`;
            
            // Simulazione consumo energetico
            const energyChange = (Math.random() * 0.4) - 0.1;
            const currentEnergy = parseFloat(self.elements.energyConsumptionDisplay.textContent);
            const newEnergy = Math.max(0.5, Math.round((currentEnergy + energyChange) * 100) / 100);
            self.elements.energyConsumptionDisplay.textContent = `${newEnergy.toFixed(1)} kWh`;
            
            // Genera notifiche casuali
            if (Math.random() < 0.01) {
                self.generateRandomNotification();
            }
            
            // Verifica transizione giorno/notte
            self.checkDayNightTransition();
        }
        
        this.intervals = {
            ...this.intervals,
            simulation: setInterval(simulateChanges, this.config.simulationSpeed)
        };
    },
    
    // Carica vista specifica
    loadView: function(viewName) {
        const allSections = [
            this.elements.dashboardSection,
            this.elements.roomsSection,
            this.elements.scenesSection,
            this.elements.devicesSection,
            this.elements.settingsSection
        ];
        
        // Nascondi tutte le sezioni
        allSections.forEach(section => {
            if (section) section.style.display = 'none';
        });
        
        // Mostra la sezione richiesta
        switch (viewName) {
            case 'dashboard':
                if (this.elements.dashboardSection) this.elements.dashboardSection.style.display = 'block';
                break;
            case 'rooms':
                if (this.elements.roomsSection) this.elements.roomsSection.style.display = 'block';
                break;
            case 'scenes':
                if (this.elements.scenesSection) this.elements.scenesSection.style.display = 'block';
                break;
            case 'devices':
                if (this.elements.devicesSection) this.elements.devicesSection.style.display = 'block';
                break;
            case 'settings':
                if (this.elements.settingsSection) this.elements.settingsSection.style.display = 'block';
                break;
            default:
                if (this.elements.dashboardSection) this.elements.dashboardSection.style.display = 'block';
                break;
        }
        
        // Aggiorna stato attivo nella navigazione
        this.elements.navLinks.forEach(link => {
            const linkTarget = link.getAttribute('href').substring(1);
            if (linkTarget === viewName) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        
        // Aggiorna view attiva nello stato
        this.state.activeView = viewName;
        
        // Esegui animazione
        this.animateView();
    },
    
    // Animazione vista
    animateView: function() {
        const currentView = document.getElementById(this.state.activeView);
        
        if (currentView) {
            currentView.style.opacity = '0';
            currentView.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                currentView.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                currentView.style.opacity = '1';
                currentView.style.transform = 'translateY(0)';
                
                // Rimuovi la transizione dopo l'animazione
                setTimeout(() => {
                    currentView.style.transition = '';
                }, 500);
            }, 50);
        }
    },
    
    // Toggle stato dispositivo
    toggleDevice: function(deviceId, status) {
        this.state.deviceStatus[deviceId] = status;
        
        // Aggiorna UI
        const deviceName = deviceId.split('_')[1] || deviceId;
        if (this.config.notifications) {
            const actionText = status ? 'acceso' : 'spento';
            this.showNotification(
                'Dispositivo',
                `${deviceName} ${actionText}`,
                status ? 'success' : 'info'
            );
        }
        
        return true;
    },
    
    // Imposta luminosità
    setBrightness: function(deviceId, brightness) {
        // Logica per impostare la luminosità
        console.log(`Luminosità di ${deviceId} impostata a ${brightness}`);
    },
    
    // Filtra dispositivi per tipo
    filterDevices: function(filter) {
        const deviceItems = document.querySelectorAll('.device-item');
        
        deviceItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-type') === filter) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    },
    
    // Attiva scenario
    activateScene: function(sceneId) {
        const sceneName = document.querySelector(`.scene-card[data-scene="${sceneId}"] h3`)?.textContent || sceneId;
        
        // Simulazione attivazione scenario
        switch(sceneId) {
            case 'morning':
                this.toggleDevice('livingRoom_lights', true);
                this.setBrightness('livingRoom_lights', 60);
                if (this.elements.livingRoomLights) this.elements.livingRoomLights.checked = true;
                break;
            case 'evening':
                this.toggleDevice('livingRoom_lights', true);
                this.setBrightness('livingRoom_lights', 30);
                if (this.elements.livingRoomLights) this.elements.livingRoomLights.checked = true;
                break;
            case 'away':
                this.toggleDevice('livingRoom_lights', false);
                this.toggleDevice('securitySystem', true);
                if (this.elements.livingRoomLights) this.elements.livingRoomLights.checked = false;
                if (this.elements.securitySystem) this.elements.securitySystem.checked = true;
                break;
            case 'movie':
                this.toggleDevice('livingRoom_lights', true);
                this.setBrightness('livingRoom_lights', 20);
                if (this.elements.livingRoomLights) this.elements.livingRoomLights.checked = true;
                break;
        }
        
        this.showNotification('Scenario', `Scenario "${sceneName}" attivato`, 'success');
        return true;
    },
    
    // Apri dettaglio stanza
    openRoomDetail: function(roomId) {
        const roomName = document.querySelector(`.room-card[data-room="${roomId}"] h3`)?.textContent || roomId;
        this.showModal(`Dettaglio: ${roomName}`, `
            <div class="room-detail">
                <div class="room-stats-detail">
                    <div class="stat-item">
                        <i class="fas fa-temperature-low"></i>
                        <span>Temperatura</span>
                        <strong>22°C</strong>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-tint"></i>
                        <span>Umidità</span>
                        <strong>45%</strong>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-lightbulb"></i>
                        <span>Illuminazione</span>
                        <strong>80%</strong>
                    </div>
                </div>
                <div class="room-devices">
                    <h4>Dispositivi</h4>
                    <div class="device-grid">
                        <div class="device-control">
                            <div class="device-name">Lampadario</div>
                            <div class="device-toggle">
                                <label class="switch">
                                    <input type="checkbox" checked>
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                        <div class="device-control">
                            <div class="device-name">Presa Smart</div>
                            <div class="device-toggle">
                                <label class="switch">
                                    <input type="checkbox">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);
    },
    
    // Verifica transizione giorno/notte automatica
    checkDayNightTransition: function() {
        const currentHour = new Date().getHours();
        const shouldBeDayMode = currentHour >= 7 && currentHour < 20;
        
        if (shouldBeDayMode !== this.state.dayMode) {
            this.state.dayMode = shouldBeDayMode;
            document.body.classList.toggle('night-mode', !shouldBeDayMode);
        }
    },
    
    // Generazione notifica casuale (per simulazione)
    generateRandomNotification: function() {
        const notifications = [
            { title: 'Promemoria', message: 'Ricordati di controllare le finestre prima di uscire', type: 'info' },
            { title: 'Automatizzazione', message: 'Le luci verranno spente automaticamente tra 10 minuti', type: 'info' },
            { title: 'Meteo', message: 'Previsione: possibile pioggia nelle prossime 2 ore', type: 'info' },
            { title: 'Consumo Energetico', message: 'Consumo energetico al di sopra della media', type: 'warning' },
            { title: 'Sicurezza', message: 'La porta sul retro è rimasta aperta per più di 30 minuti', type: 'warning' }
        ];
        
        const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
        this.showNotification(randomNotification.title, randomNotification.message, randomNotification.type);
    },
    
    // Mostra notifica di benvenuto
    showWelcomeNotification: function() {
        const now = new Date();
        const hours = now.getHours();
        
        let greeting;
        if (hours < 12) {
            greeting = 'Buongiorno';
        } else if (hours < 18) {
            greeting = 'Buon pomeriggio';
        } else {
            greeting = 'Buonasera';
        }
        
        setTimeout(() => {
            this.showNotification(
                'Benvenuto in SmartHome',
                `${greeting}! Il sistema è pronto per gestire la tua casa.`,
                'success'
            );
        }, 1000);
    },
    
    // Sistema di notifica
    showNotification: function(title, message, type = 'info') {
        // Crea toast container se non esiste
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.classList.add('toast-container');
            document.body.appendChild(toastContainer);
        }
        
        // Crea toast
        const toast = document.createElement('div');
        toast.classList.add('toast', type);
        
        // Icona in base al tipo
        let iconClass;
        switch (type) {
            case 'success': iconClass = 'fa-check-circle'; break;
            case 'warning': iconClass = 'fa-exclamation-triangle'; break;
            case 'error': iconClass = 'fa-times-circle'; break;
            default: iconClass = 'fa-info-circle';
        }
        
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="fas ${iconClass}"></i>
            </div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="close-toast">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        toastContainer.appendChild(toast);
        
        // Animazione di entrata
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Auto-close dopo 3 secondi
        const closeTimeout = setTimeout(() => {
            this.closeToast(toast);
        }, 3000);
        
        // Pulsante chiusura
        toast.querySelector('.close-toast').addEventListener('click', () => {
            clearTimeout(closeTimeout);
            this.closeToast(toast);
        });
    },
    
    // Chiudi toast
    closeToast: function(toast) {
        toast.classList.remove('show');
        
        setTimeout(() => {
            toast.remove();
        }, 300);
    },
    
    // Mostra alert
    showAlert: function(title, message, type = 'info') {
        const alertOverlay = document.createElement('div');
        alertOverlay.classList.add('alert-overlay');
        
        const alert = document.createElement('div');
        alert.classList.add('alert', type);
        
        // Icona in base al tipo
        let iconClass;
        switch (type) {
            case 'success': iconClass = 'fa-check-circle'; break;
            case 'warning': iconClass = 'fa-exclamation-triangle'; break;
            case 'error': iconClass = 'fa-times-circle'; break;
            default: iconClass = 'fa-info-circle';
        }
        
        alert.innerHTML = `
            <div class="alert-header">
                <div class="alert-icon">
                    <i class="fas ${iconClass}"></i>
                </div>
                <h3>${title}</h3>
                <button class="close-alert">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="alert-content">
                <p>${message}</p>
            </div>
            <div class="alert-actions">
                <button class="btn-confirm">OK</button>
            </div>
        `;
        
        alertOverlay.appendChild(alert);
        document.body.appendChild(alertOverlay);
        
        // Animazione di apertura
        setTimeout(() => {
            alertOverlay.classList.add('active');
            alert.classList.add('show');
        }, 10);
        
        // Listener close button
        const closeBtn = alert.querySelector('.close-alert');
        const confirmBtn = alert.querySelector('.btn-confirm');
        
        [closeBtn, confirmBtn].forEach(btn => {
            btn.addEventListener('click', () => {
                alertOverlay.classList.remove('active');
                alert.classList.remove('show');
                
                setTimeout(() => {
                    alertOverlay.remove();
                }, 300);
            });
        });
    },
    
    // Mostra modale
    showModal: function(title, content) {
        const modalOverlay = document.createElement('div');
        modalOverlay.classList.add('modal-overlay');
        
        const modal = document.createElement('div');
        modal.classList.add('modal');
        
        modal.innerHTML = `
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="close-modal">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-content">
                ${content}
            </div>
            <div class="modal-footer">
                <button class="btn-close">Chiudi</button>
            </div>
        `;
        
        modalOverlay.appendChild(modal);
        document.body.appendChild(modalOverlay);
        
        // Animazione di apertura
        setTimeout(() => {
            modalOverlay.classList.add('active');
            modal.classList.add('show');
        }, 10);
        
        // Chiusura del modale
        const closeModal = () => {
            modalOverlay.classList.remove('active');
            modal.classList.remove('show');
            
            setTimeout(() => {
                modalOverlay.remove();
            }, 300);
        };
        
        // Event listeners per chiusura
        modal.querySelector('.close-modal').addEventListener('click', closeModal);
        modal.querySelector('.btn-close').addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }
};

// Inizializzazione all'avvio della pagina
document.addEventListener('DOMContentLoaded', function() {
    SmartHome.init();
});