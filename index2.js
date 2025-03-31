// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the form element
    const form = document.getElementById('drillingRequestForm');
    
    // Add submit event listener
    form.addEventListener('submit', function(e) {
      e.preventDefault(); // Prevent page reload
      
      console.log("Form submitted!"); // Debug log
      
      // Collect form data
      const formData = {
        fullName: document.getElementById('fullName').value,
        contractNumber: document.getElementById('contractNumber').value,
        location: document.getElementById('location').value,
        drillingDepth: document.getElementById('drillingDepth').value,
        drillingDate: document.getElementById('drillingDate').value
      };
      
      console.log("Form data:", formData); // Debug log
      
      // Get existing requests or initialize empty array
      let requests = JSON.parse(localStorage.getItem('drillingRequests')) || [];
      
      // Add new request
      requests.push(formData);
      
      // Save back to localStorage
      localStorage.setItem('drillingRequests', JSON.stringify(requests));
      console.log("Saved to localStorage:", requests); // Debug log
      
      // Update the display
      displayClientDetails();
      
      // Reset the form
      form.reset();
      
      alert('Request submitted successfully!');
    });
    
    // Function to display client details
    function displayClientDetails() {
      const requests = JSON.parse(localStorage.getItem('drillingRequests')) || [];
      const listElement = document.getElementById('clientRequestsList');
      
      console.log("Displaying requests:", requests); // Debug log
      
      listElement.innerHTML = ''; // Clear previous entries
      
      if (requests.length === 0) {
        listElement.innerHTML = '<p>No requests submitted yet.</p>';
        return;
      }
      
      requests.forEach((request, index) => {
        const requestElement = document.createElement('div');
        requestElement.className = 'request-item';
        requestElement.innerHTML = `
          <h3>Request #${index + 1}</h3>
          <p><strong>Full Name:</strong> ${request.fullName}</p>
          <p><strong>Contract Number:</strong> ${request.contractNumber}</p>
          <p><strong>Location:</strong> ${request.location}</p>
          <p><strong>Drilling Depth:</strong> ${request.drillingDepth} meters</p>
          <p><strong>Proposed Date:</strong> ${request.drillingDate}</p>
          <hr>
        `;
        listElement.appendChild(requestElement);
      });
    }
    
    // Display any existing requests when page loads
    displayClientDetails();
  });