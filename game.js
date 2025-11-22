// game.js - УНИВЕРСАЛЬНАЯ ВЕРСИЯ ДЛЯ ВСЕХ УСТРОЙСТВ
console.log("🎮 BPMN Constructor загружен!");

const processArea = document.getElementById('processArea');
const resultDiv = document.getElementById('result');
let score = 0;

// Правильная последовательность BPMN
const correctSequence = ['start', 'task1', 'gateway', 'task2', 'end'];

// === УНИВЕРСАЛЬНАЯ СИСТЕМА ДОБАВЛЕНИЯ ЭЛЕМЕНТОВ ===
function initGame() {
    const elements = document.querySelectorAll('.element');
    
    elements.forEach(element => {
        // Удаляем старые обработчики
        element.replaceWith(element.cloneNode(true));
    });
    
    // Новые обработчики
    document.querySelectorAll('.element').forEach(element => {
        // Клик для всех устройств
        element.addEventListener('click', handleElementClick);
        
        // Drag&Drop только для десктопа
        if (!isMobile()) {
            element.setAttribute('draggable', 'true');
            element.addEventListener('dragstart', handleDragStart);
        }
    });
    
    // Область для Drop
    processArea.addEventListener('dragover', handleDragOver);
    processArea.addEventListener('drop', handleDrop);
    
    console.log('🎮 Игра инициализирована для:', isMobile() ? 'мобильного' : 'десктопа');
}

function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// === ОБРАБОТЧИКИ ===
function handleElementClick(event) {
    const element = event.currentTarget;
    if (!element.classList.contains('process-element')) {
        addToProcessArea(element.cloneNode(true));
    }
}

function handleDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.dataset.type);
    event.target.style.opacity = '0.5';
}

function handleDragOver(event) {
    event.preventDefault();
    processArea.classList.add('drag-over');
}

function handleDrop(event) {
    event.preventDefault();
    processArea.classList.remove('drag-over');
    
    const elementType = event.dataTransfer.getData('text/plain');
    const originalElement = document.querySelector(`[data-type="${elementType}"]`);
    
    if (originalElement && !originalElement.classList.contains('process-element')) {
        addToProcessArea(originalElement.cloneNode(true));
    }
    
    // Возвращаем прозрачность
    document.querySelectorAll('.element').forEach(el => {
        el.style.opacity = '1';
    });
}

function addToProcessArea(element) {
    element.classList.add('process-element');
    element.style.opacity = '1';
    
    // Убираем возможность повторного добавления
    element.removeAttribute('draggable');
    element.style.cursor = 'default';
    
    processArea.appendChild(element);
    showResult('✅ Элемент добавлен! Продолжайте сборку.', 'success');
}

// === ФУНКЦИИ ИГРЫ ===
function checkSolution() {
    const placedElements = processArea.querySelectorAll('.process-element');
    const userSequence = Array.from(placedElements).map(el => el.dataset.type);
    
    console.log('Проверяем:', userSequence);
    
    let isCorrect = true;
    
    if (userSequence.length !== correctSequence.length) {
        isCorrect = false;
    } else {
        for (let i = 0; i < userSequence.length; i++) {
            if (userSequence[i] !== correctSequence[i]) {
                isCorrect = false;
                break;
            }
        }
    }
    
    if (isCorrect) {
        score = 100;
        showResult('🎉 Поздравляем! BPMN процесс собран правильно!', 'success');
    } else {
        showResult('❌ Последовательность неверная. Попробуйте ещё!', 'error');
    }
}

function resetGame() {
    processArea.innerHTML = '<p>Перетащи или нажми на элементы 👇</p>';
    score = 0;
    showResult('🔄 Игра сброшена! Начните заново.', 'success');
    initGame(); // Переинициализируем игру
}

function shareResult() {
    if (score > 0) {
        alert(`🏆 Мой результат в BPMN Constructor: ${score} очков!`);
    } else {
        alert('Сначала завершите игру!');
    }
}

function showResult(message, type) {
    resultDiv.textContent = message;
    resultDiv.className = `result ${type}`;
    resultDiv.style.display = 'block';
    
    setTimeout(() => {
        resultDiv.style.display = 'none';
    }, 3000);
}

// Запускаем игру при загрузке
document.addEventListener('DOMContentLoaded', initGame);

