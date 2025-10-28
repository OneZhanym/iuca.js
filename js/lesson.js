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

//Tab Slider
const tabsContentCards = document.querySelectorAll('.tab_content_block');
const tabsItems = document.querySelectorAll('.tab_content_item');
const tabsItemsParents =  document.querySelector('.tab_content_items');


const hightTabsContentCards = () =>{
    tabsContentCards.forEach((tabsContentCard)=>{
        tabsContentCard.style.display = 'none'
    })
    tabsItems.forEach((tabItem)=>{
        tabItem.classList.remove('tab_content_item_active')
    })
}

const showTabsContentCards = (indexElement = 0)=>{
    tabsContentCards[indexElement].style.display = 'block';
    tabsItems[indexElement].classList.add('tab_content_item_active')
}

hightTabsContentCards();
showTabsContentCards();


tabsItemsParents.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')){
        tabsItems.forEach((tabItem, tabItemIndex)=>{
            if(event.target === tabItem){
                hightTabsContentCards()
                showTabsContentCards(tabItemIndex)
            }
        })
    }
}

let curretIndex = 0; // Первая вкладка
let intervalId; //Переменная для хранения интервала

//Ф-ция для автоматического переключения

const startAuthoSlider = ()=>{
    intervalId = setInterval(()=>{
        hightTabsContentCards();
        showTabsContentCards(curretIndex);
        curretIndex = (curretIndex +1) % tabsItems.length;
    }, 2000); // 2сек
}
//Запуск автослайдера
startAuthoSlider();

//Остановка слайдера при клике на вкладку

tabsItemsParents.onclick = (event) => {
    clearInterval(intervalId);
    if (event.target.classList.contains('tab_content_item')){
        tabsItems.forEach((tabItem, tabItemIndex) =>{
            if(event.target === tabItem){
                hightTabsContentCards();
                showTabsContentCards(tabItemIndex);
                curretIndex = tabItemIndex;
                startAuthoSlider();
            }
        })
    }
}