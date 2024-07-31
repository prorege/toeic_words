document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const day = urlParams.get('day');
    let currentIndex = 0;
    let words = [];
    let correctCount = 0;
    let incorrectWords = [];

    // 데이터 로드
    fetch(`words_day${day}.json`)
        .then(response => response.json())
        .then(data => {
            words = data[`day${day}`];
            if (words) {
                showWord();
                initializeProgress(words.length);
            } else {
                console.error('데이터를 찾을 수 없습니다.');
                document.getElementById('question').innerText = '데이터를 찾을 수 없습니다.';
            }
        })
        .catch(error => console.error('Error loading JSON:', error));

    // 단어와 선택지를 화면에 표시
    function showWord() {
        if (currentIndex >= words.length) {
            showFinalResult();
            return;
        }

        const word = words[currentIndex];
        document.getElementById('question').innerText = word.eng;
        document.getElementById('option1').innerText = word.kor1;
        document.getElementById('option2').innerText = word.kor2;

        document.getElementById('option1').onclick = function() { checkAnswer(word.kor1); };
        document.getElementById('option2').onclick = function() { checkAnswer(word.kor2); };

        updateProgress(); // 진행 상황 업데이트 호출
    }

    // 사용자의 답변을 확인
    function checkAnswer(selectedOption) {
        const word = words[currentIndex];

        if (selectedOption === word.correctAnswer) {
            document.getElementById('result').innerText = '정답입니다!';
            document.getElementById('result').classList.add('correct');
            document.getElementById('result').classList.remove('incorrect');
            correctCount++;
        } else {
            document.getElementById('result').innerText = '오답입니다!';
            document.getElementById('result').classList.add('incorrect');
            document.getElementById('result').classList.remove('correct');
            incorrectWords.push(word);
        }

        currentIndex++;
        setTimeout(() => {
            document.getElementById('result').innerText = '';
            showWord();
        }, 1000); // 1초 후 다음 문제로 넘어갑니다.
    }

    // 퀴즈 진행 상황 업데이트
    function updateProgress() {
        const progressBlocks = document.querySelectorAll('.progress-block');
        progressBlocks.forEach((block, index) => {
            if (index < currentIndex) {
                block.classList.add('filled');
            } else {
                block.classList.remove('filled');
            }
        });
    }

    // 퀴즈 진행 상황 초기화
    function initializeProgress(totalWords) {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-container';
        
        const progressBlocksContainer = document.createElement('div');
        progressBlocksContainer.className = 'progress-blocks';

        for (let i = 0; i < totalWords; i++) {
            const block = document.createElement('div');
            block.className = 'progress-block';
            progressBlocksContainer.appendChild(block);
        }

        progressContainer.appendChild(progressBlocksContainer);
        document.querySelector('main').insertBefore(progressContainer, document.querySelector('.question'));
    }

    // 퀴즈가 끝난 후 결과 표시
    function showFinalResult() {
        document.getElementById('question').innerHTML = '';
        document.getElementById('option1').style.display = 'none';
        document.getElementById('option2').style.display = 'none';

        const finalResultDiv = document.getElementById('result');
        finalResultDiv.classList.add('final-result');
        finalResultDiv.innerHTML = `
            <div>퀴즈가 완료되었습니다!</div>
            <div>총 ${words.length}문제 중 ${correctCount}문제 맞추셨습니다.</div>
            <div>틀린 단어:</div>
            <ul>
                ${incorrectWords.map(word => `<li>${word.eng} - ${word.correctAnswer}</li>`).join('')}
            </ul>
        `;

        // 홈 버튼 보이기
        document.getElementById('home-button').style.display = 'block';
        // 진행 상황 블록 최종 업데이트
        updateProgress();
    }

    // 홈 버튼 클릭 시 홈 페이지로 이동
    document.getElementById('home-button').addEventListener('click', function() {
        window.location.href = 'index.html';
    });
});
