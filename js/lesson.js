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

// Получаем input элементы
const somInput = document.getElementById('som');
const usdInput = document.getElementById('usd');
const eurInput = document.getElementById('eur');

const converter = (element, target1, target2, currentType) => {
    element.addEventListener('input', async () => {
        try{
            const response = await fetch('../data/converter.json');
            if (!response.ok) throw new Error('Не удалось загрузить данные');

            const data = await response.json();
            const value = parseFloat(element.value);

            if(!element.value || isNaN(value)){
                target1.value = '';
                target2.value = '';
                return;
            }
            switch (currentType){
                case 'som':
                    target1.value = (value / data.usd).toFixed(2);
                    target2.value = (value / data.eur).toFixed(2);
                    break;
                case 'usd':
                    target1.value = (value * data.usd).toFixed(2);
                    target2.value = (value * data.usd / data.eur).toFixed(2);
                    break;
                case 'eur':
                    target1.value = (value * data.eur).toFixed(2);
                    target2.value = (value * data.eur / data.usd).toFixed(2);
                    break;
            }
        } catch (error){
            console.error('Ошибка:', error);
        }
    });
};

converter(somInput, usdInput, eurInput, 'som');
converter(usdInput, somInput, eurInput, 'usd');
converter(eurInput, somInput, usdInput, 'eur');


// Card Switcher
// Card Switcher с мемными цитатами
const card1 = document.querySelector('.card');
const btnPrev1 = document.querySelector('#btn-prev');
const btnNext1 = document.querySelector('#btn-next');

let count = 1;
const totalCards = 7; // Теперь у нас 7 цитат

// Массив с мемными цитатами
const memeQuotes = [
    {
        id: 1,
        quote: "Когда твой код заработал с первого раза",
        context: "Программист:",
        reaction: "👁️👄👁️ Подозрительно..."
    },
    {
        id: 2,
        quote: "Завтра точно начну новую жизнь!",
        context: "Каждый вечер:",
        reaction: "♾️ Бесконечный цикл"
    },
    {
        id: 3,
        quote: "Это не баг, это фича",
        context: "Разработчик о критической ошибке:",
        reaction: "💡 Инновационный подход"
    },
    {
        id: 4,
        quote: "Я не прокрастинирую, я стратегически откладываю задачи",
        context: "Офисная мудрость:",
        reaction: "📊 Оптимизация workflow"
    },
    {
        id: 5,
        quote: "Понедельник - это такой воскресный hard mode",
        context: "Каждое воскресенье:",
        reaction: "🎮 Уровень сложности: Босс"
    },
    {
        id: 6,
        quote: "Мой внутренний голос имеет саркастический тон",
        context: "Самоанализ:",
        reaction: "🎭 Талант без признания"
    },
    {
        id: 7,
        quote: "Кофе - это жидкость, которая превращает 'Не могу' в 'Надо сделать'",
        context: "Утренний ритуал:",
        reaction: "⚗️ Алхимия продуктивности"
    }
];

// Функция для получения данных карточки
function getCardData(cardNumber) {
    const index = (cardNumber - 1) % memeQuotes.length;
    return memeQuotes[index];
}

// Функция для обновления отображения карточки
function updateCard(cardData) {
    if (!cardData) {
        card1.innerHTML = `
            <p>Ошибка загрузки данных</p>
            <span>#${count}</span>
        `;
        return;
    }
    
    card1.innerHTML = `
        <p class="quote-context">${cardData.context}</p>
        <p class="quote-text">"${cardData.quote}"</p>
        <p class="quote-reaction">${cardData.reaction}</p>
        <span class="quote-number">Мем #${cardData.id}</span>
    `;
}

// Функция для загрузки и отображения карточки
function loadCard(cardNumber) {
    const cardData = getCardData(cardNumber);
    updateCard(cardData);
}

// Обработчики для кнопок
btnPrev1.addEventListener('click', () => {
    if (count > 1) {
        count--;
        loadCard(count);
    }
});

btnNext1.addEventListener('click', () => {
    if (count < totalCards) {
        count++;
        loadCard(count);
    }
});

// Загружаем первую карточку при загрузке страницы
loadCard(count);


// Weather
const cityInput = document.querySelector('.cityName');
const citySpan = document.querySelector('.city');
const tempSpan = document.querySelector('.temp');

async function getWeather(city) {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true`;
        
        const mockWeatherData = {
            'москва': { name: 'Москва', temp: 15 },
            'бишкек': { name: 'Бишкек', temp: 25 },
            'санкт-петербург': { name: 'Санкт-Петербург', temp: 12 },
            'нью-йорк': { name: 'Нью-Йорк', temp: 18 },
            'лондон': { name: 'Лондон', temp: 14 }
        };
        
        const cityLower = city.toLowerCase();
        
        if (mockWeatherData[cityLower]) {
            const data = mockWeatherData[cityLower];
            citySpan.textContent = data.name;
            tempSpan.textContent = `${data.temp}°C`;
            cityInput.value = '';
        } else {
            throw new Error('Город не найден');
        }
        
    } catch (error) {
        citySpan.textContent = 'Ошибка';
        tempSpan.textContent = error.message;
        cityInput.value = '';
        

        setTimeout(() => {
            citySpan.textContent = '';
            tempSpan.textContent = '';
        }, 3000);
    }
}


cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && cityInput.value.trim()) {
        getWeather(cityInput.value.trim());
    }
});

const weatherBlock = document.querySelector('.inner_weather');
const searchButton = document.createElement('button');
searchButton.textContent = 'Найти';
searchButton.className = 'btn';
searchButton.style.marginTop = '10px';

searchButton.addEventListener('click', () => {
    if (cityInput.value.trim()) {
        getWeather(cityInput.value.trim());
    }
});

weatherBlock.querySelector('div').appendChild(searchButton);