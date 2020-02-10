<?php
include "./conn.php";
if(!isset($_POST['name'])){
	echo '<script>location.href="http://unifox.kr/wooju/tetris/tetris.html"</script>';
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
			background-color: black;
		}
		#display{
			opacity: 0.8;
			background-color: black;
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
			<h1>TRTRIS</h1>
			<p>Name :<span id="nickname"><?php echo $_POST['name']; ?></span></p>
			<p>Score:<span id="score">0</span></p>
			<canvas id="save" width="280" height="150"></canvas>
			<canvas id="next_block" class="next"></canvas>
		</div>
		<button onclick="play();" class="play-button">PLAY</button>
	</div>
</div>
</td>
<td>
<div class="grid-2" style="z-index:2;">
	<div class="menu_column">
		<div>
			<h1>TRTRIS</h1>
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
<script>

const BLOCK_SIZE = 1;



const canvas = document.getElementById('display');
const ctx = canvas.getContext('2d');


const bot_canvas = document.getElementById('bot-display');
const bot_ctx = bot_canvas.getContext('2d');




const GAME_MODE = 1;
const GAME_OVER = 2;

var Mode=GAME_MODE;
var BOT_Mode = GAME_MODE;
var playing = true;

var change=1;
var bot_change=1;


ctx.canvas.width = 10 * 30;
ctx.canvas.height = 20 * 30;
bot_ctx.canvas.width = 10*30;
bot_ctx.canvas.height = 20*30;



var map=[
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0]
];

var bot_map=[
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[1,1,1,1,1,1,1,1,1,1]
];

var score=0;
var bot_score=0;

var speed=50;
var bot_speed=100;

var block_num=Math.floor(Math.random()*6.9);
var next_block_num = Math.floor(Math.random()*6.9);
var block_x=4;
var block_y=0;
var block;
var block_now;
var change_block=199;

var bot_block_num = Math.floor(Math.random()*6.9);
var bot_next_block_num = Math.floor(Math.random()*6.9);
var bot_block_x=4;
var bot_block_y=0;
var bot_block;
var bot_block_now;
var bot_change_block=199;


function block_init(){
	block= new Array();

	tmp = new Array();
	tmp.push(0,0);tmp.push(0,1);tmp.push(0,2);tmp.push(0,3);
	block.push(tmp);

	tmp = new Array();
	tmp.push(0,0);tmp.push(0,1);tmp.push(0,2);tmp.push(1,1);
	block.push(tmp);

	tmp = new Array();
	tmp.push(0,0);tmp.push(0,1);tmp.push(1,1);tmp.push(1,2);
	block.push(tmp);

	tmp = new Array();
	tmp.push(0,1);tmp.push(0,2);tmp.push(1,0);tmp.push(1,1);
	block.push(tmp);

	tmp = new Array();
	tmp.push(0,0);tmp.push(0,1);tmp.push(1,0);tmp.push(1,1);
	block.push(tmp);

	tmp = new Array();
	tmp.push(0,0);tmp.push(0,1);tmp.push(0,2);tmp.push(1,0);
	block.push(tmp);

	tmp = new Array();
	tmp.push(0,0);tmp.push(1,0);tmp.push(1,1);tmp.push(1,2);
	block.push(tmp);
}

function bot_block_init(){
	bot_block= new Array();

	bot_tmp = new Array();
	bot_tmp.push(0,0);bot_tmp.push(0,1);bot_tmp.push(0,2);bot_tmp.push(0,3);
	bot_block.push(bot_tmp);

	bot_tmp = new Array();
	bot_tmp.push(0,0);bot_tmp.push(0,1);bot_tmp.push(0,2);bot_tmp.push(1,1);
	bot_block.push(bot_tmp);

	bot_tmp = new Array();
	bot_tmp.push(0,0);bot_tmp.push(0,1);bot_tmp.push(1,1);bot_tmp.push(1,2);
	bot_block.push(bot_tmp);

	bot_tmp = new Array();
	bot_tmp.push(0,1);bot_tmp.push(0,2);bot_tmp.push(1,0);bot_tmp.push(1,1);
	bot_block.push(bot_tmp);

	bot_tmp = new Array();
	bot_tmp.push(0,0);bot_tmp.push(0,1);bot_tmp.push(1,0);bot_tmp.push(1,1);
	bot_block.push(bot_tmp);

	bot_tmp = new Array();
	bot_tmp.push(0,0);bot_tmp.push(0,1);bot_tmp.push(0,2);bot_tmp.push(1,0);
	bot_block.push(bot_tmp);

	bot_tmp = new Array();
	bot_tmp.push(0,0);bot_tmp.push(1,0);bot_tmp.push(1,1);bot_tmp.push(1,2);
	bot_block.push(bot_tmp);
}


function map_reset(){
	for(i=0;i<20;i++){
		for(j=0;j<10;j++){
			map[i][j]=0;
			bot_map[i][j]=0;
		}
	}
}

function play(){
	if(playing==false)return;
		score=0;
		bot_score=0;
		block_init();
		bot_block_init();
		map_reset();

		Mode= GAME_MODE;
		BOT_Mode = GAME_MODE;

		block_now = block[block_num].slice();
		bot_block_now = bot_block[bot_block_num].slice();
		setInterval(Run, speed);
		playing=false;
}

function reset(){
	speed=300;
	bot_speed=300;
	score=0;
	bot_score=0;
	map_reset();
	block_x=4;
	block_y=0;
	bot_block_x=4;
	bot_block_y=0;
}
var a=0;
var add_x;
var turn_count;
var turn_bool=true;
function BOT_map_check(){
	var ai_block_now = bot_block_now;

	var best_x=[0,0,0,0];
	var best_score=[0,0,0,0];
	var check_score = [0,0,0,0,0,0,0,0,0,0];
	var space_count = [0,0,0,0,0,0,0,0,0,0];
	var high_score = [0,0,0,0,0,0,0,0,0,0];
	var under_count=[0,0,0,0,0,0,0,0,0,0];
	var line_break = [0,0,0,0,0,0,0,0,0,0];
	var bot_x_len=0;
	var bool = false;
	var bot_block_width=0;
	var min_score=10000000000;
 	turn_count=0;
	var best_turn=0;
	var best_score_min=10000;
	var final_x=0;
	var final_turn=0;
	var high_bool=true;
	var under_width=0;
	var line=0;
	var ai_block_x=0;
 	add_x=0;
	var count=4;
	if(bot_block_num==0)
		bot_x_len=6;
	else if(bot_block_num==4)
		bot_x_len=9;
	else {
		bot_x_len=7;
	}

	if(bot_block_num==0)
		bot_block_width=4;
	else if(bot_block_num==4)
		bot_block_width=2;
	else
		bot_block_width=3;
		if(bot_block_num==0)
		count=2;
				for(ai_i=0;ai_i<count;ai_i++){
							check_score=[0,0,0,0,0,0,0,0,0,0];
							under_count=[0,0,0,0,0,0,0,0,0,0];
							space_count = [0,0,0,0,0,0,0,0,0,0,0];
							high_score = [0,0,0,0,0,0,0,0,0,0];
							line_break = [0,0,0,0,0,0,0,0,0,0];
							bot_block_x=0;
							ai_block_x=0;
							if(bot_block_num==0 && turn_count==0){
								bot_block_width=4;
								bot_x_len=7;
							}
							else if(bot_block_num==0 && turn_count==1){
								bot_block_width=1;
								bot_x_len=10;
							}




							else if(bot_block_num==4){
								bot_block_width=2;
								bot_x_len=8;
							}
							else{
										if(turn_count%2==0){
											bot_block_width=3;
											bot_x_len=8;
										}
										else if(turn_count%2!=0){
											bot_block_width=2;
											bot_x_len=9;
										}
									}
									bot_block_y=3;
									for(i=0;i<100;i++){
										BOT_move_left();
									}
									ai_block_x=bot_block_x;
									bot_block_y=0;
						for(ai_j=0;ai_j<bot_x_len;ai_j++){
							under_width=0;
							bool=false;
							high_bool=true;
							BOT_block_fall();


							// for(k=0;k<8;k+=2)
							// {
							// 		bot_auto_y = bot_block_y + bot_block_now[k];
							// 		bot_auto_x = bot_block_x + bot_block_now[k+1];
              //     ai_high_block=bot_block_y + bot_block_now[1];
							// 		if(bot_auto_y< 0 || bot_auto_x >=10 || bot_map[bot_auto_y+1][bot_auto_x] != 0)
							// 		under_width++;
							// }
							// under_count[ai_j]=(20-under_width)*20;
							// check_score[ai_j] += under_count[ai_j];
              // high_score[ai_j]=((20-ai_high_block)*(20-ai_high_block))*1.2;
              // //check_score[ai_j]=high_score[ai_j];


							for(k=0;k<8;k+=2)
							{
									bot_auto_y = bot_block_y + bot_block_now[k];
									bot_auto_x = ai_block_x + bot_block_now[k+1];
									if(bot_map[bot_auto_y][bot_auto_x] == 0)
									bot_map[bot_auto_y][bot_auto_x]=200;
							}

							// for(ai_y=0;ai_y<20;ai_y++){
							// 		for(ai_x=ai_j;ai_x<(bot_block_width+ai_j);ai_x++){
							// 				if(bool && bot_map[ai_y][ai_x]==0){
							// 					space_count[ai_j]+=1;
							// 				}
							// 				if(bot_map[ai_y][ai_x]!=0){
							// 					bool=true;
							// 				}
							// 		}
							// }
							for(ai_x=0;ai_x<10;ai_x++){
								bool = false;
								for(ai_y=0;ai_y<20;ai_y++){
									if(bool && bot_map[ai_y][ai_x] == 0){
										space_count[ai_j]+=1;
									}
									if(bot_map[ai_y][ai_x]!=0){
										bool = true;
									}
								}
							}
							check_score[ai_j] += space_count[ai_j]*7;

							for(ai_x=0;ai_x<10;ai_x++){
								for(ai_y=0;ai_y<20;ai_y++){
									if(bot_map[ai_y][ai_x] != 0){
										high_score[ai_j] += (20-ai_y) * (20-ai_y);
										break;
									}
								}
							}
							check_score[ai_j] += high_score[ai_j] * 2;

							for(k=0;k<8;k+=2)
							{
									bot_auto_y = bot_block_y + bot_block_now[k];
									bot_auto_x = ai_block_x + bot_block_now[k+1];
									if(bot_map[bot_auto_y][bot_auto_x] == 200)
									bot_map[bot_auto_y][bot_auto_x]=0;
							}
							ai_block_x++;
							BOT_move_right();
							bot_block_y=0;
						}
						score_min=10000000000;
						for(ai_check=0;ai_check<bot_x_len;ai_check++){
							if(check_score[ai_check]<score_min){
								score_min=check_score[ai_check];
								best_x[ai_i]=ai_check;
							}
						}
						best_score[ai_i]=score_min;
						bot_block_y=0;
						bot_block_x=2;
						turn_count++;
						BOT_TurnBlock();
						bot_block_y=0;
						bot_block_x=2;
				}
				var best_index = -1;
				best_score_min=10000;
				for(ai_z=0;ai_z<count;ai_z++)
				{
					if(best_score[ai_z]<best_score_min){
						final_x=best_x[ai_z];
						best_score_min=best_score[ai_z];
						best_index = ai_z;
						}
				}
				bot_block_now=ai_block_now;
				bot_block_y=0;

				ai_block_x=0;
				bot_save_x=bot_block_x;
				turn_bool=false;
				for(i=bot_block_x;i<bot_block_x+final_x;i++){
					ai_block_x++;
				}
				if(best_index==1){
					BOT_TurnBlock();
				}
				if(best_index==2){
					BOT_TurnBlock();
					BOT_TurnBlock();
				}
				if(best_index==3){
					BOT_TurnBlock();
					BOT_TurnBlock();
					BOT_TurnBlock();
					ai_block_x--;
				}
				if(bot_block_num == 0 && bot_block_now[7]!=0){
					ai_block_x++;
				}
				bot_block_x=ai_block_x;
				BOT_block_fall();
	return;
}



function Run(){
	a++;
	if(CheckBlock()){
			Mode=GAME_OVER
		}
		if(BOT_CheckBlock())
		{
			Mode=GAME_OVER;
		}
			if(Mode==GAME_MODE){
				score_up();
				if(a%1==0){
			BOT_map_check();
			}

	if(block_y==0){
		change=1;
	}
	if(bot_block_y==0){
		bot_change=1;
	}
	block_y++;
	bot_block_y++;
	if(BOT_CheckBlock()){
		bot_block_y--;

						for(k=0;k<8;k+=2)
						{
								bot_asd_y = bot_block_y + bot_block_now[k];
								bot_asd_x = bot_block_x + bot_block_now[k+1];
								bot_map[bot_asd_y][bot_asd_x]=1;
						}
						line = 0;
						for(i=0;i<20;i++){
							bot_sum = 0;
							for(j=0;j<10;j++){
								if(bot_map[i][j]!=0){
									bot_sum++;
								}

							}
							if(bot_sum>=10){
								for(k=i;k>0;k--){
									for(j=0;j<10;j++){
										bot_map[k][j]=bot_map[k-1][j];
									}
								}
							}
								bot_score_up(bot_sum);
						}
						bot_block_y=0;
						bot_block_x=4;
						bot_block_num=bot_next_block_num;
						bot_next_block_num = Math.floor(Math.random()*6.9);
						bot_block_now = bot_block[bot_block_num].slice();
	}

			if(CheckBlock()){
				block_y--;

				for(k=0;k<8;k+=2)
				{
						check_y = block_y + block_now[k];
						check_x = block_x + block_now[k+1];
						map[check_y][check_x]=1;
				}
				line = 0;
				for(i=0;i<20;i++){
					sum = 0;
					for(j=0;j<10;j++){
						if(map[i][j]!=0){
							sum++;
						}

					}
					if(sum>=10){
						for(k=i;k>0;k--){
							for(j=0;j<10;j++){
								map[k][j]=map[k-1][j];
							}
						}
					}
						score_up(sum);
				}
				block_y=0;
				block_x=4;
				block_num=next_block_num;
				next_block_num = Math.floor(Math.random()*6.9);
				block_now = block[block_num].slice();
			}
			if(CheckBlock())
			block_now = block_save.slice();
			if(BOT_CheckBlock()){
				bot_block_now = bot_block_Save.slice();
			}
	Draw();

}
}



function CheckBlock(){
	for(k=0;k<8;k+=2){
		check_y = block_y + block_now[k];
		check_x = block_x + block_now[k+1];
		if(check_y < 0 )continue;
		if(check_x< 0 || check_x >=10 || check_y >= 20 || map[check_y][check_x] != 0)
				return true;
	}
	return false;
}


function BOT_CheckBlock(){
	for(k=0;k<8;k+=2){
		bot_check_y = bot_block_y + bot_block_now[k];
		bot_check_x = bot_block_x + bot_block_now[k+1];
		if(bot_check_y < 0 )continue;
		if(bot_check_x< 0 || bot_check_x >=10 || bot_check_y >= 20 || bot_map[bot_check_y][bot_check_x] == 1)
				return true;
	}
	return false;
}


function block_img(){
	if(change_block==0){
		document.getElementById('save').style.backgroundImage="url('http://unifox.kr/wooju/tetris/image/0.1.PNG')";
	}
	else if(change_block==1){
		document.getElementById('save').style.backgroundImage="url('http://unifox.kr/wooju/tetris/image/1.1.PNG')";
	}
	else if(change_block==2){
		document.getElementById('save').style.backgroundImage="url('http://unifox.kr/wooju/tetris/image/2.1.PNG')";
	}
	else if(change_block==3){
		document.getElementById('save').style.backgroundImage="url('http://unifox.kr/wooju/tetris/image/3.1.PNG')";
	}
	else if(change_block==4){
		document.getElementById('save').style.backgroundImage="url('http://unifox.kr/wooju/tetris/image/4.1.PNG')";
	}
	else if(change_block==5){
		document.getElementById('save').style.backgroundImage="url('http://unifox.kr/wooju/tetris/image/5.1.PNG')";
	}
	else if(change_block==6){
		document.getElementById('save').style.backgroundImage="url('http://unifox.kr/wooju/tetris/image/6.1.PNG')";
	}

	if(next_block_num==0){
		document.getElementById('next_block').style.backgroundImage="url('http://unifox.kr/wooju/tetris/image/0.PNG')";
	}
	else if(next_block_num==1){
		document.getElementById('next_block').style.backgroundImage="url('http://unifox.kr/wooju/tetris/image/1.PNG')";
	}
	else if(next_block_num==2){
		document.getElementById('next_block').style.backgroundImage="url('http://unifox.kr/wooju/tetris/image/2.PNG')";
	}
	else if(next_block_num==3){
		document.getElementById('next_block').style.backgroundImage="url('http://unifox.kr/wooju/tetris/image/3.PNG')";
	}
	else if(next_block_num==4){
		document.getElementById('next_block').style.backgroundImage="url('http://unifox.kr/wooju/tetris/image/4.PNG')";
	}
	else if(next_block_num==5){
		document.getElementById('next_block').style.backgroundImage="url('http://unifox.kr/wooju/tetris/image/5.PNG')";
	}
	else if(next_block_num==6){
		document.getElementById('next_block').style.backgroundImage="url('http://unifox.kr/wooju/tetris/image/6.PNG')";
	}
}


function bot_block_img(){
	if(bot_change_block==0){
		document.getElementById('bot_save').style.backgroundImage="url('http://unifox.kr/wooju/tetris/image/0.1.PNG')";
	}
	else if(bot_change_block==1){
		document.getElementById('bot_save').style.backgroundImage="url('http://unifox.kr/wooju/tetris/image/1.1.PNG')";
	}
	else if(bot_change_block==2){
		document.getElementById('bot_save').style.backgroundImage="url('http://unifox.kr/wooju/tetris/image/2.1.PNG')";
	}
	else if(bot_change_block==3){
		document.getElementById('bot_save').style.backgroundImage="url('http://unifox.kr/wooju/tetris/image/3.1.PNG')";
	}
	else if(bot_change_block==4){
		document.getElementById('bot_save').style.backgroundImage="url('http://unifox.kr/wooju/tetris/image/4.1.PNG')";
	}
	else if(bot_change_block==5){
		document.getElementById('bot_save').style.backgroundImage="url('http://unifox.kr/wooju/tetris/image/5.1.PNG')";
	}
	else if(bot_change_block==6){
		document.getElementById('bot_save').style.backgroundImage="url('http://unifox.kr/wooju/tetris/image/6.1.PNG')";
	}

	if(bot_next_block_num==0){
		document.getElementById('bot_next_block').style.backgroundImage="url('http://unifox.kr/wooju/tetris/image/0.PNG')";
	}
	else if(bot_next_block_num==1){
		document.getElementById('bot_next_block').style.backgroundImage="url('http://unifox.kr/wooju/tetris/image/1.PNG')";
	}
	else if(bot_next_block_num==2){
		document.getElementById('bot_next_block').style.backgroundImage="url('http://unifox.kr/wooju/tetris/image/2.PNG')";
	}
	else if(bot_next_block_num==3){
		document.getElementById('bot_next_block').style.backgroundImage="url('http://unifox.kr/wooju/tetris/image/3.PNG')";
	}
	else if(bot_next_block_num==4){
		document.getElementById('bot_next_block').style.backgroundImage="url('http://unifox.kr/wooju/tetris/image/4.PNG')";
	}
	else if(bot_next_block_num==5){
		document.getElementById('bot_next_block').style.backgroundImage="url('http://unifox.kr/wooju/tetris/image/5.PNG')";
	}
	else if(bot_next_block_num==6){
		document.getElementById('bot_next_block').style.backgroundImage="url('http://unifox.kr/wooju/tetris/image/6.PNG')";
	}
}



function Draw(){
	block_img();
	bot_block_img();
	for(i=0;i<20;i++){
			for(j=0;j<10;j++){
				if(map[i][j]==0)
						ctx.fillStyle="#000";
				else
						ctx.fillStyle="lightgreen";
				if(bot_map[i][j]==0)
						bot_ctx.fillStyle="#000";
				else if(bot_map[i][j]==200){
					return;
				}
				else if(bot_map[i][j]==1){
					bot_ctx.fillStyle="lightgreen";
				}
				for(k=0;k<8;k+=2)
				{
						if(block_y+block_now[k]==i && block_x+block_now[k+1]==j){
							block_color();
						}
						if(bot_block_y+bot_block_now[k]==i && bot_block_x+bot_block_now[k+1]==j){
							bot_block_color();
						}
				}
				x=j*30;
				y=i*30;
				bot_x=j*30;
				bot_y=i*30;
				if(CheckBlock())
				block_now = block_Save.slice();
				ctx.fillRect(x,y,30,30);

				if(CheckBlock())
				bot_block_now = bot_block_Save.slice();
				bot_ctx.fillRect(bot_x,bot_y,30,30);
			}
	}
}

function bot_block_color(){
	if(bot_block_num==0){
		bot_ctx.fillStyle="#ff6633";

	}
	if(bot_block_num==1){
		bot_ctx.fillStyle="#ffcc00"
	}
	if(bot_block_num==2){
		bot_ctx.fillStyle="#ffcc33"
	}
	if(bot_block_num==3){
		bot_ctx.fillStyle="#00ffff"
	}
	if(bot_block_num==4){
		bot_ctx.fillStyle="#ff0033"
	}
	if(bot_block_num==5){
		bot_ctx.fillStyle="#cc0099"
	}
	if(bot_block_num==6){
		bot_ctx.fillStyle="#33cc33"
	}
}

function block_color(){
	if(block_num==0){
		ctx.fillStyle="#ff6633";

	}
	if(block_num==1){
		ctx.fillStyle="#ffcc00"
	}
	if(block_num==2){
		ctx.fillStyle="#ffcc33"
	}
	if(block_num==3){
		ctx.fillStyle="#00ffff"
	}
	if(block_num==4){
		ctx.fillStyle="#ff0033"
	}
	if(block_num==5){
		ctx.fillStyle="#cc0099"
	}
	if(block_num==6){
		ctx.fillStyle="#33cc33"
	}
}


function onKeyDown(event)
{
	if(Mode == GAME_MODE){
	if(event.which==37)	// 왼쪽키
	{
		block_x--;
		if(CheckBlock())block_x++;
		else Draw();
	}


	if(event.which==39)	// 오른쪽키
	{
		block_x++;
		if(CheckBlock())block_x--;
		else Draw();
	}


	if(event.which==40)	// 아래쪽키,
	{
		block_y++;
		if(CheckBlock())block_y--;
		else Draw();
	}

	if(event.which==38)	// 위쪽키(회전)
	{
		TurnBlock();
		if(CheckBlock())
		block_now = block_now.slice();
		Draw();
	}


	if(event.which==32)
	{
		Draw();
		while(1){
			block_y++;
			if(CheckBlock()){
						block_y--;
				break;
			}
		}
			Draw();
	}


	if(event.which==90){
		TurnBlock();
		TurnBlock();
		TurnBlock();
		if(CheckBlock())
		block_now = block_now.slice();
		Draw();
	}


	if(event.which==67){
		if(change_block==199){
			block_x=4;
			block_y=1;
		change_block = block_num;
		block_num=next_block_num;
		next_block_num=Math.floor(Math.random()*6.9);
		block_now = block[block_num].slice();
		}
		else{
			if(change==1){
		block_x=4;
		block_y=1;
		sum = block_num;
			block_num=change_block;
			change_block=sum;
			block_now=block[block_num].slice();
			change=0;
		}
	}
		Draw();
	}

}
}



function TurnBlock(){
	if(block_num==4)
	return;
centerX=0;
centerY=1;
		block_save = block_now.slice();
		for(i=0;i<block_now.length;i+=2){
			y=block_now[i+1] - centerX;
			x=-(block_now[i]-centerY);
			block_now[i]=y+centerY;
			block_now[i+1]=x+centerX;
		}
		if(CheckBlock())
		block_now = block_save.slice();
}


function BOT_TurnBlock(){
	if(bot_block_num==4)
	return;
	bot_block_x = 3;
	bot_block_y = 0;
	if(bot_block_num==0){
		bot_centerX=1;
		bot_centerY=1;
	}
	else{
bot_centerX=1;
bot_centerY=0;
}
		bot_block_save = bot_block_now.slice();
		for(i=0;i<8;i+=2){
			bot_y=bot_block_now[i+1] - bot_centerX;
			bot_x=-(bot_block_now[i]-bot_centerY);
			bot_block_now[i]=bot_y+bot_centerY;
			bot_block_now[i+1]=bot_x+bot_centerX;
		}
		// if(BOT_CheckBlock())
		// bot_block_now = bot_block_save.slice();
}


function BOT_block_change(){
		if(bot_change_block==199){
			bot_block_x=4;
			bot_block_y=1;
		bot_change_block = bot_block_num;
		bot_block_num=bot_next_block_num;
		bot_next_block_num=Math.floor(Math.random()*6.9);
		bot_block_now = bot_block[bot_block_num].slice();
		}
		else{
			if(bot_change==1){
		bot_block_x=4;
		bot_block_y=1;
		bot_sum = bot_block_num;
			bot_block_num=bot_change_block;
			bot_change_block=bot_sum;
			bot_block_now=bot_block[bot_block_num].slice();
			bot_change=0;
		}
	}
		Draw();
}

function BOT_block_turn_zkey(){
			BOT_TurnBlock();
			BOT_TurnBlock();
			BOT_TurnBlock();
			if(BOT_CheckBlock())
			bot_block_now = bot_block_now.slice();
			Draw();
}

function BOT_block_fall(){
		Draw();
		while(1){
			bot_block_y++;
			if(BOT_CheckBlock()){
						bot_block_y--;
				break;
			}
		}
			Draw();
}

function BOT_block_auto_fall(){
		Draw();
		while(1){
			bot_auto_y++;
			if(BOT_CheckBlock()){
						bot_auto_y--;
				break;
			}
		}
			Draw();
}



function BOT_block_up(){
		Draw();
		while(1){
			bot_block_y--;
			if(BOT_CheckBlock()){
						bot_block_y++;
				break;
			}
		}
			Draw();
}

function BOT_turn(){
		BOT_TurnBlock();
		if(BOT_CheckBlock())
		bot_block_now = bot_block_now.slice();
		Draw();
}

function BOT_move_right(){
			bot_block_x++;
}

function BOT_move_left(){
		bot_block_x--;
		if(BOT_CheckBlock())bot_block_x++;
		else Draw();
}



function score_up(sum){
	if(playing!=false) return;
	if(sum==10)
	score+=100;
	var now_score = document.getElementById('score');
	now_score.innerHTML=score;
}


function bot_score_up(sum){
	if(playing!=false) return;
	if(sum==10)
	bot_score+=100;
	var bot_now_score = document.getElementById('bot_score');
	bot_now_score.innerHTML=bot_score;
}


$(document).keydown(function( event ){
	onKeyDown(event);
});

</script>
</body>
</html>
