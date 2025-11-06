// Applications Page JavaScript
// Note: countryOptions is defined in main.js

// Number Input Handler
class NumberInput {
  constructor(displayId, decreaseId, increaseId, min = 1, max = 99) {
    this.display = document.getElementById(displayId);
    this.decreaseBtn = document.getElementById(decreaseId);
    this.increaseBtn = document.getElementById(increaseId);
    this.min = min;
    this.max = max;
    this.value = parseInt(this.display.value) || min;
    
    this.init();
  }

  init() {
    this.updateDisplay();
    this.attachEventListeners();
  }

  attachEventListeners() {
    this.decreaseBtn.addEventListener('click', () => this.decrease());
    this.increaseBtn.addEventListener('click', () => this.increase());
  }

  decrease() {
    if (this.value > this.min) {
      this.value--;
      this.updateDisplay();
    }
  }

  increase() {
    if (this.value < this.max) {
      this.value++;
      this.updateDisplay();
    }
  }

  updateDisplay() {
    const formattedValue = String(this.value).padStart(2, '0');
    this.display.value = formattedValue;
    
    // Update button states
    this.decreaseBtn.disabled = this.value <= this.min;
    this.increaseBtn.disabled = this.value >= this.max;
  }

  getValue() {
    return this.value;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize progress indicator for step 1
  updateProgressIndicator(1);

  // Initialize custom selects
  const nationalitySelect = new CustomSelect(
    'nationality-select',
    'nationality-dropdown',
    countryOptions,
    null // No default selection
  );

  const applyingForSelect = new CustomSelect(
    'applying-for-select',
    'applying-for-dropdown',
    countryOptions,
    countryOptions.find(country => country.value === 'uk')
  );

  // Initialize number input
  const numberInput = new NumberInput(
    'number-display',
    'number-decrease',
    'number-increase',
    1,
    99
  );

  // Start Application Button Handler
  const startBtn = document.getElementById('start-application-btn');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      // Get form values
      const nationality = nationalitySelect.getValue();
      const applyingFor = applyingForSelect.getValue();
      const numberOfApplicants = numberInput.getValue();

      // Validate form
      if (!nationality) {
        alert('Please select your nationality');
        return;
      }

      if (!applyingFor) {
        alert('Please select the country you are applying for');
        return;
      }

      // Store form data (you can use localStorage or pass to next step)
      const formData = {
        nationality: nationality.value,
        nationalityLabel: nationality.label,
        applyingFor: applyingFor.value,
        applyingForLabel: applyingFor.label,
        numberOfApplicants: numberOfApplicants
      };

      // Navigate to step 2
      showStep(2, formData);
    });
  }

  // Previous button handler
  const previousBtn = document.getElementById('previous-btn');
  if (previousBtn) {
    previousBtn.addEventListener('click', () => {
      showStep(1);
    });
  }

  // Traveler card toggle handlers
  const travelerToggles = document.querySelectorAll('[data-traveler-toggle]');
  travelerToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const travelerNum = toggle.getAttribute('data-traveler-toggle');
      const card = document.querySelector(`[data-traveler="${travelerNum}"]`);
      const content = document.querySelector(`[data-traveler-content="${travelerNum}"]`);
      
      if (card && content) {
        const isCollapsed = card.classList.contains('app-traveler-collapsed');
        if (isCollapsed) {
          card.classList.remove('app-traveler-collapsed');
          content.style.display = 'block';
        } else {
          card.classList.add('app-traveler-collapsed');
          content.style.display = 'none';
        }
      }
    });
  });

  // Add traveler button handler
  const addTravelerBtn = document.getElementById('add-traveler-btn');
  if (addTravelerBtn) {
    addTravelerBtn.addEventListener('click', () => {
      addNewTraveler();
    });
  }

  // Help button handler (optional)
  const helpBtn = document.querySelector('.app-help-btn');
  if (helpBtn) {
    helpBtn.addEventListener('click', () => {
      // TODO: Implement help functionality
      console.log('Help button clicked');
    });
  }
});

// Function to show a specific step
function showStep(stepNumber, formData = null) {
  // Hide all steps
  const allSteps = document.querySelectorAll('.app-step');
  allSteps.forEach(step => {
    step.style.display = 'none';
  });

  // Show the requested step
  const targetStep = document.getElementById(`step-${stepNumber}`);
  if (targetStep) {
    targetStep.style.display = 'grid';
    
    // Initialize date dropdowns for step 2
    if (stepNumber === 2) {
      initializeDateDropdowns();
    }
  }

  // Update progress indicator
  updateProgressIndicator(stepNumber);

  // Update page title
  updatePageTitle(stepNumber);

  // Update sidebar if needed
  if (stepNumber === 2 && formData) {
    updateSidebarStep2(formData);
  }
}

// Function to update progress indicator
function updateProgressIndicator(currentStep) {
  const progressSteps = document.querySelectorAll('.app-progress-step');
  const progressBars = document.querySelectorAll('.app-progress-bar');
  
  progressSteps.forEach((step, index) => {
    const stepNum = index + 1;
    const circle = step.querySelector('.app-progress-step-circle');
    const dot = step.querySelector('.app-progress-step-dot');
    
    // Reset all steps
    step.classList.remove('app-progress-step-active');
    circle.style.borderColor = '#eff2f6';
    circle.style.backgroundColor = '#ffffff';
    if (dot) dot.style.display = 'none';
    
    if (stepNum < currentStep) {
      // Completed step
      step.classList.add('app-progress-step-active');
      circle.style.borderColor = '#3b82f6';
      circle.style.backgroundColor = '#3b82f6';
      if (dot) {
        dot.style.display = 'none';
      }
      // Add checkmark if not present
      if (!circle.querySelector('svg.checkmark')) {
        // Remove any existing SVG
        const existingSvg = circle.querySelector('svg');
        if (existingSvg && !existingSvg.classList.contains('checkmark')) {
          existingSvg.remove();
        }
        const checkmark = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        checkmark.setAttribute('width', '16');
        checkmark.setAttribute('height', '16');
        checkmark.setAttribute('viewBox', '0 0 16 16');
        checkmark.setAttribute('fill', 'none');
        checkmark.classList.add('checkmark');
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M3 8L6 11L13 4');
        path.setAttribute('stroke', '#ffffff');
        path.setAttribute('stroke-width', '2');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');
        checkmark.appendChild(path);
        circle.appendChild(checkmark);
      }
    } else if (stepNum === currentStep) {
      // Current step
      step.classList.add('app-progress-step-active');
      circle.style.borderColor = '#3b82f6';
      circle.style.backgroundColor = '#ffffff';
      if (dot) {
        dot.style.display = 'block';
      } else {
        // Add dot if not present
        const newDot = document.createElement('div');
        newDot.className = 'app-progress-step-dot';
        circle.appendChild(newDot);
      }
    } else {
      // Future step
      circle.style.borderColor = '#eff2f6';
      circle.style.backgroundColor = '#ffffff';
      if (dot) dot.style.display = 'none';
    }
  });

  // Update progress bars
  progressBars.forEach((bar, index) => {
    if (index < currentStep - 1) {
      bar.classList.add('app-progress-bar-active');
    } else {
      bar.classList.remove('app-progress-bar-active');
    }
  });
}

// Function to update page title
function updatePageTitle(stepNumber) {
  const titleElement = document.querySelector('.app-title');
  const subtitleElement = document.querySelector('.app-subtitle');
  
  if (!titleElement) return;

  if (stepNumber === 1) {
    titleElement.textContent = 'Apply now for United Kingdom ETA';
    if (subtitleElement) {
      subtitleElement.style.display = 'block';
    }
  } else if (stepNumber === 2) {
    titleElement.textContent = 'United Kingdom ETA';
    if (subtitleElement) {
      subtitleElement.style.display = 'none';
    }
  }
}

// Function to update sidebar for step 2
function updateSidebarStep2(formData) {
  const travelersCount = formData.numberOfApplicants || 1;
  const travelersText = travelersCount === 1 ? '1 Traveler' : `${travelersCount} Travelers`;
  
  const summaryTravelers = document.getElementById('summary-travelers');
  const summaryFees = document.getElementById('summary-fees');
  
  if (summaryTravelers) {
    summaryTravelers.textContent = travelersText;
  }
  if (summaryFees) {
    summaryFees.textContent = travelersText;
  }
}

// Function to create and add a new traveler card
function addNewTraveler() {
  const travelersList = document.getElementById('travelers-list');
  if (!travelersList) return;

  // Find the next traveler number
  const existingTravelers = document.querySelectorAll('.app-traveler-card');
  const nextTravelerNum = existingTravelers.length + 1;

  // Check if traveler already exists
  const existingTraveler = document.querySelector(`[data-traveler="${nextTravelerNum}"]`);
  if (existingTraveler) {
    // If it exists, just show it
    existingTraveler.classList.remove('app-traveler-collapsed');
    const content = existingTraveler.querySelector(`[data-traveler-content="${nextTravelerNum}"]`);
    if (content) {
      content.style.display = 'block';
    }
    existingTraveler.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    return;
  }

  // Create new traveler card HTML
  const travelerCard = document.createElement('div');
  travelerCard.className = 'app-traveler-card';
  travelerCard.setAttribute('data-traveler', nextTravelerNum);

  travelerCard.innerHTML = `
    <div class="app-traveler-header" data-traveler-toggle="${nextTravelerNum}">
      <h3 class="app-traveler-title">Traveler #${nextTravelerNum}</h3>
      <svg class="app-traveler-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div class="app-traveler-content" data-traveler-content="${nextTravelerNum}">
      <div class="app-form">
        <!-- First & Middle Name -->
        <div class="app-form-field">
          <label class="app-form-label">First & middle name</label>
          <input type="text" class="app-form-input" id="traveler-${nextTravelerNum}-firstname" placeholder="First & middle name">
        </div>
        
        <!-- Last Name -->
        <div class="app-form-field">
          <label class="app-form-label">Last name</label>
          <input type="text" class="app-form-input" id="traveler-${nextTravelerNum}-lastname" placeholder="Last name">
        </div>
        
        <!-- Date of Birth -->
        <div class="app-form-field">
          <label class="app-form-label">Date of birth</label>
          <div class="app-date-input">
            <div class="custom-select-wrapper">
              <button class="custom-select-button app-date-select" id="traveler-${nextTravelerNum}-day" data-placeholder="Day">
                <span class="select-button-content">
                  <span>Day</span>
                </span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <div class="custom-select-dropdown" id="traveler-${nextTravelerNum}-day-dropdown" style="display: none;"></div>
            </div>
            <div class="custom-select-wrapper">
              <button class="custom-select-button app-date-select" id="traveler-${nextTravelerNum}-month" data-placeholder="Month">
                <span class="select-button-content">
                  <span>Month</span>
                </span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <div class="custom-select-dropdown" id="traveler-${nextTravelerNum}-month-dropdown" style="display: none;"></div>
            </div>
            <div class="custom-select-wrapper">
              <button class="custom-select-button app-date-select" id="traveler-${nextTravelerNum}-year" data-placeholder="Years">
                <span class="select-button-content">
                  <span>Years</span>
                </span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <div class="custom-select-dropdown" id="traveler-${nextTravelerNum}-year-dropdown" style="display: none;"></div>
            </div>
          </div>
        </div>
        
        <!-- Email Address -->
        <div class="app-form-field">
          <label class="app-form-label">Email address</label>
          <input type="email" class="app-form-input" id="traveler-${nextTravelerNum}-email" placeholder="Email address">
          <p class="app-form-hint">Your approved United Kingdom ETA will be sent to this email address.</p>
        </div>
        
        <!-- Marketing Opt-in -->
        <div class="app-form-checkbox">
          <input type="checkbox" id="traveler-${nextTravelerNum}-marketing" class="app-checkbox-input">
          <label for="traveler-${nextTravelerNum}-marketing" class="app-checkbox-label">
            I want to receive visaelo updates, product & personalized offers. I can opt out anytime. 
            <a href="#" class="app-link">Terms and Privacy Policy apply</a>.
          </label>
        </div>
      </div>
    </div>
  `;

  // Append to travelers list
  travelersList.appendChild(travelerCard);

  // Initialize date dropdowns for the new traveler
  initializeDateDropdownsForTraveler(nextTravelerNum);

  // Attach toggle event listener
  const toggle = travelerCard.querySelector(`[data-traveler-toggle="${nextTravelerNum}"]`);
  if (toggle) {
    toggle.addEventListener('click', () => {
      const card = document.querySelector(`[data-traveler="${nextTravelerNum}"]`);
      const content = document.querySelector(`[data-traveler-content="${nextTravelerNum}"]`);
      
      if (card && content) {
        const isCollapsed = card.classList.contains('app-traveler-collapsed');
        if (isCollapsed) {
          card.classList.remove('app-traveler-collapsed');
          content.style.display = 'block';
        } else {
          card.classList.add('app-traveler-collapsed');
          content.style.display = 'none';
        }
      }
    });
  }

  // Scroll to the new traveler
  travelerCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Function to initialize date dropdowns for a specific traveler
function initializeDateDropdownsForTraveler(travelerNum) {
  // Generate day options (1-31)
  const dayOptions = Array.from({ length: 31 }, (_, i) => ({
    value: String(i + 1).padStart(2, '0'),
    label: String(i + 1).padStart(2, '0')
  }));

  // Generate month options
  const monthOptions = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];

  // Generate year options (current year - 100 to current year)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 101 }, (_, i) => {
    const year = currentYear - i;
    return { value: String(year), label: String(year) };
  });

  // Day select
  const dayButton = document.getElementById(`traveler-${travelerNum}-day`);
  const dayDropdown = document.getElementById(`traveler-${travelerNum}-day-dropdown`);
  if (dayButton && dayDropdown && !dayButton.dataset.initialized) {
    new CustomSelect(`traveler-${travelerNum}-day`, `traveler-${travelerNum}-day-dropdown`, dayOptions, null);
    dayButton.dataset.initialized = 'true';
  }

  // Month select
  const monthButton = document.getElementById(`traveler-${travelerNum}-month`);
  const monthDropdown = document.getElementById(`traveler-${travelerNum}-month-dropdown`);
  if (monthButton && monthDropdown && !monthButton.dataset.initialized) {
    new CustomSelect(`traveler-${travelerNum}-month`, `traveler-${travelerNum}-month-dropdown`, monthOptions, null);
    monthButton.dataset.initialized = 'true';
  }

  // Year select
  const yearButton = document.getElementById(`traveler-${travelerNum}-year`);
  const yearDropdown = document.getElementById(`traveler-${travelerNum}-year-dropdown`);
  if (yearButton && yearDropdown && !yearButton.dataset.initialized) {
    new CustomSelect(`traveler-${travelerNum}-year`, `traveler-${travelerNum}-year-dropdown`, yearOptions, null);
    yearButton.dataset.initialized = 'true';
  }
}

// Function to initialize date dropdowns
function initializeDateDropdowns() {
  // Generate day options (1-31)
  const dayOptions = Array.from({ length: 31 }, (_, i) => ({
    value: String(i + 1).padStart(2, '0'),
    label: String(i + 1).padStart(2, '0')
  }));

  // Generate month options
  const monthOptions = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];

  // Generate year options (current year - 100 to current year)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 101 }, (_, i) => {
    const year = currentYear - i;
    return { value: String(year), label: String(year) };
  });

  // Initialize date selects for all travelers
  const travelers = document.querySelectorAll('.app-traveler-card');
  travelers.forEach((traveler) => {
    const travelerNum = traveler.getAttribute('data-traveler');
    if (travelerNum) {
      initializeDateDropdownsForTraveler(travelerNum);
    }
  });
}

