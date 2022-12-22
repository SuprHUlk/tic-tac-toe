let player1, player2, counter;
const mainSelector=document.querySelector(".main");
const playerCreation=document.querySelector(".playerCreation");
const start=document.querySelector(".start");
const close=document.querySelector(".close");
const ok=document.querySelector(".submit");

start.addEventListener('click', ()=> {
    playerCreation.showModal();
    close.addEventListener('click', ()=> {
        playerCreation.close();
    });
});

ok.addEventListener('click', createPlayers);

const board = (()=> {
    let gameBoard=[];
    return {gameBoard};
})();

const players = (name, sign)=> {
    const getName=()=> name;
    const getSign=()=> sign;
    return{};
}

const renderBoard = (()=> {
    let render =()=> {
        if(document.querySelector(".board")!=null) {
            document.querySelector(".board").remove();
        }
        const boardSelector=document.createElement("div");
        boardSelector.classList.add("board");
        mainSelector.appendChild(boardSelector);
        for(let i=0;i<9;i++) {
            const div=document.createElement("div");
            div.classList.add("block");
            div.setAttribute("data-attribute", i);
            boardSelector.appendChild(div);
        }
        const blockSelector=document.querySelectorAll(".block");
        blockSelector.forEach((div) => {
            div.textContent=board.gameBoard[div.getAttribute("data-attribute")];
            div.addEventListener('click', appendSign);
        });
    }
    return{render};
})();

const counterCreator=()=> {
    let count = 0;
    return () => {
      return count++;
    };
};

function appendSign() {
    if(board.gameBoard[this.getAttribute("data-attribute")]==undefined) {
        if(counter()%2==0) {
            board.gameBoard[this.getAttribute("data-attribute")]="X"; 
        }
        else {
            board.gameBoard[this.getAttribute("data-attribute")]="O"; 
        }
        renderBoard.render();
    }
}

function createPlayers() {
    player1 = players(document.querySelector("#p1-name").value, document.querySelector("#p1-sign").value);
    player2 = players(document.querySelector("#p2-name").value, document.querySelector("#p2-sign").value);
    counter = counterCreator();
    playerCreation.close();
    start.remove();
    renderBoard.render();
}