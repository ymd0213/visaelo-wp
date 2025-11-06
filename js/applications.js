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

  // Step 2: Continue to passport details
  const saveContinueBtn = document.getElementById('save-continue-btn');
  if (saveContinueBtn) {
    saveContinueBtn.addEventListener('click', () => {
      // Get traveler count from step 2
      const travelers = document.querySelectorAll('.app-traveler-card');
      const travelerCount = travelers.length;
      showStep('2b', { numberOfApplicants: travelerCount });
    });
  }

  // Previous button handler (step 2)
  const previousBtn = document.getElementById('previous-btn');
  if (previousBtn) {
    previousBtn.addEventListener('click', () => {
      showStep(1);
    });
  }

  // Step 2b: Previous button (go back to personal details)
  const passportPreviousBtn = document.getElementById('passport-previous-btn');
  if (passportPreviousBtn) {
    passportPreviousBtn.addEventListener('click', () => {
      const travelers = document.querySelectorAll('.app-traveler-card');
      const travelerCount = travelers.length;
      showStep(2, { numberOfApplicants: travelerCount });
    });
  }

  // Step 2b: Continue button (go to step 3)
  const passportContinueBtn = document.getElementById('passport-continue-btn');
  if (passportContinueBtn) {
    passportContinueBtn.addEventListener('click', () => {
      // Get traveler count from passport step
      const passportTravelers = document.querySelectorAll('[data-passport-traveler]');
      const travelerCount = passportTravelers.length;
      showStep(3, { numberOfApplicants: travelerCount });
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

  // Step 3: Processing time selection handlers
  const processingOptions = document.querySelectorAll('.app-processing-option');
  processingOptions.forEach(option => {
    option.addEventListener('click', () => {
      const processingType = option.getAttribute('data-processing');
      selectProcessingTime(processingType);
    });
  });

  // Step 3: Radio button change handlers
  const processingRadios = document.querySelectorAll('input[name="processing-time"]');
  processingRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      const processingType = radio.value;
      selectProcessingTime(processingType);
    });
  });

  // Step 3: Previous button (go back to step 2b)
  const checkoutPreviousBtn = document.getElementById('checkout-previous-btn');
  if (checkoutPreviousBtn) {
    checkoutPreviousBtn.addEventListener('click', () => {
      const passportTravelers = document.querySelectorAll('[data-passport-traveler]');
      const travelerCount = passportTravelers.length;
      showStep('2b', { numberOfApplicants: travelerCount });
    });
  }

  // Step 3: Continue button (final step - could submit form or go to payment)
  const checkoutContinueBtn = document.getElementById('checkout-continue-btn');
  if (checkoutContinueBtn) {
    checkoutContinueBtn.addEventListener('click', () => {
      // TODO: Submit form or navigate to payment page
      console.log('Checkout complete - ready to submit');
      alert('Checkout complete! This would normally proceed to payment.');
    });
  }
});

// Store traveler data globally
let travelerData = {
  count: 1,
  travelers: []
};

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
      // Reset passport details initialization when going back to step 2
      const passportTravelersList = document.getElementById('passport-travelers-list');
      if (passportTravelersList) {
        passportTravelersList.dataset.initialized = 'false';
      }
    }
    
    // Initialize passport details for step 2b
    if (stepNumber === '2b') {
      // Reset initialization flag to allow re-initialization
      const passportTravelersList = document.getElementById('passport-travelers-list');
      if (passportTravelersList) {
        passportTravelersList.dataset.initialized = 'false';
      }
      initializePassportDetails(formData);
    }
    
    // Initialize checkout for step 3
    if (stepNumber === 3) {
      initializeCheckout(formData);
    }
  }

  // Update progress indicator
  updateProgressIndicator(stepNumber);

  // Update page title
  updatePageTitle(stepNumber);

  // Update sidebar if needed
  if (stepNumber === 2 && formData) {
    updateSidebarStep2(formData);
    // Store traveler count
    travelerData.count = formData.numberOfApplicants || 1;
  } else if (stepNumber === '2b') {
    updateSidebarPassport(formData);
  } else if (stepNumber === 3) {
    updateSidebarCheckout(formData);
  }
}

// Function to update progress indicator
function updateProgressIndicator(currentStep) {
  const progressSteps = document.querySelectorAll('.app-progress-step');
  const progressBars = document.querySelectorAll('.app-progress-bar');
  
  // Convert step number to numeric value for comparison
  let stepNum = currentStep;
  if (currentStep === '2b') {
    stepNum = 2.5; // Halfway between step 2 and step 3
  } else {
    stepNum = parseInt(currentStep) || 1;
  }
  
  progressSteps.forEach((step, index) => {
    const stepIndex = index + 1;
    const circle = step.querySelector('.app-progress-step-circle');
    const dot = step.querySelector('.app-progress-step-dot');
    
    // Reset all steps
    step.classList.remove('app-progress-step-active');
    circle.style.borderColor = '#eff2f6';
    circle.style.backgroundColor = '#ffffff';
    if (dot) dot.style.display = 'none';
    
    if (stepIndex < stepNum) {
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
    } else if (stepIndex === stepNum) {
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
    // Bar between step 2 and step 3 (index 1)
    if (currentStep === '2b' && index === 1) {
      // Half-filled progress bar
      bar.classList.add('app-progress-bar-active');
      bar.style.background = 'linear-gradient(to right, #3b82f6 50%, #eff2f6 50%)';
    } else if (index < stepNum - 1) {
      // Fully filled progress bar
      bar.classList.add('app-progress-bar-active');
      bar.style.background = '#3b82f6';
    } else {
      // Empty progress bar
      bar.classList.remove('app-progress-bar-active');
      bar.style.background = '#eff2f6';
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
  } else if (stepNumber === 2 || stepNumber === '2b' || stepNumber === 3) {
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

// Function to check if a traveler has valid input
function isValidTraveler(travelerNum) {
  const firstName = document.getElementById(`traveler-${travelerNum}-firstname`)?.value?.trim() || '';
  const lastName = document.getElementById(`traveler-${travelerNum}-lastname`)?.value?.trim() || '';
  const email = document.getElementById(`traveler-${travelerNum}-email`)?.value?.trim() || '';
  
  // Check if traveler has at least first name and last name
  // Email is optional but if provided should be valid format
  const hasValidName = firstName.length > 0 && lastName.length > 0;
  const hasValidEmail = email.length === 0 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
  return hasValidName && hasValidEmail;
}

// Function to initialize passport details step
function initializePassportDetails(formData) {
  const passportTravelersList = document.getElementById('passport-travelers-list');
  if (!passportTravelersList) return;

  // Check if already initialized to prevent duplicates
  if (passportTravelersList.dataset.initialized === 'true') {
    return;
  }

  // Clear existing content
  passportTravelersList.innerHTML = '';

  // Get actual traveler cards from step 2 (not from formData count)
  const step2TravelerCards = document.querySelectorAll('#step-2 .app-traveler-card');
  
  // Filter only valid travelers (those with valid input values)
  const validTravelers = [];
  let validTravelerIndex = 1;
  
  step2TravelerCards.forEach((card, index) => {
    const travelerNum = index + 1;
    
    // Check if this traveler has valid input
    if (isValidTraveler(travelerNum)) {
      const firstName = document.getElementById(`traveler-${travelerNum}-firstname`)?.value?.trim() || '';
      const lastName = document.getElementById(`traveler-${travelerNum}-lastname`)?.value?.trim() || '';
      const name = `${firstName} ${lastName}`.trim() || `Traveler #${validTravelerIndex}`;
      
      validTravelers.push({ 
        num: validTravelerIndex, 
        originalNum: travelerNum,
        name: name 
      });
      validTravelerIndex++;
    }
  });

  // If no valid travelers, show error or return
  if (validTravelers.length === 0) {
    alert('Please fill in valid traveler information (first name, last name, and valid email if provided) before continuing.');
    // Go back to step 2
    const travelers = document.querySelectorAll('.app-traveler-card');
    const travelerCount = travelers.length;
    showStep(2, { numberOfApplicants: travelerCount });
    return;
  }

  // Create passport detail cards for each valid traveler
  validTravelers.forEach((traveler, index) => {
    const isFirst = index === 0;
    const travelerCard = createPassportDetailCard(traveler.num, traveler.name, isFirst);
    passportTravelersList.appendChild(travelerCard);
  });

  // Initialize nationality selects for valid travelers
  validTravelers.forEach(traveler => {
    initializePassportDropdowns(traveler.num);
  });

  // Attach toggle event listeners
  attachPassportToggleListeners();

  // Mark as initialized
  passportTravelersList.dataset.initialized = 'true';
}

// Function to create passport detail card
function createPassportDetailCard(travelerNum, travelerName, isExpanded = true) {
  const card = document.createElement('div');
  card.className = `app-traveler-card ${isExpanded ? '' : 'app-traveler-collapsed'}`;
  card.setAttribute('data-passport-traveler', travelerNum);

  card.innerHTML = `
    <div class="app-traveler-header" data-passport-toggle="${travelerNum}">
      <h3 class="app-traveler-title">Traveler #${travelerNum} ${travelerName ? `(${travelerName})` : ''}</h3>
      <svg class="app-traveler-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div class="app-traveler-content" data-passport-content="${travelerNum}" style="${isExpanded ? 'display: block;' : 'display: none;'}">
      <div class="app-form">
        <!-- Nationality on passport -->
        <div class="app-form-field">
          <label class="app-form-label">Nationality on passport</label>
          <div class="custom-select-wrapper">
            <button class="custom-select-button" id="passport-${travelerNum}-nationality">
              <span class="select-button-content">
                <span>Select country</span>
              </span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <div class="custom-select-dropdown" id="passport-${travelerNum}-nationality-dropdown" style="display: none;"></div>
          </div>
          <p class="app-form-hint">UK residents do not need to apply for a UK ETA.</p>
        </div>
        
        <!-- Passport number -->
        <div class="app-form-field">
          <label class="app-form-label">Passport number</label>
          <input type="text" class="app-form-input" id="passport-${travelerNum}-number" placeholder="Passport number">
        </div>
        
        <!-- Passport expiration date -->
        <div class="app-form-field">
          <label class="app-form-label">Passport expiration date</label>
          <div class="app-date-input">
            <div class="custom-select-wrapper">
              <button class="custom-select-button app-date-select" id="passport-${travelerNum}-exp-day" data-placeholder="Day">
                <span class="select-button-content">
                  <span>Day</span>
                </span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <div class="custom-select-dropdown" id="passport-${travelerNum}-exp-day-dropdown" style="display: none;"></div>
            </div>
            <div class="custom-select-wrapper">
              <button class="custom-select-button app-date-select" id="passport-${travelerNum}-exp-month" data-placeholder="Month">
                <span class="select-button-content">
                  <span>Month</span>
                </span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <div class="custom-select-dropdown" id="passport-${travelerNum}-exp-month-dropdown" style="display: none;"></div>
            </div>
            <div class="custom-select-wrapper">
              <button class="custom-select-button app-date-select" id="passport-${travelerNum}-exp-year" data-placeholder="Years">
                <span class="select-button-content">
                  <span>Years</span>
                </span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <div class="custom-select-dropdown" id="passport-${travelerNum}-exp-year-dropdown" style="display: none;"></div>
            </div>
          </div>
        </div>
        
        <!-- Do you have another nationality? -->
        <div class="app-form-field">
          <label class="app-form-label">Do you have another nationality?</label>
          <div class="app-radio-group">
            <button class="app-radio-btn" data-passport-nationality="${travelerNum}" data-value="yes">
              <span>Yes</span>
            </button>
            <button class="app-radio-btn app-radio-btn-active" data-passport-nationality="${travelerNum}" data-value="no">
              <span>No</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  return card;
}

// Function to initialize passport dropdowns
function initializePassportDropdowns(travelerNum) {
  // Nationality select
  const nationalityButton = document.getElementById(`passport-${travelerNum}-nationality`);
  const nationalityDropdown = document.getElementById(`passport-${travelerNum}-nationality-dropdown`);
  if (nationalityButton && nationalityDropdown && !nationalityButton.dataset.initialized) {
    // Default to United States
    const defaultCountry = countryOptions.find(country => country.value === 'us');
    new CustomSelect(`passport-${travelerNum}-nationality`, `passport-${travelerNum}-nationality-dropdown`, countryOptions, defaultCountry);
    nationalityButton.dataset.initialized = 'true';
  }

  // Expiration date dropdowns - use a helper function
  const dayOptions = Array.from({ length: 31 }, (_, i) => ({
    value: String(i + 1).padStart(2, '0'),
    label: String(i + 1).padStart(2, '0')
  }));

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

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 21 }, (_, i) => {
    const year = currentYear + i;
    return { value: String(year), label: String(year) };
  });

  const baseId = `passport-${travelerNum}-exp`;

  // Day select
  const dayButton = document.getElementById(`${baseId}-day`);
  const dayDropdown = document.getElementById(`${baseId}-day-dropdown`);
  if (dayButton && dayDropdown && !dayButton.dataset.initialized) {
    new CustomSelect(`${baseId}-day`, `${baseId}-day-dropdown`, dayOptions, null);
    dayButton.dataset.initialized = 'true';
  }

  // Month select
  const monthButton = document.getElementById(`${baseId}-month`);
  const monthDropdown = document.getElementById(`${baseId}-month-dropdown`);
  if (monthButton && monthDropdown && !monthButton.dataset.initialized) {
    new CustomSelect(`${baseId}-month`, `${baseId}-month-dropdown`, monthOptions, null);
    monthButton.dataset.initialized = 'true';
  }

  // Year select
  const yearButton = document.getElementById(`${baseId}-year`);
  const yearDropdown = document.getElementById(`${baseId}-year-dropdown`);
  if (yearButton && yearDropdown && !yearButton.dataset.initialized) {
    new CustomSelect(`${baseId}-year`, `${baseId}-year-dropdown`, yearOptions, null);
    yearButton.dataset.initialized = 'true';
  }
}

// Function to attach passport toggle listeners
function attachPassportToggleListeners() {
  const toggles = document.querySelectorAll('[data-passport-toggle]');
  toggles.forEach(toggle => {
    const travelerNum = toggle.getAttribute('data-passport-toggle');
    toggle.addEventListener('click', () => {
      const card = document.querySelector(`[data-passport-traveler="${travelerNum}"]`);
      const content = document.querySelector(`[data-passport-content="${travelerNum}"]`);
      
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

  // Attach nationality radio button listeners
  const nationalityBtns = document.querySelectorAll('[data-passport-nationality]');
  nationalityBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const travelerNum = btn.getAttribute('data-passport-nationality');
      const value = btn.getAttribute('data-value');
      
      // Remove active class from all buttons for this traveler
      document.querySelectorAll(`[data-passport-nationality="${travelerNum}"]`).forEach(b => {
        b.classList.remove('app-radio-btn-active');
      });
      
      // Add active class to clicked button
      btn.classList.add('app-radio-btn-active');
    });
  });
}

// Function to update sidebar for passport step
function updateSidebarPassport(formData) {
  const travelerCount = formData?.numberOfApplicants || travelerData.count || 1;
  const travelersText = travelerCount === 1 ? '1 Traveler' : `${travelerCount} Travelers`;
  
  const summaryTravelers = document.getElementById('passport-summary-travelers');
  if (summaryTravelers) {
    summaryTravelers.textContent = travelersText;
  }
}

// Processing time pricing data
// Government fees: $22.66 per traveler
const processingPricing = {
  standard: {
    label: 'Standard, 24 hour',
    price: 90.00, // $112.65 total - $22.66 government fees
    total: 112.65
  },
  rush: {
    label: 'Rush, 4 hour',
    price: 140.00, // $162.65 total - $22.66 government fees
    total: 162.65
  },
  'super-rush': {
    label: 'Super Rush, 1 hour',
    price: 179.99, // $202.65 total - $22.66 government fees
    total: 202.65
  }
};

// Function to select processing time
function selectProcessingTime(processingType) {
  // Remove selected class from all options
  const allOptions = document.querySelectorAll('.app-processing-option');
  allOptions.forEach(option => {
    option.classList.remove('app-processing-option-selected');
  });

  // Add selected class to clicked option
  const selectedOption = document.querySelector(`[data-processing="${processingType}"]`);
  if (selectedOption) {
    selectedOption.classList.add('app-processing-option-selected');
  }

  // Update radio button
  const radio = document.getElementById(`processing-${processingType}`);
  if (radio) {
    radio.checked = true;
  }

  // Update order summary
  updateCheckoutSummary(processingType);
}

// Function to update checkout summary
function updateCheckoutSummary(processingType) {
  const pricing = processingPricing[processingType];
  if (!pricing) return;

  const processingLabel = document.getElementById('checkout-processing-label');
  const processingPrice = document.getElementById('checkout-processing-price');
  const total = document.getElementById('checkout-total');

  if (processingLabel) {
    processingLabel.textContent = pricing.label;
  }

  if (processingPrice) {
    processingPrice.textContent = `$${pricing.price.toFixed(2)}`;
  }

  if (total) {
    total.textContent = `USD $${pricing.total.toFixed(2)}`;
  }
}

// Function to initialize checkout step
function initializeCheckout(formData) {
  // Get traveler count
  const travelerCount = formData?.numberOfApplicants || travelerData.count || 1;
  const travelersText = travelerCount === 1 ? '1 Traveler' : `${travelerCount} Travelers`;

  // Update traveler count in summary
  const summaryTravelers = document.getElementById('checkout-summary-travelers');
  if (summaryTravelers) {
    summaryTravelers.textContent = travelersText;
  }

  // Set default to rush (as shown in image)
  selectProcessingTime('rush');
}

// Function to update sidebar for checkout step
function updateSidebarCheckout(formData) {
  initializeCheckout(formData);
}

