// ============================================
// THEME TOGGLE FUNCTIONALITY
// ============================================
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
  body.classList.remove('dark-mode');
} else {
  body.classList.add('dark-mode');
}

// Toggle theme
themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  
  // Save theme preference
  const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
});

// ============================================
// SMOOTH SCROLLING
// ============================================
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Only prevent default for internal links
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Close dropdown on mobile after clicking
        const dropdown = document.querySelector('.work-dropdown .dropdown-menu');
        if (dropdown) {
          dropdown.style.display = 'none';
          setTimeout(() => {
            dropdown.style.display = '';
          }, 300);
        }
      }
    }
  });
});

// Mobile dropdown toggle
const workToggle = document.querySelector('.work-toggle');
const workDropdown = document.querySelector('.work-dropdown');

if (workToggle && window.innerWidth <= 768) {
  workToggle.addEventListener('click', function(e) {
    e.preventDefault();
    const dropdown = workDropdown.querySelector('.dropdown-menu');
    if (dropdown.style.display === 'block') {
      dropdown.style.display = 'none';
    } else {
      dropdown.style.display = 'block';
    }
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
    if (!workDropdown.contains(e.target)) {
      const dropdown = workDropdown.querySelector('.dropdown-menu');
      if (dropdown) {
        dropdown.style.display = 'none';
      }
    }
  });
}

// ============================================
// REVEAL ON SCROLL ANIMATION
// ============================================
function reveal() {
  const reveals = document.querySelectorAll('.reveal');
  
  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('active');
    }
  });
}

// Initial check
window.addEventListener('load', reveal);
window.addEventListener('scroll', reveal);

// ============================================
// TYPING TEXT EFFECT
// ============================================
function typeText(element, text, speed = 50) {
  let i = 0;
  element.textContent = '';
  
  // Create an inline span to hold the text and the cursor
  const textSpan = document.createElement('span');
  textSpan.classList.add('typing-cursor');
  element.appendChild(textSpan);
  
  function type() {
    if (i < text.length) {
      textSpan.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      // Remove cursor (the border) after typing is complete
      setTimeout(() => {
        textSpan.classList.remove('typing-cursor');
      }, 500);
    }
  }
  
  type();
}

// Intersection Observer for typing effect
const typingObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('typed')) {
      const text = entry.target.getAttribute('data-text');
      typeText(entry.target, text, 20);
      entry.target.classList.add('typed');
    }
  });
}, {
  threshold: 0.5
});

// Observe all typing text elements
document.querySelectorAll('.typing-text').forEach(element => {
  typingObserver.observe(element);
});

// ============================================
// LOAD WORK DATA FROM JSON AND CREATE CARDS
// ============================================
async function loadWorkData() {
  try {
    const response = await fetch('data.json');
    const data = await response.json();
    
    // Create cards for each category
    createCards('experience-cards', data.experience);
    createCards('publications-cards', data.publications);
    createCards('projects-cards', data.projects);
    
    // Initialize all Swiper instances after cards are loaded
    initializeSwipers();
  } catch (error) {
    console.error('Error loading work data:', error);
  }
}

function createCards(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  container.innerHTML = '';
  
  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card swiper-slide';
    
    // Format date
    const date = new Date(item.date);
    const formattedDate = date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
    
    card.innerHTML = `
      <div class="image-content">
        <span class="overlay"></span>
        <div class="card-image">
          <img src="${item.image}" alt="${item.title}" class="card-img" onerror="this.src='images/placeholder.png'">
        </div>
      </div>
      <div class="card-content">
        <h2 class="name">${item.title}</h2>
        ${item.subtitle ? `<p class="subtitle">${item.subtitle}</p>` : ''}
        <p class="card-date">${formattedDate}</p>
        <p class="description">${item.description}</p>
        <button class="button">
          <a href="${item.link}" target="_blank" rel="noopener noreferrer">
            View More
          </a>
        </button>
      </div>
    `;
    
    container.appendChild(card);
  });
}

// ============================================
// INITIALIZE SWIPER INSTANCES
// ============================================
function initializeSwipers() {
  // Get all slide containers
  const swiperContainers = document.querySelectorAll('.slide-container');
  
  swiperContainers.forEach(container => {
    const swiperElement = container.querySelector('.swiper');
    if (!swiperElement) return;
    
    new Swiper(swiperElement, {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: false,
      centeredSlides: false,
      grabCursor: true,
      pagination: {
        el: container.querySelector('.swiper-pagination'),
        clickable: true,
        dynamicBullets: true,
      },
      navigation: {
        nextEl: container.querySelector('.swiper-button-next'),
        prevEl: container.querySelector('.swiper-button-prev'),
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 25,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
    });
  });
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  // Add shadow on scroll
  if (currentScroll > 50) {
    header.style.boxShadow = '0 4px 20px var(--shadow-medium)';
  } else {
    header.style.boxShadow = '0 2px 10px var(--shadow-light)';
  }
  
  lastScroll = currentScroll;
});

// ============================================
// FORM SUBMISSION HANDLING
// ============================================
const contactForm = document.querySelector('.contact-left');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    const submitBtn = this.querySelector('.send-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = 'Sending...';
    submitBtn.disabled = true;
    
    // The form will submit normally via Web3Forms
    // After 2 seconds, restore button (in case of error)
    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 2000);
  });
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Lazy load images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ============================================
// INITIALIZE EVERYTHING ON PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Load work data and initialize swipers
  loadWorkData();
  
  // Initial reveal check
  reveal();
  
  // Add active class to current nav item based on scroll position
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav ul li a[href^="#"]');
  
  function updateActiveNav() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop - 150) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();
});


// ============================================
// Console Message :)
// ============================================
console.log('%c👋 Hello, curious developer!', 'font-size: 20px; color: #6b7fd7; font-weight: bold;');
console.log('%cI see you\'re checking out the code. Feel free to explore!', 'font-size: 14px; color: #8a9ce6;');
console.log('%cBuilt with ❤️ by Abdelrahman Elawady', 'font-size: 12px; color: #c7c9d1;');
