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
    // Remove existing listeners if any
    const prevHandler = () => this.prev();
    const nextHandler = () => this.next();
    
    this.prevButton.removeEventListener('click', prevHandler);
    this.nextButton.removeEventListener('click', nextHandler);
    
    this.prevButton.addEventListener('click', prevHandler);
    this.nextButton.addEventListener('click', nextHandler);
    
    // Store handlers for cleanup
    this._prevHandler = prevHandler;
    this._nextHandler = nextHandler;
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
    
    // For mobile (1 card per view), use simple 100% translation
    if (this.cardsPerView === 1) {
      const translateX = -(this.currentIndex * 100);
      this.track.style.transform = `translateX(${translateX}%)`;
    } else {
      // For desktop/tablet with multiple cards
      const slideWidth = 100 / this.cardsPerView;
      const gap = 24;
      const translateX = -(this.currentIndex * (slideWidth + (gap / (this.testimonials.length / this.cardsPerView))));
      this.track.style.transform = `translateX(calc(${translateX}% + ${this.currentIndex * gap}px))`;
    }

    // Update button states (original buttons)
    this.prevButton.disabled = this.currentIndex === 0;
    this.nextButton.disabled = this.currentIndex >= maxIndex;

    // Update cloned mobile buttons if they exist
    const mobilePrevButton = document.getElementById('testimonials-prev-mobile');
    const mobileNextButton = document.getElementById('testimonials-next-mobile');
    if (mobilePrevButton) {
      mobilePrevButton.disabled = this.currentIndex === 0;
    }
    if (mobileNextButton) {
      mobileNextButton.disabled = this.currentIndex >= maxIndex;
    }

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

// Comparison Carousel (Mobile Only)
class ComparisonCarousel {
  constructor() {
    this.track = document.getElementById('comparison-track');
    this.prevButton = document.getElementById('comparison-prev');
    this.nextButton = document.getElementById('comparison-next');
    this.mobileTitle = document.querySelector('.comparison-title-mobile');
    this.columns = document.querySelectorAll('.comparison-column');
    this.currentIndex = 0;
    
    // Extract titles from desktop titles
    this.titles = Array.from(this.columns).map(column => {
      const titleElement = column.querySelector('.comparison-title-desktop');
      if (titleElement) {
        return titleElement.textContent.trim();
      }
      return '';
    });

    if (!this.track || !this.prevButton || !this.nextButton) {
      return; // Elements don't exist, skip initialization
    }

    this.init();
    this.updateResponsive();
    window.addEventListener('resize', () => this.updateResponsive());
  }

  init() {
    this.attachEventListeners();
    this.updateCarousel();
    // Set initial title
    if (this.mobileTitle && this.titles[0]) {
      this.mobileTitle.textContent = this.titles[0];
    }
  }

  updateResponsive() {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      this.updateCarousel();
    } else {
      // Reset on desktop
      if (this.track) {
        this.track.style.transform = 'none';
      }
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
    if (this.currentIndex < this.columns.length - 1) {
      this.currentIndex++;
      this.updateCarousel();
    }
  }

  updateCarousel() {
    const isMobile = window.innerWidth <= 768;
    
    if (!isMobile) {
      return; // Don't update carousel on desktop
    }

    const translateX = -(this.currentIndex * 100);
    if (this.track) {
      this.track.style.transform = `translateX(${translateX}%)`;
    }

    // Update button states
    if (this.prevButton) {
      this.prevButton.disabled = this.currentIndex === 0;
    }
    if (this.nextButton) {
      this.nextButton.disabled = this.currentIndex >= this.columns.length - 1;
    }

    // Update mobile title
    if (this.mobileTitle && this.titles[this.currentIndex]) {
      this.mobileTitle.textContent = this.titles[this.currentIndex];
    }
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

    // Move navigation buttons around pagination on mobile
    const moveButtonsForMobile = () => {
      const navigation = document.querySelector('.testimonials-section-navigation');
      const pagination = document.getElementById('testimonials-pagination');
      const prevButton = document.getElementById('testimonials-prev');
      const nextButton = document.getElementById('testimonials-next');
      
      if (navigation && pagination && prevButton && nextButton) {
        const isMobile = window.innerWidth <= 768;
        const wrapper = document.querySelector('.testimonials-pagination-wrapper');
        
        if (isMobile) {
          // On mobile: create wrapper and move buttons around pagination
          if (!wrapper) {
            // Create wrapper div
            const newWrapper = document.createElement('div');
            newWrapper.className = 'testimonials-pagination-wrapper';
            newWrapper.style.display = 'flex';
            newWrapper.style.alignItems = 'center';
            newWrapper.style.justifyContent = 'center';
            
            // Clone buttons
            const prevClone = prevButton.cloneNode(true);
            const nextClone = nextButton.cloneNode(true);
            prevClone.id = 'testimonials-prev-mobile';
            nextClone.id = 'testimonials-next-mobile';
            prevClone.className = 'testimonials-nav-button testimonials-nav-button-prev';
            nextClone.className = 'testimonials-nav-button testimonials-nav-button-next';
            
            // Remove any existing aria-labels that might conflict
            prevClone.removeAttribute('aria-label');
            nextClone.removeAttribute('aria-label');
            
            // Wrap pagination and insert buttons
            pagination.parentNode.insertBefore(newWrapper, pagination);
            newWrapper.appendChild(prevClone);
            newWrapper.appendChild(pagination);
            newWrapper.appendChild(nextClone);
            
            // Attach event listeners to cloned buttons with proper binding
            prevClone.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              carousel.prev();
            });
            nextClone.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              carousel.next();
            });
            
            // Hide original buttons in header
            navigation.style.display = 'none';
          }
        } else {
          // On desktop: restore original layout
          if (wrapper) {
            // Move pagination back to original location
            const section = document.querySelector('.testimonials-section');
            if (section && pagination) {
              section.appendChild(pagination);
            }
            wrapper.remove();
            if (navigation) navigation.style.display = 'flex';
          }
        }
      }
    };

    // Initial call
    moveButtonsForMobile();

    // Handle responsive updates
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        carousel.updateResponsiveCardsPerView();
        moveButtonsForMobile();
      }, 250);
    });
  }

  // Initialize comparison carousel (only if element exists)
  const comparisonTrack = document.getElementById('comparison-track');
  if (comparisonTrack) {
    const comparisonCarousel = new ComparisonCarousel();
  }
});

