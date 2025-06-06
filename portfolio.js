document.addEventListener('DOMContentLoaded', function() {

  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  
  menuToggle.addEventListener('click', function() {
    nav.classList.toggle('active');
    menuToggle.textContent = nav.classList.contains('active') ? '✕' : '☰';
  });

  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      if (nav.classList.contains('active')) {
        nav.classList.remove('active');
        menuToggle.textContent = '☰';
      }
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
      
      document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
      });
      this.classList.add('active');
    });
  });

  const skillTabs = document.querySelectorAll('.skill-tab');
  const skillTabContents = document.querySelectorAll('.skill-tab-content');

  function switchTab(tabId) {
    skillTabs.forEach(tab => tab.classList.remove('active'));
    skillTabContents.forEach(content => content.classList.remove('active'));
    
    const selectedTab = document.querySelector(`.skill-tab[data-tab="${tabId}"]`);
    const selectedContent = document.getElementById(tabId);
    
    if (selectedTab && selectedContent) {
      selectedTab.classList.add('active');
      selectedContent.classList.add('active');
      animateSkillBars(selectedContent);
    }
  }

  skillTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');
      switchTab(tabId);
    });
  });

  function animateSkillBars(container) {
    const skillBars = container.querySelectorAll('.progress');
    skillBars.forEach(bar => {
      const width = bar.style.width;
      bar.style.width = '0';
      setTimeout(() => {
        bar.style.width = width;
      }, 100);
    });
  }

  if (skillTabs.length > 0) {
    switchTab(skillTabs[0].getAttribute('data-tab'));
  }

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      console.log('Form submitted:', { name, email, message });
      alert('Thank you for your message! I will get back to you soon.');
      contactForm.reset();
    });
  }

  const sections = document.querySelectorAll('section');
  
  window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= sectionTop - 100) {
        current = section.getAttribute('id');
      }
    });
    
    document.querySelectorAll('nav a').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  document.querySelectorAll('nav a').forEach(link => {
    if (link.getAttribute('href') === window.location.hash || 
        (window.location.hash === '' && link.getAttribute('href') === '#home')) {
      link.classList.add('active');
    }
  });
});