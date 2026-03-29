document.addEventListener('DOMContentLoaded', () => {
  // --- 1. THEME TOGGLE (Dark/Light Mode) ---
  const themeToggle = document.getElementById('theme-toggle');
  const iconMoon = themeToggle.querySelector('.icon-moon');
  const iconSun = themeToggle.querySelector('.icon-sun');
  const rootElement = document.documentElement;

  // Carrega tema salvo em localStorage ou detecta sistema
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    rootElement.setAttribute('data-theme', 'dark');
    iconMoon.style.display = 'none';
    iconSun.style.display = 'block';
  }

  themeToggle.addEventListener('click', () => {
    const isDark = rootElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      rootElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      iconMoon.style.display = 'block';
      iconSun.style.display = 'none';
    } else {
      rootElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      iconMoon.style.display = 'none';
      iconSun.style.display = 'block';
    }
  });

  // --- 2. WAITLIST ROUTING (Micro interações) ---
  const waitlistButtons = document.querySelectorAll('.btn-waitlist');
  const newsletterSection = document.getElementById('newsletter');
  const newsletterTitle = document.getElementById('newsletter-title');
  const newsletterInput = document.querySelector('.newsletter-input');
  const defaultTitle = newsletterTitle ? newsletterTitle.textContent : "Receba os próximos artigos";

  waitlistButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault(); // Previne reload de hashtag vazia
      
      const articleName = btn.getAttribute('data-article');
      
      // Atualiza o contexto do formulário com feedback visual
      if (articleName && newsletterTitle) {
        newsletterTitle.textContent = `Quer ser avisado quando "${articleName}" sair?`;
        newsletterTitle.style.color = 'var(--accent-color)';
        
        // Retorna a cor base após destaque suave
        setTimeout(() => {
          newsletterTitle.style.color = 'var(--text-primary)';
        }, 1200);
      }
      
      // Realiza o Smooth Scroll até a Newsletter
      if (newsletterSection) {
        newsletterSection.scrollIntoView({ behavior: 'smooth' });
      }
      
      // Aplica foco no campoy delayado para aguardar scroll
      if (newsletterInput) {
        setTimeout(() => {
          newsletterInput.focus();
        }, 800);
      }
    });
  });
});
