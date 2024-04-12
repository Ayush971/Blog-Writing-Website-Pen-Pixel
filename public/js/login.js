const blogUsername=document.querySelector('.username');
const blogPassword=document.querySelector('.password');

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

//Not working : data not getting posted

try {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: blogUsername.value,
      article: blogPassword.value,
    }),
  });

  if (!response.ok) {
    throw new Error('Error creating blog');
  }
} catch (err) {
    console.error(err);
}