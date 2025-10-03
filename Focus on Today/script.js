const checkBoxList = document.querySelectorAll(".custom-checkbox");
const inputFields = document.querySelectorAll(".goal-input");
const errorLabel = document.querySelector(".error-label");
const progressLabel = document.querySelector(".progress-label");
const showError = document.querySelector(".show-wrapper");
const progressValue = document.querySelector(".progress-value");

//quotes
const allQutes = [
  "Raise the bar by completting your goals!",
  "Well begun is half done!",
  "Just a step away, keep going!",
  "Come on !",
  "Whoa! You just completed all the goals, time for chill :)",
];

//for storing data in localstorage
//data asel tr ls mdhyn yenar nahitr empty obj
// const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {
//     first:{
//         name:'',
//         completed:false,
//     },

//     second:{
//         name:'',
//         completed:false,
//     },

//     third:{
//         name:'',
//         completed:false,
//     },
// };

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};

//variable for which goal id is completed
let completedGoalsCount = Object.values(allGoals).filter(
  (goal) => goal.completed
).length;
//starting la width disay
progressValue.style.width = `${(completedGoalsCount / inputFields.length) * 100}%`;
progressValue.firstElementChild.innerText = `${completedGoalsCount}/${inputFields.length} Completed`;
progressLabel.innerText = allQutes[completedGoalsCount];

checkBoxList.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    const allGoalsAdded = [...inputFields].every((input) => {
      return input.value;
    });

    if (allGoalsAdded) {
      checkbox.parentElement.classList.toggle("completed");

      //mla as pahije mi checkbox la click kelyavr smjay hava kontya input la click kely
      const inputId = checkbox.nextElementSibling.id;
      // console.log(inputId);

      //completed chi value true asel tr false and f asel t
      allGoals[inputId].completed = !allGoals[inputId].completed;

      //update kel value..page reload karay lagnar nahi ..check and uncheck kelyavr update honar value
      completedGoalsCount = Object.values(allGoals).filter(
        (goal) => goal.completed
      ).length;
      progressValue.style.width = `${(completedGoalsCount / inputFields.length) * 100}%`;

      //dynamically update span 2/3 completed
      progressValue.firstElementChild.innerText = `${completedGoalsCount}/${inputFields.length}`;

      //add label
      progressLabel.innerText = allQutes[completedGoalsCount];

      //ls mdhe update kele
      localStorage.setItem("allGoals", JSON.stringify(allGoals));
    } else {
      showError.parentElement.classList.add("show-error");
    }
  });
});

inputFields.forEach((input) => {
  //fetching data from ls
  // console.log(allGoals[input.id]);
  if (allGoals[input.id]) {
    input.value = allGoals[input.id].name;

    //page reload zala tri pan
    //tick kelel aahe as rahnar
    if (allGoals[input.id].completed) {
      input.parentElement.classList.add("completed");
    }
  }

  input.addEventListener("focus", () => {
    showError.parentElement.classList.remove("show-error");
  });

  input.addEventListener("input", (e) => {
    //akda tick kelyavr goal chng nahi honar
    if (allGoals[input.id] && allGoals[input.id].completed) {
      input.value = allGoals[input.id].name;
      return;
      //Then it uses return to immediately exit
      // the input event handler function — so that the code below doesn't run.
    }

    if(allGoals[input.id]){
        allGoals[input.id].name = input.value;
    }else{
        allGoals[input.id] = {
            name:input.value,
            completed:false,

        }
    }
   
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});
