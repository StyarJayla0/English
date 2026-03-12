// ===== STELLAR ENGLISH ORGANIZER V3 - JAVASCRIPT =====

// ===== CELESTIAL BODIES CONFIGURATION =====
const celestialBodies = [
  { name: 'Star', class: 'star', color: '#ffd93d' },
  { name: 'Sun', class: 'sun', color: '#ffb347' },
  { name: 'Moon', class: 'moon', color: '#c9d6df' },
  { name: 'Neptune', class: 'planet-blue', color: '#667eea' },
  { name: 'Mars', class: 'mars', color: '#e74c3c' },
  { name: 'Jupiter', class: 'jupiter', color: '#d35400' },
  { name: 'Saturn', class: 'saturn', color: '#f39c12' },
  { name: 'Comet', class: 'comet', color: '#00d4ff' },
  { name: 'Black Hole', class: 'blackhole', color: '#8e44ad' },
  { name: 'Nebula', class: 'nebula', color: '#ff6b9d' },
  { name: 'Supernova', class: 'supernova', color: '#ffffff' }
];

// ===== TOPIC CATEGORIES CONFIGURATION =====
const categories = [
  { id: 'vocabulary', name: 'Vocabulary', color: '#e74c3c', orbitRadius: 100, speed: 15 },
  { id: 'grammar', name: 'Grammar', color: '#f39c12', orbitRadius: 140, speed: 20 },
  { id: 'phrasal', name: 'Phrasal Verbs', color: '#3498db', orbitRadius: 180, speed: 25 },
  { id: 'idioms', name: 'Idioms', color: '#9b59b6', orbitRadius: 220, speed: 30 },
  { id: 'listening', name: 'Listening', color: '#1abc9c', orbitRadius: 260, speed: 35 },
  { id: 'writing', name: 'Writing', color: '#e91e63', orbitRadius: 300, speed: 40 }
];

// ===== GLOBAL VARIABLES =====
let currentIndex = 0;
let isTransitioning = false;
let data = {};

// ===== DOM ELEMENTS =====
const celestialBody = document.getElementById('celestialBody');
const celestialName = document.getElementById('celestialName');
const counterText = document.getElementById('counterText');
const progressFill = document.getElementById('progressFill');
const floatingParticles = document.getElementById('floatingParticles');
const solarSystem = document.getElementById('solarSystem');

// ===== INITIALIZE DATA =====
function initializeData() {
  const saved = localStorage.getItem('stellarEnglishDataV3');
  if (saved) {
    data = JSON.parse(saved);
  } else {
    categories.forEach(cat => {
      data[cat.id] = [];
    });
  }
}

// ===== SAVE DATA =====
function saveData() {
  localStorage.setItem('stellarEnglishDataV3', JSON.stringify(data));
}

// ===== CHANGE CELESTIAL BODY =====
function changeCelestialBody() {
  if (isTransitioning) return;
  
  isTransitioning = true;
  celestialBody.classList.add('transitioning');
  createExplosionParticles();
  createClickEffect();
  
  setTimeout(() => {
    celestialBody.className = 'celestial-body';
    currentIndex = (currentIndex + 1) % celestialBodies.length;
    const newBody = celestialBodies[currentIndex];
    celestialBody.classList.add(newBody.class);
    celestialName.textContent = newBody.name;
    celestialName.style.borderColor = newBody.color;
    celestialName.style.boxShadow = `0 0 15px ${newBody.color}40`;
    updateCounter();
  }, 400);
  
  setTimeout(() => {
    celestialBody.classList.remove('transitioning');
    isTransitioning = false;
  }, 800);
}

// ===== UPDATE COUNTER =====
function updateCounter() {
  const total = celestialBodies.length;
  const current = currentIndex + 1;
  counterText.textContent = `Celestial body: ${current}/${total}`;
  progressFill.style.width = `${(current / total) * 100}%`;
}

// ===== CREATE EXPLOSION PARTICLES =====
function createExplosionParticles() {
  const colors = ['#ffd93d', '#ff6b9d', '#667eea', '#00d4ff', '#f39c12'];
  
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    const size = Math.random() * 10 + 5;
    const angle = (Math.PI * 2 * i) / 20;
    const velocity = Math.random() * 100 + 50;
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    const rect = celestialBody.getBoundingClientRect();
    
    particle.style.cssText = `
      position: fixed;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      left: ${rect.left + rect.width / 2}px;
      top: ${rect.top + rect.height / 2}px;
      pointer-events: none;
      z-index: 100;
      box-shadow: 0 0 10px ${color};
    `;
    
    document.body.appendChild(particle);
    
    particle.animate([
      { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      { transform: `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px) scale(0)`, opacity: 0 }
    ], {
      duration: 800,
      easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    });
    
    setTimeout(() => particle.remove(), 800);
  }
}

// ===== CREATE CLICK EFFECT =====
function createClickEffect() {
  const rect = celestialBody.getBoundingClientRect();
  const effect = document.createElement('div');
  effect.className = 'click-effect';
  effect.style.left = rect.left + rect.width / 2 - 25 + 'px';
  effect.style.top = rect.top + rect.height / 2 - 25 + 'px';
  document.body.appendChild(effect);
  setTimeout(() => effect.remove(), 600);
}

// ===== CREATE FLOATING PARTICLES =====
function createFloatingParticles() {
  const colors = ['#ffd93d', '#ff6b9d', '#667eea', '#00d4ff', '#f39c12', '#c9d6df'];
  
  setInterval(() => {
    if (document.hidden) return;
    
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 6 + 2;
    const x = Math.random() * window.innerWidth;
    const duration = Math.random() * 15 + 10;
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.cssText = `
      left: ${x}px;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      box-shadow: 0 0 ${size * 2}px ${color};
      animation-duration: ${duration}s;
    `;
    
    floatingParticles.appendChild(particle);
    setTimeout(() => particle.remove(), duration * 1000);
  }, 500);
}

// ===== ADD ITEM =====
function addItem(category) {
  const input = document.querySelector(`input[data-category="${category}"]`);
  const value = input.value.trim();
  
  if (!value) {
    input.focus();
    return;
  }
  
  data[category].push({
    id: Date.now(),
    text: value,
    createdAt: new Date().toISOString()
  });
  
  input.value = '';
  saveData();
  updateItemCount(category);
  updateSolarSystem();
  renderTerminalList(category);
  showNotification(`Added to ${getCategoryName(category)}!`);
}

// ===== DELETE ITEM =====
function deleteItem(category, itemId) {
  data[category] = data[category].filter(item => item.id !== itemId);
  saveData();
  updateItemCount(category);
  updateSolarSystem();
  renderTerminalList(category);
}

// ===== GET CATEGORY NAME =====
function getCategoryName(categoryId) {
  const cat = categories.find(c => c.id === categoryId);
  return cat ? cat.name : categoryId;
}

// ===== UPDATE ITEM COUNT =====
function updateItemCount(category) {
  const countEl = document.getElementById(`count-${category}`);
  const count = data[category] ? data[category].length : 0;
  countEl.textContent = `${count} item${count !== 1 ? 's' : ''}`;
  
  // Update terminal count
  const terminalCount = document.getElementById(`terminal-count-${category}`);
  if (terminalCount) {
    terminalCount.textContent = `${count} ${count === 1 ? 'entry' : 'entries'}`;
  }
}

// ===== UPDATE ALL ITEM COUNTS =====
function updateAllItemCounts() {
  categories.forEach(cat => updateItemCount(cat.id));
}

// ===== RENDER TERMINAL LIST =====
function renderTerminalList(category) {
  const listEl = document.getElementById(`list-${category}`);
  const items = data[category] || [];
  
  if (items.length === 0) {
    listEl.innerHTML = `
      <div class="terminal-line empty-message">
        <span class="prompt">&gt;</span>
        <span class="text-muted">No entries yet. Add some above!</span>
      </div>
    `;
    return;
  }
  
  listEl.innerHTML = items.map((item, index) => `
    <div class="terminal-line" data-id="${item.id}">
      <span class="line-number">${String(index + 1).padStart(2, '0')}</span>
      <span class="prompt">&gt;</span>
      <span class="terminal-text">${escapeHtml(item.text)}</span>
      <button class="terminal-delete" onclick="deleteItem('${category}', ${item.id})" title="Delete">&#10005;</button>
    </div>
  `).join('');
}

// ===== RENDER ALL TERMINAL LISTS =====
function renderAllTerminalLists() {
  categories.forEach(cat => renderTerminalList(cat.id));
}

// ===== CREATE SOLAR SYSTEM =====
function createSolarSystem() {
  // Clear existing orbits (keep sun)
  const existingOrbits = solarSystem.querySelectorAll('.orbit');
  existingOrbits.forEach(orbit => orbit.remove());
  
  categories.forEach((cat, index) => {
    // Create orbit
    const orbit = document.createElement('div');
    orbit.className = 'orbit';
    orbit.style.width = `${cat.orbitRadius * 2}px`;
    orbit.style.height = `${cat.orbitRadius * 2}px`;
    orbit.style.animationDuration = `${cat.speed}s`;
    
    // Create planet as a link
    const planet = document.createElement('a');
    planet.className = `planet planet-${cat.id}`;
    planet.href = `#terminal-${cat.id}`;
    planet.dataset.category = cat.id;
    planet.style.top = '0';
    planet.style.left = '50%';
    planet.style.transform = 'translateX(-50%)';
    
    // Counter badge
    const count = data[cat.id] ? data[cat.id].length : 0;
    const badge = document.createElement('span');
    badge.className = 'planet-badge';
    badge.id = `badge-${cat.id}`;
    badge.textContent = count;
    if (count === 0) badge.style.opacity = '0.3';
    planet.appendChild(badge);
    
    // Tooltip
    const tooltip = document.createElement('span');
    tooltip.className = 'planet-tooltip';
    tooltip.textContent = cat.name;
    planet.appendChild(tooltip);
    
    // Counter-rotate planet to stay upright
    planet.style.animation = `orbitRotate ${cat.speed}s linear infinite reverse`;
    
    // Click handler for highlight
    planet.addEventListener('click', (e) => {
      // Add highlight to terminal
      setTimeout(() => {
        const terminal = document.getElementById(`terminal-${cat.id}`);
        if (terminal) {
          terminal.classList.add('highlight');
          setTimeout(() => terminal.classList.remove('highlight'), 1000);
        }
      }, 300);
    });
    
    orbit.appendChild(planet);
    solarSystem.appendChild(orbit);
  });
}

// ===== UPDATE SOLAR SYSTEM =====
function updateSolarSystem() {
  categories.forEach(cat => {
    const badge = document.getElementById(`badge-${cat.id}`);
    if (badge) {
      const count = data[cat.id] ? data[cat.id].length : 0;
      badge.textContent = count;
      badge.style.opacity = count === 0 ? '0.3' : '1';
    }
  });
}

// ===== ESCAPE HTML =====
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ===== SHOW NOTIFICATION =====
function showNotification(message) {
  // Remove existing notification
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();
  
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => notification.classList.add('show'), 10);
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 400);
  }, 2000);
}

// ===== INIT CARD EFFECTS =====
function initCardEffects() {
  // Add button click handlers
  document.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;
      addItem(category);
    });
  });
  
  // Enter key on inputs - allow spaces
  document.querySelectorAll('.card-input').forEach(input => {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const category = input.dataset.category;
        addItem(category);
      }
    });
  });
  
  // Hover effect on cards
  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      card.style.background = `
        radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.15), transparent 50%),
        linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))
      `;
    });
    
    card.addEventListener('mouseleave', function() {
      card.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))';
    });
  });
}

// ===== PARALLAX EFFECT =====
function initParallax() {
  document.addEventListener('mousemove', function(e) {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    document.querySelectorAll('.stars-bg, .stars-bg-2, .stars-bg-3').forEach((star, i) => {
      const factor = (i + 1) * 0.5;
      star.style.transform = `translate(${moveX * factor}px, ${moveY * factor}px)`;
    });
  });
}

// ===== INITIALIZE APPLICATION =====
function init() {
  // Initialize data
  initializeData();
  
  // Set initial celestial body
  celestialBody.classList.add(celestialBodies[0].class);
  celestialName.textContent = celestialBodies[0].name;
  
  // Event listener for celestial body
  celestialBody.addEventListener('click', changeCelestialBody);
  
  // Also allow click on container
  document.querySelector('.celestial-container').addEventListener('click', function(e) {
    if (e.target === this || e.target.classList.contains('click-hint')) {
      changeCelestialBody();
    }
  });
  
  // Initialize components
  initCardEffects();
  initParallax();
  createFloatingParticles();
  createSolarSystem();
  renderAllTerminalLists();
  updateAllItemCounts();
  updateCounter();
  
  // Keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
      e.preventDefault();
      changeCelestialBody();
    }
  });
  
  console.log('Stellar English Organizer V3 initialized!');
  console.log('Click on the celestial body or press Space to change.');
  console.log('Click on any planet to scroll to its terminal list.');
}

// ===== START WHEN DOM IS READY =====
document.addEventListener('DOMContentLoaded', init);

// If DOM is already ready (for CodePen)
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  init();
}
