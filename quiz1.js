const quizData = [
    {
      question: "What is the capital of France?",
     
        a: "Madrid",
        b: "Berlin",
        c: "Paris",
        d: "Rome",
      
      correct: "c" 
      // The key of the correct option
    },
    {
      question: "Which planet is known as the 'Red Planet'?",
      a: "Venus",
        b: "Mars",
        c: "Jupiter",
        d: "Saturn",
      correct: "b"
      
    },
    {
      question: "What is the largest ocean on Earth?",
      a: "Atlantic Ocean",
        b: "Indian Ocean",
        c: "Pacific Ocean",
        d: "Arctic Ocean",
      correct: "c"
      
    },
    {
      question: "Who wrote 'Romeo and Juliet'?",
      a: "Charles Dickens",
        b: "William Shakespeare",
        c: "Mark Twain",
        d: "J.K. Rowling",
      correct: "b"
     
    },
    {
      question: "Which element has the chemical symbol 'O'?",
      a: "Oxygen",
      b: "Gold",
      c: "Osmium",
      d: "Silver",
      correct: "a"
      
    }
]
const quiz= document.getElementById('quiz');
const resultEle = document.getElementById('result');
const scoreEle = document.getElementById('score');
const answerEls= document.querySelectorAll('.answer');
const labelEls= document.querySelectorAll('.op_label');
const questionEls= document.getElementById('question')
const a_text= document.getElementById('a_text')
const b_text= document.getElementById('b_text')
const c_text= document.getElementById('c_text')
const d_text= document.getElementById('d_text')
const prevBtn= document.getElementById('prev')
const nextBtn= document.getElementById('next')
const submitBtn= document.getElementById('submit')

let currentQtn= 0;
let answered= 0;
let submitted= false;
let userSelected={
  
}
loadQuiz();
function loadQuiz(){
  questionEls.innerText= quizData[currentQtn].question;
  a_text.innerText= quizData[currentQtn].a
  b_text.innerText= quizData[currentQtn].b
  c_text.innerText= quizData[currentQtn].c
  d_text.innerText= quizData[currentQtn].d
  deSelectAnswer()

  if(userSelected[currentQtn]) {
    let selected= userSelected[currentQtn];
    document.getElementById(selected).checked = true
  }
  if(currentQtn == quizData.length-1){
    nextBtn.style.display='none'
    submitBtn.style.display='block'
  }
  if(submitted){
    let actualAns= quizData[currentQtn].correct;
    let userSelectd= userSelected[currentQtn];
    labelEls.forEach(
      (labelEle)=> {
        labelEle.classList.remove('correct')
        labelEle.classList.remove('wrong')
      }
    )

    if( actualAns == userSelectd) {
      let op= actualAns + '_text';
      document.getElementById(op).classList.add('correct');
    }
    else {
      let correct_op= actualAns + '_text';
      document.getElementById(correct_op).classList.add('correct');
      let user_op= userSelectd + '_text';
      document.getElementById(user_op).classList.add('wrong');
    }
  }

}
function deSelectAnswer(){
  answerEls.forEach(
    (answerEle)=> {
    answerEle.checked= false
     
    
  })
}
nextBtn.addEventListener(
  'click', () => {
    let answer = getSelected();
    if(!submitted){
    if (answer){
      if(answer == quizData[currentQtn].correct){
        answered++
        
      }
      currentQtn++
      if(currentQtn < quizData.length){
         loadQuiz()
      }
    }
  }
  else{
    currentQtn++
    loadQuiz();
  }
  }
)
submitBtn.addEventListener(
  'click', ()=> {
    if(getSelected()){
   
      quiz.style.display = 'none';
      resultEle.style.display = 'block';
      submitted= true;
      scoreEle.innerText= answered + "/" + quizData.length + "Answered correcty";
    }
  }
)
function getSelected() {
let answer;
answerEls.forEach(
  (answerEle)=> {
  if(answerEle.checked){
    answer = answerEle.id
     userSelected[currentQtn]= answer
  }
})
return answer;
}
prevBtn.addEventListener(
  'click', () => {
    if(currentQtn > 0){
      currentQtn--
      loadQuiz();
    }
  }
)
function loadAnswers(){
  currentQtn= 0;
  quiz.style.display = 'block';
  resultEle.style.display = 'none';
  answerEls.forEach(
    (answerEle)=> {
    answerEle.disabled= true;
    }
  )
  nextBtn.style.display='block'
    submitBtn.style.display='none'
    loadQuiz();
}
      