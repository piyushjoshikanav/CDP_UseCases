document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    // Gather form data
    const formData = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      contact: document.getElementById('contact').value,
      dob: document.getElementById('dob').value,
      email: document.getElementById('email').value,
      gender: document.getElementById('gender').value,
      address1: document.getElementById('address1').value,
      country: document.getElementById('country').value,
      state: document.getElementById('state').value,
      city: document.getElementById('city').value,
      pincode: document.getElementById('pincode').value
    };
 
    // Confirmation dialog box
    if (confirm('Do you want to share your full registration details? Click OK for yes, Cancel for no.')) {
      // User clicked OK - Share full details
      shareFullDetails(formData);
    } else {
      // User clicked Cancel or No - Share basic details only
      shareBasicDetails(formData);
    }
 
    this.reset(); // Reset the form
  });
 
  function shareFullDetails(formData) {
    // Initialize Gigya CDP SDK for full details
    gigya.cdp.init({
        apiDomain: 'EU5',
        bUnitId: '4_2arKfv5bsPsK9ODVBhCJeA',
        appId: 'HHZtlpZeHXG0H--CzE0sSQ'
    })
    .then(function(sdk) {
      // Store the SDK in a global variable for future use if needed
      window.CDP = sdk;
 
      // Prepare data for CDP.report function with full details
      CDP.report('Registration Form',
    {

    "Email": "formData.email",
    "Firstname": "formData.firstName",
    "Lastname": "formData.lastName",
    "Address": {
        "Country": formData.country,
        "State": formData.state,
        "City": "formData.city",
        "Pincode": formData.pincode,
        "addressid": "5",
        "Address1": formData.address1
    }
    });
 
      // Report data to Gigya CDP
      alert('Form submitted successfully with full details!');
    })
    .catch(function(error) {
      console.error('CDP initialization error:', error);
      alert("Error reporting data to CDP.");
    });
  }
 
  function shareBasicDetails(formData) {
    // Initialize Gigya CDP SDK for basic details only
  gigya.cdp.init({
        apiDomain: 'EU5',
        bUnitId: '4_2arKfv5bsPsK9ODVBhCJeA',
        appId: 'HHZtlpZeHXG0H--CzE0sSQ'
    })
    .then(function(sdk) {
      // Store the SDK in a global variable for future use if needed
      window.CDP = sdk;
 
      // Prepare data for CDP.report function with basic details only
      CDP.report('CustomerConsent', {
        "Email": formData.email,
        "FirstName": formData.firstName,
        "LastName": formData.lastName
      });
 
      // Report data to Gigya CDP
      alert('Form submitted successfully with basic details!');
    })
    .catch(function(error) {
      console.error('CDP initialization error:', error);
      alert("Error reporting data to CDP.");
    });
  }
});

 

