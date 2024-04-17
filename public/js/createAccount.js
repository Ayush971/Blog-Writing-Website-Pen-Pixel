const createAccountForm = document.querySelector('.form');

createAccountForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent default form submission

  // Extract form data
  const UserName = document.querySelector('.username').value;
  const email = document.querySelector('.email').value;
  const password = document.querySelector('.password').value;
  const confirmPassword = document.querySelector('.confirm-password').value;

  // Validate data (optional)
  validateUserData(UserName, email, password, confirmPassword);
    

  // Send data to server
  try {
    const response = await sendSignupRequest(UserName, email, password);
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
function validateUserData(UserName, email, password, confirmPassword) {

    if(password!=confirmPassword){
        alert("Please enter same passowrd");
        return false;
    }

    if (UserName === "" || password === "") {
        alert("Please enter both username and password.");
        return false;
    }

  return true; 
}

// Send signup request function (using Fetch API example)
async function sendSignupRequest(UserName, email, password) {
  const data = { UserName, email, password }; // Create data object
  const response = await fetch('/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
}
