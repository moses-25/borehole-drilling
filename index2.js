document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('request-form');
    const requestsList = document.getElementById('requests-list');
    const requestIdInput = document.getElementById('request-id');

    let editMode = false;

    // Fetch all requests
    function fetchRequests() {
        fetch('http://localhost:3000/requests')
            .then(response => response.json())
            .then(data => {
                requestsList.innerHTML = '';
                data.forEach(request => {
                    const requestItem = document.createElement('div');
                    requestItem.classList.add('request-item');
                    requestItem.innerHTML = `
                        <p><strong>Name:</strong> ${request.fullName}</p>
                        <p><strong>Location:</strong> ${request.location}</p>
                        <p><strong>Date:</strong> ${request.preferredDate}</p>
                        <p><strong>Status:</strong> ${request.status}</p>
                        <button onclick="editRequest(${request.id})">Edit</button>
                        <button onclick="deleteRequest(${request.id})">Delete</button>
                    `;
                    requestsList.appendChild(requestItem);
                });
            });
    }

    // Create or update a request
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const fullName = document.getElementById('full-name').value;
        const contactNumber = document.getElementById('contact-number').value;
        const location = document.getElementById('location').value;
        const desiredDepth = document.getElementById('desired-depth').value;
        const preferredDate = document.getElementById('preferred-date').value;

        const requestData = {
            fullName,
            contactNumber,
            location,
            desiredDepth,
            preferredDate,
            status: 'Pending'
        };

        if (editMode) {
            fetch(`http://localhost:3000/requests/${requestIdInput.value}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
            .then(response => response.json())
            .then(() => {
                form.reset();
                requestIdInput.value = '';
                editMode = false;
                fetchRequests();
            });
        } else {
            fetch('http://localhost:3000/requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
            .then(response => response.json())
            .then(() => {
                form.reset();
                fetchRequests();
            });
        }
    });

    // Edit a request
    window.editRequest = (id) => {
        fetch(`http://localhost:3000/requests/${id}`)
            .then(response => response.json())
            .then(request => {
                document.getElementById('full-name').value = request.fullName;
                document.getElementById('contact-number').value = request.contactNumber;
                document.getElementById('location').value = request.location;
                document.getElementById('desired-depth').value = request.desiredDepth;
                document.getElementById('preferred-date').value = request.preferredDate;
                requestIdInput.value = request.id;
                editMode = true;
            });
    };

    // Delete a request
    window.deleteRequest = (id) => {
        fetch(`http://localhost:3000/requests/${id}`, {
            method: 'DELETE',
        })
        .then(() => {
            fetchRequests();
        });
    };

    // Initial fetch of requests
    fetchRequests();
});