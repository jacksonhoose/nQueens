function Board(n){

	this.board = function(n){
		var board = [];
		for(var row = 0; row < n; row++){
			board[row] = [];
			for(var col = 0; col < n; col++){
				board[row][col] = 0;
			}
		}
		return board;
	}(n);

}

Board.prototype.getRow = function(row){
	return this.board[row] !== undefined ? this.board[row].slice() : null;
};

Board.prototype.getBoard = function(){
	return this.board.map(function(row){
		return row.slice();
	});
};

Board.prototype.toggleCell = function(row, col){
	this.board[row][col] = this.board[row][col] === 0 ? 1 : 0;
};

Board.prototype.hasAnyQueenConflicts = function(row, col){
	if(this.hasRowConflicts(row)
	|| this.hasColumnConflicts(col)
	|| this.hasMinorDiagonalConflicts()
	|| this.hasMajorDiagonalConflicts()){
		return true;
	}
	return false;
};

Board.prototype.hasRowConflicts = function(row){
	var row = this.getRow(row);
	var counter = 0;
	for(var col = 0; col < row.length; col++){
		if(row[col] === 1) counter++;
	}
	return counter >= 2;
};

Board.prototype.hasColumnConflicts = function(col){
	var board = this.getBoard();
	var counter = 0;
	for(var row = 0; row < board.length; row++){
		if(board[row][col] === 1) counter++;
	}
	return counter >= 2;
};

Board.prototype.hasMinorDiagonalConflicts = function(){
	var board = this.getBoard();
	for(var row = 0; row < board.length; row++){
		var index = board[row].indexOf(1);
		if(index !== -1){
			if(this.hasMinorDiagonalConflictsAt(row, index)){
				return true;
			}
		}
	}
	return false;
};

Board.prototype.hasMinorDiagonalConflictsAt = function(row, col){
	var board = this.getBoard();
	var counter = 0;
	for(; row < board.length; row++){
		if(board[row][col] === 1) counter++;
		col--;
	}
	return counter >= 2;
};

Board.prototype.hasMajorDiagonalConflicts = function(){
	var board = this.getBoard();
	for(var row = 0; row < board.length; row++){
		var index = board[row].indexOf(1);
		if(index !== -1){
			if(this.hasMajorDiagonalConflictsAt(row, index)){
				return true;
			}
		}
	}
	return false;
};

Board.prototype.hasMajorDiagonalConflictsAt = function(row, col){
	var board = this.getBoard();
	var counter = 0;
	for(; row < board.length; row++){
		if(board[row][col] === 1) counter++;
		col++; 
	}
	return counter >= 2;
};

function findNQueens(n){
	var solution = 0;
	var board = new Board(n);
	var placeQueens = function(row){
		if(row === n){
			solution++;
			return;
		}

		for(var col = 0; col < n; col++){
			board.toggleCell(row, col);
			if(!board.hasAnyQueenConflicts(row, col)){
				placeQueens(row + 1);
			}
			board.toggleCell(row, col);
		}

	};

	placeQueens(0);

	return solution;
}
