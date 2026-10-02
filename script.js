const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.15 }
);

revealEls.forEach((el) => revealObserver.observe(el));

const tiltCards = document.querySelectorAll('.tilt-card');
const scene = document.querySelector('.scene');

window.addEventListener('pointermove', (event) => {
  const x = (event.clientX / window.innerWidth - 0.5) * 18;
  const y = (event.clientY / window.innerHeight - 0.5) * 18;

  if (scene) {
    scene.style.transform = `rotateX(${(-y).toFixed(2)}deg) rotateY(${(x).toFixed(2)}deg)`;
  }

  tiltCards.forEach((card, index) => {
    const px = (x * (index === 0 ? 1 : -1) * 1.4).toFixed(2);
    const py = (y * 1.4).toFixed(2);
    card.style.transform = `perspective(1000px) rotateX(${(-py)}deg) rotateY(${px}deg) translateZ(${index === 0 ? 0 : 8}px)`;
  });
});

window.addEventListener('pointerleave', () => {
  if (scene) {
    scene.style.transform = 'rotateX(14deg) rotateY(-16deg)';
  }

  tiltCards.forEach((card) => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  });
});
