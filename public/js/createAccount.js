const createAccountForm = document.querySelector('.right form');

createAccountForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent default form submission

  // Extract form data
  const firstName = document.querySelector('.first-name').value;
  const lastName = document.querySelector('.last').value;
  const email = document.querySelector('.email').value;
  const password = document.querySelector('.password').value;
  const confirmPassword = document.querySelector('.confirm-password').value;

  // Validate data (optional)
  if (!validateUserData(firstName, lastName, email, password, confirmPassword)) {
    return; // Handle validation errors (display messages)
  }

  // Send data to server
  try {
    const response = await sendSignupRequest(firstName, lastName, email, password);
    if (response.ok) {
      // Handle successful signup (e.g., redirect to login page)
      console.log("Signup successful!");
    } else {
      // Handle signup errors (display error messages)
      console.error("Error creating account:", await response.text());
    }
  } catch (error) {
    console.error("Error sending request:", error);
    // Handle other errors (display user-friendly messages)
  }
});

// Implement validation function (optional)
function validateUserData(firstName, lastName, email, password, confirmPassword) {
    var firstName = document.querySelector('.first-name').value;
    var lastName = document.querySelector('.last-name').value;
    var password = document.querySelector('.password').value;
    var confirmPassword = document.querySelector('.confirm-password').value;
    var email = document.querySelector('.email').value;

    if(password!=confirmPassword){
        alert("Please enter same passowrd");
        return false;
    }

    if (username === "" || password === "") {
        alert("Please enter both username and password.");
        return false;
    }

  return true; // Replace with actual validation logic
}

// Send signup request function (using Fetch API example)
async function sendSignupRequest(firstName, lastName, email, password) {
  const data = { firstName, lastName, email, password }; // Create data object
  const response = await fetch('/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response;
}