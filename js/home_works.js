const input = document.getElementById('gmail_input');
const button = document.getElementById('gmail_button');
const result = document.getElementById('gmail_result');

const gmailRegExp = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;


button.addEventListener('click', ()=>{
    const value = input.value.trim();
    if (gmailRegExp.test(value)){
        result.textContent = 'Почта верна';
        result.style.color = 'green';
    }else{
         result.textContent = 'Почта не верна';
         result.style.color = 'red';
    }
});

//Проверка ИНН
const innInput = document.getElementById('inn_input');
const innButton = document.getElementById('inn_button');
const innResult = document.getElementById('inn_result');

const innRegExp = /^\d{12}$/;

innButton.addEventListener('click', ()=>{
    const value = innInput.value.trim();

    if(innRegExp.test(value)){
        innResult.textContent = 'ИНН верен';
        innResult.style.color = 'green';
    }else{
        innResult.textContent = 'ИНН не верен';
        innResult.style.color = 'red';
    }
});