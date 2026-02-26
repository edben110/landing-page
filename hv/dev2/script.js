/**
 * ═══════════════════════════════════════════════════════════════
 * NEXPHONE X1 - JAVASCRIPT PRINCIPAL
 * ═══════════════════════════════════════════════════════════════
 * Funcionalidades:
 * 1. Navegación móvil (hamburger menu)
 * 2. Scroll suave y navegación activa
 * 3. Animaciones de entrada (fade-in)
 * 4. Validación de formulario
 * 5. Navegación sticky con efecto blur
 * ═══════════════════════════════════════════════════════════════
 */

'use strict';

// ═══════════════════════════════════════════════════════════════
// 1. ESTADO DE LA APLICACIÓN
// ═══════════════════════════════════════════════════════════════
const AppState = {
  mobileMenuOpen: false,
  currentSection: 'home',
  isScrolling: false
};

// ═══════════════════════════════════════════════════════════════
// 2. NAVEGACIÓN MÓVIL
// ═══════════════════════════════════════════════════════════════
const MobileNav = {
  init() {
    this.createHamburgerButton();
    this.createMobileMenu();
    this.createFloatingBuyButton();
    this.attachEventListeners();
    this.handleResize();
  },

  createHamburgerButton() {
    const navContainer = document.querySelector('.nav-container');
    if (!navContainer) return;

    const hamburger = document.createElement('button');
    hamburger.className = 'nav-toggle';
    hamburger.setAttribute('aria-label', 'Abrir menú de navegación');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.innerHTML = `
      <span></span>
      <span></span>
      <span></span>
    `;

    // Insertar al inicio del nav-container
    navContainer.insertBefore(hamburger, navContainer.firstChild);
    
    this.hamburger = hamburger;
  },

  createMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    if (!navMenu) return;

    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'nav-mobile-menu';
    mobileMenu.setAttribute('role', 'navigation');
    mobileMenu.setAttribute('aria-label', 'Menú móvil');

    // Clonar los enlaces del menú
    const menuClone = navMenu.cloneNode(true);
    menuClone.className = 'nav-mobile-list';
    mobileMenu.appendChild(menuClone);

    document.body.appendChild(mobileMenu);
    this.mobileMenu = mobileMenu;
  },

  createFloatingBuyButton() {
    const floatingBtn = document.createElement('a');
    floatingBtn.href = '#buy';
    floatingBtn.className = 'floating-buy-btn';
    floatingBtn.setAttribute('aria-label', 'Comprar NexPhone X1');
    floatingBtn.innerHTML = `
      <div class="icon">
        <img src="public/icons/shop.svg" alt="">
      </div>
      <span class="text">Comprar</span>
    `;

    document.body.appendChild(floatingBtn);
    this.floatingBtn = floatingBtn;
  },

  attachEventListeners() {
    if (!this.hamburger || !this.mobileMenu) return;

    // Toggle del menú
    this.hamburger.addEventListener('click', () => this.toggle());

    // Cerrar al hacer click en un link
    const mobileLinks = this.mobileMenu.querySelectorAll('.nav-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => this.close());
    });

    // Cerrar con ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && AppState.mobileMenuOpen) {
        this.close();
      }
    });

    // Manejar cambios de tamaño de ventana
    window.addEventListener('resize', () => this.handleResize());
  },

  handleResize() {
    const isDesktop = window.innerWidth >= 768;
    
    if (isDesktop) {
      // Ocultar hamburguesa y cerrar menú en escritorio
      if (this.hamburger) {
        this.hamburger.style.display = 'none';
      }
      if (AppState.mobileMenuOpen) {
        this.close();
      }
    } else {
      // Mostrar hamburguesa en móvil
      if (this.hamburger) {
        this.hamburger.style.display = 'flex';
      }
    }
  },

  toggle() {
    AppState.mobileMenuOpen ? this.close() : this.open();
  },

  open() {
    AppState.mobileMenuOpen = true;
    this.hamburger.classList.add('active');
    this.hamburger.setAttribute('aria-expanded', 'true');
    this.mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  },

  close() {
    AppState.mobileMenuOpen = false;
    this.hamburger.classList.remove('active');
    this.hamburger.setAttribute('aria-expanded', 'false');
    this.mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }
};

// ═══════════════════════════════════════════════════════════════
// 3. SCROLL SUAVE Y NAVEGACIÓN ACTIVA
// ═══════════════════════════════════════════════════════════════
const ScrollNav = {
  init() {
    this.sections = document.querySelectorAll('section[id]');
    this.navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    this.attachScrollListeners();
    this.attachClickListeners();
    
    // Activar el primer enlace al cargar
    this.updateActiveLink();
  },

  attachScrollListeners() {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.updateActiveLink();
          ticking = false;
        });
        ticking = true;
      }
    });
  },

  attachClickListeners() {
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          const navHeight = document.querySelector('.main-header').offsetHeight;
          const targetPosition = targetSection.offsetTop - navHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  },

  updateActiveLink() {
    const scrollPosition = window.scrollY + 150;
    let currentSection = '';

    // Encontrar la sección actual
    this.sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    // Si estamos en el top de la página, activar home
    if (window.scrollY < 100) {
      currentSection = 'home';
    }

    // Actualizar enlaces activos
    if (currentSection && currentSection !== AppState.currentSection) {
      AppState.currentSection = currentSection;
      
      this.navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href === `#${currentSection}`) {
          link.classList.add('active');
        }
      });
    }
  }
};

// ═══════════════════════════════════════════════════════════════
// 4. ANIMACIONES DE ENTRADA (INTERSECTION OBSERVER)
// ═══════════════════════════════════════════════════════════════
const AnimateOnScroll = {
  init() {
    this.elements = document.querySelectorAll(
      '.benefit-card, .feature-item, .testimonial-card, .section-title, .section-subtitle'
    );

    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    this.observeElements();
  },

  observeElements() {
    this.elements.forEach((el, index) => {
      el.classList.add('fade-in');
      el.style.transitionDelay = `${index * 0.05}s`;
      this.observer.observe(el);
    });
  },

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        this.observer.unobserve(entry.target);
      }
    });
  }
};

// ═══════════════════════════════════════════════════════════════
// 5. VALIDACIÓN DE FORMULARIO
// ═══════════════════════════════════════════════════════════════
const FormValidator = {
  init() {
    this.form = document.querySelector('.contact-form');
    if (!this.form) return;

    this.inputs = {
      name: this.form.querySelector('#name'),
      email: this.form.querySelector('#email'),
      message: this.form.querySelector('#message')
    };

    this.attachEventListeners();
  },

  attachEventListeners() {
    // Validación en tiempo real
    Object.values(this.inputs).forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearError(input));
    });

    // Submit del formulario
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  },

  validateField(field) {
    const value = field.value.trim();
    const fieldName = field.getAttribute('name');
    let isValid = true;
    let errorMessage = '';

    switch(fieldName) {
      case 'name':
        if (value.length < 2) {
          isValid = false;
          errorMessage = 'El nombre debe tener al menos 2 caracteres';
        }
        break;

      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          isValid = false;
          errorMessage = 'Por favor ingresa un email válido';
        }
        break;

      case 'message':
        if (value.length < 10) {
          isValid = false;
          errorMessage = 'El mensaje debe tener al menos 10 caracteres';
        }
        break;
    }

    this.showFieldStatus(field, isValid, errorMessage);
    return isValid;
  },

  showFieldStatus(field, isValid, errorMessage) {
    const formGroup = field.closest('.form-group');
    let feedback = formGroup.querySelector('.form-feedback');

    // Crear elemento de feedback si no existe
    if (!feedback) {
      feedback = document.createElement('div');
      feedback.className = 'form-feedback';
      formGroup.appendChild(feedback);
    }

    // Limpiar estados previos
    field.classList.remove('is-error', 'is-success');
    feedback.classList.remove('error', 'success');

    if (!isValid) {
      field.classList.add('is-error');
      feedback.classList.add('error');
      feedback.textContent = errorMessage;
    } else if (field.value.trim()) {
      field.classList.add('is-success');
      feedback.classList.add('success');
      feedback.textContent = '✓ Correcto';
    }
  },

  clearError(field) {
    const formGroup = field.closest('.form-group');
    const feedback = formGroup.querySelector('.form-feedback');
    
    if (feedback && field.classList.contains('is-error')) {
      field.classList.remove('is-error');
      feedback.classList.remove('error');
      feedback.textContent = '';
    }
  },

  handleSubmit(e) {
    e.preventDefault();

    // Validar todos los campos
    const validations = Object.values(this.inputs).map(input => 
      this.validateField(input)
    );

    const allValid = validations.every(v => v === true);

    if (allValid) {
      this.submitForm();
    } else {
      // Hacer scroll al primer campo con error
      const firstError = this.form.querySelector('.is-error');
      if (firstError) {
        firstError.focus();
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  },

  submitForm() {
    const submitButton = this.form.querySelector('.btn-submit');
    const originalText = submitButton.textContent;

    // Simular envío (aquí conectarías con tu backend)
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;

    setTimeout(() => {
      // Éxito
      submitButton.textContent = '✓ Mensaje enviado';
      submitButton.style.backgroundColor = '#34c759';

      // Limpiar formulario
      this.form.reset();
      Object.values(this.inputs).forEach(input => {
        input.classList.remove('is-success', 'is-error');
      });

      // Restaurar botón después de 3 segundos
      setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        submitButton.style.backgroundColor = '';
      }, 3000);

    }, 1500);
  }
};

// ═══════════════════════════════════════════════════════════════
// 6. NAVEGACIÓN STICKY CON EFECTO
// ═══════════════════════════════════════════════════════════════
const StickyNav = {
  init() {
    this.header = document.querySelector('.main-header');
    this.nav = document.querySelector('.main-nav');
    if (!this.header || !this.nav) return;

    this.scrollThreshold = 100;
    this.attachScrollListener();
  },

  attachScrollListener() {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.scrollY;

          // Cambiar estilo del navbar después del threshold
          if (currentScroll > this.scrollThreshold) {
            this.nav.classList.add('scrolled');
          } else {
            this.nav.classList.remove('scrolled');
          }

          ticking = false;
        });
        ticking = true;
      }
    });
  }
};

// ═══════════════════════════════════════════════════════════════
// 7. INICIALIZACIÓN DE LA APLICACIÓN
// ═══════════════════════════════════════════════════════════════
const App = {
  init() {
    // Esperar a que el DOM esté listo
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.start());
    } else {
      this.start();
    }
  },

  start() {
    console.log('🚀 NexPhone X1 - Inicializando...');

    // Inicializar módulos
    MobileNav.init();
    ScrollNav.init();
    AnimateOnScroll.init();
    FormValidator.init();
    StickyNav.init();

    // Agregar clase al body cuando todo está listo
    document.body.classList.add('loaded');

    console.log('✅ Aplicación lista');
  }
};

// Iniciar la aplicación
App.init();
