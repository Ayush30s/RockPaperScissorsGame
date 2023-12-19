//  updating the score to new values that are already saved
//  in the local storage in line 80 no. so that if we reload
//  the page the score do not start with 0 instead of that
//  we start it where we left it in the local storage
let score = JSON.parse(localStorage.getItem('score')) || {
    wins : 0,
    losses : 0,
    ties : 0 ,
    move : ' '
};


//fucntion to pick move by computer
function computerPicked() {
    var num = Math.random();
    if(num < 1/3) {
        return 'Rock';
    }else if(num >= 1/3 && num < 2/3) {
        return 'Paper';
    }else{
        return 'Scissors';
    }
} 
 
function askToReset() {
    document.querySelector('.js-Play-or-not').innerHTML = '<p>Are you sure you want to reset the score? <button class="js-yes-button yes-button">Yes</button> <button class="js-no-button no-button">No</button></p>';
    document.querySelector('.js-yes-button').addEventListener('click', (event) => {
        console.log(event);
        resetScore();
        document.querySelector('.js-Play-or-not').innerHTML = ' ';
    });

    document.querySelector('.js-no-button').addEventListener('click', (event) => {
        document.querySelector('.js-Play-or-not').innerHTML = ' ';
    });
}


//fucntion to update the score
function updateScore() {
    document.querySelector('.js-score').innerHTML = `wins : ${score.wins} , Losses : ${score.losses} and Ties! : ${score.ties}`;
}

function resetScore() {
    score.wins = 0;
    score.losses =0;
    score.ties = 0;
    updateScore();
    localStorage.removeItem('score');
}

// Reset button
document.querySelector('.js-reset-button').addEventListener('click', (event) => {
    askToReset();
});

//Reset using backspace
document.body.addEventListener('keydown' , (event) => {
    const buton = event.key;
    if(buton == ' ') {
        askToReset();
    }
});


//this command is to show the game score that have achieved before reloadibng the page 
//the same command in the last of the function will be responsible for updated value viewing
updateScore();


//function to auto play the game
let isPlaying = false;
let intervalId;

//if auto play is on make the button 'stop Playing' else when make it 'Auto Play'
function changeState() {
    const state = document.querySelector('.js-auto-play-button').innerHTML;
    if(state === 'Auto Play') {
        document.querySelector('.js-auto-play-button').
        innerHTML =  'Stop Playing';
    }else{
        document.querySelector('.js-auto-play-button').
        innerHTML = 'Auto Play';
    }
}

function autoPlay() {
    changeState();

    if(!isPlaying) {
        intervalId = setInterval(() => {
            const playerMove = computerPicked();
            playGame(playerMove);
        } , 1000);
        isPlaying = true;
    }else{
        clearInterval(intervalId);
        isPlaying = false;
    }
}


//Rock button
document.querySelector('.js-rock-button').addEventListener('click' , () => {
    playGame('Rock');
});

//Paper button
document.querySelector('.js-paper-button').addEventListener('click' , () => {
    playGame('Paper');
});

//Scissors button
document.querySelector('.js-scissors-button').addEventListener('click' , () => {  
    playGame('Scissors');
});



//autoplay button
document.querySelector('.js-auto-play-button').addEventListener('click' , () => {
    autoPlay();
});

//auto play using key
document.body.addEventListener('keydown' , (event) => {
    const val = event.key;
    if(val === 'a') {
        autoPlay();
    }
});



//play using key
document.body.addEventListener('keydown' , (event) => {
    const val = event.key;
    if(val === 'r') {
        playGame('rock');
    }else if(val === 's') {
        playGame('scissors');
    }else if(val === 'p') {
        playGame('paper');
    }
});


//fucntion to play the game
function playGame(myMove) {
    var result;
    var computerMove = computerPicked();
    if(myMove === 'Rock') {
        score.move = 'Rock';
        if(computerMove === 'Rock') {
            score.ties++;
            result = 'Ties!';
        }
        else if(computerMove === 'Paper') {
            score.losses++; 
            result = 'Lose!';
        }
        else{
            score.wins++;
            result = 'Win!';
        }
    }
    else if(myMove === 'Paper') {
        score.move = 'Paper';
        if(computerMove === 'Rock') {
            score.wins++;
            result = 'Win!';
        }
        else if(computerMove === 'Paper') {
            score.ties++; 
            result = 'Ties!';
        }
        else{
            score.losses++;
            result = 'Lose!';
        }
    }
    else{
        score.move = 'Scissors';
        if(computerMove === 'Rock') {
            score.losses++;
            result = 'Lose!';
        }
        else if(computerMove === 'Paper') {
            score.wins++; 
            result = 'Win!';
        }
        else{
            score.ties++;
            result = 'Ties!';
        }
    }

    document.querySelector('.js-moves').innerHTML = `You 
        <img src="${myMove}-emoji.png" class = "move-icon" >
        <img src="${computerMove}-emoji.png" class = "move-icon">
        computer`;
    document.querySelector('.js-results').innerHTML = `${result}`;
    //results
    localStorage.setItem('score' , JSON.stringify(score));

    //applied so that when we click any of the 3 buttons this command is executed 
    updateScore();
}