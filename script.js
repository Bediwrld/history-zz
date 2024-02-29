const quizData = [
    {
        question: "Kur filloi lufta e parë botërore?",
        a: "28 Qërshor 1914",
        b: "23  Qërshor 1914",
        c: "12 Janar 1912",
        d: "28 Gusht 1913",
        correct: "a",
    },
    {
        question: "Kur mbaroi lufta e parë botërore?",
        a: "15 Nëntor 1918",
        b: "11 Nëntor 1918",
        c: "23 Janar 1915",
        d: "23 Qërshor 1919",
        correct: "b",
    },
    {
        question: "Në sa periudha krzesore ndahet historia?",
        a: "Parahistoria dhe Historia",
        b: "Koha e vjetër dhe Koha e re",
        c: "Paleoliti dhe Neoliti",
        d: "Koha e re dhe Koha më e re",
        correct: "a",
    },
    {
        question: "Cilin vit filloi lufta e dztë botërore?",
        a: "11 Shtator 1945",
        b: "2 Shator 1945",
        c: "1 Shator 1945",
        d: "asnjëra nga më lartë",
        correct: "c",
    },
    {
        question: "Cili është qytetërimi më i lashtë?",
        a: " Mongolët",
        b: "Helenet",
        c: "Babilonët",
        d: "Sumerët",
        correct: "d",
    },
    {
        question: "Cili qytetërim e krijoi shkrimin e parë figurativ?",
        a: "Helenët",
        b: "Sumerët",
        c: "Babilonët",
        d: "Romakët",
        correct: "b",
    },
    {
        question: "Cili civilizim i lashtë i krijoi anijet me vela?",
        a: "Egjiptianët",
        b: "Helenët",
        c: "Fenikasit",
        d: "asnjëra nga më lartë",
        correct: "c",
    },
    {
        question: "Si quheshin dy vëllezërit e famshëm të legjendës së Romës?",
        a: "Romuli dhe Remi",
        b: "Romuli dhe Zeusi",
        c: "Hermes dhe Poseidon",
        d: "Ronuli dhe Reni",
        correct: "a",
    },
    {
        question: "Me cilеn fjali i friksonin nenat femijet ne romen e vjeter?",
        a: "Hanibali ndodhet prapa portave",
        b: "Hanibali ndodhet përpara portave",
        c: "Piroja ndodhet para portave",
        d: "asnjëra nga më lartë",
        correct: "b",
    },
    {
        question: "Në sa pjesë u nda perëndoria Romake në vitin 395?",
        a: "3",
        b: "nuk u nda",
        c: "2",
        d: "4",
        correct: "c",
    },
    {
        question: "Kush ishte kontributori më i madh i Fashizmit?",
        a: "Adolf Hitler",
        b: "Stalin",
        c: "Yao Ming",
        d: "Benito Mussolini",
        correct: "d",
    },
    {
        question: "Cili ishte shkaku kryesor për fillimin e luftës së dytë botërore?",
        a: "Vrasja e trashigimtarit Austro-hungarez Franc Ferdinand",
        b: "Shpallja e luftës nga Franca kundër Gjermanisë",
        c: "Rreziqet e tregtisë globale",
        d: "asnjëra nga më lartë",
        correct: "a",
    },
    {
        question: "Kur filloi marrëveshja paqësore e Parisit?",
        a: "19 janar 1918",
        b: "18 janar 1917",
        c: "22 janar 1918",
        d: "18 janar 1918",
        correct: "d",
    },
    {
        question: "Qka ishte holokausti?",
        a: "Vrasje sistematike e hebrenjëve dhe popullsisë tjetër",
        b: "Rritja e kontributit të hebrenjëve në shoqëri",
        c: "Zhvillimi i teknologjisë informative",
        d: "asnjëra nga më lartë",
        correct: "a",
    },
    {
        question: "Ku u hodh bomba atomike?",
        a: "Osaka dhe Tokyo",
        b: "Hiroshima dhe Nagasaki",
        c: "Kyoto dhe Kawasaki",
        d: "Hiroshima dhe Niggasaki",
        correct: "b",
    },
];
    const quiz= document.getElementById('quiz')
    const answerEls = document.querySelectorAll('.answer')
    const questionEl = document.getElementById('question')
    const a_text = document.getElementById('a_text')
    const b_text = document.getElementById('b_text')
    const c_text = document.getElementById('c_text')
    const d_text = document.getElementById('d_text')
    const submitBtn = document.getElementById('submit')
    let currentQuiz = 0
    let score = 0
    loadQuiz()
    function loadQuiz() {
        deselectAnswers()
        const currentQuizData = quizData[currentQuiz]
        questionEl.innerText = currentQuizData.question
        a_text.innerText = currentQuizData.a
        b_text.innerText = currentQuizData.b
        c_text.innerText = currentQuizData.c
        d_text.innerText = currentQuizData.d
    }
    function deselectAnswers() {
        answerEls.forEach(answerEl => answerEl.checked = false)
    }
    function getSelected() {
        let answer
        answerEls.forEach(answerEl => {
            if(answerEl.checked) {
                answer = answerEl.id
            }
        })
        return answer
    }
    submitBtn.addEventListener('click', () => {
        const answer = getSelected()
        if(answer) {
           if(answer === quizData[currentQuiz].correct) {
               score++
           }
           currentQuiz++
           if(currentQuiz < quizData.length) {
               loadQuiz()
           } else {
               quiz.innerHTML = `
               <h2>You answered ${score}/${quizData.length} questions correctly</h2>
               <button onclick="location.reload()">Reload</button>
               `
           }
        }
    })
