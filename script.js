//Created on 10-06-2023
//lastly updated on 12-06-2023

//Creating reference for needed element in DOM
let statusDisplay=document.querySelector('.status');
let userWinCountDisplay=document.querySelector('.userWinCount');
let pcWinCountDisplay=document.querySelector('.pcWinCount');
let userGuessUpdate=document.querySelector('.playerGuess');
let pcGuessUpdate=document.querySelector('.computerGuess');
let reset=document.querySelector('.reset');
let signs=document.querySelectorAll('.sign');
let sign=[...signs];

//Win Count declaration
let userWinCount=0;
let pcWinCount=0;

//Selecting all buttons and add event listener for every individual button
const buttons=document.querySelectorAll('button')
buttons.forEach((button)=>{
    button.addEventListener('click',()=>{
        game(button.className,playGround,computerGuess) //calling the game() with two callbacks.
    })
})

//Getting Computer's Guess
let computerGuess=function getComputerGuess(){
    const values=["Rock","Paper","Scissors"];
    return values[Math.floor(Math.random()*3)]
}

//Here, Where the game is actually played.
function playGround(value,computerGuess){  //computerGuess is a callback from game()
    let status="";
    cGuess=computerGuess(); //getting computer's guess.
    uGuess=value;
    
    let uSignValue=(uGuess=="Rock")? 0 :(uGuess=="Paper") ? 1 : (uGuess=="Scissors") ? 2 : true;
    let cSignValue=(cGuess=="Rock")? 0 :(cGuess=="Paper") ? 1 : (cGuess=="Scissors") ? 2 : true;
    
    userGuessUpdate.textContent = `Your Choice: ${sign[uSignValue].textContent}`;
    pcGuessUpdate.textContent = `Computer Choice: ${sign[cSignValue].textContent}`;

    //I intentionally wrote Switch for this.
    switch(uGuess){
        case (cGuess):
            status=`It's a Tie ! You both Chose ${uGuess}`;
            break;

        case ("Rock"):
            switch(cGuess){
                case "Paper":
                    pcWinCount++;
                    status=`${uGuess} lost Against ${cGuess}`;
                    break;
                case "Scissors":
                    userWinCount++;
                    status=`${uGuess} win Against ${cGuess}`
                    break;
            } 
        break;

        case ("Paper"):
            switch(cGuess){
                case "Scissors":
                    pcWinCount++;
                    status=`${uGuess} lost Against ${cGuess}`;
                    break;
                case "Rock":
                    userWinCount++;
                    status=`${uGuess} win Against ${cGuess}`
                    break;
            }
        break

        case ("Scissors"):
            switch(cGuess){
                case "Rock":
                    pcWinCount++;
                    status=`${uGuess} lost Against ${cGuess}`;
                    break;
                case "Paper":
                    userWinCount++;
                    status=`${uGuess} win Against ${cGuess}`
                    break;
            }
        break;       
    }
    return status;
}

//Running and Showing the status of the Game
function game(guess,playGroundCallback,computerGuessCallback){
        statusDisplay.textContent=playGroundCallback(guess,computerGuessCallback);   
        userWinCountDisplay.textContent=`Your Win count : ${userWinCount}`;
        pcWinCountDisplay.textContent= `Computer's Win count : ${pcWinCount}`;

    //Terminating after 5 rounds    
    if(userWinCount === 5 || pcWinCount ===5){
        document.querySelector('.Rock').disabled=true;         //
        document.querySelector('.Paper').disabled=true;        //Disabling the buttons
        document.querySelector('.Scissors').disabled=true;     //
        let whoWon= (userWinCount===5)? "Hurray ! You WON." : "OOPS ! Computer WON."
        statusDisplay.textContent=whoWon;
        statusDisplay.style.textDecorationLine="underline";
        resetFunction();
    }
}
//Reset function
function resetFunction(){
    let resetButton=document.createElement('button');
    resetButton.textContent="Reset"
    resetButton.classList.add('reset-button')
    reset.append(resetButton)
    resetButton.addEventListener('click',()=>{
        reset.removeChild(resetButton);
        window.location.reload(); //reloads the entire page.
    })
}

//I just learned about callbacks so really wanted to try them out.