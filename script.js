const navbar = document.querySelector('.navbar');
const navbarContainer = document.querySelector('.navbar-container');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const activeIndicator = document.querySelector('.active-indicator');
const themeToggle = document.getElementById('theme-toggle');
const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const scrollToTopBtn = document.getElementById('scroll-to-top');
const progressFills = document.querySelectorAll('.progress-fill');

let currentSection = 'hero';
let isScrolled = false;
let isMobileMenuOpen = false;

document.addEventListener('DOMContentLoaded', function() {
  initializeTheme();
  initializeNavigation();
  initializeScrollEffects();
  initializeAnimations();
  initializeForm();
  initializeDownloadCV();
  
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});

function initializeTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.className = savedTheme + '-theme';
  
  themeToggle.addEventListener('click', toggleTheme);
  mobileThemeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
  const overlay = document.getElementById('theme-transition-overlay');
  if (overlay) {
    overlay.classList.add('active');
    setTimeout(() => {
      overlay.classList.remove('active');
    }, 700);
  }
  const isDark = document.body.classList.contains('dark-theme');
  const newTheme = isDark ? 'light' : 'dark';
  document.body.className = newTheme + '-theme';
  localStorage.setItem('theme', newTheme);
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

function initializeNavigation() {
  updateActiveIndicator();
  
  [...navLinks, ...mobileNavLinks].forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(targetId);
        
        if (isMobileMenuOpen) {
          closeMobileMenu();
        }
      }
    });
  });
  
  mobileMenuToggle.addEventListener('click', toggleMobileMenu);
  
  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
      closeMobileMenu();
    }
  });
  
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  // Manejar el botón con efecto de brillo
  const heroButton = document.getElementById('hero-button');
  if (heroButton) {
    heroButton.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = heroButton.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // Agregar clase para animación de click
        heroButton.classList.add('clicking');
        
        // Esperar a que termine la animación antes de navegar
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(targetId);
          heroButton.classList.remove('clicking');
        }, 400);
      }
    });
  }
}

function updateActiveIndicator() {
  const activeLink = document.querySelector('.nav-link.active');
  if (activeLink && activeIndicator) {
    const linkRect = activeLink.getBoundingClientRect();
    const containerRect = activeLink.parentElement.getBoundingClientRect();
    
    activeIndicator.style.width = linkRect.width + 'px';
    activeIndicator.style.left = (linkRect.left - containerRect.left) + 'px';
  }
}

function setActiveSection(sectionId) {
  currentSection = sectionId;
  
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + sectionId);
  });
  
  mobileNavLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + sectionId);
  });
  
  updateActiveIndicator();
}

function toggleMobileMenu() {
  isMobileMenuOpen = !isMobileMenuOpen;
  
  mobileMenu.classList.toggle('active', isMobileMenuOpen);
  menuIcon.classList.toggle('hidden', isMobileMenuOpen);
  closeIcon.classList.toggle('hidden', !isMobileMenuOpen);
  
  document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
}

function closeMobileMenu() {
  isMobileMenuOpen = false;
  mobileMenu.classList.remove('active');
  menuIcon.classList.remove('hidden');
  closeIcon.classList.add('hidden');
  document.body.style.overflow = 'auto';
}

function initializeScrollEffects() {
  window.addEventListener('scroll', handleScroll);
  handleScroll();
}

function handleScroll() {
  const scrollY = window.scrollY;
  
  const shouldBeScrolled = scrollY > 100;
  if (shouldBeScrolled !== isScrolled) {
    isScrolled = shouldBeScrolled;
    navbar.classList.toggle('scrolled', isScrolled);
  }
  
  updateActiveSectionOnScroll();
  
  scrollToTopBtn.style.opacity = scrollY > 500 ? '1' : '0';
  scrollToTopBtn.style.visibility = scrollY > 500 ? 'visible' : 'hidden';
}

function updateActiveSectionOnScroll() {
  const sections = ['hero', 'about', 'technologies', 'education', 'languages', 'projects', 'contact'];
  
  for (const sectionId of sections) {
    const section = document.getElementById(sectionId);
    if (section) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 200 && rect.bottom >= 200) {
        if (currentSection !== sectionId) {
          setActiveSection(sectionId);
        }
        break;
      }
    }
  }
}

function initializeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '-100px 0px'
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          if (entry.target.id === 'languages') {
            animateProgressBars();
          }
          if (entry.target.classList.contains('tech-item')) {
            const techItems = entry.target.parentElement.querySelectorAll('.tech-item');
            techItems.forEach((item, index) => {
              setTimeout(() => {
                item.style.animationDelay = `${index * 0.1}s`;
                item.classList.add('animated');
              }, index * 100);
            });
          }
          if (entry.target.classList.contains('timeline-item')) {
            const timelineItems = document.querySelectorAll('.timeline-item');
            timelineItems.forEach((item, index) => {
              setTimeout(() => {
                item.querySelector('.timeline-content').style.animationDelay = `${index * 0.1}s`;
              }, index * 100);
            });
          }
          if (entry.target.classList.contains('project-card')) {
            const projectCards = document.querySelectorAll('.project-card');
            projectCards.forEach((card, index) => {
              setTimeout(() => {
                card.style.animationDelay = `${index * 0.1}s`;
                card.classList.add('animated');
              }, index * 100);
            });
          }
        }
      });
    }, observerOptions);
    const animateElements = document.querySelectorAll('.animate-on-scroll, .tech-item, .timeline-item, .project-card, #languages');
    animateElements.forEach(el => observer.observe(el));
    const elementsToAnimate = document.querySelectorAll('.section-heading, .about-content, .contact-content, .language-item');
    elementsToAnimate.forEach(el => el.classList.add('animate-on-scroll'));
    // Fallback: Forzar animación después de 1 segundo si algo falla
    setTimeout(() => {
      document.querySelectorAll('.animate-on-scroll, .tech-item, .timeline-item, .project-card, .language-item').forEach(el => {
        el.classList.add('animated');
      });
    }, 1000);
  } else {
    // Si no hay IntersectionObserver, mostrar todo
    document.querySelectorAll('.animate-on-scroll, .tech-item, .timeline-item, .project-card, .language-item').forEach(el => {
      el.classList.add('animated');
    });
  }
}

function animateProgressBars() {
  progressFills.forEach((fill, index) => {
    setTimeout(() => {
      const width = fill.getAttribute('data-width');
      fill.style.width = width + '%';
      
      // Agregar efecto de brillo durante la animación
      fill.style.boxShadow = `0 0 20px rgba(4, 217, 255, 0.5)`;
      
      // Quitar el efecto de brillo después de la animación
      setTimeout(() => {
        fill.style.boxShadow = `0 0 10px rgba(4, 217, 255, 0.3)`;
      }, 1500);
    }, index * 150);
  });
}

function initializeForm() {
  contactForm.addEventListener('submit', handleFormSubmit);
}

function initializeDownloadCV() {
  // Contraseña para descargar el CV
  const CV_PASSWORD = 'portafoliosky1234';
  
  const downloadBtn = document.getElementById('download-cv-btn');
  const mobileDownloadBtn = document.getElementById('mobile-download-cv-btn');
  const cvPasswordModal = document.getElementById('cv-password-modal');
  const cvModalClose = document.getElementById('cv-modal-close');
  const cvPasswordForm = document.getElementById('cv-password-form');
  const cvPasswordInput = document.getElementById('cv-password-input');
  const cvPasswordError = document.getElementById('cv-password-error');
  const cvModalOverlay = document.querySelector('.cv-modal-overlay');
  
  // Función para mostrar el modal de contraseña
  const showPasswordModal = (e) => {
    e.preventDefault();
    
    if (cvPasswordModal) {
      cvPasswordModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      
      // Enfocar el input después de mostrar el modal
      setTimeout(() => {
        if (cvPasswordInput) {
          cvPasswordInput.focus();
        }
      }, 100);
      
      // Cerrar el menú móvil si está abierto
      if (isMobileMenuOpen) {
        closeMobileMenu();
      }
    }
    
    // Inicializar iconos de Lucide si están disponibles
    if (typeof lucide !== 'undefined') {
      setTimeout(() => {
        lucide.createIcons();
      }, 100);
    }
  };
  
  // Función para cerrar el modal
  const closePasswordModal = () => {
    if (cvPasswordModal) {
      cvPasswordModal.classList.add('hidden');
      document.body.style.overflow = 'auto';
      
      // Limpiar el formulario
      if (cvPasswordForm) {
        cvPasswordForm.reset();
      }
      
      if (cvPasswordError) {
        cvPasswordError.classList.add('hidden');
      }
    }
  };
  
  // Función para descargar el CV (solo si la contraseña es correcta)
  const downloadCV = () => {
    // Ruta al archivo CV
    const cvPath = 'img/JFHojadeVida.pdf';
    
    // Crear un enlace temporal para descargar
    const link = document.createElement('a');
    link.href = cvPath;
    link.download = 'JFHojadeVida.pdf';
    link.target = '_blank';
    
    // Agregar al DOM, hacer clic y remover
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Cerrar el modal
    closePasswordModal();
    
    // Feedback visual
    if (downloadBtn) {
      downloadBtn.style.transform = 'scale(0.95)';
      setTimeout(() => {
        downloadBtn.style.transform = '';
      }, 150);
    }
    
    if (mobileDownloadBtn) {
      mobileDownloadBtn.style.transform = 'scale(0.95)';
      setTimeout(() => {
        mobileDownloadBtn.style.transform = '';
      }, 150);
    }
  };
  
  // Manejar el envío del formulario de contraseña
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    const enteredPassword = cvPasswordInput ? cvPasswordInput.value.trim() : '';
    const submitBtn = document.querySelector('.cv-password-submit-btn');
    
    // Verificar contraseña
    if (enteredPassword === CV_PASSWORD) {
      // Contraseña correcta
      cvPasswordError.classList.add('hidden');
      downloadCV();
    } else {
      // Contraseña incorrecta
      if (cvPasswordInput) {
        cvPasswordInput.value = '';
        cvPasswordInput.focus();
      }
      
      cvPasswordError.classList.remove('hidden');
      
      if (submitBtn) {
        submitBtn.classList.add('shake');
        setTimeout(() => {
          submitBtn.classList.remove('shake');
        }, 500);
      }
    }
  };
  
  // Event listeners
  if (downloadBtn) {
    downloadBtn.addEventListener('click', showPasswordModal);
  }
  
  if (mobileDownloadBtn) {
    mobileDownloadBtn.addEventListener('click', showPasswordModal);
  }
  
  if (cvPasswordForm) {
    cvPasswordForm.addEventListener('submit', handlePasswordSubmit);
  }
  
  if (cvModalClose) {
    cvModalClose.addEventListener('click', closePasswordModal);
  }
  
  if (cvModalOverlay) {
    cvModalOverlay.addEventListener('click', closePasswordModal);
  }
  
  // Cerrar modal con tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cvPasswordModal && !cvPasswordModal.classList.contains('hidden')) {
      closePasswordModal();
    }
  });
  
  // Asegurar que los iconos se inicialicen
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

async function handleFormSubmit(e) {
  e.preventDefault();
  
  const submitBtn = contactForm.querySelector('.submit-btn');
  const btnText = submitBtn.querySelector('span');
  const btnIcon = submitBtn.querySelector('i');
  
  submitBtn.disabled = true;
  btnText.textContent = 'Enviando...';
  btnIcon.setAttribute('data-lucide', 'loader-2');
  btnIcon.classList.add('loading');
  
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    formSuccess.classList.remove('hidden');
    formSuccess.classList.add('show');
    
    contactForm.reset();
    
    setTimeout(() => {
      formSuccess.classList.remove('show');
      setTimeout(() => {
        formSuccess.classList.add('hidden');
      }, 300);
    }, 5000);
    
  } catch (error) {
    console.error('Form submission error:', error);
  } finally {
    submitBtn.disabled = false;
    btnText.textContent = 'Enviar mensaje';
    btnIcon.setAttribute('data-lucide', 'send');
    btnIcon.classList.remove('loading');
    
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function smoothScrollTo(element) {
  const targetPosition = element.offsetTop - 100;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 1000;
  let start = null;
  
  function animation(currentTime) {
    if (start === null) start = currentTime;
    const timeElapsed = currentTime - start;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }
  
  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }
  
  requestAnimationFrame(animation);
}

function optimizeVideo() {
  const video = document.querySelector('.hero video');
  if (video) {
    // Forzar la mejor calidad disponible
    video.setAttribute('playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');
    
    // Configurar para máxima calidad
    if (video.canPlayType && video.canPlayType('video/mp4')) {
      video.load(); // Recargar el video para aplicar configuraciones
    }
    
    // Asegurar que el video cargue en alta calidad
    video.addEventListener('loadedmetadata', function() {
      // Video cargado correctamente
      // Dimensiones: video.videoWidth x video.videoHeight
    });
    
    video.playbackRate = 0.7;
    
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          video.play().catch(e => console.log('Video play error:', e));
        } else {
          video.pause();
        }
      });
    });
    
    videoObserver.observe(video);
  }
}

document.addEventListener('DOMContentLoaded', optimizeVideo);

window.addEventListener('resize', debounce(() => {
  updateActiveIndicator();
  
  if (window.innerWidth > 768 && isMobileMenuOpen) {
    closeMobileMenu();
  }
}, 250));

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && isMobileMenuOpen) {
    closeMobileMenu();
  }
  
  if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
    e.preventDefault();
    toggleTheme();
  }
});

// Función de preload de imágenes eliminada - ya no se necesitan imágenes de placeholder

function initializeLazyLoading() {
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
  } else {
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.classList.remove('lazy');
    });
  }
}

function handleMissingElements() {
  // Verificar elementos requeridos por ID y clase
  const requiredElementsById = [
    'theme-toggle', 'mobile-menu-toggle', 
    'contact-form', 'scroll-to-top'
  ];
  
  requiredElementsById.forEach(id => {
    const element = document.getElementById(id);
    if (!element) {
      console.warn(`Required element with id "${id}" not found`);
    }
  });
  
  // Verificar navbar por clase (no tiene ID)
  const navbar = document.querySelector('.navbar');
  if (!navbar) {
    console.warn('Required element with class "navbar" not found');
  }
}

document.addEventListener('DOMContentLoaded', handleMissingElements);

window.portfolioApp = {
  toggleTheme,
  setActiveSection,
  smoothScrollTo,
  closeMobileMenu
};