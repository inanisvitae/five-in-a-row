function isCanvasAvailable() {
	//Checks whether a canvas object can be created.
	var element = document.createElement('canvas');
	return !!(element.getContext && element.getContext('2d'));
}

if(isCanvasAvailable()) {
	//Canvas is available
	var canvas;
	var context;
	var _white_black;
	var _white_black_first = true;
	var board;
	var rect;
	var _chess_color;
	var _hasStarted;
	var _board_chess_val;
	//Initializes canvas
	createCanvas();
	init();

	function getMouseCoordinates(canvas, e) {
		//Finds the coordinates of the mouse after scrolling
		var x;
		var y;

		if (e.pageX || e.pageY) { 
		  x = e.pageX;
		  y = e.pageY;
		}else { 
		  x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
		  y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
		} 
		x -= canvas.offsetLeft;
		y -= canvas.offsetTop;
		//Returns the x, y coordinate for a mouse click event.
		return {
			x: x,
			y: y
		}
	}

	function white_black_first_switch() {
		if(_hasStarted) {
			alert("Cannot change color, because the game has started!");
		}else{
			//Detect changes of whether white or black goes first.
			if(_white_black_first) {
				_white_black_first = false;
				_chess_color = "white";
				_white_black = false;
				_board_chess_val = -1;
				document.getElementById("white_black_button").value = "白棋先走";
			}else{
				_white_black_first = true;
				_chess_color = "black";
				_white_black = true;
				_board_chess_val = 1;
				document.getElementById("white_black_button").value = "黑棋先走";
			}
		}
	}

	function start_new_game() {
		init();
	}

	function start_with_setting() {
		_hasStarted = true;
		if(_white_black_first) {
			_white_black = true;
			_chess_color = "black";
			_board_chess_val = 1;
			document.getElementById("white_black_button").value = "黑棋先走";
		}else{
			_white_black = false;
			_chess_color = "white";
			_board_chess_val = -1;
			document.getElementById("white_black_button").value = "白棋先走";
		}
 		canvas = document.getElementById("c");
		context = canvas.getContext("2d");
		rect = canvas.getBoundingClientRect();
		//Sets background color
		context.fillStyle = 'green';
		context.fillRect(0, 0, 800, 800);

		for (var i = 1; i < 20; i++) {
		 	//Draws horizontal lines.
			context.beginPath();
			context.moveTo(0, i * 40);
			context.lineTo(800, i * 40);
			context.closePath();
			context.stroke();

			//Draws vertical lines.
			context.beginPath();
			context.moveTo(i * 40, 0);
			context.lineTo(i * 40, 800);
			context.closePath();
			context.stroke();
		}

		//Initializes an empty board for the game.
		board = new Array(21);
		for (var i = board.length - 1; i >= 0; i--) {
			board[i] = new Array(21);
			for (var j = board[i].length - 1; j >= 0; j--) {
				board[i][j] = 0;
			}
		}
	}

	function _white_black_iterate() {
		if(_white_black) {
			_white_black = false;
			_chess_color = "white";
			_board_chess_val = -1;
		}else{
			_white_black = true;
			_chess_color = "black";
			_board_chess_val = 1;
		}
	}

	function createCanvas() {
		//Creates a canvas element and appends it to body.
		canvas = document.createElement("canvas");
		canvas.setAttribute("id", "c");
		canvas.setAttribute("width", "800");
		canvas.setAttribute("height", "800");
		document.getElementById("b").appendChild(canvas);
	}

	function init() {
		//Initializes canvas and related objects.
		_white_black_first = true;
		_white_black = true;
		_hasStarted = false;
		_chess_color = "black";
		_board_chess_val = 1;
		document.getElementById("white_black_button").value = "黑棋先走";
		canvas = document.getElementById("c");
		context = canvas.getContext("2d");
		rect = canvas.getBoundingClientRect();
		//Sets background color
		context.fillStyle = 'green';
		context.fillRect(0, 0, 800, 800);

		for (var i = 1; i < 20; i++) {
		 	//Draws horizontal lines.
			context.beginPath();
			context.moveTo(0, i * 40);
			context.lineTo(800, i * 40);
			context.closePath();
			context.stroke();

			//Draws vertical lines.
			context.beginPath();
			context.moveTo(i * 40, 0);
			context.lineTo(i * 40, 800);
			context.closePath();
			context.stroke();
		}

		//Initializes an empty board for the game.
		board = new Array(21);
		for (var i = board.length - 1; i >= 0; i--) {
			board[i] = new Array(21);
			for (var j = board[i].length - 1; j >= 0; j--) {
				board[i][j] = 0;
			}
		}
	}

	function drawChess(x, y){
		if(_hasStarted) {
			if(board[y][x] == 0) {
				context.fillStyle = _chess_color;
				context.beginPath();
				context.arc((x + 1) * 40 - 20, (y + 1) * 40 - 20, 15, 0, 2 * Math.PI);
				context.closePath();
				context.fill();
				board[y][x] = _board_chess_val;
				return true;
			}else{
				alert("There is already a chess at this position!");
			}
		}else{
			alert("The game hasn't started yet!");
		}
		return false;
	}

	function checkLeft(x, y) {
		var count = 0;
		for(var i = 1;i <= 4;i++) {
			var tmp = x - i;
			if(tmp >= 0) {
				if(board[y][tmp] == _board_chess_val) {
					count++;
				}else{
					break;
				}
			}else{
				break;
			}
		}
		return count == 4 ? true : false;
	}

	function checkRight(x, y) {
		//Check right
		count = 0;
		for(var i = 1;i <= 4;i++) {
			var tmp = x + i;
			if(tmp <= 19) {
				if(board[y][tmp] == _board_chess_val) {
					count++;
				}else{
					break;
				}
			}else{
				break;
			}
		}
		return count == 4 ? true : false;
	}

	function checkUp(x, y) {
		//Check up
		count = 0;
		for(var i = 1;i <= 4;i++) {
			var tmp = y - i;
			if(tmp >= 0) {
				if(board[tmp][x] == _board_chess_val) {
					count++;
				}else{
					break;
				}
			}else{
				break;
			}
		}
		return count == 4 ? true : false;
	}

	function checkDown(x, y) {
		//Check down
		count = 0;
		for(var i = 1;i <= 4;i++) {
			var tmp = y + i;
			if(tmp <= 19) {
				if(board[tmp][x] == _board_chess_val) {
					count++;
				}else{
					break;
				}
			}else{
				break;
			}
		}
		return count == 4 ? true : false;
	}

	function checkUpRight(x, y) {
		//Check up
		count = 0;
		for(var i = 1;i <= 4;i++) {
			var tmp_y = y - i;
			var tmp_x = x + i;
			if(tmp_y >= 0 && tmp_x <= 19) {
				if(board[tmp_y][tmp_x] == _board_chess_val) {
					count++;
				}else{
					break;
				}
			}else{
				break;
			}
		}
		return count == 4 ? true : false;
	}

	function checkUpLeft(x, y) {
		//Check up
		count = 0;
		for(var i = 1;i <= 4;i++) {
			var tmp_y = y - i;
			var tmp_x = x - i;
			if(tmp_y >= 0 && tmp_x >= 0) {
				if(board[tmp_y][tmp_x] == _board_chess_val) {
					count++;
				}else{
					break;
				}
			}else{
				break;
			}
		}
		return count == 4 ? true : false;
	}
	function checkDownLeft(x, y) {
		//Check up
		count = 0;
		for(var i = 1;i <= 4;i++) {
			var tmp_y = y + i;
			var tmp_x = x - i;
			if(tmp_y <= 19 && tmp_x >= 0) {
				if(board[tmp_y][tmp_x] == _board_chess_val) {
					count++;
				}else{
					break;
				}
			}else{
				break;
			}
		}
		return count == 4 ? true : false;
	}

	function checkDownRight(x, y) {
		//Check up
		count = 0;
		for(var i = 1;i <= 4;i++) {
			var tmp_y = y + i;
			var tmp_x = x + i;
			if(tmp_y <= 19 && tmp_x <= 19) {
				if(board[tmp_y][tmp_x] == _board_chess_val) {
					count++;
				}else{
					break;
				}
			}else{
				break;
			}
		}
		return count == 4 ? true : false;
	}

	function hasWon(x, y) {
		if(checkLeft(x, y) || checkRight(x, y)
			|| checkUp(x, y) || checkDown(x, y)
			|| checkUpRight(x, y) || checkDownLeft(x, y)
			|| checkDownRight(x, y) || checkUpLeft(x, y)) {
			if(_chess_color == "white"){
				alert("White Won!");
			}else{
				alert("Black Won!");
			}
			//Starts a new game
			start_new_game();
		}
	}

	canvas.addEventListener("mousedown", function(e) {
	  var mouse_coordinates = getMouseCoordinates(canvas, e);
	  var clicked_x = Math.floor(mouse_coordinates.x / 40);
	  var clicked_y = Math.floor(mouse_coordinates.y / 40);
	  var painted = drawChess(clicked_x, clicked_y);
	  hasWon(clicked_x, clicked_y);
	  if(painted) {
	  	//Only switches chess color when successfully drew the chess.
	  	_white_black_iterate();
	  }
	  
	}, false);


}else{
	//IE 8 and lower
}
