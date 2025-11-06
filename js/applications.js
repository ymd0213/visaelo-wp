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

      // Log for now (replace with actual navigation to next step)
      console.log('Form Data:', formData);
      
      // TODO: Navigate to next step or show next step UI
      // For now, show an alert
      alert(`Form submitted!\n\nNationality: ${nationality.label}\nApplying for: ${applyingFor.label}\nNumber of applicants: ${numberOfApplicants}\n\nNext: Navigate to step 2 (Your details)`);
      
      // You can uncomment this when you implement step navigation:
      // showNextStep(formData);
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

// Function to show next step (to be implemented)
function showNextStep(formData) {
  // This function will be called when implementing step navigation
  // You can update the progress indicator, show/hide form sections, etc.
  console.log('Moving to next step with data:', formData);
  
  // Example: Update progress indicator
  // const progressSteps = document.querySelectorAll('.progress-step');
  // if (progressSteps[1]) {
  //   progressSteps[0].classList.remove('progress-step-active');
  //   progressSteps[1].classList.add('progress-step-active');
  // }
}

