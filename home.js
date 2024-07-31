document.addEventListener('DOMContentLoaded', function() {
    const dayButtonsContainer = document.getElementById('day-buttons');

    // 1일부터 30일까지 버튼 생성
    for (let i = 1; i <= 30; i++) {
        const button = document.createElement('button');
        button.textContent = `Day ${i}`;
        button.className = 'day-button';
        button.onclick = function() {
            window.location.href = `quiz.html?day=${i}`;
        };
        dayButtonsContainer.appendChild(button);
    }
});
