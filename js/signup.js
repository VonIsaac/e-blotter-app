document.querySelector('.form-signup').addEventListener('submit', async function(event) {
    event.preventDefault();
    // Get form data
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    try {
        const response = await fetch('http://localhost/e-blotter-backend/sign-up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: name,
                email: email,
                password: password
            })
        });

        if (!response.ok) {
            alert("Something went wrong");
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        alert('Account Successfully Created');

        // Clear input fields
        nameInput.value = '';
        emailInput.value = '';
        passwordInput.value = '';
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
});
