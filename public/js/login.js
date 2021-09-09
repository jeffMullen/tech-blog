const loginForm = async (event) => {
    event.preventDefault();
    const login = document.querySelector('#login');

    const email = document.querySelector('#loginEmail').value.trim();
    const password = document.querySelector('#loginPassword').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: { 'Content-type': 'application/json' }
        });
        console.log(response);
        if (response.ok) {
            document.location.replace('/');
        } else {
            const loginFailed = document.createElement('p');
            loginFailed.textContent = `Incorrect email or password. Please try again`

            loginFailed.append(login);
        }
    };
}

const signupForm = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#signupUsername').value.trim();
    const email = document.querySelector('#signupEmail').value.trim();
    const password = document.querySelector('#signupPassword').value.trim();

    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to sign up.');
        }
    }
};

document
    .querySelector('#loginSubmit')
    .addEventListener('click', loginForm);

document
    .querySelector('#signupSubmit')
    .addEventListener('click', signupForm);
