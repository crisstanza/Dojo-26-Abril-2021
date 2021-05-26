function Dev(piece, boardSize) {
	this.piece = piece;
	this.boardSize = boardSize;
}

// TODO: implementar a jogada
Dev.prototype.move = function(board) {
	for (let i = 0 ; i < this.boardSize ; i++) {
		let tr = board.rows[i];
		for (let j = 0 ; j < this.boardSize ; j++) {
			let td = tr.cells[j];
			if (!td.innerHTML) {
				console.log('if', td.innerHTML, i, j)
				td.innerHTML = this.piece;
				td.classList.add('fade-in');
				return {line: i, column: j }
			} else if (td.innerHTML !== this.piece) {
				let col = j + 1;
				console.log('else', td.innerHTML, i, col)
				if (col < this.boardSize && !tr.cells[col].innerHTML) {
					tr.cells[col].innerHTML = this.piece;
					return {line: i, column: col }
				}
			}
		}
	}
};
