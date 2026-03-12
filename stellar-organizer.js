// ===== STELLAR ENGLISH ORGANIZER - JAVASCRIPT =====

// Configuración de cuerpos celestes
const celestialBodies = [
  {
    name: 'Estrella',
    emoji: '',
    class: 'star',
    description: 'Una brillante estrella en el cosmos',
    color: '#ffd93d'
  },
  {
    name: 'Sol',
    emoji: '',
    class: 'sun',
    description: 'Nuestra estrella mas cercana',
    color: '#ffb347'
  },
  {
    name: 'Luna',
    emoji: '',
    class: 'moon',
    description: 'El satelite de la Tierra',
    color: '#c9d6df'
  },
  {
    name: 'Neptuno',
    emoji: '',
    class: 'planet-blue',
    description: 'El gigante azul helado',
    color: '#667eea'
  },
  {
    name: 'Marte',
    emoji: '',
    class: 'mars',
    description: 'El planeta rojo',
    color: '#e74c3c'
  },
  {
    name: 'Jupiter',
    emoji: '',
    class: 'jupiter',
    description: 'El gigante gaseoso',
    color: '#d35400'
  },
  {
    name: 'Saturno',
    emoji: '',
    class: 'saturn',
    description: 'El planeta de los anillos',
    color: '#f39c12'
  },
  {
    name: 'Cometa',
    emoji: '',
    class: 'comet',
    description: 'Un viajero del espacio',
    color: '#00d4ff'
  },
  {
    name: 'Agujero Negro',
    emoji: '',
    class: 'blackhole',
    description: 'El misterio del universo',
    color: '#8e44ad'
  },
  {
    name: 'Nebulosa',
    emoji: '',
    class: 'nebula',
    description: 'Cuna de estrellas',
    color: '#ff6b9d'
  },
  {
    name: 'Supernova',
    emoji: '',
    class: 'supernova',
    description: 'Una explosion estelar',
    color: '#ffffff'
  }
];

// Variables globales
let currentIndex = 0;
let isTransitioning = false;

// Elementos del DOM
const celestialBody = document.getElementById('celestialBody');
const celestialName = document.getElementById('celestialName');
const counterText = document.getElementById('counterText');
const progressFill = document.getElementById('progressFill');
const floatingParticles = document.getElementById('floatingParticles');

// ===== FUNCION PRINCIPAL: CAMBIAR CUERPO CELESTE =====
function changeCelestialBody() {
  if (isTransitioning) return;
  
  isTransitioning = true;
  
  // Agregar clase de transicion
  celestialBody.classList.add('transitioning');
  
  // Crear efecto de particulas explosion
  createExplosionParticles();
  
  // Reproducir sonido (visual feedback)
  createClickEffect();
  
  // Despues de la mitad de la animacion, cambiar el cuerpo
  setTimeout(() => {
    // Remover clase anterior
    celestialBody.className = 'celestial-body';
    
    // Incrementar indice
    currentIndex = (currentIndex + 1) % celestialBodies.length;
    
    // Obtener nuevo cuerpo celeste
    const newBody = celestialBodies[currentIndex];
    
    // Agregar nueva clase
    celestialBody.classList.add(newBody.class);
    
    // Actualizar nombre
    celestialName.textContent = newBody.emoji + ' ' + newBody.name;
    celestialName.style.borderColor = newBody.color;
    celestialName.style.boxShadow = `0 0 15px ${newBody.color}40`;
    
    // Actualizar contador
    updateCounter();
    
  }, 400);
  
  // Remover clase de transicion
  setTimeout(() => {
    celestialBody.classList.remove('transitioning');
    isTransitioning = false;
  }, 800);
}

// ===== ACTUALIZAR CONTADOR =====
function updateCounter() {
  const total = celestialBodies.length;
  const current = currentIndex + 1;
  counterText.textContent = `Cuerpo celeste: ${current}/${total}`;
  progressFill.style.width = `${(current / total) * 100}%`;
}

// ===== CREAR PARTICULAS DE EXPLOSION =====
function createExplosionParticles() {
  const colors = ['#ffd93d', '#ff6b9d', '#667eea', '#00d4ff', '#f39c12'];
  
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'explosion-particle';
    
    const size = Math.random() * 10 + 5;
    const angle = (Math.PI * 2 * i) / 20;
    const velocity = Math.random() * 100 + 50;
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.cssText = `
      position: fixed;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      left: 50%;
      top: 50%;
      pointer-events: none;
      z-index: 100;
      box-shadow: 0 0 10px ${color};
    `;
    
    document.body.appendChild(particle);
    
    // Animar particula
    const startX = window.innerWidth / 2;
    const startY = celestialBody.getBoundingClientRect().top + 75;
    
    particle.animate([
      { 
        transform: 'translate(0, 0) scale(1)',
        opacity: 1
      },
      { 
        transform: `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px) scale(0)`,
        opacity: 0
      }
    ], {
      duration: 800,
      easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    });
    
    // Remover despues de la animacion
    setTimeout(() => particle.remove(), 800);
  }
}

// ===== CREAR EFECTO DE CLICK =====
function createClickEffect() {
  const rect = celestialBody.getBoundingClientRect();
  const effect = document.createElement('div');
  effect.className = 'click-effect';
  effect.style.left = rect.left + rect.width / 2 - 25 + 'px';
  effect.style.top = rect.top + rect.height / 2 - 25 + 'px';
  document.body.appendChild(effect);
  
  setTimeout(() => effect.remove(), 600);
}

// ===== CREAR PARTICULAS FLOTANTES DE FONDO =====
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
    
    // Remover despues de la animacion
    setTimeout(() => particle.remove(), duration * 1000);
  }, 500);
}

// ===== EFECTO DE CLICK EN TARJETAS =====
function initCardEffects() {
  const cards = document.querySelectorAll('.category-card');
  
  cards.forEach(card => {
    card.addEventListener('click', function(e) {
      // Crear onda en el punto de click
      const ripple = document.createElement('div');
      ripple.className = 'click-effect';
      ripple.style.left = e.clientX - 25 + 'px';
      ripple.style.top = e.clientY - 25 + 'px';
      document.body.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
    
    // Efecto de brillo al pasar el mouse
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

// ===== GUARDAR DATOS EN LOCAL STORAGE =====
function saveData() {
  const notes = document.querySelectorAll('.card-notes');
  const data = {};
  
  notes.forEach(note => {
    const card = note.closest('.category-card');
    const category = card.dataset.category;
    data[category] = note.value;
  });
  
  localStorage.setItem('stellarEnglishOrganizer', JSON.stringify(data));
}

// ===== CARGAR DATOS DE LOCAL STORAGE =====
function loadData() {
  const saved = localStorage.getItem('stellarEnglishOrganizer');
  
  if (saved) {
    const data = JSON.parse(saved);
    
    Object.keys(data).forEach(category => {
      const card = document.querySelector(`[data-category="${category}"]`);
      if (card) {
        const note = card.querySelector('.card-notes');
        if (note) {
          note.value = data[category];
        }
      }
    });
  }
}

// ===== INICIALIZAR APLICACION =====
function init() {
  // Establecer cuerpo celeste inicial
  celestialBody.classList.add(celestialBodies[0].class);
  celestialName.textContent = celestialBodies[0].emoji + ' ' + celestialBodies[0].name;
  
  // Event listener para cambiar cuerpo celeste
  celestialBody.addEventListener('click', changeCelestialBody);
  
  // Tambien permitir click en el contenedor
  document.querySelector('.celestial-container').addEventListener('click', function(e) {
    if (e.target === this || e.target.classList.contains('click-hint')) {
      changeCelestialBody();
    }
  });
  
  // Inicializar efectos de tarjetas
  initCardEffects();
  
  // Crear particulas flotantes
  createFloatingParticles();
  
  // Cargar datos guardados
  loadData();
  
  // Guardar datos cuando se escriba en las tarjetas
  document.querySelectorAll('.card-notes').forEach(note => {
    note.addEventListener('input', saveData);
  });
  
  // Actualizar contador
  updateCounter();
  
  // Teclado: flechas para cambiar
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
      e.preventDefault();
      changeCelestialBody();
    }
  });
  
  console.log('Stellar English Organizer initialized!');
  console.log('Click en el cuerpo celeste o presiona Espacio para cambiar.');
}

// ===== EFECTOS ADICIONALES =====

// Efecto parallax suave en las estrellas de fondo
document.addEventListener('mousemove', function(e) {
  const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
  const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
  
  document.querySelectorAll('.stars-bg, .stars-bg-2, .stars-bg-3').forEach((star, i) => {
    const factor = (i + 1) * 0.5;
    star.style.transform = `translate(${moveX * factor}px, ${moveY * factor}px)`;
  });
});

// Agregar tags dinamicamente
document.querySelectorAll('.card-tags').forEach(tagContainer => {
  tagContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('tag')) {
      const tag = e.target;
      
      // Efecto de pulso
      tag.style.transform = 'scale(1.2)';
      setTimeout(() => {
        tag.style.transform = 'scale(1)';
      }, 200);
      
      // Copiar texto al portapapeles
      const text = tag.textContent;
      navigator.clipboard.writeText(text).then(() => {
        // Feedback visual
        const original = tag.textContent;
        tag.textContent = 'Copiado!';
        tag.style.background = 'linear-gradient(135deg, rgba(78,205,196,0.5), rgba(78,205,196,0.3))';
        
        setTimeout(() => {
          tag.textContent = original;
          tag.style.background = '';
        }, 1000);
      });
    }
  });
});

// ===== INICIAR CUANDO EL DOM ESTE LISTO =====
document.addEventListener('DOMContentLoaded', init);

// Si el DOM ya esta listo (para CodePen)
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  init();
}
