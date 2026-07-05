// ===== SPLASH SCREEN =====
document.addEventListener('DOMContentLoaded', function() {
  const splash = document.getElementById('splash-screen');
  const mainContent = document.getElementById('main-content');
  
  // Only run splash if it exists (homepage)
  if (splash && mainContent) {
    // Show splash screen for 3 seconds
    setTimeout(function() {
      // Fade out splash
      splash.style.opacity = '0';
      splash.style.transition = 'opacity 0.6s ease';
      
      // After fade, hide splash and show main content
      setTimeout(function() {
        splash.style.display = 'none';
        mainContent.style.display = 'block';
        // Trigger scroll reveal for elements
        revealElements();
        // Initialize header hide on scroll
        initHeaderHide();
      }, 600);
    }, 3000); // 3 seconds
  } else {
    // For other pages, just initialize
    revealElements();
    initHeaderHide();
  }
});

// ===== HIDE HEADER ON SCROLL =====
function initHeaderHide() {
  const header = document.querySelector('header');
  if (!header) return;
  
  let isHidden = false;
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 80) {
      if (!isHidden) {
        header.classList.add('hidden');
        header.classList.remove('visible');
        isHidden = true;
      }
    } else {
      if (isHidden) {
        header.classList.remove('hidden');
        header.classList.add('visible');
        isHidden = false;
      }
    }
  });
}

// ===== MOBILE MENU =====
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

if (burger) {
  burger.addEventListener('click', function(e) {
    e.stopPropagation();
    const isOpen = navLinks.style.display === 'flex';
    navLinks.style.display = isOpen ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '80px';
    navLinks.style.right = '20px';
    navLinks.style.background = '#F6F1E4';
    navLinks.style.padding = '24px 32px';
    navLinks.style.borderRadius = '16px';
    navLinks.style.boxShadow = '0 20px 40px rgba(15,59,44,0.15)';
    navLinks.style.gap = '18px';
    navLinks.style.minWidth = '200px';
    navLinks.style.zIndex = '999';
  });
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
  if (burger && navLinks) {
    const isClickInside = burger.contains(event.target) || navLinks.contains(event.target);
    if (!isClickInside && navLinks.style.display === 'flex') {
      navLinks.style.display = 'none';
    }
  }
});

// ===== SCROLL REVEAL =====
function revealElements() {
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length === 0) return;
  
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
}

// ===== SMOOTH SCROLL FOR NAV LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      // Close mobile menu if open
      if (navLinks && navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
      }
      
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== WHATSAPP CHAT FUNCTIONALITY =====
const WHATSAPP_NUMBER = '27718114209';

function sendToWhatsApp(message) {
  if (!message || !message.trim()) return;
  
  const url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
  window.open(url, '_blank');
}

// Initialize WhatsApp chat if elements exist
document.addEventListener('DOMContentLoaded', function() {
  // Chat input and send button
  const chatInput = document.getElementById('chatInput');
  const chatSend = document.getElementById('chatSend');
  const chatQuick = document.getElementById('chatQuick');
  
  if (chatSend) {
    chatSend.addEventListener('click', function() {
      if (chatInput) {
        sendToWhatsApp(chatInput.value);
        chatInput.value = '';
      }
    });
  }
  
  if (chatInput) {
    chatInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        sendToWhatsApp(chatInput.value);
        chatInput.value = '';
      }
    });
  }
  
  if (chatQuick) {
    chatQuick.querySelectorAll('button').forEach(function(btn) {
      btn.addEventListener('click', function() {
        sendToWhatsApp(btn.dataset.msg);
      });
    });
  }
});