let board, boardSize, playerPiece, machine, counter;

// TODO: impedir jogador humano de jogar durante este delay (aumente-o para testar com mais facilidade)
const DELAY_BEFORE_COMPUTER_PLAY = 250;

function btStart_OnClick(event) {
	mainDisplay.innerHTML = '';
	mainOutput.innerHTML = '';

	counter = 0;

	let checkedPlayer = player.find(player => player.checked);
	playerPiece = checkedPlayer.value;

	let unCheckedPlayer = player.find(player => !player.checked);
	computerPiece = unCheckedPlayer.value;

	let checkedSize = size.find(size => size.checked);
	boardSize = checkedSize.value;

	let checkedComputer = computer.find(computer => computer.checked);
	computerName = checkedComputer.value;
	machine = eval('new ' + computerName + '(computerPiece, boardSize)');

	let table = io.github.crisstanza.Creator.html('table', { class: 'fade-in' }, mainDisplay);
	for (let i = 0; i < boardSize; i++) {
		let tr = io.github.crisstanza.Creator.html('tr', null, table);
		for (let j = 0; j < boardSize; j++) {
			let td = io.github.crisstanza.Creator.html('td', { title: i + ', ' + j }, tr);
			td.addEventListener('click', function () { td_OnClick(i, j); });
		}
	}
	board = table;

	document.location.hash = `player=${playerPiece}&computer=${computerName}&size=${boardSize}`;

	if (playerPiece == 'o')
		computerPlay();
}

function td_OnClick(line, column) {
	let tr = board.rows[line];
	let td = tr.cells[column];
	if (td.innerHTML)
		return;
	counter++;
	td.innerHTML = playerPiece;
	td.classList.add('fade-in');
	let status = checkIsGameOver(line, column);
	if (status != 'running')
		gameOver(status);
	else
		setTimeout(computerPlay, DELAY_BEFORE_COMPUTER_PLAY);
}

// TODO: impedir os jogadores de jogarem caso algum jogador ganhe a partida
function gameOver(status) {
	mainOutput.innerHTML = 'Game over!<br /><br />The winner is: ' + getWinner(status) + '.';
}

function computerPlay() {
	const positions = machine.move(board);
	counter++;
	let status = checkIsGameOver(positions.line, positions.column);
	if (status != "running")
		gameOver(status);
}

(function () {

	function init(event) {
		// descomente a linha abaixo para facilitar os testes
		btStart_OnClick(event);
	}

	window.addEventListener('load', init);

})();

// TODO: implementar o fim do jogo caso algum jogador ganhe a partida
function checkIsGameOver(x, y) {
	let lastPiece = board.rows[x].cells[y].innerHTML;
	let hasWinner = true;
	for (let i = 0; i < boardSize; i++) {
		if (board.rows[i].cells[i].innerHTML != lastPiece) {
			hasWinner = false
			break;
		}
	}
	if (!hasWinner) {
		hasWinner = true
		for (let i = 0; i < boardSize; i++) {
			if (board.rows[i].cells[boardSize - i - 1].innerHTML != lastPiece) {
				hasWinner = false
				break;
			}
		}
	}
	if (!hasWinner) {
		hasWinner = true
		for (let i = 0; i < boardSize; i++) {
			if (board.rows[x].cells[i].innerHTML != lastPiece) {
				hasWinner = false
				break;
			}
		}
	}
	if (!hasWinner) {
		hasWinner = true
		for (let i = 0; i < boardSize; i++) {
			if (board.rows[i].cells[y].innerHTML != lastPiece) {
				hasWinner = false
				break;
			}
		}
	}


	if (hasWinner === true) {
		return lastPiece;
	}
	if (counter == (boardSize * boardSize)) {
		console.log('terminou com board completo')
		return 'draw';
	}

	return 'running';
}

// TODO: retornar o verdadeiro vencedor ou "empate"
function getWinner(status) {
	if (status == playerPiece)
		return 'Human player';
	else if (status == 'draw')
		return 'Draw';
	return 'Computer player';
}
