document.addEventListener('DOMContentLoaded', function() {
    let currentIndex = 0;
    let words = [];

    // 데이터 로드
    fetch('words.json')
        .then(response => response.json())
        .then(data => {
            words = data;
            showWord();
        })
        .catch(error => console.error('Error loading JSON:', error));

    // 단어와 선택지를 화면에 표시
    function showWord() {
        if (currentIndex >= words.length) {
            document.getElementById('result').innerText = '퀴즈가 완료되었습니다!';
            return;
        }

        const word = words[currentIndex];
        document.getElementById('question').innerText = word.eng;
        document.getElementById('option1').innerText = word.kor1;
        document.getElementById('option2').innerText = word.kor2;

        document.getElementById('option1').onclick = function() { checkAnswer(word.kor1); };
        document.getElementById('option2').onclick = function() { checkAnswer(word.kor2); };
    }

    // 사용자의 답변을 확인
    function checkAnswer(selectedOption) {
        const word = words[currentIndex];

        if (selectedOption === word.correctAnswer) {
            document.getElementById('result').innerText = '정답입니다!';
        } else {
            document.getElementById('result').innerText = '오답입니다!';
        }

        currentIndex++;
        setTimeout(() => {
            document.getElementById('result').innerText = '';
            showWord();
        }, 1000); // 1초 후 다음 문제로 넘어갑니다.
    }
});
