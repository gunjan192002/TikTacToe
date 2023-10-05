let currentPlayer = 'X';
let count=0;
let cells = document.querySelectorAll('.cell');
let gameOver = false;
let Answer = new Audio('Answer.wav');
let Victory = new Audio('Victory.mp3');
let Oplayer=new Audio('Oplayer.wav');
let Tie= new Audio('Tie.mp3');
let resetTimer;
//let delayInMilliseconds=1000000;
// trying to add a new image in the cell using js 
//cells[0].innerHTML += '<img src="Xlogo.gif" alt="">'

function makeMove(cellIndex) {
    if (!gameOver && cells[cellIndex].innerHTML === '') {
            Answer.currentTime=0;
            Oplayer.currentTime=0;
            Oplayer.pause();
            Answer.pause();
            count=count+1;
        if (currentPlayer == "O") {
            cells[cellIndex].innerHTML += '<img src="Ologo.gif" alt="">';//adds a gif of O
             Answer.play();
        }
        else{
            cells[cellIndex].innerHTML += '<img src="Xlogo.gif" alt="">';//adds a gif of X
            Oplayer.play();
        }
        //To remove the extra borders//added new sound effects
        
        cells[cellIndex].style.border='2px solid white';
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        checkForWin();
    }
}

function checkForWin() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (cells[a].innerHTML && cells[a].innerHTML === cells[b].innerHTML && cells[a].innerHTML === cells[c].innerHTML) {
            gameOver = true;
            cells.forEach(cell => cell.style.border = '2px solid black');
            //cells.forEach(cell => cell.style.backgroundColor = 'black');
            document.body.style.backgroundImage="url(Crackers.gif)";
            document.body.style.backgroundColor="black";
            Victory.play();
            document.getElementById('message').innerHTML = `${cells[a].innerHTML} wins!`;
            // now we will right code to automatically reset the game after 5 sec automatically 
            delayInMilliseconds = 5000;
            resetTimer = setTimeout(resetGame, delayInMilliseconds);
        }
        else if(count==9)
        {
            Tie.play();
            document.body.style.backgroundImage="url(Fail.gif)";
            document.getElementById('message').innerHTML = ` Tie `;
            delayInMilliseconds = 5000;
            resetTimer = setTimeout(resetGame, delayInMilliseconds);
            
        }
    }
}


function resetGame() {
    myStopFunction();
    cells.forEach(cell => cell.innerHTML = '');
    cells.forEach(cell => cell.style.color = 'black');
    cells.forEach(cell => cell.style.border= '2px solid black');
    document.getElementById('message').innerHTML = '';
    Victory.pause();
    Tie.pause();
    Tie.currentTime=0;
    Victory.currentTime=0;
    count=0;
    document.body.style.backgroundImage="none";
    document.body.style.backgroundColor="white";
    currentPlayer = 'X';
    gameOver = false;
   
}
function myStopFunction() {
    clearTimeout(resetTimer);
  }
//It is the function to change image when any box is clicked double time
// function makeDbMove(temp)
// {   
    
//     // if cell is empty and doubed click then just black 
//     if (!gameOver && cells[temp].innerHTML === '') {
//         cells[temp].innerHTML = currentPlayer;
       
//         checkForWin();
//     }
//     else 
//     {
//         cells[temp].style.color='red';
//     }
// }