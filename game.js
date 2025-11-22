// game.js - УНИВЕРСАЛЬНАЯ ВЕРСИЯ
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (isMobile) {
    // Мобильная версия - тапы
    document.querySelectorAll('.element').forEach(element => {
        element.addEventListener('click', function() {
            if (!this.classList.contains('process-element')) {
                const cloned = this.cloneNode(true);
                cloned.setAttribute('data-type', this.dataset.type);
                addToProcessArea(cloned);
            }
        });
    });
} else {
    // Десктоп версия - Drag&Drop
    let draggedElement = null;
    
    document.addEventListener('dragstart', function(e) {
        draggedElement = e.target;
        e.target.style.opacity = '0.5';
    });
    
    document.addEventListener('dragover', function(e) {
        e.preventDefault();
        processArea.classList.add('drag-over');
    });
    
    document.addEventListener('drop', function(e) {
        e.preventDefault();
        processArea.classList.remove('drag-over');
        
        if (e.target === processArea && draggedElement) {
            const cloned = draggedElement.cloneNode(true);
            cloned.setAttribute('data-type', draggedElement.dataset.type);
            addToProcessArea(cloned);
            draggedElement.style.opacity = '1';
            draggedElement = null;
        }
    });
}

function addToProcessArea(element) {
    element.classList.add('process-element');
    element.style.opacity = '1';
    processArea.appendChild(element);
    showResult('✅ Элемент добавлен!', 'success');
}
