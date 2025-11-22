// game.js - ФИНАЛЬНАЯ ВЕРСИЯ
let draggedElement = null;
let score = 0;

const processArea = document.getElementById('processArea');
const resultDiv = document.getElementById('result');

const correctSequence = ['start', 'task', 'gateway', 'task', 'end'];

// === DRAG & DROP ЛОГИКА ===
document.addEventListener('dragstart', function(event) {
    draggedElement = event.target;
    event.target.style.opacity = '0.5';
});

document.addEventListener('dragover', function(event) {
    event.preventDefault();
    processArea.classList.add('drag-over');
});

document.addEventListener('dragleave', function(event) {
    if (event.target === processArea) {
        processArea.classList.remove('drag-over');
    }
});

document.addEventListener('drop', function(event) {
    event.preventDefault();
    processArea.classList.remove('drag-over');
    
    if (event.target === processArea && draggedElement) {
        const clonedElement = draggedElement.cloneNode(true);
        clonedElement.style.opacity = '1';
        clonedElement.classList.add('process-element');
        clonedElement.draggable = false;
        clonedElement.setAttribute('data-type', draggedElement.dataset.type);
        
        processArea.appendChild(clonedElement);
        showResult('✅ Элемент добавлен! Продолжайте сборку.', 'success');
    }
    
    draggedElement.style.opacity = '1';
    draggedElement = null;
});

// === ФУНКЦИИ ИГРЫ ===
function checkSolution() {
    const placedElements = processArea.querySelectorAll('.process-element');
    const userSequence = Array.from(placedElements).map(el => el.dataset.type);
    
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
    processArea.innerHTML = '<p>Перетащи элементы сюда 👇</p>';
    score = 0;
    showResult('🔄 Игра сброшена! Начните заново.', 'success');
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

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    showResult('🚀 Перетащите элементы BPMN в область сборки!', 'success');
});