const users = [{
    login: "alex_dev",
    pawword: "password123",
    name: "Алексей"
},
{
    login: "maria_pm",
    password: "securepass",
    name: "Мария"
},
{
    login: "ivan_design",
    password: "design_pass",
    name: "Иван"
},
{
    login: "olga_qa",
    password: "test_pw",
    name: "Ольга"
},
{
    login: "petr_hr",
    password: "hr_secret",
    name: "Петр"
}
];

const loginForm = document.getElementById('loginForm');
const messageElement = document.getElementById('message');
const loginInput = document.getElementById('login');
const passwordInput = document.getElementById('password');

function displayMessage(text, isSuccess) {
    messageElement.textContent = text;
    messageElement.style.display = 'block';
    messageElement.classList.remove('success', 'error');
    if (isSuccess) {
        messageElement.classList.add('success');
    } else {
        messageElement.classList.add('error');
    }
}

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const userLogin = loginInput.value.trim();
    const userPassword = passwordInput.value.trim();
    const foundUser = users.find(user => {
        return user.login === userLogin && user.password === userPassword;
    });

    if (foundUser) {
        displayMessage(`Здравствуйте, ${foundUser.name}! Авторизация прошла успешно.`, true);
        console.log(`Успешный вход: ${foundUser.login}`)
    } else {
        displayMessage('Ошибка авторизации. Неверный логин или пароль.', false);
        console.log(`Неудачная попытка входа с логином: ${userLogin}`);
    }
});