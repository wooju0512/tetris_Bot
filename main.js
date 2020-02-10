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
var turn_count=0;
var best_turn=0;
var best_score_min=10000;
var final_x=0;
var final_turn=0;
var high_bool=true;
var under_width=0;
var line=0;

if(bot_block_num==0)
	bot_x_len=6;
else if(bot_block_num==4)
	bot_x_len=8;
else {
	bot_x_len=7;
}

if(bot_block_num==0)
	bot_block_width=4;
else if(bot_block_num==4)
	bot_block_width=2;
else
	bot_block_width=3;



			for(ai_i=0;ai_i<4;ai_i++){
				turn_count++;
				BOT_TurnBlock();
						check_score=[0,0,0,0,0,0,0,0,0,0];
						under_count=[0,0,0,0,0,0,0,0,0,0];
						space_count = [0,0,0,0,0,0,0,0,0,0,0];
						high_score = [0,0,0,0,0,0,0,0,0,0];
						line_break = [0,0,0,0,0,0,0,0,0,0];
						bot_block_x=0;


						if(bot_block_num==0 && turn_count%2!=0){
							bot_block_width=4;
							bot_x_len=9;
						}
						else if(bot_block_num==0 && turn_count%2!=0){
							bot_block_width=1;
							bot_x_len=9;
						}
						else if(bot_block_num==4){
							bot_block_width=2;
							bot_x_len=9;
						}
						else{
									if(turn_count%2==0){
										bot_block_width=3;
										bot_x_len=8;
									}
									else if(turn_count%2!=0){
										bot_block_width=2;
										bot_x_len=7;
									}
								}


					for(ai_j=0;ai_j<bot_x_len;ai_j++){
						under_width=0;
						bool=false;
						high_bool=true;
						BOT_block_fall();

						for(k=0;k<8;k+=2)
						{
								bot_auto_y = bot_block_y + bot_block_now[k];
								bot_auto_x = bot_block_x + bot_block_now[k+1];
								if(bot_auto_y< 0 || bot_auto_x >=10 || bot_map[bot_auto_y+1][bot_auto_x] != 0)
								under_width++;
						}
						under_count[ai_j]=(45-(under_width*4));
						check_score[ai_j]+=under_count[ai_j];



for(k=0;k<10;k++)
{
  for(l=0;l<20;l++)
  {
    if(bot_map[l][k] != 0)
    {
      high_score[ai_j] += (20 - l) * (20 - l);
      break;
    }
  }
}
check_score[ai_j] += high_score[ai_j]*5;

						for(k=0;k<8;k+=2)
						{
								bot_auto_y = bot_block_y + bot_block_now[k];
								bot_auto_x = bot_block_x + bot_block_now[k+1];
								if(bot_auto_y< 0 || bot_auto_x >=10 || bot_auto_y >= 20 || bot_map[bot_auto_y][bot_auto_x] == 0)
								bot_map[bot_auto_y][bot_auto_x]=200;
						}

						for(ai_y=0;ai_y<20;ai_y++){
								for(ai_x=bot_block_x;ai_x<(bot_block_width+bot_block_x);ai_x++){
										if(bool && bot_map[ai_y][ai_x]==0){
											space_count[ai_j]+=1;
										}
										if(bot_map[ai_y][ai_x]!=0){
											bool=true;
										}
								}
						}
						check_score[ai_j] += space_count[ai_j]*2;


						for(k=0;k<8;k+=2)
						{
								bot_auto_y = bot_block_y + bot_block_now[k];
								bot_auto_x = bot_block_x + bot_block_now[k+1];
								if(bot_auto_y< 0 || bot_auto_x >=10 || bot_auto_y >= 20 || bot_map[bot_auto_y][bot_auto_x] == 200)
								bot_map[bot_auto_y][bot_auto_x]=0;
						}

						bot_block_x++;
						bot_block_y=0;
					}
					score_min=10000000000;
					for(ai_check=0;ai_check<bot_x_len;ai_check++){
						if(check_score[ai_check]<=score_min){
							score_min=check_score[ai_check];
							best_x[ai_i]=ai_check;
						}
					}
					best_score[ai_i]=score_min;
			}
			best_score_min=10000;
			for(ai_z=0;ai_z<4;ai_z++)
			{
				if(best_score[ai_z]<=best_score_min){
					final_x=best_x[ai_z];
					final_turn=ai_z;
					}
			}
			bot_block_y=3;
      alert(final_turn)
			for(turn=0;turn<final_turn;turn++){
				BOT_TurnBlock();
			}
			bot_block_y=0;
			bot_block_x=final_x;
			BOT_block_fall();
