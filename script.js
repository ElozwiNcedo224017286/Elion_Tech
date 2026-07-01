// script.js
// ===== SPLASH SCREEN =====
document.addEventListener('DOMContentLoaded', function() {
  const splash = document.getElementById('splash-screen');
  const mainContent = document.getElementById('main-content');
  
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
});

// ===== HIDE HEADER ON SCROLL - COMPLETELY =====
function initHeaderHide() {
  const header = document.querySelector('header');
  let isHidden = false;
  let scrollTimeout;
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Clear previous timeout
    clearTimeout(scrollTimeout);
    
    // Only trigger after scrolling past 80px
    if (scrollTop > 80) {
      // Scrolling down - hide header completely
      if (!isHidden) {
        header.classList.add('hidden');
        header.classList.remove('visible');
        isHidden = true;
      }
    } else {
      // At top - show header
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
  burger.addEventListener('click', () => {
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

// Initial reveal for elements already visible
setTimeout(revealElements, 100);

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