// Définition des questions
const questions = [
    { question: "Lequel de ces artistes n'a pas de feat avec Zamdane ?", options: ["J9uve", "PLK", "Niska"],    answer: "b" },
    { question: "Combien y'a t'il de secondes dans 83 minutes ?", options: ["4820", "4360", "4980"],    answer: "c" },
    { question: "Laquelle de ces réponses n'est pas une capitale ?", options: ["Naraboju", "Paramaribo", "Bujumbura"],    answer: "a" },
    { question: "Qu'elle est la traduction de Folter ? (c'est de l'allemand) ", options: ["Supplice","Martyre","Torture"],    answer: "c" },
    { question: "Lequel de ces langages informatiques ne m'a pas servi lors de la création de ce quiz ?", options: ["CSS", "HTML", "Python"],    answer: "c" },
    { question: "Qui a gagné l'Oscar de la Meilleure Actrice en 2021 (pour les films de 2020) ?", options: ["Jennifer Lawrence", "Frances McDormand", "Vanessa Kirby"],    answer: "b" },
    { question: "Quelle est la couleur hexadécimale pour le blanc ?", options: ["#fff", "#000", "#www"],    answer: "a" },
    { question: "Si vous laissiez les 15 secondes passer a chaque fois combien de temps durerait ce quiz ?", options: ["2 minutes 30 secondes''", "4 minutes ", "5 minutes"],    answer: "b" },
    { question: "Quel est le prénom le plus attribué pour les garçons en 2023 ?", options: ["Raphaël", "Arthur", "Gabriel"],    answer: "c" },
    { question: "Qui n'a pas participé a l'émission Américaine de Hot Ones ?", options: ["Jack Harlow", "Drake", "Dababy"],    answer: "b" },
    { question: "Combien y a-t-il de mots dans la version complète de La Marseillaise (environ) ?", options: ["550", "830", "140"],    answer: "b" },
    { question: "Laquelle de ces années n'est pas celle du Dragon (signe chinois) ?", options: ["2038", "1952", "2012"],    answer: "a" },
    { question: "Combien y'avait t'il de membres dans les Jackson Five ? ", options: ["15", "10", "5"],    answer: "c" },
    { question: "Quelles étaient les réponses proposées pour la question sur les secondes ?", options: ["4620,4350,4720", "4820,4360,4980", "4630,4920,4880"],    answer: "b" },
    { question: "Dans le comics Avengers 1 (1963) lequelle de ces héros n'est pas un membre de l'équipe ?", options: ["Thor", "Captain America", "La Guêpe"],    answer: "b" },
    { question: "Combien de films Christopher Nolan a-t-il réalisé ?", options: ["12", "15", "19"],    answer: "a" },
    { question: "Comment écrit-on *Je déteste cette question* en Japonais ?", options: ["この質問が好きではありません。", "この質問が大嫌いです。", "この質問が嫌いです。"],    answer: "c" },
    { question: "Qu'est-ce qui écrit sur la 5ème vignette de la 46ème page du 12ème tome de la BD *Seuls* (Gazzoti Vehlmann)", options: ["WHOOOOSH", "...Les meilleurs...", "Elle...Elle nous fonce dessus !"],    answer: "c" },
    { question: "Lequel de ces esprits japonais n'existe pas ?", options: ["Tsuchinoko", "Kamigoroshi", "Nirukashi"],    answer: "b" },
    { question: "Et enfin, en quelle année est mort Henry Barton, l'inventeur des lampadaires ?", options: ["1435", "1632", "1523"],    answer: "a" }
];


// Initialisation des variables
let currentQuestion = 0;
let score = 0;
let timerInterval;

// Récupération des éléments du DOM
const introDiv = document.getElementById('intro');
const startBtn = document.getElementById('start-btn');
const quizContainer = document.getElementById('quiz-container');
const questionText = document.getElementById('question-text');
const optionsList = document.getElementById('options-list');
const submitButton = document.getElementById('submit-btn');
const timerDisplay = document.getElementById('timer');

// Fonction pour lancer le quizz
function startQuiz() {
    introDiv.style.display = 'none'; // Cacher l'intro
    quizContainer.style.display = 'block'; // Afficher le quiz
    loadQuestion(); // Charger la première question
}

// Écouter le clic sur le bouton "Lancer le Quizz"
startBtn.addEventListener('click', startQuiz);

// Fonction pour charger une question
function loadQuestion() {
    resetTimer(); // Réinitialiser le compteur
    questionText.textContent = `Question ${currentQuestion + 1}: ${questions[currentQuestion].question}`;
    optionsList.innerHTML = '';

    // Affichage des options de réponse
    questions[currentQuestion].options.forEach((option, index) => {
        const listItem = document.createElement('li');
        const radioInput = document.createElement('input');

        radioInput.type = 'radio';
        radioInput.name = `q${currentQuestion}`;
        radioInput.value = String.fromCharCode(97 + index);  

        listItem.appendChild(radioInput);
        listItem.appendChild(document.createTextNode(` ${option}`));
        optionsList.appendChild(listItem);
    });

    startTimer(); // Démarrer le compte à rebours
}

// Fonction pour démarrer le compte à rebours
function startTimer() {
    let timeLeft = 15;
    timerDisplay.textContent = `Temps restant : ${timeLeft} secondes`;

    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Temps restant : ${timeLeft} secondes`;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            checkAnswer();
        }
    }, 1000);
}

// Fonction pour réinitialiser le compteur
function resetTimer() {
    clearInterval(timerInterval);
}

// Fonction pour vérifier la réponse
function checkAnswer() {
    const selectedOption = document.querySelector(`input[name="q${currentQuestion}"]:checked`);
    
    if (selectedOption) {
        if (selectedOption.value === questions[currentQuestion].answer) {
            score++;
        }

        currentQuestion++;
        
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    } else {
        // Si aucune réponse n'est sélectionnée, passer à la question suivante
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }
}

submitButton.addEventListener('click', () => {
    checkAnswer(); // Vérifie la réponse actuelle
    resetTimer(); // Réinitialise le timer
    loadQuestion(); // Charge la prochaine question
});

// Fonction pour afficher les résultats
function showResults() {
    quizContainer.innerHTML = `<h2>Score final : ${score} sur ${questions.length}</h2>`;
}
