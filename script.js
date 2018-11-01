// récupère des questions depuis l'api, si api répond correctement = ok , si api renvoie une erreur on charge notre version hors ligne, le dossier default question//

function getApiQuestions() { 
  const xhttp = new XMLHttpRequest(); // const represente une variable dont on ne peut pas changer la valeur //
  xhttp.open("GET", "https://opentdb.com/api.php?amount=10&difficulty=easy&type=boolean", false);
  xhttp.send();
  let response = JSON.parse(xhttp.response);
	if(response.response_code == 0) {
	return response;	// renvoie la donnée et arrête la fonction d'exécution//
	} else {
	console.log("Loading from cache");
	xhttp.open("GET", "./defaultQuestions.json", false);
  	xhttp.send();
	return JSON.parse(xhttp.response);
	}
}
// enregistre dans le locale storage un objet contenant dse questions //
function saveQuestions(questions){
	localStorage.setItem("questions",JSON.stringify(questions)); // setItem = insere ou remplace un élément dans la memoir du navigateur/:
}

// Recupere une question depuis le localStorage via sa clé //
function getQuestion(id){ // getitem récupere un élément depuis depuis la mémoire du navigateur//
 	let questions = JSON.parse(localStorage.getItem("questions"));
	let question = questions.results[id];
	displayQuestion(question);
}
//affiche les infos de la question dans le dom HTML//
function displayQuestion(question) {
	document.querySelector('[data-value="question"]').innerHTML= question.question;
	if(question.correct_answer == "True"){
		document.querySelector('[data-value="True"]').id ="True";
		document.querySelector('[data-value="False"]').id ="False";
	} else {													   
		document.querySelector('[data-value="True"]').id ="False";
		document.querySelector('[data-value="False"]').id ="True";															   
  }
}
// enregistre le numero de la prochaine question//
function setQuestionNumber(number){
	localStorage.setItem("questionNumber",number);
}


// Si on clic sur la bonne reponse = ajoute un point et change de question, sinon change juste de question//
document.querySelector(".bloc-buttons").addEventListener("click", function(el) {
	if(el.target.id == "True") {
		score += 1
		document.querySelector(".base-score").innerHTML = score;
		setQuestionNumber(parseInt(localStorage.getItem("questionNumber")) + 1);
		getQuestion(localStorage.getItem("questionNumber"));
	} else if(el.target.id == "False") {
		setQuestionNumber(parseInt(localStorage.getItem("questionNumber")) + 1);
		getQuestion(localStorage.getItem("questionNumber"));
		
	}
}); 

let score = 0
const questions = getApiQuestions();
saveQuestions(questions);
setQuestionNumber(0);
getQuestion(localStorage.getItem("questionNumber"));
