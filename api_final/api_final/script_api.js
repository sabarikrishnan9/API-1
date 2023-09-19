function showTable(userData) {
    const tableBody = document.querySelector('tbody');
    tableBody.innerHTML = '';

    if (userData && userData.users) {
        userData.users.forEach((user, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.editing ? `<input type="text" value="${user.name}">` : user.name}</td>
                <td>${user.editing ? `<input type="text" value="${user.age}">` : user.age}</td>
                <td>${user.editing ? `<input type="text" value="${user.employee_id}">` : user.employee_id}</td>
                <td>${user.editing ? `<input type="text" value="${user.experience}">` : user.experience}</td>
                <td>${user.editing ? `<input type="text" value="${user.dob}">` : user.dob}</td>
                <td>${user.editing ? `<input type="text" value="${user.position}">` : user.position}</td>
                <td>
                    ${user.editing ? '<button class="save">Save</button>' : '<button class="edit">Edit</button>'}
                    <button class="delete">Delete</button>
                </td>
            `;
            row.querySelector('.edit')?.addEventListener('click', () => editRow(index));
            row.querySelector('.save')?.addEventListener('click', () => saveRow(index));
            tableBody.appendChild(row);
        });
    }
}

function fetchDataFromAPIAndStoreLocally() {
    fetch('https://mocki.io/v1/753674f9-4865-479c-8023-2a868b4ab7cb')
        .then(response => response.json())
        .then(data => {
            data.users.forEach(user => (user.editing = false)); 
            localStorage.setItem('userData', JSON.stringify(data));
            showTable(data);
        })
        .catch(error => console.error('Error fetching data:', error));
}

const userDataFromLocalStorage = JSON.parse(localStorage.getItem('userData'));

if (userDataFromLocalStorage && userDataFromLocalStorage.users.length > 0) {
    showTable(userDataFromLocalStorage);
} else {
    fetchDataFromAPIAndStoreLocally();
}

document.querySelector('#deleteAll').addEventListener('click', () => {
    localStorage.removeItem('userData');
    showTable(null);
});

function editRow(index) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    userData.users[index].editing = true;
   
    showTable(userData);
}

function saveRow(index) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const updatedUser = {
        name: document.querySelector(`tbody tr:nth-child(${index + 1}) td:nth-child(1) input`).value,
        age: document.querySelector(`tbody tr:nth-child(${index + 1}) td:nth-child(2) input`).value,
        employee_id: document.querySelector(`tbody tr:nth-child(${index + 1}) td:nth-child(3) input`).value,
        experience: document.querySelector(`tbody tr:nth-child(${index + 1}) td:nth-child(4) input`).value,
        dob: document.querySelector(`tbody tr:nth-child(${index + 1}) td:nth-child(5) input`).value,                
        position: document.querySelector(`tbody tr:nth-child(${index + 1}) td:nth-child(6) input`).value,
        editing: false, 
    };

    userData.users[index] = updatedUser;
    localStorage.setItem('userData', JSON.stringify(userData));
    showTable(userData);
}

document.querySelector('tbody').addEventListener('click', (event) => {
    if (event.target.classList.contains('delete')) {
        const row = event.target.parentElement.parentElement;
        const rowIndex = row.rowIndex - 1; 
        const userData = JSON.parse(localStorage.getItem('userData'));

        if (userData && userData.users) {
            userData.users.splice(rowIndex, 1);

            localStorage.setItem('userData', JSON.stringify(userData));
            showTable(userData);
        }
    }
});

document.querySelector('#refresh').addEventListener('click', () => {
    fetchDataFromAPIAndStoreLocally();
});
