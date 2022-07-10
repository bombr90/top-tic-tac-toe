// script.js

const gameBoard = (function()   {
    console.log('gameBoard initialized');
    // cacheDOM
        let _board = document.getElementById('gameGrid');
        let _cellArray = document.querySelectorAll('.gameCell');
        let _button = document.getElementById('resetBtn');
        let _display = document.getElementById('display');
        let _input = document.getElementById('input');

    // bindEvents
    _button.addEventListener('click', _startGame);
    _cellArray.forEach(cell => {
        cell.addEventListener('click', function(){clickCell(cell.getAttribute('data-index'))});
    });
    
    //private variables
    let _gameEnabled = false;

    function _render(arr) {
        if(arr[0])  {
            _cellArray[arr[1]].textContent = arr[2];
        }
    }
    
    function _startGame()    {
        console.log('startGame pressed')
        _gameEnabled = true;
        _button.removeEventListener('click', _startGame);
        _button.addEventListener('click', _resetGame);
        _button.textContent=('Reset Game');
        let tmp = (_input.lastElementChild.value) ? _input.lastElementChild.value : 'Chad';
        user.setName(tmp);
        _input.lastElementChild.value = '';
        _input.style.display = 'none';
        _display.style.display = 'inline';
        gameBoard.displayString(`Hello, ${user.getName()} welcome to tic-tac-toe. It's your turn.`);
 
    }

    function _resetGame()  {
        console.log("resetGame pressed");
        _gameEnabled = false;
        _button.removeEventListener('click', _resetGame);
        _button.addEventListener('click', _startGame);
        _button.textContent=('Start Game');
        _cellArray.forEach(cell => cell.textContent = '');
        game.resetGame();
        _input.style.display = 'inline';
        _display.style.display = 'none';
    }

    function clickCell(index)   {
        if(_gameEnabled)    {
            _render(game.checkLegal(index));
        }
    }

    function displayString(str)   {
        _display.textContent=str;
    }

    return {
        clickCell, displayString,
    };
})(); 

const game = (function()    {
    console.log("gameModule initialized");
    let gameArray = [];
    let isPlayerTurn = true;
    let isValidMove = false;
    let isOver = false;

    function checkLegal(index)    {
        console.log("checklegal");
        isValidMove = gameArray[index] === undefined;
        if(isValidMove&&!isOver) {
            let symbol = (isPlayerTurn) ? 'X' : 'O';
            gameArray[index] = symbol;
            _checkGame();
            isPlayerTurn = !isPlayerTurn;
            if(!isOver) {
                gameBoard.displayString(getPlayerTurn());
            }
            return [true, index, symbol];
        }   else if(isOver) {
            gameBoard.displayString('Game Over, please reset.');
            return false;
        }   else   {
            gameBoard.displayString('Illegal move, please try again.')
            return false;
        }
    }

    function _checkGame() {
        console.log('checkGame');        
        let triples = [ [gameArray[0],gameArray[1],gameArray[2]],
                        [gameArray[3],gameArray[4],gameArray[5]],
                        [gameArray[6],gameArray[7],gameArray[8]],
                        [gameArray[0],gameArray[3],gameArray[6]],
                        [gameArray[1],gameArray[4],gameArray[7]],
                        [gameArray[2],gameArray[5],gameArray[8]],
                        [gameArray[0],gameArray[4],gameArray[8]],
                        [gameArray[2],gameArray[4],gameArray[6]]
                    ];
        for (const i of triples) { 
            isOver = (i.every(el => (el === i[0] && el !== undefined)));
            if(isOver)  {
               console.log('winning index: '+triples.findIndex(el => el === i));
                break;
            }
        }
        if(isOver)  {
            gameBoard.displayString((isPlayerTurn) ? `${user.getName()} Wins` : 'Computer Wins');
        } else if(!(gameArray.includes(undefined))&&gameArray.length>8)  {
            isOver = true;
            gameBoard.displayString("Game over, it's a tie. Press Reset");
        }
    }

    function resetGame()    {
        console.log('resetgame')
        gameArray.splice(0,gameArray.length);
        isPlayerTurn = true;
        isValidMove = false;
        isOver = false;
    }

    function getPlayerTurn()    {
        return (isPlayerTurn) ? `It's ${user.getName()}'s turn.` : `It's the computer's turn.`;
    }

    return{
        checkLegal, resetGame, getPlayerTurn
    }
})();

const newPlayer = (name) =>  {
    console.log("playerFactory initialized");
    let _name = name;
    const setName = (name) => _name = name; 
    const getName = () => {return _name};
    return  {
        getName, setName
    };
}

user = newPlayer();

