$(document).ready(function () {
    const $form = $('#signup');
    var newFirstNameInput = $('#firstname'),
        newLastNameInput = $('#lastname'),
        newEmailInput = $('#email'),
        newDobInput = $('#dateOfBirth'),
        newCityInput = $('#city'),
        newStateInput = $('#state'),
        newUsernameInput = $('#username'),
        newPasswordInput = $('#floatingPassword');
    var error = $('#errormessage');
    $('#signup-form').on('submit', function (e) {
        e.preventDefault();
        var newFirstName = newFirstNameInput.val();
        var newLastName = newLastNameInput.val();
        var newEmail = newEmailInput.val();
        var newDob = newDobInput.val();
        var newCity = newCityInput.val();
        var newState = newStateInput.val();
        var newUsername = newUsernameInput.val();
        var newPassword = newPasswordInput.val();

        if (
            newFirstName &&
            newLastName &&
            newDob &&
            newEmail &&
            newPassword &&
            newUsername &&
            newState &&
            newCity
        ) {
            var useJson = true;
            if (useJson) {
                var requestConfig = {
                    method: 'POST',
                    url: '/signup',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        firstName: newFirstName,
                        lastName: newLastName,
                        email: newEmail,
                        dateOfBirth: newDob,
                        city: newCity,
                        state: newState,
                        username: newUsername,
                        password: newPassword,
                    }),
                };

                $.ajax({
                    method: 'POST',
                    url: '/signup',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        firstName: newFirstName,
                        lastName: newLastName,
                        email: newEmail,
                        dateOfBirth: newDob,
                        city: newCity,
                        state: newState,
                        username: newUsername,
                        password: newPassword,
                    }),
                    success: function (response) {
                        if (response.message === 'success') {
                            window.location.href = '/login';
                        }
                    },
                    error: function (xhr, status, error) {
                        var errorMessage = xhr.responseJSON.error;
                        error.innerHTML = errorMessage;
                    },
                });

                // $.ajax(requestConfig).then((response) => {
                //     if (response.message === 'success') {
                //         window.location.href = '/login';
                //     }
                //     if (response.error) {
                //         console.log(response.error);
                //     }
                // });
            }
        }
    });
});
