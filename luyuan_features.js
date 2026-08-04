/* --- Norumoto EV - S90 Luyuan Features JS (v2.7.5) --- */

document.addEventListener("DOMContentLoaded", () => {
  // --- Core Technology Hotspots Interactive Logic ---
  const hotspots = document.querySelectorAll(".hotspot");
  const modal = document.getElementById("tech-info-modal");
  const modalImg = document.getElementById("tech-modal-img");
  const modalTitle = document.getElementById("tech-modal-title");
  const modalDesc = document.getElementById("tech-modal-desc");
  const cycleBar = document.getElementById("tech-cycle-bar");

  if (!hotspots.length || !modal) return;

  // Database of component details
  const techData = {
    dashboard: {
      title: { ms: "Papan Pemuka Solid State", en: "Solid State Dashboard" },
      img: "assets/luyuan/solid_state_dashboard.png",
      desc: { ms: "Sistem paparan digital yang dibungkus vakum sepenuhnya untuk menahan air (penarafan IP67), debu, dan kejutan fizikal semasa tunggangan di atas jalan yang tidak rata.", en: "A fully vacuum-sealed digital display system rated IP67, built to resist water, dust, and physical shocks from uneven roads." }
    },
    converter: {
      title: { ms: "Solid State Converter / Hub", en: "Solid State Converter / Hub" },
      img: "assets/luyuan/solid_state_converter.png",
      desc: { ms: "Penukar voltan premium yang mengurangkan kehilangan tenaga dengan kecekapan penukaran melebihi 92%, perumah VO kalis api, serta dilindungi sepenuhnya daripada beban litar pintas.", en: "A premium voltage converter that minimizes energy loss with over 92% conversion efficiency, VO flame-retardant casing, and full short-circuit protection." }
    },
    headlight: {
      title: { ms: "Lampu Hadapan Solid State", en: "Solid State Headlight" },
      img: "assets/luyuan/solid_state_headlight.png",
      desc: { ms: "Sistem pencahayaan hadapan LED berkuasa tinggi kalis air sepenuhnya yang menjamin jarak pencahayaan luas dan hayat operasi yang panjang.", en: "A high-power, fully waterproof LED front lighting system that guarantees wide illumination range and long lifespan." }
    },
    charger: {
      title: { ms: "Pengecas Solid State", en: "Solid State Charger" },
      img: "assets/luyuan/solid_state_charger.png",
      desc: { ms: "Pengecas pintar tanpa kipas yang senyap dan sejuk, direka untuk mengelakkan risiko litar pintas akibat air atau debu.", en: "A fanless, silent smart charger that remains cool, designed to eliminate short-circuit risks from water or dust." }
    },
    controller: {
      title: { ms: "Pengawal Solid State", en: "Solid State Controller" },
      img: "assets/luyuan/solid_state_controller.png",
      desc: { ms: "Pengawal pintar gred automotif yang mengoptimumkan aliran elektrik to motor, mengurangkan haba operasi sebanyak 25% untuk jangka hayat lebih lama.", en: "An automotive-grade smart controller that optimizes electric flow to the motor, reducing operating temperatures by 25% for a longer lifespan." }
    },
    tire: {
      title: { ms: "Tayar Kawat Keluli Graphene", en: "Graphene Steel Wire Tyre" },
      img: "assets/luyuan/graphene_steel_wire_tire.png",
      desc: { ms: "Tayar tanpa tiub 12-inci premium (90/90-12 hadapan, 100/80-12 belakang) yang memberikan ketahanan pancutan cemerlang dan cengkaman jalan basah yang luar biasa.", en: "Premium 12-inch tubeless tyres (90/90-12 front, 100/80-12 rear) delivering excellent puncture resistance and exceptional wet-road grip." }
    },
    motor: {
      title: { ms: "Motor Sejukan Cecair 2.0", en: "Liquid-cooled Motor 2.0" },
      img: "assets/luyuan/liquid_cooled_motor.png",
      desc: { ms: "Motor elektrik sejukan cecair 3,000 W premium (Kuasa Puncak 5,200 W) yang menurunkan suhu operasi motor sebanyak 30°C bagi mengekalkan prestasi puncak.", en: "A premium 3,000W liquid-cooled electric motor (5,200W Peak Power) that reduces operating temperatures by up to 30°C to sustain peak performance." }
    },
    battery: {
      title: { ms: "Bateri Graphene Tenaga Tinggi / Bateri Super Lithium", en: "High-energy Graphene Battery / Super Lithium Battery" },
      img: "assets/luyuan/battery_graphene_pack.png",
      desc: { ms: "Sistem pek bateri modular Lithium Ion 72V 45Ah berkapasiti tinggi dengan pengurusan haba sel yang stabil dan BMS pintar bersepadu.", en: "A high-capacity 72V 45Ah Lithium Ion battery pack system outfitted with stable cell thermal management and an integrated smart BMS." }
    }
  };

  const techKeys = Object.keys(techData);
  let currentActive = null;
  let cycleIndex = 0;
  let cycleTimer = null;
  let resumeTimer = null;
  let userIsActive = false;

  // ── Update info card content ──
  function updateTechCard(key) {
    if (!techData[key]) return;
    const lang = localStorage.getItem('norumoto_lang') || 'en';
    modal.classList.add("highlight");

    modalImg.style.opacity = "0";
    modalTitle.style.opacity = "0.3";
    modalDesc.style.opacity = "0.3";

    setTimeout(() => {
      const data = techData[key];
      modalImg.src = data.img;
      const titleText = (typeof data.title === 'object') ? (data.title[lang] || data.title['en']) : data.title;
      const descText  = (typeof data.desc  === 'object') ? (data.desc[lang]  || data.desc['en'])  : data.desc;
      modalImg.alt = titleText;
      modalTitle.textContent = titleText;
      modalDesc.textContent  = descText;
      modalImg.style.opacity = "1";
      modalTitle.style.opacity = "1";
      modalDesc.style.opacity = "1";
    }, 200);

    setTimeout(() => modal.classList.remove("highlight"), 600);
  }

  // ── Activate a hotspot visually ──
  function activateHotspot(key) {
    hotspots.forEach(h => h.classList.remove("active"));
    const target = document.querySelector(`.hotspot[data-tech="${key}"]`);
    if (target) target.classList.add("active");
    currentActive = key;
    updateTechCard(key);
  }

  // ── Progress bar animation ──
  function animateCycleBar() {
    if (!cycleBar) return;
    cycleBar.style.transition = 'none';
    cycleBar.style.width = '0%';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        cycleBar.style.transition = 'width 2.9s linear';
        cycleBar.style.width = '100%';
      });
    });
  }

  // ── Auto-cycle: advance to next hotspot ──
  function cycleNext() {
    cycleIndex = (cycleIndex + 1) % techKeys.length;
    activateHotspot(techKeys[cycleIndex]);
    animateCycleBar();
  }

  function startCycle() {
    if (cycleTimer) return; // already running
    // Show first hotspot immediately
    activateHotspot(techKeys[cycleIndex]);
    animateCycleBar();
    cycleTimer = setInterval(cycleNext, 3000);
  }

  function stopCycle() {
    if (cycleTimer) { clearInterval(cycleTimer); cycleTimer = null; }
    if (cycleBar) { cycleBar.style.transition = 'none'; cycleBar.style.width = '0%'; }
  }

  function resumeCycleAfterDelay() {
    if (resumeTimer) clearTimeout(resumeTimer);
    resumeTimer = setTimeout(() => {
      userIsActive = false;
      startCycle();
    }, 5000); // resume 5s after last user interaction
  }

  // ── Hotspot click & hover ──
  hotspots.forEach(hotspot => {
    const techKey = hotspot.getAttribute("data-tech");

    hotspot.addEventListener("click", () => {
      userIsActive = true;
      stopCycle();
      hotspots.forEach(h => h.classList.remove("active"));

      if (currentActive === techKey) {
        currentActive = null;
        cycleIndex = 0;
      } else {
        hotspot.classList.add("active");
        currentActive = techKey;
        cycleIndex = techKeys.indexOf(techKey);
        updateTechCard(techKey);
      }
      resumeCycleAfterDelay();
    });

    hotspot.addEventListener("mouseenter", () => {
      userIsActive = true;
      stopCycle();
      activateHotspot(techKey);
      cycleIndex = techKeys.indexOf(techKey);
      resumeCycleAfterDelay();
    });
  });

  // ── Spline 3D setup ──
  let splineDiagramApp = null;
  const diagramViewer = document.getElementById('diagram-spline-viewer');
  if (diagramViewer) {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
    let webglSupported = false;
    try {
      const canvas = document.createElement('canvas');
      webglSupported = !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) { webglSupported = false; }

    if (!isMobile && webglSupported) {
      diagramViewer.addEventListener('load', () => {
        splineDiagramApp = diagramViewer.spline;
        document.getElementById('diagram-spline-container').style.display = 'block';
        document.querySelector('.diagram-viewport').classList.add('has-3d');
      });
    }
  }

  // ── Start auto-cycle after 1.5s page load delay ──
  setTimeout(startCycle, 1500);
});



