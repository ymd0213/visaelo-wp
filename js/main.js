// Country options data
const countryOptions = [
  { value: 'us', label: 'United States', flag: 'https://flagcdn.com/w20/us.png' },
  { value: 'uk', label: 'United Kingdom', flag: 'https://flagcdn.com/w20/gb.png' },
  { value: 'ca', label: 'Canada', flag: 'https://flagcdn.com/w20/ca.png' },
  { value: 'au', label: 'Australia', flag: 'https://flagcdn.com/w20/au.png' },
  { value: 'de', label: 'Germany', flag: 'https://flagcdn.com/w20/de.png' },
  { value: 'fr', label: 'France', flag: 'https://flagcdn.com/w20/fr.png' },
  { value: 'it', label: 'Italy', flag: 'https://flagcdn.com/w20/it.png' },
  { value: 'es', label: 'Spain', flag: 'https://flagcdn.com/w20/es.png' },
  { value: 'jp', label: 'Japan', flag: 'https://flagcdn.com/w20/jp.png' },
  { value: 'cn', label: 'China', flag: 'https://flagcdn.com/w20/cn.png' },
];

// Custom Select Component
class CustomSelect {
  constructor(buttonId, dropdownId, options, defaultOption = null) {
    this.button = document.getElementById(buttonId);
    this.dropdown = document.getElementById(dropdownId);
    this.options = options;
    this.selectedOption = defaultOption || options[0];
    
    this.init();
  }

  init() {
    this.renderButton();
    this.renderDropdown();
    this.attachEventListeners();
  }

  renderButton() {
    if (this.selectedOption) {
      const buttonContent = this.button.querySelector('.select-button-content');
      buttonContent.innerHTML = `
        <img src="${this.selectedOption.flag}" alt="" class="select-flag">
        <span>${this.selectedOption.label}</span>
      `;
    }
  }

  renderDropdown() {
    this.dropdown.innerHTML = '';
    this.options.forEach(option => {
      const optionElement = document.createElement('div');
      optionElement.className = 'custom-select-option';
      if (this.selectedOption && option.value === this.selectedOption.value) {
        optionElement.classList.add('selected');
      }
      optionElement.innerHTML = `
        <img src="${option.flag}" alt="" class="select-flag">
        <span>${option.label}</span>
      `;
      optionElement.addEventListener('click', () => this.selectOption(option));
      this.dropdown.appendChild(optionElement);
    });
  }

  selectOption(option) {
    this.selectedOption = option;
    this.renderButton();
    this.renderDropdown();
    this.closeDropdown();
  }

  openDropdown() {
    this.dropdown.style.display = 'block';
    // Close other dropdowns
    document.querySelectorAll('.custom-select-dropdown').forEach(dropdown => {
      if (dropdown !== this.dropdown) {
        dropdown.style.display = 'none';
      }
    });
  }

  closeDropdown() {
    this.dropdown.style.display = 'none';
  }

  attachEventListeners() {
    this.button.addEventListener('click', (e) => {
      e.stopPropagation();
      if (this.dropdown.style.display === 'none' || !this.dropdown.style.display) {
        this.openDropdown();
      } else {
        this.closeDropdown();
      }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.button.contains(e.target) && !this.dropdown.contains(e.target)) {
        this.closeDropdown();
      }
    });
  }

  getValue() {
    return this.selectedOption;
  }
}

// Testimonials Carousel
class TestimonialsCarousel {
  constructor() {
    this.track = document.getElementById('testimonials-track');
    this.prevButton = document.getElementById('testimonials-prev');
    this.nextButton = document.getElementById('testimonials-next');
    this.pagination = document.getElementById('testimonials-pagination');
    this.currentIndex = 0;
    this.cardsPerView = 4;
    this.testimonials = document.querySelectorAll('.testimonials-carousel-slide');
    this.totalSlides = Math.max(1, this.testimonials.length - this.cardsPerView + 1);

    this.init();
    this.updateResponsiveCardsPerView();
    window.addEventListener('resize', () => this.updateResponsiveCardsPerView());
  }

  init() {
    this.renderPagination();
    this.attachEventListeners();
    this.updateCarousel();
  }

  updateResponsiveCardsPerView() {
    const width = window.innerWidth;
    if (width <= 480) {
      this.cardsPerView = 1;
    } else if (width <= 768) {
      this.cardsPerView = 2;
    } else if (width <= 1024) {
      this.cardsPerView = 3;
    } else {
      this.cardsPerView = 4;
    }
    this.totalSlides = Math.max(1, this.testimonials.length - this.cardsPerView + 1);
    this.renderPagination();
    this.updateCarousel();
  }

  renderPagination() {
    this.pagination.innerHTML = '';
    for (let i = 0; i < this.totalSlides; i++) {
      const dot = document.createElement('button');
      dot.className = `testimonials-pagination-dot ${i === this.currentIndex ? 'testimonials-pagination-dot-active' : ''}`;
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => this.goToSlide(i));
      this.pagination.appendChild(dot);
    }
  }

  attachEventListeners() {
    this.prevButton.addEventListener('click', () => this.prev());
    this.nextButton.addEventListener('click', () => this.next());
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateCarousel();
    }
  }

  next() {
    const maxIndex = Math.max(0, this.testimonials.length - this.cardsPerView);
    if (this.currentIndex < maxIndex) {
      this.currentIndex++;
      this.updateCarousel();
    }
  }

  goToSlide(index) {
    this.currentIndex = index;
    this.updateCarousel();
  }

  updateCarousel() {
    const maxIndex = Math.max(0, this.testimonials.length - this.cardsPerView);
    this.currentIndex = Math.min(this.currentIndex, maxIndex);
    
    const slideWidth = 100 / this.cardsPerView;
    const gap = 24;
    const translateX = -(this.currentIndex * (slideWidth + (gap / (this.testimonials.length / this.cardsPerView))));
    
    this.track.style.transform = `translateX(calc(${translateX}% + ${this.currentIndex * gap}px))`;

    // Update button states
    this.prevButton.disabled = this.currentIndex === 0;
    this.nextButton.disabled = this.currentIndex >= maxIndex;

    // Update pagination
    const dots = this.pagination.querySelectorAll('.testimonials-pagination-dot');
    dots.forEach((dot, index) => {
      if (index === this.currentIndex) {
        dot.classList.add('testimonials-pagination-dot-active');
      } else {
        dot.classList.remove('testimonials-pagination-dot-active');
      }
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize custom selects
  const passportSelect = new CustomSelect(
    'passport-select',
    'passport-dropdown',
    countryOptions,
    countryOptions[0] // Default to United States
  );

  const destinationSelect = new CustomSelect(
    'destination-select',
    'destination-dropdown',
    countryOptions,
    null // No default selection
  );

  // Initialize testimonials carousel
  const carousel = new TestimonialsCarousel();

  // Handle responsive updates
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      carousel.updateResponsiveCardsPerView();
    }, 250);
  });
});

