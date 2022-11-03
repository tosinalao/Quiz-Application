

const questions = [
  {
    questionType : "true_false",
    questionText : "Java is a coding language",
    correctAnswer : "true",
    options : ["true", "false"],
  },
  {
    questionType : "multiple_choice",
    questionText : "Which HTML tag creates a hyperlink to web pages, files, email addresses, locations in the same page, or anything else a URL can address",
    correctAnswer : "<a>",
    options : ["<a>","<h1>","<span>","<nav>"],
  },
  {
    questionType : "image_choice",
    questionText : "Which of these is the proper way to write a script tag?",
    correctAnswer : "3",
    options : ["1", "2", "3", "4"],
  },
  {
    questionType : "text_input",
    questionText : "What is the first heading tag",
    correctAnswer : "<h1>",
    answerFieldId : "answer_to_question"
  },
  {
    questionType : "blank_input",
    questionText : "The ___ tag inserts a single line break",
    correctAnswer : "<br>",
    answerFieldId : "answer_to_question"
  }
]

// appState, keep information about the State of the application.
const appState = {
    current_view : "#input_view",
    current_question : -1,
    current_model : {}
}

//
// start_app: begin the applications.
//

document.addEventListener('DOMContentLoaded', () => {
  // Set the state
  appState.current_view =  "#input_view";
  appState.current_model = {
    action : "submit"
  }
  update_view(appState);

  //
  // EventDelegation - handle all events of the widget
  //

  document.querySelector("#widget_view").onclick = (e) => {
      handle_widget_event(e)
  }
});



function handle_widget_event(e) {
  if (appState.current_view == "#input_view"){
    if (e.target.dataset.action == "submit") {
      appState.current_view =  "#menu_view";
         appState.current_model = {
           action : "quiz_1",
           action : "quiz_2"
         }
        // Now that the state is updated, update the view.
        update_view(appState);
    }
  }

  //if (appState.current_view == "#input_view"){
    //if (e.target.dataset.action == "submit") {
      //appState.current_view =  "#menu_view";
        // appState.current_model = {
          // action : "quiz_2"
         //}
        // Now that the state is updated, update the view.
        //update_view(appState);
    //}
  //}


  if (appState.current_view == "#menu_view"){
    if (e.target.dataset.action == "quiz_1") {
      appState.current_view =  "#intro_view";
         appState.current_model = {
           action : "start_app"
         }
        // Now that the state is updated, update the view.
        update_view(appState);
    }
  }

  if (appState.current_view == "#menu_view"){
    if (e.target.dataset.action == "quiz_2") {
      appState.current_view =  "#intro_view";
         appState.current_model = {
           action : "start_app"
         }
        // Now that the state is updated, update the view.
        update_view(appState);
    }
  }


  if (appState.current_view == "#intro_view"){
    if (e.target.dataset.action == "start_app") {

        // Update State (current model + state variables)
        appState.current_question = 0
        appState.current_model = questions[appState.current_question];
        // process the appState, based on question type update appState.current_view
        setQuestionView(appState);

        // Now that the state is updated, update the view.
        update_view(appState);
    }
  }

  // Handle the answer event for true or false.
 if (appState.current_view == "#question_view_true_false") {

    if (e.target.dataset.action == "answer") {
       // implement logic.
      isCorrect = check_user_response(e.target.dataset.answer, appState.current_model);

       // Update the state.
       appState.current_question =   appState.current_question + 1;
       appState.current_model = questions[appState.current_question];
       setQuestionView(appState);

       // Update the view.
       update_view(appState);

     }
   }

   // Handle the answer event for multiple choice.
   if (appState.current_view == "#question_view_multiple_choice") {

     if (e.target.dataset.action == "choice") {
        // Controller - implement logic.
        isCorrect = check_user_response(e.target.dataset.answer, appState.current_model);

        // Update the state.
        appState.current_question =   appState.current_question + 1;
        appState.current_model = questions[appState.current_question];
        setQuestionView(appState);

        // Update the view.
        update_view(appState);

      }
    }

    // Handle the answer event for image choice.
    if (appState.current_view == "#question_view_image_choice") {

      if (e.target.dataset.action == "image") {
         // Controller - implement logic.
         isCorrect = check_user_response(e.target.dataset.answer, appState.current_model);

         // Update the state.
         appState.current_question =   appState.current_question + 1;
         appState.current_model = questions[appState.current_question];
         setQuestionView(appState);

         // Update the view.
         update_view(appState);

       }
     }

   // Handle answer event for  text questions.
   if (appState.current_view == "#question_view_text_input") {
       if (e.target.dataset.action == "submit") {

           user_response = document.querySelector(`#${appState.current_model.answerFieldId}`).value;
           isCorrect = check_user_response(e.target.dataset.answer, appState.current_model);
           updateQuestion(appState)

           setQuestionView(appState);
           update_view(appState);
       }
    }

    // Handle answer event for fill in the blank questions.
    if (appState.current_view == "#question_view_blank_input") {
        if (e.target.dataset.action == "blank_input") {

            user_response = document.querySelector(`#${appState.current_model.answerFieldId}`).value;
            isCorrect = check_user_response(e.target.dataset.answer, appState.current_model);
            updateQuestion(appState)

            setQuestionView(appState);
            update_view(appState);
        }
     }


    // Handle answer event for end view.
    if (appState.current_view == "#end_view") {
        if (e.target.dataset.action == "start_again") {
          appState.current_view =  "#input_view";
          appState.current_model = {
            action : "submit"
          }
          update_view(appState);

        }
      }

 } // end of handle_widget_event


function check_user_response(user_answer, model) {
  if (user_answer == model.correctAnswer) {
    return true;
  }
  return false;
}

function updateQuestion(appState) {
    if (appState.current_question < questions.length-1) {
      appState.current_question =   appState.current_question + 1;
      appState.current_model = questions[appState.current_question];
    }
    else {
      appState.current_question = -2;
      appState.current_model = {};
    }
}

function setQuestionView(appState) {
  if (appState.current_question == -2) {
    appState.current_view  = "#end_view";
    return
  }

  if (appState.current_model.questionType == "true_false")
    appState.current_view = "#question_view_true_false";
  else if (appState.current_model.questionType == "multiple_choice")
    appState.current_view = "#question_view_multiple_choice";
  else if (appState.current_model.questionType == "image_choice")
    appState.current_view = "#question_view_image_choice";
  else if (appState.current_model.questionType == "blank_input")
    appState.current_view = "#question_view_blank_input";
  else if (appState.current_model.questionType == "text_input") {
    appState.current_view = "#question_view_text_input";
  }
}

function update_view(appState) {

  const html_element = render_widget(appState.current_model, appState.current_view)
  document.querySelector("#widget_view").innerHTML = html_element;
}
//

const render_widget = (model,view) => {
  // Get the template HTML
  template_source = document.querySelector(view).innerHTML
  // Handlebars compiles the above source into a template
  var template = Handlebars.compile(template_source);

  // apply the model to the template.
  var html_widget_element = template({...model,...appState})

  return html_widget_element
}
