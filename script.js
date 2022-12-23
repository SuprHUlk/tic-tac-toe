let player1, player2, counter;
const mainSelector=document.querySelector(".main");
const playerCreation=document.querySelector(".playerCreation");
const start=document.querySelector(".start");
const close=document.querySelector(".close");
const ok=document.querySelector(".submit");

start.addEventListener('click', ()=> {
    start.remove();
    playerCreation.showModal();
});

close.addEventListener('click', ()=> {
    playerCreation.close();
    const btn=document.createElement("button");
    btn.classList.add("start");
    btn.textContent="PLAY";
    mainSelector.insertBefore(btn, document.querySelector("dialog"));
    btn.addEventListener('click', ()=> {
        btn.remove();
        playerCreation.showModal();
    });
});

ok.addEventListener('click', createPlayers);

const board = (()=> {
    let gameBoard=[];
    return {gameBoard};
})();

const players = (name, sign)=> {
    const setName=()=> name;
    const setSign=()=> sign;
    const getName = name;
    const getSign = sign;
    return{getName, getSign};
}

const renderPlayerInfo=(()=> {
    let render=()=> {
        document.querySelector(".player-1 h1").textContent="PLAYER ONE";
        document.querySelector(".player-1 .name").textContent="Name: "+player1.getName;
        document.querySelector(".player-1 .sign").textContent="Sign: "+player1.getSign;
        document.querySelector(".player-2 h1").textContent="PLAYER TWO";
        document.querySelector(".player-2 .name").textContent="Name: "+player2.getName;
        document.querySelector(".player-2 .sign").textContent="Sign: "+player2.getSign;
        document.querySelector(".content").style.gap="10rem";
        document.querySelector(".player-info").style.background="rgba(255, 255, 255, 0.34)";
        document.querySelector(".player-info").style.boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)";
        document.querySelector(".result h1").textContent="RESULT";
        document.querySelector(".result").style.background="rgba(255, 255, 255, 0.34)";
        document.querySelector(".result").style.boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)";
        document.querySelector(".result").style.padding="10px 80px";
        const reset=document.createElement("button");
        reset.classList.add("reset");
        reset.textContent="RESET";
        reset.addEventListener('click', restart);
        document.querySelector(".result").appendChild(reset);
    }
    return{render};
})();

const renderBoard = (()=> {
    let render =()=> {
        if(document.querySelector(".board")!=null) {
            document.querySelector(".board").remove();
        }
        const boardSelector=document.createElement("div");
        boardSelector.classList.add("board");
        document.querySelector(".content").insertBefore(boardSelector, document.querySelector(".result"));
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

const resultChecker=(()=> {
    const check=()=> {
        let c=0;
        for(let i=1;i<9;i++) {
            if(i==3||i==6) {
                c=0;
            }
            if(board.gameBoard[i]==board.gameBoard[i-1]&&board.gameBoard[i]!=undefined) {
                c++;
            }
            if(c==2) {
                return board.gameBoard[i];
            }
        }
        for(let i=0;i<3;i++) {
            c=0;
            for(let j=i+3;j<=i+6;j++) {
                if(board.gameBoard[j]==board.gameBoard[j-3]&&board.gameBoard[j]!=undefined) {
                    c++;
                }
                if(c==2) {
                    return board.gameBoard[j];
                }
            }
        }
        c=0;
        for(let i=4;i<=8;i+=4) {
            if(board.gameBoard[i]==board.gameBoard[i-4]&&board.gameBoard[i]!=undefined) {
                c++;
            }
            if(c==2) {
                return board.gameBoard[i];
            }
        }
        c=0;
        for(let i=4;i<=6;i+=2) {
            if(board.gameBoard[i]==board.gameBoard[i-2]&&board.gameBoard[i]!=undefined) {
                c++;
            }
            if(c==2) {
                return board.gameBoard[i];
            }
        }
        return false;
    }
    return{check};
})();

function appendSign() {
    if(board.gameBoard[this.getAttribute("data-attribute")]==undefined) {
        if(counter()%2==0) {
            board.gameBoard[this.getAttribute("data-attribute")]=player1.getSign; 
        }
        else {
            board.gameBoard[this.getAttribute("data-attribute")]=player2.getSign; 
        }
        renderBoard.render();
        let flag=resultChecker.check();
        if(flag==player1.getSign) {
            document.querySelector(".result h2").textContent=player1.getName+" won";
        }
        else if(flag==player2.getSign) {;
            document.querySelector(".result h2").textContent=player2.getName+" won";
        }
    }
}

function createPlayers() {
    player1 = players(document.querySelector("#p1-name").value, document.querySelector("#p1-sign").value);
    player2 = players(document.querySelector("#p2-name").value, document.querySelector("#p2-sign").value);
    counter = counterCreator();
    playerCreation.close();
    renderBoard.render();
    renderPlayerInfo.render();
}

function restart() {
    playerCreation.showModal();
    board.gameBoard=[];
    renderBoard.render();
    document.querySelector(".close").addEventListener('click', ()=>{
        playerCreation.close();
        if(document.querySelector(".start")!=null) {
            document.querySelector(".start").remove();
        }
    });
    document.querySelector(".reset").remove();
}