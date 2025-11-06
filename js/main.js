// Country options data (extended list)
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
  { value: 'in', label: 'India', flag: 'https://flagcdn.com/w20/in.png' },
  { value: 'br', label: 'Brazil', flag: 'https://flagcdn.com/w20/br.png' },
  { value: 'mx', label: 'Mexico', flag: 'https://flagcdn.com/w20/mx.png' },
  { value: 'nl', label: 'Netherlands', flag: 'https://flagcdn.com/w20/nl.png' },
  { value: 'se', label: 'Sweden', flag: 'https://flagcdn.com/w20/se.png' },
];

// Custom Select Component
class CustomSelect {
  constructor(buttonId, dropdownId, options, defaultOption = null) {
    this.button = document.getElementById(buttonId);
    this.dropdown = document.getElementById(dropdownId);
    this.options = options;
    this.selectedOption = defaultOption !== null ? defaultOption : null;
    
    // Check if elements exist
    if (!this.button || !this.dropdown) {
      console.error(`CustomSelect: Elements not found. Button: ${buttonId}, Dropdown: ${dropdownId}`);
      return;
    }
    
    this.init();
  }

  init() {
    // Ensure dropdown is closed initially
    if (this.dropdown) {
      this.dropdown.style.display = 'none';
    }
    this.renderButton();
    this.renderDropdown();
    this.attachEventListeners();
  }

  renderButton() {
    const buttonContent = this.button.querySelector('.select-button-content');
    if (this.selectedOption) {
      if (this.selectedOption.flag) {
        buttonContent.innerHTML = `
          <img src="${this.selectedOption.flag}" alt="" class="select-flag">
          <span>${this.selectedOption.label}</span>
        `;
      } else {
        buttonContent.innerHTML = `
          <span>${this.selectedOption.label}</span>
        `;
      }
    } else {
      const defaultText = this.button.dataset.placeholder || 'Select';
      buttonContent.innerHTML = `
        <span>${defaultText}</span>
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
      if (option.flag) {
        optionElement.innerHTML = `
          <img src="${option.flag}" alt="" class="select-flag">
          <span>${option.label}</span>
        `;
      } else {
        optionElement.innerHTML = `
          <span>${option.label}</span>
        `;
      }
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
    if (!this.dropdown) return;
    this.dropdown.style.display = 'block';
    this.button.setAttribute('aria-expanded', 'true');
    // Close other dropdowns
    document.querySelectorAll('.custom-select-dropdown').forEach(dropdown => {
      if (dropdown !== this.dropdown) {
        dropdown.style.display = 'none';
        const otherButton = dropdown.closest('.custom-select-wrapper')?.querySelector('.custom-select-button');
        if (otherButton) {
          otherButton.setAttribute('aria-expanded', 'false');
        }
      }
    });
  }

  closeDropdown() {
    if (!this.dropdown) return;
    this.dropdown.style.display = 'none';
    if (this.button) {
      this.button.setAttribute('aria-expanded', 'false');
    }
  }

  attachEventListeners() {
    // Toggle dropdown on button click
    this.button.addEventListener('click', (e) => {
      e.stopPropagation();
      
      // Simple toggle - check current state
      const isOpen = this.dropdown.style.display === 'block';
      
      if (isOpen) {
        this.closeDropdown();
      } else {
        this.openDropdown();
      }
    });

    // Close dropdown when clicking outside
    const handleOutsideClick = (e) => {
      if (!this.button.contains(e.target) && !this.dropdown.contains(e.target)) {
        this.closeDropdown();
      }
    };
    
    document.addEventListener('click', handleOutsideClick);
    
    // Store handler for potential cleanup
    this._outsideClickHandler = handleOutsideClick;
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
  // Initialize custom selects (only if elements exist)
  const passportButton = document.getElementById('passport-select');
  const destinationButton = document.getElementById('destination-select');
  
  if (passportButton) {
    const passportSelect = new CustomSelect(
      'passport-select',
      'passport-dropdown',
      countryOptions,
      countryOptions[0] // Default to United States
    );
  }

  if (destinationButton) {
    const destinationSelect = new CustomSelect(
      'destination-select',
      'destination-dropdown',
      countryOptions,
      null // No default selection
    );
  }

  // Initialize testimonials carousel (only if element exists)
  const testimonialsTrack = document.getElementById('testimonials-track');
  if (testimonialsTrack) {
    const carousel = new TestimonialsCarousel();

    // Handle responsive updates
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        carousel.updateResponsiveCardsPerView();
      }, 250);
    });
  }
});

