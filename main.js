let player1 = {name: "" , symbol: "" , score: 0};
let player2 = {name: "" , symbol: "" , score: 0};
let currentPlayer;
let board;
let round = 1;
const totalRounds = 3;

function startGame(){
    let name1 = document.getElementById('player1Name').value.trim() || "Player 1";
    let name2 = document.getElementById('player2Name').value.trim() || "Player 2";
    if(name1.toLowerCase() === name2.toLowerCase()){
        alert("❌Player names must be different");
        return;
    }
    player1.name = name1;
    player2.name = name2;

    player1.symbol = document.getElementById("player1symbol").value;
    player2.symbol = (player1.symbol === "X") ? "O" : "X";

    currentPlayer = player1;

    document.getElementById("start-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "block";
    
    startRound()
}
function startRound(){
    document.getElementById("round-info").textContent = `Round ${round} of ${totalRounds}`;
    document.getElementById("score").textContent = 
    `${player1.name}:${player1.score} || ${player2.name}:${player2.score}`;
    board = Array(9).fill("");

    let boardDiv = document.getElementById("board");
    boardDiv.innerHTML = "";
    for(let i = 0 ; i<9 ; i++){
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.addEventListener("click" , () => makeMove(i));
        boardDiv.appendChild(cell);
    }
      updateTurnInfo()
}
function updateTurnInfo(){
    document.getElementById("turn-info").textContent = 
    `Turn:${currentPlayer.name} (${currentPlayer.symbol})`;
}
function makeMove(index){
    if(board[index] !== "") return;
    board[index] = currentPlayer.symbol;
    let cellElement = document.querySelectorAll(".cell")[index];
    cellElement.textContent = currentPlayer.symbol;
    cellElement.classList.add(currentPlayer.symbol);

    if(checkWinner()){
        currentPlayer.score++;
        if(round < totalRounds) {
            round++;
            startRound()
        }else{
            endGame();
        }
        return;
    }
    if(!board.includes("")){
        if(round < totalRounds){
            round++;
            startRound();
        }else{
            endGame();
        }
        return;
    }
    currentPlayer = (currentPlayer === player1) ? player2 : player1;
    updateTurnInfo()
}
function checkWinner(){
    const winPatterns= [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];
    return winPatterns.some(pattern =>
        pattern.every(index => board[index] === currentPlayer.symbol)
    );
}
function endGame(){
    document.getElementById("game-screen").style.display = "none";
    document.getElementById("end-screen").style.display = "block";

    let winnerText ;
    if(player1.score > player2.score){
        winnerText = `${player1.name} wins 🏆`;
    }else if (player2.score > player1.score){
        winnerText = `${player2.name} wins 🏆`;
    }else{
        winnerText = "It's a draw"
    }
    document.getElementById("winner").textContent = winnerText;
}