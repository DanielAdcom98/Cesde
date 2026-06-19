const slides = Array.from(document.querySelectorAll('.slide'));
const indexList = document.getElementById('indexList');
const slideCounter = document.getElementById('slideCounter');
const progressBar = document.getElementById('progressBar');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentSlide = 0;

function renderIndex() {
  if (!indexList) return;
  indexList.innerHTML = '';
  slides.forEach((slide, index) => {
    const item = document.createElement('li');
    item.textContent = slide.dataset.title || `Slide ${index + 1}`;
    item.onclick = () => {
      goToSlide(index);
      toggleIndex();
    };
    indexList.appendChild(item);
  });
}

function showSlide(index) {
  currentSlide = Math.max(0, Math.min(index, slides.length - 1));
  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle('active', slideIndex === currentSlide);
  });

  if (slideCounter) {
    slideCounter.textContent = `${currentSlide + 1} / ${slides.length}`;
  }
  if (progressBar) {
    progressBar.style.width = `${((currentSlide + 1) / slides.length) * 100}%`;
  }
  if (prevBtn) prevBtn.disabled = currentSlide === 0;
  if (nextBtn) nextBtn.disabled = currentSlide === slides.length - 1;
}

function changeSlide(step) {
  showSlide(currentSlide + step);
}

function goToSlide(index) {
  showSlide(index);
}

function toggleIndex() {
  const modal = document.getElementById('indexModal');
  if (modal) modal.classList.toggle('open');
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') changeSlide(1);
  if (event.key === 'ArrowLeft') changeSlide(-1);
  if (event.key === 'Escape') {
    const modal = document.getElementById('indexModal');
    if (modal?.classList.contains('open')) modal.classList.remove('open');
  }
});

renderIndex();
showSlide(0);
