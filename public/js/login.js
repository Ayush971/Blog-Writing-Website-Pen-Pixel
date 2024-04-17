
+ function($) {
    $('.palceholder').click(function() {
      $(this).siblings('input').focus();
    });
  
    $('.form-control').focus(function() {
      $(this).parent().addClass("focused");
    });
  
    $('.form-control').blur(function() {
      var $this = $(this);
      if ($this.val().length == 0)
        $(this).parent().removeClass("focused");
    });
    $('.form-control').blur();
  
    // validetion
    $.validator.setDefaults({
      errorElement: 'span',
      errorClass: 'validate-tooltip'
    });
  
    $("#formvalidate").validate({
      rules: {
        userName: {
          required: true,
          minlength: 6
        },
        userPassword: {
          required: true,
          minlength: 6
        }
      },
      messages: {
        userName: {
          required: "Please enter your username.",
          minlength: "Please provide valid username."
        },
        userPassword: {
          required: "Enter your password to Login.",
          minlength: "Incorrect login or password."
        }
      }
    });
  };

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    const UserName = document.querySelector('.username').value;
    const password = document.querySelector('.password').value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ UserName, password })
        });
        const data = await response.json();

        if (data.success) {
            window.location.href = '/'; // Redirect to home page on successful login
        } else {
            alert(data.message); // Display error message if login failed
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.'); // Display error message if an error occurred
    }
});
