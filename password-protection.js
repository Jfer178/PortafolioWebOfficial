/* ========================================== */
/* PASSWORD PROTECTION SYSTEM - COMENTADO */
/* Para activar la protección por contraseña, descomenta todo este archivo */
/* y también descomenta las secciones en index.html y styles.css */
/* ========================================== */

/*
// Password Protection System
// Cambia esta contraseña por la que quieras usar
const SITE_PASSWORD = 'portafoliosky1234';

// Verificar si el usuario ya está autenticado
function checkAuthentication() {
  const isAuthenticated = sessionStorage.getItem('portfolio_authenticated');
  const authTime = sessionStorage.getItem('portfolio_auth_time');
  const currentTime = Date.now();
  
  // Si está autenticado y la sesión es reciente (24 horas), permitir acceso
  if (isAuthenticated === 'true' && authTime) {
    const hoursSinceAuth = (currentTime - parseInt(authTime)) / (1000 * 60 * 60);
    if (hoursSinceAuth < 24) {
      showMainContent();
      return true;
    } else {
      // Sesión expirada, limpiar
      sessionStorage.removeItem('portfolio_authenticated');
      sessionStorage.removeItem('portfolio_auth_time');
    }
  }
  
  return false;
}

// Mostrar el contenido principal
function showMainContent() {
  const passwordProtection = document.getElementById('password-protection');
  const mainContent = document.getElementById('main-content');
  
  if (passwordProtection) {
    passwordProtection.style.opacity = '0';
    setTimeout(() => {
      passwordProtection.classList.add('hidden');
    }, 300);
  }
  
  if (mainContent) {
    mainContent.classList.remove('hidden');
    setTimeout(() => {
      mainContent.style.opacity = '1';
    }, 100);
  }
}

// Manejar el envío del formulario de contraseña
function handlePasswordSubmit(e) {
  e.preventDefault();
  
  const passwordInput = document.getElementById('password-input');
  const passwordError = document.getElementById('password-error');
  const submitBtn = document.querySelector('.password-submit-btn');
  
  const enteredPassword = passwordInput.value.trim();
  
  // Verificar contraseña (comparación simple - NO es completamente seguro, pero suficiente para control básico)
  if (enteredPassword === SITE_PASSWORD) {
    // Contraseña correcta
    passwordInput.value = '';
    passwordError.classList.add('hidden');
    
    // Guardar autenticación en sessionStorage
    sessionStorage.setItem('portfolio_authenticated', 'true');
    sessionStorage.setItem('portfolio_auth_time', Date.now().toString());
    
    // Mostrar contenido principal
    showMainContent();
    
    // Inicializar iconos de Lucide si están disponibles
    if (typeof lucide !== 'undefined') {
      setTimeout(() => {
        lucide.createIcons();
      }, 100);
    }
  } else {
    // Contraseña incorrecta
    passwordInput.value = '';
    passwordInput.focus();
    passwordError.classList.remove('hidden');
    submitBtn.classList.add('shake');
    
    setTimeout(() => {
      submitBtn.classList.remove('shake');
    }, 500);
  }
}

// Inicializar protección por contraseña
function initializePasswordProtection() {
  // Solo mostrar protección si no está autenticado
  if (!checkAuthentication()) {
    const passwordForm = document.getElementById('password-form');
    const passwordInput = document.getElementById('password-input');
    
    if (passwordForm) {
      passwordForm.addEventListener('submit', handlePasswordSubmit);
    }
    
    if (passwordInput) {
      // Permitir Enter para enviar
      passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          passwordForm.dispatchEvent(new Event('submit'));
        }
      });
      
      // Enfocar el input al cargar
      setTimeout(() => {
        passwordInput.focus();
      }, 100);
    }
    
    // Inicializar iconos de Lucide para la pantalla de login
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializePasswordProtection);
} else {
  initializePasswordProtection();
}

// Permitir cambiar la contraseña fácilmente desde la consola (opcional)
window.changePortfolioPassword = function(newPassword) {
  if (typeof newPassword === 'string' && newPassword.length > 0) {
    // Nota: Esto solo funciona si modificas el archivo directamente
    console.log('Para cambiar la contraseña, edita la variable SITE_PASSWORD en password-protection.js');
    console.log('Contraseña actual:', SITE_PASSWORD);
  }
};
*/
