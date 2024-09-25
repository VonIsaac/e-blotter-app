document.querySelector('.form-login').addEventListener('submit', async function(event) {
    event.preventDefault();
    // Get form data
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');

    const email = emailInput.value;
    const password = passwordInput.value;

    try {
        const response = await fetch('http://localhost/e-blotter-backend/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        if (!response.ok) {
            alert("Invalid credentials or something went wrong.");
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        alert('Login successful');
        console.log(result);

        // Optionally redirect or take further actions after successful login
        // window.location.href = '/dashboard.html';  // Example redirect
    } catch (error) {
        console.error('An error occurred:', error.message);
    } finally {
        // Clear input fields
        emailInput.value = '';
        passwordInput.value = '';
    }
});
