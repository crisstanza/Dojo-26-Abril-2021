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

	let table = io.github.crisstanza.Creator.html('table', {class: 'fade-in'}, mainDisplay);
	for (let i = 0 ; i < boardSize ; i++) {
		let tr = io.github.crisstanza.Creator.html('tr', null, table);
		for (let j = 0 ; j < boardSize ; j++) {
			let td = io.github.crisstanza.Creator.html('td', {title: i + ', ' + j}, tr);
			td.addEventListener('click', function() { td_OnClick(i, j); });
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
	let isGameOver = checkIsGameOver();
	if (isGameOver)
		gameOver();
	else
		setTimeout(computerPlay, DELAY_BEFORE_COMPUTER_PLAY);
}

// TODO: impedir os jogadores de jogarem caso algum jogador ganhe a partida
function gameOver() {
	mainOutput.innerHTML = 'Game over!<br /><br />The winner is: ' + getWinner() + '.';
}

function computerPlay() {
	machine.move(board);
	counter++;
	let isGameOver = checkIsGameOver();
	if (isGameOver)
		gameOver();
}

(function() {

	function init(event) {
		// descomente a linha abaixo para facilitar os testes
		// btStart_OnClick(event);
	}

	window.addEventListener('load', init);

})();

// TODO: implementar o fim do jogo caso algum jogador ganhe a partida
function checkIsGameOver(x, y) {
	if (counter == (boardSize * boardSize)) {
		return true;
	}

	for (let i = 0 ; i < boardSize ; i++) {
		let tr = board.rows[i];
		let xCount = 0
		let oCount = 0
		for (let j = 0 ; j < boardSize ; j++) {
			let td = tr.cells[j];
			if (!td.innerHTML)
				return false;
			if (td.innerHTML === 'x') {
				xCount++
			}
			if (td.innerHTML === 'o') {
				oCount++
			}
		}
	}
	return true;
}

// TODO: retornar o verdadeiro vencedor ou "empate"
function getWinner() {
	let random = io.github.crisstanza.Randoms.getInt(1, 3)
	if (random == 1)
		return 'Human player';
	else if (random == 2)
		return 'Computer player';
	return 'Draw';
}
