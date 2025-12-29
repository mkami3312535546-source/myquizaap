const addBtn = document.getElementById("add-quiz");
const msg = document.getElementById("msg");


const selectedSection = localStorage.getItem("selectedSection");

const allQuizzes = JSON.parse(localStorage.getItem("allQuizzes")) || {
    islamic: [],
    urdu: [],
    english: [],
    science: []
};

// Load questions of selected section
const allquestions = allQuizzes[selectedSection] || [];

if (allquestions.length === 0) {
    document.getElementById("show-quiz").textContent = 
        "No questions available in this section.";
}





addBtn.addEventListener("click", () => {

    // Selected section
    const sectionRadio = document.querySelector('input[name="section"]:checked');
    const section = sectionRadio ? sectionRadio.value : null;

    // Question
    const question = document.getElementById("question").value.trim();

    // Options
    const options = [
        document.getElementById("opt0").value.trim(),
        document.getElementById("opt1").value.trim(),
        document.getElementById("opt2").value.trim(),
        // document.getElementById("opt3").value.trim()
    ];

    // Correct answer radio
    const correctRadio = document.querySelector('input[name="correct"]:checked');

    // Validation
    if (!section || !question || options.some(opt => opt === "") || !correctRadio) {
        msg.textContent = "Please fill all fields and select correct answer";
        msg.style.color = "red";
        return;
    }

    // Quiz object
    const quizItem = {
        question: question,
        answer: options,
        correct: options[correctRadio.value]
    };

    // Load existing quizzes
    let allQuizzes = JSON.parse(localStorage.getItem("allQuizzes")) || {
        islamic: [],
        urdu: [],
        english: [],
        science: []
    };

    // Add to selected section
    allQuizzes[section].push(quizItem);

    // Save back to storage
    localStorage.setItem("allQuizzes", JSON.stringify(allQuizzes));

    msg.textContent = "Quiz added successfully ✅";
    msg.style.color = "green";

    // Reset form
    document.getElementById("question").value = "";
    options.forEach((_, i) => document.getElementById(`opt${i}`).value = "");
    correctRadio.checked = false;
});
