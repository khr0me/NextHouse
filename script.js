document.addEventListener("DOMContentLoaded", function () {
  // Navigation functionality
  const navLinks = document.querySelectorAll(".nav-menu a");

  function updateActiveLink() {
    const currentHash = window.location.hash || "#dashboard";
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === currentHash) {
        link.classList.add("active");
      }
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      navLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    });
  });

  window.addEventListener("hashchange", updateActiveLink);
  updateActiveLink();

  // Quick Controls functionality
  const switches = document.querySelectorAll('.switch input[type="checkbox"]');
  switches.forEach((switchEl) => {
    switchEl.addEventListener("change", function () {
      const deviceId = this.id;
      const isOn = this.checked;
      updateDeviceStatus(deviceId, isOn);
    });
  });

  function updateDeviceStatus(deviceId, status) {
    // Here you would typically make an API call to your smart home system
    console.log(`Device ${deviceId} is now ${status ? "ON" : "OFF"}`);
    // Update UI to reflect changes
    updateDashboardStats();
  }

  // Scene activation
  const sceneButtons = document.querySelectorAll(".activate-scene");
  sceneButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const scene = this.closest(".scene-card").dataset.scene;
      activateScene(scene);
    });
  });

  function activateScene(sceneName) {
    console.log(`Activating scene: ${sceneName}`);
    // Add visual feedback
    const sceneCard = document.querySelector(`[data-scene="${sceneName}"]`);
    sceneCard.classList.add("scene-active");
    setTimeout(() => sceneCard.classList.remove("scene-active"), 1000);
  }

  // Room cards interaction
  const roomCards = document.querySelectorAll(".room-card:not(.add-room)");
  roomCards.forEach((card) => {
    card.addEventListener("click", function () {
      const room = this.dataset.room;
      showRoomDetails(room);
    });
  });

  function showRoomDetails(roomName) {
    console.log(`Showing details for room: ${roomName}`);
    // You would typically open a modal or navigate to a room detail view
  }

  // Device filtering
  const filterButtons = document.querySelectorAll(".filter-btn");
  const deviceItems = document.querySelectorAll(".device-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.dataset.filter;
      filterDevices(filter);

      // Update active filter button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
    });
  });

  function filterDevices(filterType) {
    deviceItems.forEach((device) => {
      if (filterType === "all" || device.dataset.type === filterType) {
        device.style.display = "flex";
      } else {
        device.style.display = "none";
      }
    });
  }

  // Add new room functionality
  const addRoomButton = document.querySelector(".add-room");
  addRoomButton.addEventListener("click", function () {
    // Here you would typically open a modal to add a new room
    console.log("Opening add room modal");
  });

  // Add new scene functionality
  const addSceneButton = document.querySelector(".create-scene");
  addSceneButton.addEventListener("click", function () {
    // Here you would typically open a modal to create a new scene
    console.log("Opening create scene modal");
  });

  // Dashboard stats update
  function updateDashboardStats() {
    // Simulate real-time updates
    const stats = {
      temperature: Math.round(20 + Math.random() * 5),
      humidity: Math.round(40 + Math.random() * 20),
      activeDevices: Math.round(Math.random() * 4) + "/" + 12,
      energyConsumption: (2 + Math.random() * 2).toFixed(1) + " kWh",
    };

    document.getElementById("temperature").textContent =
      stats.temperature + "°C";
    document.getElementById("humidity").textContent = stats.humidity + "%";
    document.getElementById("activeDevices").textContent = stats.activeDevices;
    document.getElementById("energyConsumption").textContent =
      stats.energyConsumption;
  }

  // Initial stats update and periodic refresh
  updateDashboardStats();
  setInterval(updateDashboardStats, 30000); // Update every 30 seconds

  // Temperature control buttons
  const tempButtons = document.querySelectorAll(".temp-btn");
  tempButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const action = this.dataset.action;
      const roomId = this.closest(".device-item").dataset.room;
      adjustTemperature(roomId, action);
    });
  });

  function adjustTemperature(roomId, action) {
    const currentTemp = parseInt(
      document.querySelector(`[data-room="${roomId}"] .room-stats .temperature`)
        .textContent
    );
    const newTemp = action === "increase" ? currentTemp + 1 : currentTemp - 1;
    document.querySelector(
      `[data-room="${roomId}"] .room-stats .temperature`
    ).textContent = newTemp + "°C";
  }

  // Brightness slider functionality
  const brightnessSliders = document.querySelectorAll(".brightness-slider");
  brightnessSliders.forEach((slider) => {
    slider.addEventListener("input", function () {
      const deviceId = this.closest(".device-item").dataset.deviceId;
      updateBrightness(deviceId, this.value);
    });
  });

  function updateBrightness(deviceId, value) {
    console.log(`Setting brightness of device ${deviceId} to ${value}%`);
    // Here you would typically make an API call to your smart home system
  }

  // Mobile menu toggle
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.querySelector(".nav-menu");

  navToggle.addEventListener("click", function () {
    navMenu.classList.toggle("active");
    this.classList.toggle("active");
  });
});
