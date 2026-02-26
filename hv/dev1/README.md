# F2 - Features Implementadas por Dev1

Este directorio contiene todas las implementaciones realizadas por el desarrollador 1 (Dev1) en la rama F2.

---

## 🌓 FEATURE 1: Dark Mode Toggle

### Descripción
Implementación completa de modo oscuro con toggle interactivo, persistencia de preferencias y detección automática del tema del sistema.

### Funcionalidades Implementadas

#### 1. Variables CSS para Temas
- Sistema de variables CSS dinámicas para colores
- Tema claro (por defecto)
- Tema oscuro con paleta optimizada
- Transiciones suaves entre temas (0.3s)

#### 2. Botón Toggle de Tema
- Ubicado en la barra de navegación
- Iconos animados (sol/luna) con rotación
- Feedback visual al hacer hover
- Accesible con teclado

#### 3. Persistencia con localStorage
- Guarda la preferencia del usuario
- Carga automática al recargar la página
- Sincronización entre pestañas

#### 4. Detección de Preferencia del Sistema
- Respeta `prefers-color-scheme`
- Cambio automático si el usuario no ha establecido preferencia manual
- Listener para cambios en tiempo real

#### 5. Sección Hoja de Vida
Nueva sección responsive con:
- **Datos Personales**: Nombre, email, ubicación, teléfono
- **Formación Académica**: Títulos y certificaciones
- **Tecnologías y Habilidades**: Tags interactivos con hover effects
- **Repositorios GitHub**: Enlaces a proyectos con iconos

### Variables CSS Implementadas

```css
/* Tema Claro */
--theme-bg: #fbfbfd
--theme-surface: #ffffff
--theme-text: #1d1d1f
--theme-border: #d2d2d7

/* Tema Oscuro */
--theme-bg: #000000
--theme-surface: #2c2c2e
--theme-text: #f5f5f7
--theme-border: #3a3a3c
```

---

## 🎬 FEATURE 2: Scroll Animations

### Descripción
Implementación de animaciones suaves al hacer scroll utilizando la API Intersection Observer para mejorar la experiencia visual del usuario.

### Animaciones Implementadas

#### 1. Fade In
- **Clase CSS**: `.fade-in`
- **Efecto**: Aparición gradual con transición de opacidad
- **Uso**: Títulos de sección y subtítulos

#### 2. Slide Up
- **Clase CSS**: `.slide-up`
- **Efecto**: Deslizamiento desde abajo con fade
- **Uso**: Tarjetas de beneficios y testimonios centrales

#### 3. Slide In Left
- **Clase CSS**: `.slide-in-left`
- **Efecto**: Deslizamiento desde la izquierda
- **Uso**: Primer testimonio

#### 4. Slide In Right
- **Clase CSS**: `.slide-in-right`
- **Efecto**: Deslizamiento desde la derecha
- **Uso**: Tercer testimonio

#### 5. Scale In
- **Clase CSS**: `.scale-in`
- **Efecto**: Zoom in con fade
- **Uso**: Tarjetas de características técnicas

### Características Técnicas

- **API utilizada**: Intersection Observer
- **Threshold**: 15% de visibilidad para activar animación
- **Duración**: 0.8s con easing cubic-bezier
- **Delay escalonado**: 0.08s entre elementos para efecto cascada
- **Optimización**: Las animaciones se ejecutan solo una vez (unobserve después de activar)

### Rendimiento

- No bloquea el hilo principal
- Usa requestAnimationFrame internamente
- Respeta `prefers-reduced-motion` para accesibilidad
- Animaciones GPU-accelerated (transform y opacity)

---

## 📂 Estructura de Archivos

```
hv/dev1/
├── Index.html          # HTML con ambas features integradas
├── css/
│   └── styles.css      # Estilos con temas y animaciones
├── js/
│   └── script.js       # Módulos ThemeManager y ScrollAnimations
└── README.md           # Esta documentación
```

---

## 🎯 Componentes Adaptados

### Dark Mode
- ✅ Body y backgrounds
- ✅ Tarjetas de beneficios
- ✅ Tarjetas de características
- ✅ Tarjetas de testimonios
- ✅ Formulario de contacto
- ✅ Sección de hoja de vida
- ✅ Textos y bordes

### Scroll Animations
- ✅ Títulos de sección (fade-in)
- ✅ Subtítulos (fade-in)
- ✅ Tarjetas de beneficios (slide-up)
- ✅ Tarjetas de características (scale-in)
- ✅ Testimonios (slide-in-left, slide-up, slide-in-right)

---

## 🚀 Cómo Usar

### Dark Mode
El tema se aplica automáticamente según:
1. Preferencia guardada en localStorage
2. Si no existe, usa la preferencia del sistema
3. El usuario puede cambiar manualmente con el botón toggle

### Scroll Animations
Las animaciones se activan automáticamente cuando los elementos entran en pantalla. Para agregar animaciones a nuevos elementos:

```html
<!-- Fade In -->
<div class="fade-in">Contenido</div>

<!-- Slide Up -->
<div class="slide-up">Contenido</div>

<!-- Slide In Left -->
<div class="slide-in-left">Contenido</div>

<!-- Slide In Right -->
<div class="slide-in-right">Contenido</div>

<!-- Scale In -->
<div class="scale-in">Contenido</div>
```

---

## ♿ Accesibilidad

- Botón toggle con `aria-label` descriptivo
- Contraste WCAG AA en ambos temas
- Transiciones respetan `prefers-reduced-motion`
- Navegación por teclado funcional
- Animaciones optimizadas para rendimiento

---

## 🌐 Compatibilidad

- Chrome/Edge: ✅
- Firefox: ✅
- Safari: ✅
- Opera: ✅

---

## 📝 Commits Realizados en F2

### Dark Mode
1. `feat: add CSS variables for light and dark theme support`
2. `feat: implement theme toggle button with smooth transitions`
3. `feat: add localStorage persistence and system theme preference detection`
4. `feat: add resume section with personal info, education, skills and GitHub links`

### Scroll Animations
5. `feat: implement Intersection Observer for scroll animations`
6. `feat: add animation classes to HTML elements`

### Documentación
7. `docs: add comprehensive documentation for all features`

---

## 🔮 Mejoras Futuras

### Dark Mode
- [ ] Más variantes de tema (alto contraste, sepia)
- [ ] Selector de colores personalizados
- [ ] Modo automático por horario

### Scroll Animations
- [ ] Más tipos de animaciones
- [ ] Control de velocidad de animación
- [ ] Animaciones en loop para elementos específicos

---

## 👨‍💻 Desarrollador

**Dev1** - Desarrollador Frontend  
Rama: `F2`  
Carpeta: `hv/dev1/`
