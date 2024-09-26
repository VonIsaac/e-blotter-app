document.querySelector('.complain-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const complaintData = {
        date: document.getElementById('complaint-date').value,
        time: document.getElementById('complaint-time').value,
        complaint_no: document.getElementById('complaint-number').value, // Aligned key
        type_of_complaint: document.getElementById('complaint-type').value, // Aligned key
        name: document.getElementById('complainant-name').value,
        age: document.getElementById('complainant-age').value,
        birthday: document.getElementById('complainant-birthday').value, // Aligned key
        citizenship: document.getElementById('citizenship').value,
        current_address: document.getElementById('current-address').value, // Aligned key
        birthplace: document.getElementById('birthplace').value,
        civil_status: document.getElementById('civil-status').value,
        provincial_address: document.getElementById('provincial-address').value, // Aligned key
        contact_number: document.getElementById('contact-number').value,
        suspect_name: document.getElementById('suspect-name').value,
        suspect_age: document.getElementById('suspect-age').value,
        suspect_citizenship: document.getElementById('suspect-citizenship').value,
        suspect_civil_status: document.getElementById('suspect-civil-status').value,
        suspect_address: document.getElementById('suspect-address').value,
        gender: document.querySelector('input[name="gender"]:checked')?.value,
        blotter_datetime: document.getElementById('blotter-datetime').value, // Aligned key
        incident_place: document.getElementById('incident-place').value,
        incident_date: document.getElementById('date_of_incident').value // Aligned key
    };
    

    try {
        const response = await fetch('http://localhost/e-blotter-backend/complainant', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(complaintData),
        });

        if (response.ok) {
            alert('Data successfuly added');
            document.querySelector('.complain-form').reset(); 
        } else {
            console.error('Error:', response.statusText);
            alert('Something went wrong')
        }
    } catch (error) {
        console.error('Fetch error:', error);
        // Handle fetch error
    }
});
