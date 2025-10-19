// Проверка номера
const phoneBlocks = document.querySelectorAll('.phone_block');

phoneBlocks.forEach(block => {
    const phoneInput = block.querySelector('#phone_input');
    const phoneButton = block.querySelector('#phone_button');
    const phoneSpan = block.querySelector('#phone_result');

    const reqExpKg = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/;
    const reqExpRu = /^\+7 \922 \d{3}-\d{2}-\d{2}$/;

    phoneButton.addEventListener('click', () => {
        const value = phoneInput.value.trim();
        
        const isRussianFormat = phoneInput.placeholder.includes('+7');
        
        if (isRussianFormat) {
            if (reqExpRu.test(value)) {
                phoneSpan.innerHTML = 'Этот номер существует';
                phoneSpan.style.color = 'green';
            } else {
                phoneSpan.innerHTML = 'Этот номер не существует';
                phoneSpan.style.color = 'red';
            }
        } else {
            if (reqExpKg.test(value)) {
                phoneSpan.innerHTML = 'Этот номер существует';
                phoneSpan.style.color = 'green';
            } else {
                phoneSpan.innerHTML = 'Этот номер не существует';
                phoneSpan.style.color = 'red';
            }
        }
    });
});