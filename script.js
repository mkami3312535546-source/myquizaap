const vshowquiz = document.getElementById('show-quiz')
const vanslist = document.getElementById('anslist')
const vscore = document.getElementById('score')
const vtotalquiz = document.getElementById('total-quiz')
const vtimedisplay = document.getElementById('time-display')
const vprobar = document.getElementById('pro-bar')
const vnext = document.getElementById('next')
const vprevious = document.getElementById('previous')
const result = document.getElementById('result')
const vsubmit = document.getElementById('submit')


const allquestions = [
    { question: 'What is the capital of Pakistan?', answer: ['Karachi', 'Hyderabad', 'Islamabad', 'Quetta'], correct: 'Islamabad' },
    { question: 'Who was the founder of Pakistan?', answer: ['Liaquat Ali Khan', 'Fatima Jinnah', 'Quiad e Azam', 'Allama Iqbal'], correct: 'Quiad e Azam' },
    { question: 'Who was the first prime minister of Pakistan?', answer: ['Quiad e Azam', 'Fatima Jinnah', 'Allama Iqbal', 'Liaquat Ali Khan'], correct: 'Liaquat Ali Khan' },
    { question: 'What is the biggest city of Pakistan?', answer: ['Hyderabad', 'Islamabad', 'Karachi', 'Quetta'], correct: 'Karachi' },
    { question: 'Who was the first Governor General of Pakistan?', answer: ['Allama Iqbal', 'Fatima Jinnah', 'Quiad e Azam', 'Liaquat Ali Khan'], correct: 'Quiad e Azam' }
];

let vdata = JSON.parse(localStorage.getItem('data')) || []
let currentindex = parseInt(localStorage.getItem('currentindex')) || 0
let score = parseInt(localStorage.getItem('score')) || 0
let vqueslength = allquestions.length;
let startTime = parseInt(localStorage.getItem("startTime")) || Date.now()
localStorage.setItem("startTime", startTime)


function savadata() {
    localStorage.setItem('data', JSON.stringify(vdata))
    localStorage.setItem('currentindex', currentindex)
    localStorage.setItem('score', score)
}

function updataprobar() {
    const progress = (vdata.filter(Boolean).length / allquestions.length) * 100
    vprobar.style.width = `${progress}%`

}

let timer
let time = 10
function quiztimer() {
    clearInterval(timer)
    time = 10
    vtimedisplay.textContent = time

    timer = setInterval(() => {
        vtimedisplay.textContent = `Quiz Time : ${time}`
        time--

        if (time < 0) {
            clearInterval(timer)
            alert('time is up')
            clearInterval(timer)
            Array.from(vanslist.children).forEach(item => item.style.pointerEvents = 'none')
            // showquiz(currentindex)
        }
    }, 1000)

}

function showquiz(index) {
    quiztimer()

    const vquestions = allquestions[index]

    vshowquiz.textContent = vquestions.question

    vanslist.textContent = ''
    vscore.textContent = `Score: ${score}`
    vtotalquiz.textContent = `Total Quiz: ${vqueslength}`

    vquestions.answer.forEach(Option => {
        const vlist = document.createElement('li')
        vlist.textContent = Option
        vanslist.appendChild(vlist)

        if (vdata[index]) {
            if (Option === vdata[index]) {
                if (Option === vquestions.correct) {
                    vlist.style.backgroundColor = 'green';
                } else {
                    vlist.style.backgroundColor = 'red';
                }
            }
            vlist.style.pointerEvents = 'none';
        }
        vlist.addEventListener('click', () => {
            if (vdata[index]) return   // already answered

            vdata[index] = Option

            if (Option === vquestions.correct) {
                vlist.style.backgroundColor = 'green'
                score++
                vscore.textContent = `Score: ${score}`
            } else {
                vlist.style.backgroundColor = 'red'
            }

            Array.from(vanslist.children).forEach(item => item.style.pointerEvents = 'none')

            savadata()
            updataprobar()
        })

    })

}
vnext.addEventListener('click', () => {
    if (currentindex < allquestions.length - 1) {
        currentindex++
        showquiz(currentindex)
    }
    else {
        vshowquiz.textContent = 'Complete Quiz'
        vanslist.textContent = ''
        vscore.textContent = `Score: ${score}`
        clearInterval(timer)
    }
})

vprevious.addEventListener('click', () => {
    if (currentindex > 0) {
        currentindex--
        showquiz(currentindex)
        Array.from(vanslist.children).forEach(item => item.style.pointerEvents = 'none')
    }
})
vsubmit.addEventListener('click', () => {

    const endTime = Date.now()
    const timeTaken = Math.floor((endTime - startTime) / 1000)

    const resultData = allquestions.map((q, index) => ({
        question: q.question,
        correct: q.correct,
        userAnswer: vdata[index] || "Not Answered"
    }))

    localStorage.setItem("resultData", JSON.stringify(resultData))
    localStorage.setItem("score", score)
    localStorage.setItem("total", allquestions.length)
    localStorage.setItem("timeTaken", timeTaken)

    // window.location.href = "result.html"
})

result.addEventListener('click', () => {
    window.location.href = "result.html"
})

showquiz(currentindex)

const navUser = document.getElementById("nav-username")
const loggedUser = localStorage.getItem("loggedInUser")

if (!loggedUser) {
    window.location.href = "login.html"
} else {
    navUser.textContent = loggedUser
}

function logout() {
    localStorage.removeItem("loggedInUser")
    window.location.href = "login.html"
}


