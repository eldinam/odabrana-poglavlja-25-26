$(function () {
  $("#registration_form").on("submit", function (e) {
    e.preventDefault(); // spriječi reload stranice

    const formData = {
      first_name: $("#first_name").val(),
      last_name: $("#last_name").val(),
      email: $("#email").val(),
      password: $("#password").val(),
      age: $("#age").val(),
    };

    $.ajax({
      url: "/users/register-user",
      method: "POST",
      data: formData,
      success: function (response) {
        alert("Registration successful!");
        window.location.href = "/users/login"; // redirect nakon registracije
      },
      error: function (xhr) {
        alert("Registration failed: " + xhr.responseText);
      },
    });
  });

  $("#loginForm").on("submit", function (e) {
    e.preventDefault(); // spriječi reload

    const formData = {
      email: $("#email").val(),
      password: $("#password").val(),
    };

    $.ajax({
      url: "/users/login-user",
      method: "POST",
      data: formData,
      success: function (response) {
        alert("Login successful!");
        window.location.href = "/subjects/all"; // redirect gdje želiš
      },
      error: function (xhr) {
        alert("Login failed: " + xhr.responseText);
      },
    });
  });
});
