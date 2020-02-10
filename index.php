<?php
include "./conn.php";
if(!isset($_POST['name'])){
	echo '<script>location.href="http://unifox.kr/tetris/index.html"</script>';
}
$query ="SELECT * FROM xsslogin ORDER BY id DESC";
$res = mysqli_query($conn,$query);
function asd(){
	echo '<script>alert();</script>';
}
 ?>
 <script>

 </script>
<!doctype html>
<html>

<head>
	<meta charset="utf-8">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
		<link href="https://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet"/>
	<style>
		#bot-display{
				opacity: 0.8;
			background-color: white;
			border:2px solid black;
		}
		#display{
			opacity: 0.8;
			background-color: white;
		}

		* {
		  font-family: 'Press Start 2P', cursive;
		}

		.grid {
		  display: grid;
		  grid-template-columns: 320px 200px;
		}
		.grid-2{
			float:right;
			display: grid;
			grid-template-columns: 320px 200px;
		}

		.menu_column {
		  display: flex;
		  flex-direction: column;
		  justify-content: space-between;
		}

		.display{
		  border: solid 2px;

		}

		.play-button {
		  background-color: #4caf50;
		  font-size: 16px;
		  padding: 15px 30px;
		  cursor: pointer;
		}
		#score_list{
			float:left;
		}
		table{
			border-spacing:30px;
}
	</style>
	<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
</head>


<body>
<table>
	<tr><td>
<div class="grid" style="z-index:2;">
<canvas id="display" class="display"></canvas>
	<div class="menu_column">
		<div>
			<h1>TETRIS</h1>
			<p>Name :<span id="nickname"><?php echo $_POST['name']; ?></span></p>
			<p>Score:<span id="score">0</span></p>
			<canvas id="save" width="280" height="150"></canvas>
			<canvas id="next_block" class="next"></canvas>
		</div>
	</div>
</div>
</td>
<td>
<div class="grid-2" style="z-index:2;">
	<div class="menu_column">
		<div>
			<H1 id="white">BOT</H1>
			<p>Name :<span id="bot-nickname">UNIFOX_BOT</span></p>
			<p>Score:<span id="bot_score">0</span></p>
			<canvas id="bot_save" width="280" height="150"></canvas>
			<canvas id="bot_next_block" class="next"></canvas>
		</div>
	</div>
	<canvas id="bot-display" class="bot-display"></canvas>
</div>
</td>
</tr>
</table>
<script type="text/javascript" src="./script.js"></script>
</body>
</html>
