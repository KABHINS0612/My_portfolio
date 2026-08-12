// Shared JS: menu toggle, active nav, intersection animations, smooth anchor scrolling
(function(){
  // ----- MOBILE MENU -----
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const icon = menuToggle.querySelector('i');
      if (navLinks.classList.contains('open')) {
        icon.className = 'fas fa-times';
      } else {
        icon.className = 'fas fa-bars';
      }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const icon = menuToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      });
    });
  }

  // ----- NAVIGATION ACTIVE STATE (works on single-page index only) -----
  const sections = ['about','skills','projects','experience','education','contact'];
  const navLinksItems = document.querySelectorAll('.nav-link');

  function updateActiveSection(){
    let current = '';
    const isAtBottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 100);
    if (isAtBottom) {
      current = 'contact';
    } else {
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) current = id;
        }
      });
    }
    navLinksItems.forEach(link => {
      link.classList.remove('active');
      if (link.dataset.section === current) link.classList.add('active');
    });
  }

  window.addEventListener('scroll', updateActiveSection);
  updateActiveSection();

  // ----- SCROLL ANIMATIONS (Intersection Observer) -----
  const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('section-header')) entry.target.classList.add('visible');
        if (entry.target.id === 'aboutText') entry.target.classList.add('visible');
        if (entry.target.id === 'aboutStats') entry.target.classList.add('visible');
        if (entry.target.classList.contains('skill-card')) {
          const delay = parseInt(entry.target.dataset.delay) || 0;
          setTimeout(() => entry.target.classList.add('visible'), delay);
        }
        if (entry.target.classList.contains('project-card')) {
          const delay = parseInt(entry.target.dataset.delay) || 0;
          setTimeout(() => entry.target.classList.add('visible'), delay);
        }
        if (entry.target.id === 'experienceCard') entry.target.classList.add('visible');
        if (entry.target.id === 'edu1' || entry.target.id === 'edu2') entry.target.classList.add('visible');
        if (entry.target.id === 'certificates') entry.target.classList.add('visible');
        if (entry.target.id === 'contactContent') entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.section-header').forEach(el => observer.observe(el));
  document.querySelectorAll('.skill-card').forEach(el => observer.observe(el));
  document.querySelectorAll('.project-card').forEach(el => observer.observe(el));
  ['aboutText','aboutStats','experienceCard','edu1','edu2','certificates','contactContent'].forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });

  // ----- ANCHOR SCROLL (smooth) -----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Hire me / view projects / contact primary handled where present (guarded in index.html)
  const hireBtn = document.querySelector('.hire-btn');
  if (hireBtn) hireBtn.addEventListener('click', () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  const viewProjectsBtn = Array.from(document.querySelectorAll('.btn-secondary')).find(b => b.getAttribute('href') === '#projects' || (b.textContent && b.textContent.includes('View Projects')));
  if (viewProjectsBtn) viewProjectsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const proj = document.getElementById('projects');
    if (proj) proj.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  const contactPrimary = document.querySelector('.contact-cta .btn-primary');
  if (contactPrimary) contactPrimary.addEventListener('click', () => { window.location.href = 'mailto:kabhins0612@gmail.com'; });

  // ----- Cursor & background interaction (guarded) -----
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  if (cursorDot || cursorRing) {
    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
    let ringX = mouseX, ringY = mouseY;
    const lerp = (a,b,t) => a + (b - a) * t;
    function onMove(e){
      mouseX = e.clientX; mouseY = e.clientY;
      if (cursorDot) cursorDot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    }
    window.addEventListener('mousemove', onMove);
    function animateRing(){
      ringX = lerp(ringX, mouseX, 0.18);
      ringY = lerp(ringY, mouseY, 0.18);
      if (cursorRing) cursorRing.style.transform = `translate(${ringX - (cursorRing.offsetWidth/2)}px, ${ringY - (cursorRing.offsetHeight/2)}px)`;
      requestAnimationFrame(animateRing);
    }
    requestAnimationFrame(animateRing);

    // Hover effects
    const hoverTargets = document.querySelectorAll('a, button, .btn, .project-card');
    hoverTargets.forEach(t => {
      t.addEventListener('mouseenter', () => { cursorRing && cursorRing.classList.add('hover'); });
      t.addEventListener('mouseleave', () => { cursorRing && cursorRing.classList.remove('hover'); });
    });
  }

})();
