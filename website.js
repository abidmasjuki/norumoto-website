// Norumoto EV Website Interactivity & Observers - v2.7.5

// Firebase Configuration & Initialization
const firebaseConfig = {
  apiKey: "AIzaSyB5Rn3kWoFQy5Zh1HP1xbBkS-f2UIa-8M0",
  authDomain: "norumoto-ev.firebaseapp.com",
  projectId: "norumoto-ev",
  storageBucket: "norumoto-ev.firebasestorage.app",
  messagingSenderId: "920287063800",
  appId: "1:920287063800:web:2f96aecf6ba0fdb0c2150d",
  measurementId: "G-MEQ09628QG"
};

let firestoreDb = null;
try {
  if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
    firestoreDb = firebase.firestore();
    console.log("🔥 Firebase initialized on Norumoto Website.");
  }
} catch (e) {
  console.error("Firebase init failed:", e);
}

// 1. Dynamic Floating Dust Particles Generator (Disabled for Tesla-inspired visual cleanliness)
document.addEventListener('DOMContentLoaded', () => {
  // Particles generation removed to avoid UI visual noise
});

// 2. Navigation Scroll Background Adjuster
window.addEventListener('scroll', () => {
  const header = document.getElementById('main-header');
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
});

// 3. Scroll Reveal & Intersection Observer (GSAP-like story triggers)
document.addEventListener('DOMContentLoaded', () => {
  const revealOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        
        // Custom camera push effect on vehicle image inside that section
        const sectionImg = entry.target.querySelector('.design-bike-img, .config-visual-img');
        if (sectionImg) {
          sectionImg.style.transform = 'scale(1.02)';
        }
        
        // Stop observing once revealed to retain visual state
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);
  
  const revealElements = document.querySelectorAll('.reveal, .scale-reveal');
  revealElements.forEach(el => revealObserver.observe(el));
});

// 4. Parallax Hero Effect & Camera Push
window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY;
  const heroBike = document.getElementById('hero-scooter-image');
  const heroGlow = document.getElementById('hero-glow');
  
  if (heroBike && scrollPos < window.innerHeight) {
    // Smooth camera push toward the bike on scroll
    const scaleFactor = 1 + (scrollPos / window.innerHeight) * 0.08;
    const translateFactor = (scrollPos / window.innerHeight) * 30;
    heroBike.style.transform = `scale(${scaleFactor}) translateY(${translateFactor}px)`;
    
    if (heroGlow) {
      heroGlow.style.opacity = 1 - (scrollPos / window.innerHeight) * 0.5;
    }
  }
});

// 5. Configurator Interactive Options & Images Map
const colorImages = {
  red: 'assets/scooter-red.jpg',
  blue: 'assets/scooter-blue.jpg',
  grey: 'assets/scooter-grey.jpg',
  black: 'assets/scooter-black.jpg'
};

let currentMode = 'eco';
let currentColor = 'red';

const vehicleStats = {
  eco: { range: '120 km', speed: '45 km/h', temp: '30°C' },
  normal: { range: '90 km', speed: '65 km/h', temp: '34°C' },
  sport: { range: '65 km', speed: '83 km/h', temp: '41°C' }
};

const colorDescs = {
  red: "Bold, sporty red highlighting dynamic performance.",
  blue: "Tranquil blue echoing high-tech sophistication.",
  grey: "Modern minimalism finished in a sleek metallic silver.",
  black: "Glossy shiny black finish projecting elegance and authority."
};

function changeColor(colorName, label) {
  currentColor = colorName;
  
  // Swap the image source (fallback for 2D mode)
  const imgElement = document.getElementById('configurator-image');
  if (imgElement && colorImages[colorName]) {
    imgElement.style.opacity = 0;
    setTimeout(() => {
      imgElement.src = colorImages[colorName];
      imgElement.style.opacity = 1;
    }, 200);
  }
  
  // Swap active selectors dot
  const dots = document.querySelectorAll('.color-picker-dot');
  dots.forEach(dot => dot.classList.remove('active'));
  
  const activeDot = document.getElementById(`opt-color-${colorName}`);
  if (activeDot) {
    activeDot.classList.add('active');
  }
  
  // Set label text
  const labelElement = document.getElementById('selected-color-label');
  if (labelElement) {
    labelElement.innerText = label;
  }
  
  // Update dynamic color description (part of combined design studio)
  const descElement = document.getElementById('config-color-desc');
  if (descElement && colorDescs[colorName]) {
    const engDesc = colorDescs[colorName];
    if (typeof currentLang !== 'undefined' && currentLang === 'ms' && translationMap[engDesc]) {
      descElement.innerText = translationMap[engDesc];
    } else {
      descElement.innerText = engDesc;
    }
    // Cache the original English text for the language walker
    descElement._originalEnglish = engDesc;
  }
  
  // Update 3D color configuration dynamically
  updateSplineColor(colorName);
}

function changeMode(modeName, element) {
  currentMode = modeName;
  
  // Swap active spec selection cards
  const modeItems = document.querySelectorAll('.config-mode-item');
  modeItems.forEach(item => item.classList.remove('active'));
  
  if (element) {
    element.classList.add('active');
  }
  
  // Dynamically update specification grid highlights
  const mainRange = document.getElementById('badge-eco-val');
  const mainSpeed = document.getElementById('badge-normal-val');
  const mainSport = document.getElementById('badge-sport-val');
  
  // Custom interactive animations to reflect specs
  const selectedStats = vehicleStats[modeName];
  console.log(`[Configurator] Switch to mode: ${modeName}. Stats:`, selectedStats);
}

// 6. Navigation Link Highlighting on Scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav ul li a');
  
  let currentSecId = '';
  sections.forEach(sec => {
    const secTop = sec.offsetTop;
    const secHeight = sec.clientHeight;
    if (window.scrollY >= (secTop - 120)) {
      currentSecId = sec.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSecId}`) {
      link.classList.add('active');
    }
  });
});

// 7. Smooth Scroll Action
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    window.scrollTo({
      top: section.offsetTop - 80,
      behavior: 'smooth'
    });
  }
}

// 8. Dealership Integration
document.addEventListener('DOMContentLoaded', () => {
  const selectDealership = document.getElementById('input-dealership');
  if (!selectDealership) return;

  const fallbackDealers = [
    { id: 1, name: "Norumoto HQ Direct", address: "LOT 79979, Jalan Desa Surada, Kg Sungai Ramal Dalam, 43000 Kajang, Selangor" }
  ];

  function populateDropdown(dealers) {
    selectDealership.innerHTML = '';
    if (dealers && dealers.length > 0) {
      dealers.forEach(dealer => {
        const option = document.createElement('option');
        const dId = isNaN(parseInt(dealer.id)) ? dealer.id : parseInt(dealer.id);
        option.value = dId;
        option.innerText = `${dealer.name} - ${dealer.address}`;
        selectDealership.appendChild(option);
      });
    } else {
      selectDealership.innerHTML = '<option value="" disabled selected>Cawangan tidak tersedia</option>';
    }
  }

  if (firestoreDb) {
    firestoreDb.collection('norumoto_dealerships').get()
      .then(snapshot => {
        const dealers = [];
        snapshot.forEach(doc => {
          dealers.push({ id: doc.id, ...doc.data() });
        });
        if (dealers.length > 0) {
          populateDropdown(dealers);
        } else {
          populateDropdown(fallbackDealers);
        }
      })
      .catch(err => {
        console.error('[Norumoto Web] Firestore load dealerships error, using static fallback:', err);
        populateDropdown(fallbackDealers);
      });
  } else {
    console.warn('[Norumoto Web] Firestore not initialized, using static fallback');
    populateDropdown(fallbackDealers);
  }
});

// 9. Multi-Step Wizard Navigation, Selection & Leaflet Dark Map Integration
let currentFormStep = 1;
let leafletMap = null;
let leafletMarker = null;

// Tab Selection (Test Ride vs Pre-order)
function selectBookingType(type) {
  document.getElementById('input-enquiry').value = type;
  
  const tabTestRide = document.getElementById('tab-test-ride');
  const tabPreOrder = document.getElementById('tab-pre-order');
  const groupDatetime = document.getElementById('group-datetime');
  
  const dateInput = document.getElementById('input-booking-date');
  const timeInput = document.getElementById('input-booking-time');
  const addressInput = document.getElementById('input-address');
  
  if (type === 'test-ride') {
    tabTestRide.classList.add('active');
    tabPreOrder.classList.remove('active');
    groupDatetime.style.display = 'block';
    
    // Test ride requires Date/Time
    dateInput.required = true;
    timeInput.required = true;
    if (addressInput) addressInput.required = false;
  } else {
    tabTestRide.classList.remove('active');
    tabPreOrder.classList.add('active');
    groupDatetime.style.display = 'none';
    
    // Pre-order does not require Date/Time
    dateInput.required = false;
    timeInput.required = false;
    if (addressInput) addressInput.required = true;
  }
}

// Payment Method Selector Card
function selectPaymentMethod(method) {
  document.getElementById('input-payment').value = method;
  
  // Highlight active payment card
  const cards = document.querySelectorAll('.payment-card');
  cards.forEach(card => card.classList.remove('active'));
  
  const mapping = {
    'Loan - Bank Rakyat': 'pay-card-rakyat',
    'Loan - AEON Credit': 'pay-card-aeon',
    'Credit Card Installment': 'pay-card-card',
    'Cash': 'pay-card-cash'
  };
  
  const activeId = mapping[method];
  if (activeId) {
    document.getElementById(activeId).classList.add('active');
  }
}

// Step Navigation Logic
function updateWizardProgress() {
  // Update progress steps active states
  for (let i = 1; i <= 3; i++) {
    const marker = document.getElementById(`step-marker-${i}`);
    if (marker) {
      if (i < currentFormStep) {
        marker.classList.add('completed');
        marker.classList.remove('active');
      } else if (i === currentFormStep) {
        marker.classList.add('active');
        marker.classList.remove('completed');
      } else {
        marker.classList.remove('active', 'completed');
      }
    }
  }
  
  // Update line width: Step 1 (0%), Step 2 (50%), Step 3 (100%)
  const percent = ((currentFormStep - 1) / 2) * 100;
  const progressLine = document.getElementById('progress-line');
  if (progressLine) {
    progressLine.style.width = `${percent}%`;
  }
}

function goToNextStep() {
  // 1. Validate fields inside current step
  const activeStepDiv = document.getElementById(`form-step-${currentFormStep}`);
  if (!activeStepDiv) return;
  
  const inputs = activeStepDiv.querySelectorAll('input, select');
  
  let valid = true;
  inputs.forEach(input => {
    if (input.required && !input.value.trim()) {
      input.reportValidity();
      valid = false;
    }
  });
  
  if (!valid) return;
  
  // 2. Conditional navigation logic
  const enquiryType = document.getElementById('input-enquiry').value;
  let nextStep = currentFormStep + 1;
  
  // If Test-Ride, skip step 2 (Penghantaran / Map) entirely
  if (currentFormStep === 1 && enquiryType === 'test-ride') {
    nextStep = 3;
  }
  
  // Transition steps
  const currentStepDiv = document.getElementById(`form-step-${currentFormStep}`);
  if (currentStepDiv) currentStepDiv.classList.remove('active');
  
  currentFormStep = nextStep;
  
  const nextStepDiv = document.getElementById(`form-step-${currentFormStep}`);
  if (nextStepDiv) nextStepDiv.classList.add('active');
  
  updateWizardProgress();
  
  // Initialize Leaflet map if entering Step 2
  if (currentFormStep === 2) {
    setTimeout(initLeafletMap, 100);
  }
}

function goToPrevStep() {
  const enquiryType = document.getElementById('input-enquiry').value;
  let prevStep = currentFormStep - 1;
  
  // If Test-Ride and on step 3, go back to step 1 (skip step 2)
  if (currentFormStep === 3 && enquiryType === 'test-ride') {
    prevStep = 1;
  }
  
  // Transition steps
  const currentStepDiv = document.getElementById(`form-step-${currentFormStep}`);
  if (currentStepDiv) currentStepDiv.classList.remove('active');
  
  currentFormStep = prevStep;
  
  const prevStepDiv = document.getElementById(`form-step-${currentFormStep}`);
  if (prevStepDiv) prevStepDiv.classList.add('active');
  
  updateWizardProgress();
}

// Leaflet.js Map Initialization (Zero Cost, Styled Dark Mode)
function initLeafletMap() {
  if (leafletMap) {
    leafletMap.invalidateSize();
    return;
  }
  
  const defaultLat = 3.1390;
  const defaultLng = 101.6869;
  
  // Initialize map centered at default coordinates
  leafletMap = L.map('leaflet-map', {
    center: [defaultLat, defaultLng],
    zoom: 13,
    zoomControl: true
  });
  
  // Load beautiful dark-themed tiles from CartoDB (free, no keys required)
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
  }).addTo(leafletMap);
  
  // Add a customizable marker with brand coordinates
  leafletMarker = L.marker([defaultLat, defaultLng], {
    draggable: true
  }).addTo(leafletMap);
  
  // Sync inputs on dragend
  leafletMarker.on('dragend', function() {
    const pos = leafletMarker.getLatLng();
    document.getElementById('coord-lat').value = pos.lat.toFixed(6);
    document.getElementById('coord-lng').value = pos.lng.toFixed(6);
  });
  
  // Sync inputs on click
  leafletMap.on('click', function(e) {
    leafletMarker.setLatLng(e.latlng);
    document.getElementById('coord-lat').value = e.latlng.lat.toFixed(6);
    document.getElementById('coord-lng').value = e.latlng.lng.toFixed(6);
  });
}

// Locate Me browser GPS trigger
function triggerGeoLocation(event) {
  if (event) event.preventDefault();
  
  if (!navigator.geolocation) {
    alert("Browser anda tidak menyokong fungsi pengesanan GPS.");
    return;
  }
  
  const gpsBtn = document.querySelector('.map-gps-btn');
  const originalText = gpsBtn ? gpsBtn.innerText : '🧭';
  if (gpsBtn) gpsBtn.innerText = '⏳';
  
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      
      document.getElementById('coord-lat').value = lat.toFixed(6);
      document.getElementById('coord-lng').value = lng.toFixed(6);
      
      if (leafletMap && leafletMarker) {
        leafletMap.setView([lat, lng], 15);
        leafletMarker.setLatLng([lat, lng]);
      }
      if (gpsBtn) gpsBtn.innerText = originalText;
    },
    (error) => {
      console.warn("Geolocation failed:", error);
      alert("Gagal mengesan lokasi anda secara automatik. Sila pin lokasi secara manual.");
      if (gpsBtn) gpsBtn.innerText = originalText;
    },
    { enableHighAccuracy: true, timeout: 8000 }
  );
}

// 10. Form Submission (Writes to SQLite leads table via server, or Firestore in Cloud mode)
function submitLeadForm(event) {
  event.preventDefault();
  
  const name = document.getElementById('input-name').value;
  const phone = document.getElementById('input-phone').value;
  const enquiry_type = document.getElementById('input-enquiry').value;
  const dealership_id = document.getElementById('input-dealership').value;
  const payment_method = document.getElementById('input-payment').value;
  
  // Form conditional payload values
  let address = '';
  let booking_date = '';
  let booking_time = '';
  
  if (enquiry_type === 'pre-order') {
    const rawAddress = document.getElementById('input-address').value;
    const lat = document.getElementById('coord-lat').value;
    const lng = document.getElementById('coord-lng').value;
    address = `${rawAddress} (Coords: ${lat}, ${lng})`;
  } else {
    booking_date = document.getElementById('input-booking-date').value;
    booking_time = document.getElementById('input-booking-time').value;
  }
  
  const statusAlert = document.getElementById('form-status-alert');
  const submitButton = document.getElementById('btn-submit-booking');
  
  submitButton.disabled = true;
  submitButton.innerText = 'Menghantar Maklumat...';
  statusAlert.style.display = 'none';
  statusAlert.className = 'form-status';
  
  const payload = {
    name,
    phone,
    enquiry_type,
    dealership_id: isNaN(parseInt(dealership_id)) ? 1 : parseInt(dealership_id),
    address,
    payment_method,
    color: currentColor || 'red',
    booking_date,
    booking_time,
    timestamp: new Date().toISOString(),
    status: 'pending',
    assigned_worker: 'Adam'
  };

  function handleSuccess() {
    statusAlert.innerText = 'Pendaftaran berjaya! Penasihat sah kami akan menghubungi anda sebentar lagi.';
    statusAlert.style.display = 'block';
    statusAlert.classList.add('success');
    
    // Reset Form & Steps
    document.getElementById('lead-booking-form').reset();
    
    // Reset enquiry type tabs to default
    selectBookingType('pre-order');
    
    // Reset payment cards to default
    selectPaymentMethod('Loan - Bank Rakyat');
    
    // Reset map state
    if (leafletMarker) {
      const defaultLat = 3.1390;
      const defaultLng = 101.6869;
      leafletMarker.setLatLng([defaultLat, defaultLng]);
      if (leafletMap) leafletMap.setView([defaultLat, defaultLng], 13);
    }
    document.getElementById('coord-lat').value = '3.1390';
    document.getElementById('coord-lng').value = '101.6869';
    
    // Reset wizard steps back to step 1
    document.getElementById(`form-step-${currentFormStep}`).classList.remove('active');
    currentFormStep = 1;
    document.getElementById('form-step-1').classList.add('active');
    updateWizardProgress();
    
    submitButton.disabled = false;
    submitButton.innerText = 'Hantar Tempahan ✓';
  }

  function handleError(err) {
    console.error('[Norumoto Web] Lead submit error:', err);
    statusAlert.innerText = err.message || 'Gagal menghantar tempahan. Sila semak semula nombor telefon anda.';
    statusAlert.style.display = 'block';
    statusAlert.classList.add('error');
    submitButton.disabled = false;
    submitButton.innerText = 'Hantar Tempahan ✓';
  }

  const isLocalEnv = window.location.hostname === 'localhost' || 
                     window.location.hostname === '127.0.0.1' || 
                     window.location.hostname === '' ||
                     window.location.protocol === 'file:';
  
  const localOriginEnv = window.location.port === '4000' ? '' : 'http://localhost:4000';
  const leadApiUrl = isLocalEnv ? (localOriginEnv + '/api/public/lead') : 'https://norumoto-ev-backend.onrender.com/api/public/lead';

  fetch(leadApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  .then(res => {
    if (!res.ok) {
      return res.json().then(data => { throw new Error(data.error || 'Server error'); });
    }
    return res.json();
  })
  .then(data => {
    handleSuccess();
  })
  .catch(err => {
    handleError(err);
  });
}

// 11. FAQ / Objections Accordion Toggle
document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other accordion items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });
        
        // Toggle current item
        item.classList.toggle('active');
      });
    }
  });
});

// WebGL and 3D Spline Initialization
let splineHeroApp = null;
let splineConfigApp = null;
let is3DActive = false;

// Color hex mappings for 3D model paint interpolation
const colorHexMap = {
  red: '#ff3b30',
  blue: '#00d2ff',
  grey: '#8e8e93',
  black: '#1c1c1e'
};

function init3DExperience() {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
  
  // Check for WebGL support
  let webglSupported = false;
  try {
    const canvas = document.createElement('canvas');
    webglSupported = !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    webglSupported = false;
  }

  // Fallback if mobile or WebGL not supported
  if (isMobile || !webglSupported) {
    console.log("ℹ️ Mobile device or WebGL unsupported. Defaulting to high-res 2D renders.");
    return;
  }

  const heroViewer = document.getElementById('hero-spline-viewer');
  const configViewer = document.getElementById('config-spline-viewer');
  
  if (heroViewer) {
    heroViewer.addEventListener('load', () => {
      console.log("🎮 Hero 3D scene loaded.");
      splineHeroApp = heroViewer.spline;
      document.getElementById('hero-spline-container').style.display = 'block';
      document.querySelector('.hero-centerpiece').classList.add('has-3d');
      is3DActive = true;
      
      // Inject HUD info overlay
      const hud = document.createElement('div');
      hud.className = 'spline-overlay-hud';
      hud.innerHTML = 'Interactive 3D | Hover to Rotate';
      document.getElementById('hero-spline-container').appendChild(hud);
    });
  }
  
  if (configViewer) {
    configViewer.addEventListener('load', () => {
      console.log("🎮 Configurator 3D scene loaded.");
      splineConfigApp = configViewer.spline;
      document.getElementById('config-spline-container').style.display = 'block';
      document.querySelector('.config-visual-container').classList.add('has-3d');
      
      // Sync color configurator with current state
      updateSplineColor(currentColor);

      // Inject HUD info overlay
      const hud = document.createElement('div');
      hud.className = 'spline-overlay-hud';
      hud.innerHTML = '3D Configurator | Drag to Rotate';
      document.getElementById('config-spline-container').appendChild(hud);
    });
  }

  // Set up lazy viewport intersection to pause rendering off-screen
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const viewer = entry.target;
        if (viewer.spline) {
          if (entry.isIntersecting) {
            console.log("Resume 3D rendering loop:", viewer.id);
          } else {
            console.log("Pause 3D rendering loop:", viewer.id);
          }
        }
      });
    }, { threshold: 0.1 });
    
    if (heroViewer) observer.observe(heroViewer);
    if (configViewer) observer.observe(configViewer);
  }
}

// Function to safely update spline color variables
function updateSplineColor(colorName) {
  if (!splineConfigApp) return;
  const hexColor = colorHexMap[colorName] || '#ff3b30';
  try {
    // Set variables in Spline Editor if named 'bodyColor' or 'paintColor'
    splineConfigApp.setVariable('bodyColor', hexColor);
    splineConfigApp.setVariable('paintColor', hexColor);
    // Emit event for state change if configured in Spline
    splineConfigApp.emitEvent('changeColor', colorName);
  } catch (e) {
    console.warn("Spline variable set failed (ignore if scene is custom or lacks variables):", e);
  }
}

document.addEventListener('DOMContentLoaded', init3DExperience);

// 12. Floating Chatbot Interactions
function toggleChatWindow() {
  const chatWindow = document.getElementById('chat-window');
  if (chatWindow) {
    chatWindow.classList.toggle('active');
  }
}

function sendChatMessage(event) {
  event.preventDefault();
  
  const inputEl = document.getElementById('chat-user-input');
  const messagesBox = document.getElementById('chat-messages-box');
  if (!inputEl || !messagesBox) return;
  
  const userText = inputEl.value.trim();
  if (!userText) return;
  
  // Clear input
  inputEl.value = '';
  
  // Append user message
  const userMsgDiv = document.createElement('div');
  userMsgDiv.className = 'chat-msg chat-msg-user';
  userMsgDiv.innerText = userText;
  messagesBox.appendChild(userMsgDiv);
  messagesBox.scrollTop = messagesBox.scrollHeight;
  
  // Append typing indicator with dynamic animation classes
  const typingDiv = document.createElement('div');
  typingDiv.className = 'chat-msg chat-msg-typing';
  typingDiv.id = 'chat-typing-indicator';
  typingDiv.innerHTML = '<span class="status-icon">💬</span> <span class="status-text">' + (currentLang === 'ms' ? 'Syazwani sedang menaip...' : 'Syazwani is typing...') + '</span>';
  messagesBox.appendChild(typingDiv);
  messagesBox.scrollTop = messagesBox.scrollHeight;

  // Natural human concierge status updates
  const statusMessages = currentLang === 'ms' ? [
    { icon: "💬", text: "Syazwani sedang menaip..." },
    { icon: "🔍", text: "Menyemak maklumat skuter..." },
    { icon: "📝", text: "Menyediakan maklumat terbaik untuk anda..." }
  ] : [
    { icon: "💬", text: "Syazwani is typing..." },
    { icon: "🔍", text: "Checking scooter details..." },
    { icon: "📝", text: "Preparing details for you..." }
  ];

  let currentMsgIdx = 0;
  const statusInterval = setInterval(() => {
    currentMsgIdx = (currentMsgIdx + 1) % statusMessages.length;
    const indicatorText = document.querySelector('#chat-typing-indicator .status-text');
    const indicatorIcon = document.querySelector('#chat-typing-indicator .status-icon');
    if (indicatorText && indicatorIcon) {
      indicatorText.innerText = statusMessages[currentMsgIdx].text;
      indicatorIcon.innerText = statusMessages[currentMsgIdx].icon;
    }
  }, 3500);
  
  // Send query to backend API (uses relative local path or production Render URL)
  // Retrieve or generate persistent session ID for Syazwani Short-Term Memory
  let sessionId = localStorage.getItem('norumoto_session_id');
  if (!sessionId) {
    sessionId = 'web_guest_' + Math.random().toString(36).substring(2, 10) + '_' + Date.now();
    localStorage.setItem('norumoto_session_id', sessionId);
  }

  const isLocalEnv = window.location.hostname === 'localhost' || 
                     window.location.hostname === '127.0.0.1' || 
                     window.location.hostname === '' ||
                     window.location.protocol === 'file:';
  
  const localOriginEnv = (window.location.port === '4000' || window.location.port === '3000') ? '' : 'http://localhost:3000';
  const chatApiUrl = isLocalEnv ? (localOriginEnv + '/api/public/chat') : 'https://norumoto-ev-backend.onrender.com/api/public/chat';

  function getDynamicFrontendFallback(text) {
    const q = (text || '').toLowerCase();
    if (/\d{12}|\d{6}-\d{2}-\d{4}|ic saya|no ic|nombor ic|931119105869/.test(q)) {
      const icMatch = q.match(/\d{12}|\d{6}-\d{2}-\d{4}/);
      const icVal = icMatch ? icMatch[0] : "931119105869";
      return "Terima kasih banyak! Wani dah dapat No. IC (" + icVal + ") awak. Wani telah hantarkan maklumat kelayakan ini terus kepada Encik Abid (+60199345212) & Pasukan Jualan HQ Norumoto EV untuk pemprosesan pantas dengan Bank Muamalat / AEON Credit! 😊\n\nSila tekan butang WhatsApp Abid di bawah untuk menghantar slip gaji & penyata bank!";
    } else if (/10 tahun|sepuluh tahun|loan 10/.test(q)) {
      return "Haa kalau loan 10 tahun melalui Pembiayaan Bank Muamalat Syariah (kadar 2.77% p.a., 0 penjamin/yuran), ansuran bulanan anggaran cuma ~RM106 sebulan je tau! (Lebih kurang RM3.50 sehari je, lagi jimat dari tambang bas atau isi minyak!). Haa awak nak Wani semakkan kelayakan IC & dokumen awak dengan Encik Abid (+60199345212) tak?";
    } else if (/7 tahun|tujuh tahun|loan 7/.test(q)) {
      return "Untuk tempoh 7 tahun dengan Bank Muamalat (2.77% p.a.), ansuran bulanan anggaran cuma ~RM142 sebulan je tau! Cukup jimat & selesa. Nak Wani tolong uruskan permohonan kelayakan percuma dengan Encik Abid (+60199345212) tak?";
    } else if (/5 tahun|lima tahun|loan 5/.test(q)) {
      return "Untuk tempoh 5 tahun dengan Bank Muamalat (2.77% p.a.), ansuran bulanan anggaran cuma ~RM190 sebulan je tau! Boleh jimat banyak faedah. Awak nak Wani semakkan kelayakan pinjaman percuma tak?";
    } else if (/3 tahun|tiga tahun|loan 3/.test(q)) {
      return "Untuk tempoh 3 tahun dengan Bank Muamalat (2.77% p.a.), ansuran bulanan anggaran cuma ~RM300 sebulan je tau! Cepat habis bayar & jimat faedah. Awak nak pilih tempoh 3 tahun ke nak tempoh lagi panjang?";
    } else if (/berapa sebulan|ansuran sebulan|bulanan berapa|sebulan berapa|bayar sebulan/.test(q)) {
      return "Ansuran bulanan skuter S90 Promax (RM9,999) sangat jimat bergantung tempoh loan Bank Muamalat (kadar 2.77% p.a., 0 deposit/penjamin):\n• 10 Tahun: ~RM106 / bulan (~RM3.50/hari)\n• 7 Tahun: ~RM142 / bulan\n• 5 Tahun: ~RM190 / bulan\n• 3 Tahun: ~RM300 / bulan\n\nHaa tempoh berapa tahun yang rasa paling selesa dengan bajet bulanan awak?";
    } else if (/kelayakan|semak|check kelayakan|dokumen|syarat loan|syarat mohon/.test(q)) {
      return "Boleh sangat tau! Wani & Team Sales kami boleh tolong semakkan kelayakan pinjaman awak secara PERCUMA & PANTAS! 😊\n\n📌 SYARAT KELAYAKAN LOAN:\n• Warganegara Malaysia (18-60 tahun)\n• Gaji bersih RM1,500-RM1,800/bulan (Swasta, Penjawat Awam, Gig Economy & Peniaga)\n\n📄 DOKUMEN DIPERLUKAN:\n1. IC (Depan & Belakang)\n2. Slip Gaji 3 Bulan\n3. Bank Statement 3 Bulan\n\nAwak nak Wani hantarkan borang semakan percuma terus ke WhatsApp awak atau berhubung dengan Encik Abid (+60199345212)?";
    } else if (/team sales|sales buat apa|fungsi sales|servis jualan|apa sales boleh buat|apa wani boleh tolong/.test(q)) {
      return "Team Sales Norumoto EV bersama Wani & Encik Abid sedia membantu anda A-Z secara lengkap:\n\n1. 🏦 SEMAKAN KELAYAKAN & PERMOHONAN LOAN (Bank Muamalat 2.77% / AEON Credit)\n2. 🛵 TEMPAHAN PANDU UJI (TEST-RIDE) PERCUMA DI HQ KAJANG\n3. 🚚 PENGHANTARAN TERUS KE PINTU RUMAH SELURUH SEMENANJUNG\n4. 📋 PENDAFTARAN JPJ, ROADTAX & INSURANS KOMPREHENSIF\n5. 🔧 JAMINAN BATERI 2 TAHUN (IP67) & SERVIS YOUNG MECHANICS\n\nHaa servis mana satu yang awak nak Wani & Team Sales bantu uruskan hari ini?";
    } else if (/2\.77|2\.777|tipu|scam|betul ke|betul ka|takut|percaya|sah ke/.test(q)) {
      return "Wani faham sangat kerunsingan awak... 😊 Risau kan kalau mula-mula dijanjikan kadar 2.77% p.a., tapi bila dah mohon tiba-tiba kadar melambung tinggi atau ada syarat tersembunyi?\n\nBiar Wani terangkan secara jujur & telus macam mana struktur kadar Bank Muamalat ni berfungsi:\n\n1. 🏦 MACAM MANA BOLEH DAPAT KADAR 2.77% P.A.?\nKadar serendah 2.77% p.a. ini adalah kadar promosi rasmi Pembiayaan Peribadi-i Bank Muamalat (Cash-i) khusus untuk Kakitangan Kerajaan, Badan Berkanun, GLC, & Syarikat Panel EEP yang membuat bayaran menerusi Potongan Gaji Rasmi (BPA/PBT).\n\n2. 📈 MACAM MANA KADAR BOLEH MENINGKAT (HINGGA 4.5% - 11% P.A.)?\nWalaupun menggunakan Bank Muamalat, peratusan kadar faedah akan bertambah jika:\n• Pemohon bekerja di Sektor Swasta Biasa (Non-Panel).\n• Bayaran dibuat menerusi Pindahan Bank / Pindahan Akaun (tanpa potongan gaji).\n• Pihak bank menyesuaikan kadar mengikut skor penilaian kredit (CTOS/CCRIS) & tahap risiko syarikat majikan.\n\n🔗 SEMAK HELEAIAN PRODUCT DISCLOSURE SHEET RASMI:\nAwak boleh semak jadual kadar rasmi mengikut kategori majikan di portal Bank Muamalat: https://map.muamalat.com.my atau https://www.muamalat.com.my\n\nHaa kerunsingan utama awak sekarang ni berkenaan status syarikat majikan awak ke, atau nak tahu anggapan kadar untuk sektor swasta? Boleh Wani tahu awak kerja sektor apa sekarang?";
    } else if (/jpj|lesen|cukai jalan|roadtax|saman|plat/.test(q)) {
      return "Wani faham kerunsingan awak... 😊 Risau kan takut timbul isu saman, lesen, atau tak boleh daftar nama sendiri bila bawa skuter EV ni?\n\n📌 JAMINAN KESELAMATAN & UNDANG-UNDANG NORUMOTO:\n1. 📋 PENDAFTARAN JPJ A-Z: Pasukan HQ Norumoto Kajang diuruskan oleh Encik Abid (+60199345212) akan uruskan pendaftaran nombor plat JPJ & permohonan geran atas nama awak secara rasmi!\n2. 🪪 SYARAT LESEN: Cukup sekadar lesen motosikal B2 / B Full biasa sahaja tau.\n3. 📄 CUKAI JALAN (ROADTAX): Skuter EV menikmati pengecualian/subsidi cukai jalan khas rasmi daripada JPJ.\n\nHaa kerunsingan awak sekarang berkenaan pendaftaran geran atas nama sendiri ke, atau status lesen yang awak ada sekarang?";
    } else if (/banjir|ip67|hujan|air|meletup|bateri rosak|tahan air/.test(q)) {
      return "Wani faham sangat kerunsingan awak... 😊 Bila dengar pasal skuter elektrik, memang ramai risau kalau bateri litar pintas, meletup, atau kos tukar bateri melambung bila rosak kan?\n\n📌 BUKTI KESELAMATAN BATERI LITIUM NORUMOTO:\n1. 🌊 TARAF KALIS AIR IP67: Bateri & motor kami mempunyai meterai kalis air 100% (Wani sendiri pernah redah banjir parit sedalam 1 kaki/12 inci kat KL, steady je jalan!).\n2. 🛡️ WARANTI PERCUMA 2 TAHUN: Bateri Litium Modular Berkuasa Tinggi kami dilindungi jaminan waranti penuh selama 2 TAHUN! Jika ada masalah litar, kami tukar/servis secara percuma.\n\nHaa kawasan rumah atau lalu lintas harian awak selalu banjir ke bila hujan lebat?";
    } else if (/naik bukit|bawa 2 orang|dua orang|larat ke|berat|genting|cameron/.test(q)) {
      return "Wani faham kerunsingan awak! 😊 Risau kan kalau skuter EV ni rasa macam 'moped mainan' yang lemau, terhegeh-hegeh bila bawa pembonceng, atau tak larat nak mendaki bukit?\n\n📌 KUASA MOTOR BRUSHLESS HIGH-TORQUE S90 PROMAX:\n1. 🏔️ TORK MENDAKI BUKIT: Motor Brushless tork tinggi kami direka khas untuk mendaki kecurian bukit 15-20 darjah tanpa masalah!\n2. ⚖️ CAPACITY BEBAN 150KG: Menyokong berat 2 orang dewasa (sehingga 150kg) dengan lancar dan stabil.\n\nHaa awak nak datang HQ Kajang untuk cuba pandu uji (test-ride) mendaki laluan berbukit bersama Wani & Encik Abid secara percuma tak?";
    } else if (/aeon|aeon credit|aeon kredit|pinjaman aeon/.test(q)) {
      return "Buat masa ini, Norumoto EV berfokus penuh kepada Rakan Pembiayaan Utama kami iaitu Pembiayaan Peribadi-i Bank Muamalat Syariah dengan kadar serendah 2.77% p.a. (0 deposit, 0 penjamin, ansuran sehingga 10 tahun ~RM106/bulan)! Permohonan AEON Credit sedang ditangguhkan seketika. Haa awak nak Wani semakkan kelayakan dengan Bank Muamalat tak?";
    } else if (/wani tolong check|wani checkkan|wani boleh check|wani semakkan|macam mana wani tolong|wani real sales/.test(q)) {
      return "Sebagai Perunding Jualan Norumoto EV, Wani sendiri tak boleh terus semak sistem bank/CTOS/CCRIS secara automatik tau! Tapi apa yang Wani BOLEH tolong buat secara PERCUMA & PANTAS ialah:\n\n1. 📝 Wani kumpulkan maklumat asas (No. IC, Pendapatan Bulanan, Status Pekerjaan, & Lokasi).\n2. 📋 Wani ringkaskan kesimpulan permohonan awak secara rasmi.\n3. 📱 Wani hantarkan rumusan kelayakan ini terus ke WhatsApp Encik Abid (+60199345212) & Telegram Team Sales HQ untuk permohonan rasmi dengan Bank Muamalat Syariah!\n\nHaa awak nak Wani tolong ringkaskan & kumpulkan maklumat permohonan awak sekarang?";
    } else if (/hobi|masa lapang|buat apa|free time/.test(q)) {
      return "Masa lapang Wani memang suka buat video TikTok & ride santai pusing KL/Kajang naik skuter Norumoto S90 Promax! Haa awak pulak suka buat hobi apa masa free?";
    } else if (/duduk|tinggal|lokasi|rumah|asal|orang mana/.test(q)) {
      return "Wani tinggal kat kawasan Kajang/Bangi ni haa! Setiap hari Wani ulang-alik pi kampus UM dan HQ Norumoto EV Kajang naik skuter S90 Promax. Haa awak pulak tinggal kat kawasan mana tu?";
    } else if (/kursus|bidang|jurusan|kos|kuru|ambil apa|study apa|belajar apa/.test(q)) {
      return "Wani sekarang tengah ambil Ijazah Sarjana Muda Pengajian Media (Komunikasi & Media) di Universiti Malaya (UM) tau! Sesuai sangat dengan jiwa Wani yang suka buat kandungan TikTok & berinteraksi sebagai Brand Ambassador Norumoto EV. Haa, awak pulak dulu atau sekarang belajar bidang apa?";
    } else if (/belajar mana|study mana|universiti mana|sekolah mana|umur/.test(q)) {
      return "Wani umur 22 tahun, sekarang ni masih menuntut di Universiti Malaya (UM) tau! Haa awak pulak ulang-alik tempat kerja atau tempat belajar naik apa sekarang?";
    } else {
      return "Eh sorry tau! Wani nak pastikan Wani faham betul-betul soalan awak. 😊 Adakah awak nak tanya pasal skuter Norumoto S90 Promax (harga RM9,999 / ansuran RM106), tempahan test-ride di HQ Kajang, atau permohonan loan Bank Muamalat 2.77%?";
    }
  }

  function fetchWithRetry(url, payload, retriesLeft = 2) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 22000);

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal
    })
    .then(res => {
      clearTimeout(timeoutId);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(data => {
      clearInterval(statusInterval);
      const indicator = document.getElementById('chat-typing-indicator');
      if (indicator) indicator.remove();
      
      let replyText = data.reply || '';
      if (!replyText || replyText.includes('masalah teknikal')) {
        replyText = getDynamicFrontendFallback(userText);
      }

      const botMsgDiv = document.createElement('div');
      botMsgDiv.className = 'chat-msg chat-msg-bot';
      botMsgDiv.innerText = replyText.trim();
      messagesBox.appendChild(botMsgDiv);

      // Add Voice Concierge Audio Button
      const voiceBtnDiv = document.createElement('div');
      voiceBtnDiv.style.alignSelf = 'flex-start';
      voiceBtnDiv.style.marginTop = '0.25rem';
      voiceBtnDiv.style.marginBottom = '0.5rem';
      
      const safeText = replyText.replace(/'/g, "\\'").replace(/"/g, '&quot;');
      voiceBtnDiv.innerHTML = `
        <button onclick="playWaniVoice(this, '${safeText.replace(/\n/g, ' ')}')" class="chat-voice-btn" style="
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #e0e6ed;
          padding: 0.3rem 0.65rem;
          border-radius: 12px;
          font-size: 0.72rem;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          transition: all 0.2s ease;
        " onmouseover="this.style.background='rgba(255,255,255,0.15)'" onmouseout="this.style.background='rgba(255,255,255,0.08)'">
          🔊 Dengar Suara Wani
        </button>
      `;
      messagesBox.appendChild(voiceBtnDiv);
      
      const isContactIntent = data.checkmate || /whatsapp|contact|hubungi|booking|tempah|test-ride/i.test(userText);
      if (isContactIntent) {
        const waBtnDiv = document.createElement('div');
        waBtnDiv.style.marginTop = '0.5rem';
        waBtnDiv.style.alignSelf = 'flex-start';
        const waText = `Hi Norumoto EV, I want to ask: ${userText}`;
        const waUrl = `https://wa.me/60199345212?text=${encodeURIComponent(waText)}`;
        
        waBtnDiv.innerHTML = `
          <a href="${waUrl}" target="_blank" class="chat-wa-link" style="
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: #25d366;
            color: #fff;
            padding: 0.5rem 0.85rem;
            border-radius: 8px;
            font-size: 0.8rem;
            text-decoration: none;
            font-weight: 600;
            box-shadow: 0 4px 12px rgba(37, 211, 102, 0.2);
            transition: transform 0.2s;
          " onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
            💬 WhatsApp Abid (+60 199345212)
          </a>
        `;
        messagesBox.appendChild(waBtnDiv);
      }
      setTimeout(() => {
        messagesBox.scrollTop = messagesBox.scrollHeight + 100;
      }, 50);
    })
    .catch(err => {
      if (retriesLeft > 0) {
        console.warn(`Chat request retrying... (${retriesLeft} retries left)`, err);
        setTimeout(() => fetchWithRetry(url, payload, retriesLeft - 1), 3000);
      } else {
        clearInterval(statusInterval);
        const indicator = document.getElementById('chat-typing-indicator');
        if (indicator) indicator.remove();
        
        const fallbackText = getDynamicFrontendFallback(userText);
        const botMsgDiv = document.createElement('div');
        botMsgDiv.className = 'chat-msg chat-msg-bot';
        botMsgDiv.innerText = fallbackText;
        messagesBox.appendChild(botMsgDiv);

        const waBtnDiv = document.createElement('div');
        waBtnDiv.style.marginTop = '0.5rem';
        waBtnDiv.style.alignSelf = 'flex-start';
        const waText = `Hi Norumoto EV, I want to ask: ${userText}`;
        const waUrl = `https://wa.me/60199345212?text=${encodeURIComponent(waText)}`;
        
        waBtnDiv.innerHTML = `
          <a href="${waUrl}" target="_blank" class="chat-wa-link" style="
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: #25d366;
            color: #fff;
            padding: 0.5rem 0.85rem;
            border-radius: 8px;
            font-size: 0.8rem;
            text-decoration: none;
            font-weight: 600;
            box-shadow: 0 4px 12px rgba(37, 211, 102, 0.2);
            transition: transform 0.2s;
          " onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
            💬 WhatsApp Abid (+60 199345212)
          </a>
        `;
        messagesBox.appendChild(waBtnDiv);
        messagesBox.scrollTop = messagesBox.scrollHeight;
      }
    });
  }

  fetchWithRetry(chatApiUrl, { message: userText, session_id: sessionId });
}

// 13. Wani TikTok Persona Voice Concierge (Web Speech Synthesis - Zero Cost)
window.playWaniVoice = function(btnElement, textToSpeak) {
  if (!('speechSynthesis' in window)) {
    alert("Maaf, pelayar anda tidak menyokong fungsi audio percakapan.");
    return;
  }
  
  // Stop existing speech
  window.speechSynthesis.cancel();
  
  // Clean text from Markdown tags, asterisks, emojis, triggers
  let cleanText = (textToSpeak || '')
    .replace(/\*+/g, '')
    .replace(/#+/g, '')
    .replace(/_+/g, '')
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
    .replace(/CHECKMATE_TRIGGER:[^\n]*/g, '')
    .replace(/Mesej:/g, '')
    .trim();
    
  if (!cleanText) return;

  const msg = new SpeechSynthesisUtterance(cleanText);
  msg.rate = 1.0;
  msg.pitch = 1.1; // Slightly higher pitch for 22yo female persona (Syazwani)
  
  // Find Malay voice or best available female voice
  const voices = window.speechSynthesis.getVoices();
  const msVoice = voices.find(v => (v.lang.includes('ms') || v.lang.includes('id') || v.name.toLowerCase().includes('yasmin') || v.name.toLowerCase().includes('wani') || v.name.toLowerCase().includes('malay')));
  if (msVoice) {
    msg.voice = msVoice;
  } else {
    msg.lang = 'ms-MY';
  }
  
  if (btnElement) {
    btnElement.innerHTML = '🔊 Sedang Bercakap...';
    btnElement.style.background = 'rgba(16, 185, 129, 0.25)';
    btnElement.style.borderColor = '#10b981';
  }
  
  msg.onend = function() {
    if (btnElement) {
      btnElement.innerHTML = '🔊 Dengar Suara Wani';
      btnElement.style.background = 'rgba(255, 255, 255, 0.08)';
      btnElement.style.borderColor = 'rgba(255, 255, 255, 0.2)';
    }
  };

  msg.onerror = function() {
    if (btnElement) {
      btnElement.innerHTML = '🔊 Dengar Suara Wani';
      btnElement.style.background = 'rgba(255, 255, 255, 0.08)';
      btnElement.style.borderColor = 'rgba(255, 255, 255, 0.2)';
    }
  };

  window.speechSynthesis.speak(msg);
};

// Ensure voices are loaded asynchronously
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = function() {
    window.speechSynthesis.getVoices();
  };
}

// ==========================================
// 10. Multi-Language Switcher (Malay & English)
// ==========================================
const translationMap = {
  // Business Opportunities / CTA
  "Business Opportunities": "Peluang Perniagaan",
  "Be Part of Us": "Jadilah Sebahagian Dari Kami",
  "Interested in generating income with Norumoto EV? Choose the business opportunity that suits you.": "Berminat menjana pendapatan bersama Norumoto EV? Pilih peluang perniagaan yang sesuai dengan anda.",
  "POPULAR CHOICE": "PILIHAN POPULAR",
  "Affiliate Program": "Program Affiliate",
  "Ideal for those who want to start risk-free. Earn commissions for every successful sale.": "Sesuai untuk anda yang ingin bermula tanpa risiko. Jana komisen bagi setiap jualan yang berjaya.",
  "Zero Capital": "Tanpa Modal",
  "No stock holding required": "Tanpa perlu pegang stok",
  "HQ handles technical, loan & JPJ": "HQ urus teknikal, loan & JPJ",
  "Join Affiliate": "Sertai Affiliate",
  "MORE EXCLUSIVE": "LEBIH EKSKLUSIF",
  "Dealership Network": "Rangkaian Dealership",
  "Become an authorized Norumoto dealer. Ideal if you are serious about building a long-term business with us.": "Jadi pengedar sah Norumoto. Sesuai jika anda serius membina perniagaan berpanjangan dengan kami.",
  "Highest profit margins": "Margin keuntungan tertinggi",
  "More benefits": "Lebih banyak kelebihan",
  "& incentives": "& insentif",
  "Official sales support from HQ": "Sokongan jualan rasmi dari HQ",
  "Join Dealership": "Sertai Dealership",

  // Navigation & Headers
  "Home": "Utama",
  "Performance": "Prestasi",
  "Design": "Reka Bentuk",
  "Technology": "Teknologi",
  "Configurator": "Konfigurasi",
  "Specifications": "Spesifikasi",
  "FAQ": "Soalan Lazim",
  "Test Ride": "Uji Pandu",
  "Discover": "Terokai",
  "Reserve Now": "Tempah Sekarang",
  "Experience Norumoto Today.": "Rasai Pengalaman Norumoto Hari Ini.",
  "Schedule your exclusive test ride session. Complete the questionnaire, verify your credentials, and sign the official liability waiver to begin your ride.": "Jadualkan sesi tunggangan uji pandu eksklusif anda. Lengkapkan borang soalan, sahkan kelayakan lesen, dan tandatangan surat pelepasan liabiliti rasmi untuk memulakan tunggangan.",
  "✓ Fully Compliant & Secure": "✓ Mematuhi Syarat & Selamat",
  "✓ Official JPJ VTA Road Approval": "✓ Kelulusan Jalan Raya VTA JPJ Rasmi",
  "✓ Signed Liability Waiver Integration": "✓ Surat Pelepasan Liabiliti Bertandatangan",
  "Open Test Ride Portal in new tab ➔": "Buka Portal Uji Pandu di tab baru ➔",

  // Hero Section
  "Designed for Tomorrow.": "Reka Bentuk Masa Depan.",
  "Norumoto S90 Pro Max: Silent Performance. Pure Electric Freedom.": "Norumoto S90 Pro Max: Prestasi Senyap. Kebebasan Elektrik Sebenar.",
  
  // Core Tech Hotspots
  "COCKPIT TECHNOLOGY": "TEKNOLOGI KOKPIT",
  "CORE TECHNOLOGY": "TEKNOLOGI TERAS",
  "DURABILITY": "KETAHANAN",
  "Advanced EV Engineering": "Kejuruteraan EV Termaju",
  "Explore the advanced engineering, power electronics, and high-performance components of Norumoto EV.": "Terokai kejuruteraan canggih, elektronik kuasa, dan komponen berprestasi tinggi Norumoto EV.",
  "Select a Component": "Pilih Komponen",
  "Click any glowing green dot above — or watch the auto-tour cycle through each Norumoto engineering component in detail.": "Klik pada mana-mana titik hijau berkelip di atas untuk menerokai komponen kejuruteraan Norumoto secara terperinci.",
  
  "Solid State Dashboard": "Papan Pemuka Solid State",
  "Solid State Converter / Hub": "Solid State Converter / Hub",
  "Solid State Headlight": "Lampu Hadapan Solid State",
  "Solid State Charger": "Pengecas Solid State",
  "Solid State Controller": "Pengawal Solid State",
  "Steel Wire Tyre": "Tayar Kawat Keluli",
  "Liquid-cooled Motor 2.0": "Motor Sejukan Cecair 2.0",
  "Super Lithium Battery": "Bateri Super Lithium",
  "A premium 3000W liquid-cooled electric motor (5200W Peak Power). Reduces operating temperatures by up to 30°C to sustain peak performance.": "Motor elektrik sejukan cecair 3000W premium (Kuasa Puncak 5200W). Menurunkan suhu operasi motor sehingga 30°C bagi mengekalkan prestasi puncak sepanjang hari.",

  "World-class premium electric mobility engineering. Proudly Malaysian.": "Seni kejuruteraan mobiliti elektrik premium bertaraf dunia. Bangga buatan Malaysia.",
  "© 2026 Norumoto EV Malaysia. All Rights Reserved.": "© 2026 Norumoto EV Malaysia. Hak Cipta Terpelihara.",
  "MODEL": "MODEL",
  "HQ Office:": "Pejabat HQ:",
  "Authorized Service Center": "Pusat Servis Sah",
  "System v2.7.4": "Sistem v2.7.4",
  
  // Performance
  "Performance & Power": "Prestasi & Kuasa",
  "High-Performance Electric Powertrain": "Rangkaian Kuasa Elektrik Berprestasi Tinggi",
  "Equipped with a 3,000 W liquid-cooled motor (5,200 W peak) and a high-capacity 72V 45Ah Lithium Ion battery system for up to 120 km range and 83 km/h top speed.": "Dilengkapi dengan motor sejukan cecair 3,000 W (puncak 5,200 W) dan sistem bateri Lithium Ion 72V 45Ah berkapasiti tinggi untuk jarak perjalanan sehingga 120 km dan kelajuan maksimum 83 km/h.",
  "Power System": "Sistem Kuasa",
  "72V 45Ah Lithium Ion": "Lithium Ion 72V 45Ah",
  "Uses high-density lithium-ion cells for smooth acceleration and exceptional mileage.": "Menggunakan sel lithium-ion berketumpatan tinggi untuk pecutan lancar dan perbatuan luar biasa.",
  "Motor": "Motor",
  "3,000W / 5,200W Peak": "Puncak 3,000W / 5,200W",
  "Nominal power of the liquid-cooled electric motor with responsive instant torque.": "Kuasa nominal motor elektrik sejukan cecair dengan tork serta-merta yang responsif.",
  "Riding Range": "Jarak Perjalanan",
  "Up to 120 km Range": "Jarak Perjalanan Sehingga 120 km",
  "Maximum riding range per full charge when operating in energy-efficient Speed Mode 1.": "Jarak perjalanan maksimum bagi setiap pengecasan penuh apabila beroperasi dalam Mod Kelajuan 1 yang menjimatkan tenaga.",
  "Velocity": "Kelajuan",
  "83 km/h Top Speed": "Kelajuan Maksimum 83 km/h",
  "High maximum speed to navigate highways easily, climbing angles up to 30°.": "Kelajuan maksimum tinggi untuk menavigasi lebuh raya dengan mudah, dengan sudut pendakian sehingga 30°.",

  // Design / Chassis
  "Chassis & Braking": "Rangka & Sistem Brek",
  "Robust Chassis & Suspension": "Rangka & Suspensi Tegap",
  "Engineered with high-tensile steel, dual hydraulic suspension, and Combined Braking System (CBS) for maximum stability on Malaysian roads.": "Direka dengan keluli berkekuatan tinggi, suspensi hidraulik dwi, dan Sistem Brek Bersepadu (CBS) untuk kestabilan maksimum di jalan raya Malaysia.",
  "Dual Hydraulic Suspension": "Suspensi Hidraulik Dwi",
  "Aluminum hydraulic cylinder (front) and hydraulic spring shock absorber (rear) to absorb rough road vibrations.": "Silinder hidraulik aluminium (depan) dan penyerap hentak spring hidraulik (belakang) untuk menyerap gegaran jalan raya kasar.",
  "Combined Braking System (CBS)": "Sistem Brek Bersepadu (CBS)",
  "Front and rear hydraulic disc brakes with CBS for balanced, stable, and safe stopping power.": "Brek cakera hidraulik depan dan belakang dengan CBS untuk kuasa hentian yang seimbang, stabil, dan selamat.",
  "12-inch Alloy Tubeless Tyres": "Tayar Tanpa Tiub Aloi 12-Inci",
  "Fitted with 90/90-12 front and 100/80-12 rear tubeless tyres on lightweight alloy rims for ultimate grip.": "Dilengkapi dengan tayar tanpa tiub 90/90-12 depan dan 100/80-12 belakang pada rim aloi ringan untuk cengkaman maksimum.",

  // Tech / Cockpit
  "Smart Features & Utility": "Ciri Pintar & Utiliti",
  "Smart Technology & Practical Design": "Teknologi Pintar & Reka Bentuk Praktikal",
  "Every engineering detail is designed for precision, daily utility, and intuitive smart riding.": "Setiap perincian kejuruteraan direka untuk ketepatan, utiliti harian, dan tunggangan pintar yang intuitif.",
  "Smart Cockpit": "Kokpit Pintar",
  "Dual Smart LED / TFT Digital Screen": "Skrin Digital Dwi LED / TFT Pintar",
  "Twin integrated high-definition digital screens on the handlebar provide optimal digital readouts of speed, battery status, and diagnostics at a single glance.": "Dua skrin digital definisi tinggi bersepadu pada bar pemegang memberikan bacaan digital optimum kelajuan, status bateri, dan diagnostik dalam satu pandangan.",
  "Controls": "Kawalan",
  "3 Riding Modes & Reverse": "3 Mod Tunggangan & Undur",
  "Ergonomically positioned switchgear allows riders to toggle between 3 speed modes and activate reverse mode for effortless navigation.": "Butang suis yang diletakkan secara ergonomik membolehkan penunggang menukar antara 3 mod kelajuan dan mengaktifkan mod undur untuk kemudahan navigasi.",
  "Storage": "Simpanan",
  "Smart Convenience & USB Port": "Kemudahan Pintar & Port USB",
  "Integrated weatherproof front pocket complete with a fast-charging USB port to power devices, with anti-theft alarm and GPS tracking support.": "Poket depan kalis air bersepadu lengkap dengan port USB pengecasan pantas untuk peranti, dengan penggera anti-kecurian dan sokongan pengesan GPS.",
  "Lighting": "Pencahayaan",
  "Aerodynamic LED Lighting": "Pencahayaan LED Aerodinamik",
  "High-intensity wrap-around headlight and taillight providing superior visibility alerts and aerodynamic styling.": "Lampu hadapan dan belakang berintensiti tinggi yang memberikan amaran keterlihatan unggul serta reka bentuk aerodinamik.",
  "Underseat Storage": "Storan Bawah Tempat Duduk",
  "Comfortable All-Weather Seat": "Tempat Duduk Kalis Cuaca Selesa",
  "Premium all-weather seat offering secure underseat compartment space, with a high 150 mm ground clearance to navigate curbs.": "Tempat duduk kalis cuaca premium yang menawarkan ruang storan bawah tempat duduk yang selamat, dengan jarak bumi 150 mm tinggi untuk melepasi bonggol.",
  "Aerodynamics": "Aerodinamik",
  "Malaysian Road Compliance": "Pematuhan Undang-Undang Jalan Raya Malaysia",
  "Officially road-legal with VTA JPJ approval, backed by a standard 2-years or 20,000 km warranty for peace of mind.": "Sah jalan raya secara rasmi dengan kelulusan VTA JPJ, disokong oleh jaminan standard 2 tahun atau 20,000 km untuk ketenangan minda.",

  "Design Studio": "Studio Reka Bentuk",
  "Select Your Aesthetic": "Pilih Estetika Anda",
  "Exterior Color:": "Warna Luaran:",
  "Crimson Red": "Crimson Red",
  "Skyline Blue": "Skyline Blue",
  "Mystic Silver": "Mystic Silver",
  "Midnight Black": "Midnight Black",
  "Smart Performance Modes": "Mod Prestasi Pintar",
  "Extends maximum urban range for long commutes.": "Meningkatkan jarak perjalanan maksimum bandar.",
  "Optimal balance of acceleration and power conservation.": "Keseimbangan antara pecutan dan penggunaan kuasa.",
  "Full electric motor output for maximum acceleration.": "Kuasa penuh motor elektrik untuk pecutan maksimum.",

  // Specifications
  "Technical Specifications": "Spesifikasi Teknikal",
  "Engineering Precision": "Ketepatan Kejuruteraan",
  "Standard specifications and official compliance certifications of Norumoto EV for the Malaysian market.": "Spesifikasi standard dan kelulusan sah Norumoto EV untuk pasaran Malaysia.",
  
  "PERFORMANCE": "PRESTASI",
  "POWER SYSTEM & BATTERY": "SISTEM KUASA & BATERI",
  "DIMENSIONS & WEIGHT": "DIMENSI & BERAT",
  "CHASSIS & CONTROL SYSTEM": "RANGKA & SISTEM KAWALAN",
  "SMART FEATURES & SAFETY": "CIRI PINTAR & KESELAMATAN",

  "Maximum Speed": "Kelajuan Maksimum",
  "Range": "Jarak Perjalanan",
  "Maximum Climbing Angle": "Sudut Pendakian Maksimum",
  "Nominal Motor Power": "Kuasa Motor Nominal",
  "Peak Motor Power": "Kuasa Motor Puncak",
  "Battery Type": "Jenis Bateri",
  "Charging System": "Sistem Pengecasan",
  "Riding Modes": "Mod Tunggangan",
  "Ingress Protection": "Tahap Perlindungan Ingress",
  "Dimensions (L x W x H)": "Dimensi (L x W x H)",
  "Wheelbase": "Jarak Roda",
  "Ground Clearance": "Jarak Ke Tanah",
  "Vehicle Weight (Without Battery)": "Berat Kenderaan (Tanpa Bateri)",
  "Battery Weight": "Berat Bateri",
  "Front Brake": "Brek Depan",
  "Rear Brake": "Brek Belakang",
  "Front Suspension": "Suspensi Depan",
  "Rear Suspension": "Suspensi Belakang",
  "Front Tyre Size": "Saiz Tayar Depan",
  "Rear Tyre Size": "Saiz Tayar Belakang",
  "Key System / Ignition": "Sistem Kunci / Nyalaan",
  "Instrument Display Panel": "Panel Paparan Instrumen",
  "Lighting System": "Sistem Lampu",
  "Additional Features": "Ciri-Ciri Tambahan",
  "Warranty": "Jaminan",

  "Up to 120 km (Per full charge in Speed Mode 1)": "Sehingga 120 km (Bagi setiap cas penuh dalam Mod Kelajuan 1)",
  "Up to 30°": "Sehingga 30°",
  "3,000 W (Liquid-Cooled Motor System)": "3,000 W (Sistem Motor Sejukan Cecair)",
  "5,200 W": "5,200 W",
  "72V 45Ah Lithium Ion": "Lithium Ion 72V 45Ah",
  "Fast Charging / 4.5 to 6 Hours": "Pengecasan Pantas / 4.5 hingga 6 Jam",
  "3 Speed Modes + Reverse Mode": "3 Mod Kelajuan + Mod Undur",
  "IP67 Rated": "Penarafan IP67",
  "1,835 mm x 705 mm x 1,085 mm": "1,835 mm x 705 mm x 1,085 mm",
  "1,300 mm": "1,300 mm",
  "150 mm": "150 mm",
  "79 kg": "79 kg",
  "32 kg": "32 kg",
  "Hydraulic Disc": "Cakera Hidraulik",
  "Hydraulic Disc with CBS (Combined Braking System)": "Cakera Hidraulik dengan CBS (Combined Braking)",
  "Aluminum Hydraulic Cylinder": "Silinder Hidraulik Aluminium",
  "Hydraulic Spring Shock Absorber": "Penyerap Hentak Spring Hidraulik",
  "90/90-12 (12-inch Alloy Rim, Tubeless Tyre)": "90/90-12 (Rim Aloi 12-Inci, Tayar Tanpa Tiub)",
  "100/80-12 (12-inch Alloy Rim, Tubeless Tyre)": "100/80-12 (Rim Aloi 12-Inci, Tayar Tanpa Tiub)",
  "NFC Card Scanner (Keyless Entry)": "Pengimbas Kad NFC (Kemasukan Tanpa Kunci)",
  "Smart LED / TFT Digital Screen": "Skrin Digital Smart LED / TFT",
  "Full LED Headlight (Aerodynamic), Turn Signals and Taillights": "Lampu Depan LED Penuh (Aerodinamik), Lampu Isyarat & Lampu Belakang",
  "Built-in USB Charging Port, Anti-Theft Alarm & Hub Motor Lock, GPS Tracker": "Port Pengecasan USB Bersepadu, Penggera Anti-Kecurian & Kunci Hub Motor, Pengesan GPS",
  "2-years Warranty OR 20,000 km whichever comes first": "Jaminan 2 Tahun ATAU 20,000 km yang mana terdahulu",

  "Frequently Asked Questions": "Soalan Lazim & Objeksi",
  "Your Doubts Answered": "Kemusykilan Anda Terjawab",
  "Check official answers regarding the capabilities, compliance, and warranty of Norumoto EV's premium technology.": "Semak jawapan rasmi mengenai keupayaan, undang-undang, dan jaminan teknologi premium Norumoto EV.",
  "Can the S90 Pro Max be ridden through floods?": "Boleh bawa redah banjir ke motor S90 Pro Max ni?",
  "Yes, the S90 Pro Max motor and battery are officially IP67 certified (weatherproof and dustproof). It has been tested to safely wade through water up to 1 foot deep (clearing the 12-inch wheel size) without any electrical issues.": "Ya, motor dan bateri S90 Pro Max mendapat penarafan rasmi IP67 (kedap air/udara). Ia diuji mampu meredah air banjir sedalam 1 kaki (melepasi saiz tayar 12 inci) dengan selamat tanpa masalah litar pintas.",
  "How long is the lifespan of the Lithium Ion battery, and how does it compare to LFP?": "Berapakah jangka hayat bateri Lithium Ion dan apa beza dengan LFP?",
  "The high-capacity 72V 45Ah Lithium Ion battery pack has a life expectancy exceeding 50,000 km, backed by a standard 2-years or 20,000 km warranty. Unlike heavy, low energy-density lead-acid or standard LFP batteries, this lithium pack is lightweight (32 kg) and retains high charging efficiency over years of daily use.": "Pek bateri Lithium Ion 72V 45Ah berkapasiti tinggi mempunyai jangka hayat melebihi 50,000 km, disokong oleh jaminan standard 2 tahun atau 20,000 km. Berbeza dengan bateri asid plumbum atau bateri LFP biasa yang berat dan tidak cekap, pek lithium ini sangat ringan (32 kg) dan mengekalkan kecekapan cas yang tinggi bertahun-tahun.",
  "If the battery is damaged, does the entire unit need to be replaced?": "Kalau bateri rosak, kena tukar semua sekali ke?",
  "No. The S90 Pro Max battery features a modular design. If a specific module degrades after extensive usage, only the affected module needs to be replaced. This makes servicing highly cost-effective without needing to discard the entire battery pack.": "Tidak. Bateri S90 Pro Max menggunakan sistem modular. Sekiranya ada modul yang merosot prestasinya selepas 50,000 km, kilang hanya perlu menukar slot modul yang terjejas sahaja. Kosnya jauh lebih murah dan tidak perlu dibuang keseluruhannya.",
  "Is this electric scooter road-legal and registerable with JPJ?": "Motor ni boleh daftar JPJ ke?",
  "Yes, the Norumoto S90 Pro Max has received official Vehicle Type Approval (VTA) from the Malaysian Road Transport Department (JPJ). You can register it and ride legally on public roads. Road tax and insurance can be arranged easily upon purchase.": "Terima kasih atas pertanyaan anda. Ya, Norumoto S90 Pro Max telah menerima kelulusan Jenis Kenderaan (VTA) daripada Jabatan Pengangkutan Jalan (JPJ). Anda boleh mendapatkan butiran lanjut mengenai kelulusan ini melalui wakil jualan kami atau merujuk kepada dokumen kenderaan.",

  "Pre-Order": "Pra-Pesanan",
  "Own Your Norumoto Today.": "Miliki Norumoto Anda Hari Ini.",
  "Register your details below. An authorized Norumoto EV sales consultant will contact you within 2 hours to process financing options and schedule your exclusive test ride.": "Daftar maklumat anda di bawah. Pasukan perunding sah jualan Norumoto EV akan menghubungi anda dalam masa 2 jam untuk proses pembiayaan dan pengaturan tunggangan uji pandu eksklusif.",
  "Register your details below. An authorized Norumoto EV sales consultant will contact you within 2 hours to process financing options and confirm your vehicle reservation.": "Daftar maklumat anda di bawah. Perunding jualan sah Norumoto EV akan menghubungi anda dalam masa 2 jam untuk memproses pilihan pembiayaan dan mengesahkan tempahan kenderaan anda.",
  "✓ Officially Road Legal & Approved": "✓ Penjualan Sah Jalan Raya Diluluskan",
  "✓ No Upfront Deposit Required": "✓ Tiada Deposit Awal Diperlukan",
  "✓ Instant Insurance & Road Tax Integration": "✓ Integrasi Insurans & Roadtax Terus",
  "Info": "Info",
  "Address": "Alamat",
  "Payment": "Bayaran",
  "Full Name": "Nama Penuh",
  "Phone Number": "Nombor Telefon",
  "Enquiry Type": "Jenis Pertanyaan",
  "Test Ride (Uji Pandu)": "Tunggangan Uji (Test-Ride)",
  "Scooter Pre-Order (Pra-Pesanan)": "Pra-Pesanan Skuter (Pre-order)",
  "Preferred Date & Time for Test Ride": "Pilihan Tarikh & Masa Uji Pandu",
  "Next ➔": "Seterusnya ➔",
  "Delivery Address": "Alamat Penghantaran",
  "Delivery Coordinates (Pin Your Location)": "Koordinat Penghantaran (Pin Lokasi Anda)",
  "⎌ Back": "⎌ Kembali",
  "Preferred Dealership": "Dealership Pilihan",
  "Loading Dealerships...": "Memuat Cawangan...",
  "Preferred Payment Method": "Kaedah Pembayaran Pilihan",
  "EV financing with exclusive low interest rates.": "Pinjaman EV dengan kadar faedah terendah khas.",
  "AEON Credit": "AEON Credit",
  "Credit Card": "Kad Kredit",
  "Easy installment plan with 0% interest.": "Pelan ansuran mudah dengan faedah 0%.",
  "Cash / Transfer": "Tunai / Pindahan",
  "Direct cash payment or official bank transfer.": "Bayaran tunai terus atau pindahan bank rasmi.",
  "Submit Booking ✓": "Hantar Tempahan ✓",

  "Visual Gallery": "Galeri Gambar",
  "Premium Angles": "Sudut Pandangan Premium",
  "Bold, sporty red highlighting dynamic performance.": "Keberanian warna merah membara yang sporty dan dinamik.",
  "Tranquil blue echoing high-tech sophistication.": "Rona biru angkasa tenang yang memancarkan kecanggihan teknologi.",
  "Modern minimalism finished in a sleek metallic silver.": "Kesederhanaan moden dengan kemasan kelabu pastel yang elegan.",
  "Glossy shiny black finish projecting elegance and authority.": "Kemasan premium hitam berkilat yang misteri dan berkarisma.",

  "Contact Us": "Hubungi Kami",
  "Authorized Service Center": "Pusat Servis Sah",
  "Sales Executive • Online": "Perunding Jualan • Dalam Talian",
  "Salam & welcome to Norumoto EV! I am Syazwani, your sales concierge. How can I assist you with our EV scooters or test ride arrangements today?": "Salam Sejahtera & selamat datang ke Norumoto EV! Saya Syazwani, perunding jualan anda. Ada apa-apa soalan berkenaan skuter EV kami atau jadual tunggang uji hari ini?",

  "Your full name": "Nama anda",
  "e.g., 0123456789": "Contoh: 0123456789",
  "Your complete delivery address": "Alamat penuh penghantaran anda",
  "Ask a question...": "Tanya soalan..."
};

// Reset language preference when a new version is deployed
const SITE_VERSION = '2.7.0';
if (localStorage.getItem('norumoto_site_version') !== SITE_VERSION) {
  localStorage.setItem('norumoto_site_version', SITE_VERSION);
  localStorage.removeItem('norumoto_lang'); // Clear stale language preference on version change
}

let currentLang = localStorage.getItem('norumoto_lang') || 'en';

window.toggleLanguage = function() {
  const nextLang = currentLang === 'ms' ? 'en' : 'ms';
  setLanguage(nextLang);
};

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('norumoto_lang', lang);
  
  // Update toggle button text in header
  const toggleBtn = document.getElementById('lang-toggle-btn');
  if (toggleBtn) {
    toggleBtn.innerText = lang === 'ms' ? 'EN' : 'BM';
  }

  // Explicitly translate navigation elements to prevent any TreeWalker edge cases
  const navItems = {
    'link-home': { ms: 'Utama', en: 'Home' },
    'link-perf': { ms: 'Prestasi', en: 'Performance' },
    'link-design': { ms: 'Reka Bentuk', en: 'Design' },
    'link-tech': { ms: 'Teknologi', en: 'Technology' },
    'link-config': { ms: 'Konfigurasi', en: 'Configurator' },
    'link-specs': { ms: 'Spesifikasi', en: 'Specifications' },
    'link-objections': { ms: 'Soalan Lazim', en: 'FAQ' },
    'nav-booking-btn': { ms: 'Uji Pandu', en: 'Test Ride' }
  };

  for (const [id, value] of Object.entries(navItems)) {
    const el = document.getElementById(id);
    if (el) {
      el.innerText = value[lang];
    }
  }
  
  // Translate text nodes using TreeWalker
  const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  let node;
  while (node = walk.nextNode()) {
    const txt = node.nodeValue.trim();
    if (txt) {
      if (lang === 'ms') {
        if (translationMap[txt]) {
          node._originalEnglish = txt;
          node.nodeValue = node.nodeValue.replace(txt, translationMap[txt]);
        }
      } else {
        if (node._originalEnglish) {
          node.nodeValue = node._originalEnglish;
        }
      }
    }
  }
  
  // Translate Form inputs, select options, and placeholders
  const inputs = document.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    if (input.tagName === 'SELECT') {
      Array.from(input.options).forEach(opt => {
        const txt = opt.innerText.trim();
        if (lang === 'ms') {
          if (translationMap[txt]) {
            opt._originalEnglish = txt;
            opt.innerText = translationMap[txt];
          }
        } else {
          if (opt._originalEnglish) {
            opt.innerText = opt._originalEnglish;
          }
        }
      });
    } else if (input.placeholder) {
      const placeholder = input.placeholder.trim();
      if (lang === 'ms') {
        if (translationMap[placeholder]) {
          input._originalEnglishPlaceholder = placeholder;
          input.placeholder = translationMap[placeholder];
        }
      } else {
        if (input._originalEnglishPlaceholder) {
          input.placeholder = input._originalEnglishPlaceholder;
        }
      }
    }
  });
}

// Initialise settings and progressive background image loading on page load
document.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);

  // Progressive background image loading for hero section
  const mainBg = document.querySelector('.hero-bg-main');
  if (mainBg) {
    const src = mainBg.getAttribute('data-src');
    const img = new Image();
    img.src = src;
    img.onload = () => {
      mainBg.style.backgroundImage = `url('${src}')`;
      mainBg.classList.add('loaded');
      
      // Smoothly hide the low-res placeholder layer after the fade transition ends
      const placeholderBg = document.querySelector('.hero-bg-placeholder');
      if (placeholderBg) {
        setTimeout(() => {
          placeholderBg.style.opacity = '0';
        }, 1000);
      }
    };
  }
});

// 11. Sticky Split-Screen Cockpit Spotlight Observer
document.addEventListener('DOMContentLoaded', () => {
  const textBlocks = document.querySelectorAll('.spotlight-text-block');
  const spotlightImages = document.querySelectorAll('.spotlight-img');
  
  if (!textBlocks.length || !spotlightImages.length) return;
  
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -40% 0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetId = entry.target.getAttribute('data-target');
        
        // Deactivate all images
        spotlightImages.forEach(img => img.classList.remove('active'));
        
        // Activate matching image
        const activeImg = document.getElementById(`spotlight-img-${targetId}`);
        if (activeImg) {
          activeImg.classList.add('active');
        }
      }
    });
  }, observerOptions);
  
  textBlocks.forEach(block => observer.observe(block));
});

// 12. Voice Concierge Ambient Noise Assessment & Speech Playback Protocol
async function assessAmbientNoise() {
  return new Promise((resolve) => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      resolve(false);
      return;
    }
    
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        try {
          const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
          const analyser = audioCtx.createAnalyser();
          const microphone = audioCtx.createMediaStreamSource(stream);
          analyser.fftSize = 256;
          microphone.connect(analyser);

          const dataArray = new Uint8Array(analyser.frequencyBinCount);
          let totalVolume = 0;
          let samples = 0;

          const interval = setInterval(() => {
            analyser.getByteFrequencyData(dataArray);
            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) {
              sum += dataArray[i];
            }
            totalVolume += (sum / dataArray.length);
            samples++;
          }, 50);

          setTimeout(() => {
            clearInterval(interval);
            stream.getTracks().forEach(track => track.stop());
            audioCtx.close();
            const avgVolume = totalVolume / (samples || 1);
            // Threshold > 55 indicates noisy environment
            resolve(avgVolume > 55);
          }, 700);
        } catch (e) {
          stream.getTracks().forEach(track => track.stop());
          resolve(false);
        }
      })
      .catch(() => {
        resolve(false);
      });
  });
}

async function playWaniVoice(btnElem, textToSynthesize) {
  if (!btnElem || btnElem.disabled) return;
  const originalText = btnElem.innerHTML;
  btnElem.disabled = true;
  btnElem.innerHTML = '⏳ Menjana Suara Wani...';
  
  const isLocalEnv = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname === '' || window.location.protocol === 'file:';
  const localOriginEnv = window.location.port === '4000' ? '' : 'http://localhost:4000';
  const voiceApiUrl = isLocalEnv ? (localOriginEnv + '/api/public/voice-synthesize') : 'https://norumoto-ev-backend.onrender.com/api/public/voice-synthesize';

  fetch(voiceApiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: textToSynthesize })
  })
  .then(res => res.json())
  .then(data => {
    if (data.audioUrl) {
      const audioHost = isLocalEnv ? (localOriginEnv || '') : 'https://norumoto-ev-backend.onrender.com';
      const fullAudioUrl = data.audioUrl.startsWith('http') ? data.audioUrl : (audioHost + data.audioUrl);
      
      const audio = new Audio(fullAudioUrl);
      audio.playbackRate = 1.05; // Natural, human-like ElevenLabs playback rate
      btnElem.innerHTML = '🔊 Memainkan Suara Wani...';
      audio.play().catch(e => console.error('Audio play error:', e));
      audio.onended = () => {
        btnElem.disabled = false;
        btnElem.innerHTML = originalText;
      };
    } else {
      throw new Error('Synthesis failed');
    }
  })
  .catch(err => {
    console.error('Voice playback error:', err);
    btnElem.disabled = false;
    btnElem.innerHTML = originalText;
  });
}

// 13. Voice Input (Speech-to-Text Recognition Protocol)
let speechRecognitionObj = null;
let isListeningVoice = false;

function toggleVoiceInput() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const micBtn = document.getElementById('chat-mic-btn');
  const inputElem = document.getElementById('chat-user-input');

  if (!SpeechRecognition) {
    alert('😊 Maaf, pelayar anda tidak menyokong fungsi mikrofon suara. Sila gunakan Google Chrome atau Safari.');
    return;
  }

  if (isListeningVoice) {
    if (speechRecognitionObj) speechRecognitionObj.stop();
    return;
  }

  speechRecognitionObj = new SpeechRecognition();
  speechRecognitionObj.lang = 'ms-MY';
  speechRecognitionObj.continuous = false;
  speechRecognitionObj.interimResults = true;

  speechRecognitionObj.onstart = () => {
    isListeningVoice = true;
    if (micBtn) {
      micBtn.style.background = '#ef4444';
      micBtn.style.borderColor = '#ef4444';
      micBtn.innerHTML = '🛑';
    }
    if (inputElem) {
      inputElem.placeholder = '🎙️ Wani sedang mendengar anda bercakap...';
    }
  };

  speechRecognitionObj.onresult = (event) => {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    if (inputElem) {
      inputElem.value = transcript;
    }
  };

  speechRecognitionObj.onerror = (event) => {
    console.error('Voice input error:', event.error);
    stopVoiceInput();
  };

  speechRecognitionObj.onend = () => {
    stopVoiceInput();
    if (inputElem && inputElem.value.trim()) {
      const form = inputElem.closest('form');
      if (form) {
        if (typeof form.requestSubmit === 'function') {
          form.requestSubmit();
        } else {
          sendChatMessage(new Event('submit'));
        }
      }
    }
  };

  try {
    speechRecognitionObj.start();
  } catch (e) {
    console.error('Failed to start speech recognition:', e);
    stopVoiceInput();
  }
}

function stopVoiceInput() {
  isListeningVoice = false;
  const micBtn = document.getElementById('chat-mic-btn');
  const inputElem = document.getElementById('chat-user-input');
  if (micBtn) {
    micBtn.style.background = '';
    micBtn.style.borderColor = '';
    micBtn.innerHTML = '🎤';
  }
  if (inputElem) {
    inputElem.placeholder = 'Tulis mesej atau tekan mikrofon...';
  }
}

