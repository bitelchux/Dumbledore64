// Air: Blows back all enemies in front of player
var air = {
	timeLeft: 0,
	cd: 0,
	cdTop: 120,
	speed: 16,
	onScreen: 0,
	cast: 0,
	used: 0,
	isdark: false,
	
	draw: function(){
		if(this.onScreen == 1 && this.cast == 0){
			if(player.dir == "W"){
				if(player.LR == "Left"){
					ctx.globalAlpha = Alpha*0.5;
					ctx.drawImage(Wiz_Sheet, 0, 0, 32, 32, player.x - player.width * 0.5, player.y - player.height * 0.5 + 8, 32, 32);
					ctx.globalAlpha = Alpha*0.5;
					ctx.drawImage(Wiz_Sheet, 0, 0, 32, 32, player.x - player.width * 0.5, player.y - player.height * 0.5 + 24, 32, 32);
					ctx.globalAlpha = Alpha*0.25;
					ctx.drawImage(Wiz_Sheet, 0, 0, 32, 32, player.x - player.width * 0.5, player.y - player.height * 0.5 + 40, 32, 32);
					ctx.globalAlpha = Alpha*0.25;
					ctx.drawImage(Wiz_Sheet, 0, 0, 32, 32, player.x - player.width * 0.5, player.y - player.height * 0.5 + 56, 32, 32);
					ctx.globalAlpha = Alpha/6;
					ctx.drawImage(Wiz_Sheet, 0, 0, 32, 32, player.x - player.width * 0.5, player.y - player.height * 0.5 + 72, 32, 32);
					ctx.globalAlpha = Alpha/6;
					ctx.drawImage(Wiz_Sheet, 0, 0, 32, 32, player.x - player.width * 0.5, player.y - player.height * 0.5 + 88, 32, 32);
				}
				else{
					ctx.globalAlpha = Alpha*0.5;
					ctx.drawImage(Wiz_Sheet, 0, 32, 32, 32, player.x - player.width * 0.5, player.y - player.height * 0.5 + 8, 32, 32);
					ctx.globalAlpha = Alpha*0.5;
					ctx.drawImage(Wiz_Sheet, 0, 32, 32, 32, player.x - player.width * 0.5, player.y - player.height * 0.5 + 24, 32, 32);
					ctx.globalAlpha = Alpha*0.25;
					ctx.drawImage(Wiz_Sheet, 0, 32, 32, 32, player.x - player.width * 0.5, player.y - player.height * 0.5 + 40, 32, 32);
					ctx.globalAlpha = Alpha*0.25;
					ctx.drawImage(Wiz_Sheet, 0, 32, 32, 32, player.x - player.width * 0.5, player.y - player.height * 0.5 + 56, 32, 32);
					ctx.globalAlpha = Alpha/6;
					ctx.drawImage(Wiz_Sheet, 0, 32, 32, 32, player.x - player.width * 0.5, player.y - player.height * 0.5 + 72, 32, 32);
					ctx.globalAlpha = Alpha/6;
					ctx.drawImage(Wiz_Sheet, 0, 32, 32, 32, player.x - player.width * 0.5, player.y - player.height * 0.5 + 88, 32, 32);
				}
			}
			if(player.dir == "S"){
				if(player.LR == "Left"){
					ctx.globalAlpha = Alpha*0.5;
					ctx.drawImage(Wiz_Sheet, 0, 0, 32, 32, player.x - player.width * 0.5, player.y - player.height * 0.5 - 8, 32, 32);
					ctx.globalAlpha = Alpha*0.5;
					ctx.drawImage(Wiz_Sheet, 0, 0, 32, 32, player.x - player.width * 0.5, player.y - player.height * 0.5 - 24, 32, 32);
					ctx.globalAlpha = Alpha*0.25;
					ctx.drawImage(Wiz_Sheet, 0, 0, 32, 32, player.x - player.width * 0.5, player.y - player.height * 0.5 - 40, 32, 32);
					ctx.globalAlpha = Alpha*0.25;
					ctx.drawImage(Wiz_Sheet, 0, 0, 32, 32, player.x - player.width * 0.5, player.y - player.height * 0.5 - 56, 32, 32);
					ctx.globalAlpha = Alpha/6;
					ctx.drawImage(Wiz_Sheet, 0, 0, 32, 32, player.x - player.width * 0.5, player.y - player.height * 0.5 - 72, 32, 32);
					ctx.globalAlpha = Alpha/6;
					ctx.drawImage(Wiz_Sheet, 0, 0, 32, 32, player.x - player.width * 0.5, player.y - player.height * 0.5 - 88, 32, 32);
				}
				else{
					ctx.globalAlpha = Alpha*0.5;
					ctx.drawImage(Wiz_Sheet, 0, 32, 32, 32, player.x - player.width * 0.5, player.y - player.height * 0.5 - 8, 32, 32);
					ctx.globalAlpha = Alpha*0.5;
					ctx.drawImage(Wiz_Sheet, 0, 32, 32, 32, player.x - player.width * 0.5, player.y - player.height * 0.5 - 24, 32, 32);
					ctx.globalAlpha = Alpha*0.25;
					ctx.drawImage(Wiz_Sheet, 0, 32, 32, 32, player.x - player.width * 0.5, player.y - player.height * 0.5 - 40, 32, 32);
					ctx.globalAlpha = Alpha*0.25;
					ctx.drawImage(Wiz_Sheet, 0, 32, 32, 32, player.x - player.width * 0.5, player.y - player.height * 0.5 - 56, 32, 32);
					ctx.globalAlpha = Alpha/6;
					ctx.drawImage(Wiz_Sheet, 0, 32, 32, 32, player.x - player.width * 0.5, player.y - player.height * 0.5 - 72, 32, 32);
					ctx.globalAlpha = Alpha/6;
					ctx.drawImage(Wiz_Sheet, 0, 32, 32, 32, player.x - player.width * 0.5, player.y - player.height * 0.5 - 88, 32, 32);
				}
			}
			if(player.dir == "A"){
				ctx.globalAlpha = Alpha*0.5;
				ctx.drawImage(Wiz_Sheet, 0, 0, 32, 32, player.x - player.width * 0.5 + 8, player.y - player.height * 0.5, 32, 32);
				ctx.globalAlpha = Alpha*0.5;
				ctx.drawImage(Wiz_Sheet, 0, 0, 32, 32, player.x - player.width * 0.5 + 24, player.y - player.height * 0.5, 32, 32);
				ctx.globalAlpha = Alpha*0.25;
				ctx.drawImage(Wiz_Sheet, 0, 0, 32, 32, player.x - player.width * 0.5 + 40, player.y - player.height * 0.5, 32, 32);
				ctx.globalAlpha = Alpha*0.25;
				ctx.drawImage(Wiz_Sheet, 0, 0, 32, 32, player.x - player.width * 0.5 + 56, player.y - player.height * 0.5, 32, 32);
				ctx.globalAlpha = Alpha/6;
				ctx.drawImage(Wiz_Sheet, 0, 0, 32, 32, player.x - player.width * 0.5 + 72, player.y - player.height * 0.5, 32, 32);
				ctx.globalAlpha = Alpha/6;
				ctx.drawImage(Wiz_Sheet, 0, 0, 32, 32, player.x - player.width * 0.5 + 88, player.y - player.height * 0.5, 32, 32);
			}
			if(player.dir == "D"){
				ctx.globalAlpha = Alpha*0.5;
				ctx.drawImage(Wiz_Sheet, 0, 32, 32, 32, player.x - player.width * 0.5 - 8, player.y - player.height * 0.5, 32, 32);
				ctx.globalAlpha = Alpha*0.5;
				ctx.drawImage(Wiz_Sheet, 0, 32, 32, 32, player.x - player.width * 0.5 - 24, player.y - player.height * 0.5, 32, 32);
				ctx.globalAlpha = Alpha*0.25;
				ctx.drawImage(Wiz_Sheet, 0, 32, 32, 32, player.x - player.width * 0.5 - 40, player.y - player.height * 0.5, 32, 32);
				ctx.globalAlpha = Alpha*0.25;
				ctx.drawImage(Wiz_Sheet, 0, 32, 32, 32, player.x - player.width * 0.5 - 56, player.y - player.height * 0.5, 32, 32);
				ctx.globalAlpha = Alpha/6;
				ctx.drawImage(Wiz_Sheet, 0, 32, 32, 32, player.x - player.width * 0.5 - 72, player.y - player.height * 0.5, 32, 32);
				ctx.globalAlpha = Alpha/6;
				ctx.drawImage(Wiz_Sheet, 0, 32, 32, 32, player.x - player.width * 0.5 - 88, player.y - player.height * 0.5, 32, 32);
			}
			ctx.globalAlpha = Alpha;
		}
	},
	effect: function(){
		if(this.cd > 0){
			this.cd-=1;
		}
		if(this.cast > 0){
			this.cast-=1;
		}
		if(this.timeLeft > 0 && this.cast <= 0){
			this.timeLeft-=1;
		}
		if(this.onScreen == 1 && this.cast == 0){
			for(E in AllEnemies){
				if(collision(player.dir, player, AllEnemies[E])){
					onHit(AllEnemies[E]);
				}
			}
			for(O in ObsList){
				if(collision(player.dir, player, ObsList[O])){
					obsHit(ObsList[O]);
				}
			}
			player.speed = player.speed2 * 16;
		}
		if(this.onScreen == 1 && this.cast == 0 && this.used == 0){
			player.dirct = 15;
			hptimer = 15;
			player.speed = player.speed2 * 16;
			this.used = 1;
			Wind.currentTime = 0;
			Wind.play();
		}
		if(this.timeLeft <=0 && this.onScreen == 1){
			player.speed = player.speed2 * 4;
			this.onScreen = 0;
			this.isdark = false;
		}
		if(this.isdark){
			if(player.x > 740 && player.y < 48 && this.onScreen == 1){
				player.dir = "A";
				player.x-=64;
				player.dirct = hptimer;
			}
			else if(player.x > 740 && player.y > 516 && this.onScreen == 1){
				player.dir = "W";
				player.y-=64;
				player.dirct = hptimer;
			}
			else if(player.x < 48 && player.y > 516 && this.onScreen == 1){
				player.dir = "D";
				player.x+=64;
				player.dirct = hptimer;
			}
			else if(player.x < 48 && player.y < 48 && this.onScreen == 1){
				player.dir = "S";
				player.y+=64;
				player.dirct = hptimer;
			}
			else if(player.x > 750 && player.dir == "D" && this.onScreen == 1){
				player.dir = "W";
				player.y-=64;
				player.dirct = hptimer;
			}
			else if(player.x < 60 && player.dir == "A" && this.onScreen == 1){
				player.dir = "S";
				player.y+=64;
				player.dirct = hptimer;
			}
			else if(player.y > 516 && player.dir == "S" && this.onScreen == 1){
				player.dir = "D";
				player.x+=64;
				player.dirct = hptimer;
			}
			else if(player.y < 60 && player.dir == "W" && this.onScreen == 1){
				player.dir = "A";
				player.x-=64;
				player.dirct = hptimer;
			}
		}
		else{
			if(player.x > 772 && player.dir == "D" && this.onScreen == 1){
				player.dir = "W";
				player.dirct = hptimer;
			}
			else if(player.x < 28 && player.dir == "A" && this.onScreen == 1){
				player.dir = "S";
				player.dirct = hptimer;
			}
			else if(player.y > 548 && player.dir == "S" && this.onScreen == 1){
				player.dir = "D";
				player.dirct = hptimer;
			}
			else if(player.y < 28 && player.dir == "W" && this.onScreen == 1){
				player.dir = "A";
				player.dirct = hptimer;
			}
		}
	},
	// Spawn
	shoot: function(){
	if(this.cd == 0){
		this.cd = this.cdTop;
		this.timeLeft = 15;
		this.onScreen = 1;
		this.used = 0;
		if(this.cast <0){
			this.cast = 0;
		}
	}
	}
};
// air2: Blow away all nearby enemies
var air2 = {
	timeLeft: 0,
	cd: 0,
	cdTop: 300,
	speed: 16,
	onScreen: 0,
	cast: 0,
	num: 0,
	used: 0,
	maxNum: 4,
	
	draw: function(){
		if(this.onScreen == 1 && this.cast == 0){
			if(player.dir == "W"){
				if(player.LR == "Left"){
					ctx.globalAlpha = Alpha*0.5;
					ctx.drawImage(Wiz_Sheet, 0, 0, 32, 32, player.x - player.width * 0.5, player.y - player.height * 0.5 + 8, 32, 32);
					ctx.globalAlpha = Alpha*0.5;
					ctx.drawImage(Wiz_Sheet, 0, 0, 32, 32, player.x - player.width * 0.5, player.y - player.height * 0.5 + 24, 32, 32);
					ctx.globalAlpha = Alpha*0.25;
					ctx.drawImage(Wiz_Sheet, 0, 0, 32, 32, player.x - player.width * 0.5, player.y - player.height * 0.5 + 40, 32, 32);
					ctx.globalAlpha = Alpha*0.25;
					ctx.drawImage(Wiz_Sheet, 0, 0, 32, 32, player.x - player.width * 0.5, player.y - player.height * 0.5 + 56, 32, 32);
					ctx.globalAlpha = Alpha/6;
					ctx.drawImage(Wiz_Sheet, 0, 0, 32, 32, player.x - player.width * 0.5, player.y - player.height * 0.5 + 72, 32, 32);
					ctx.globalAlpha = Alpha/6;
					ctx.drawImage(Wiz_Sheet, 0, 0, 32, 32, player.x - player.width * 0.5, player.y - player.height * 0.5 + 88, 32, 32);
				}
				else{
					ctx.globalAlpha = Alpha*0.5;
					ctx.drawImage(Wiz_Sheet, 0, 32, 32, 32, player.x - player.width * 0.5, player.y - player.height * 0.5 + 8, 32, 32);
					ctx.globalAlpha = Alpha*0.5;
					ctx.drawImage(Wiz_Sheet, 0, 32, 32, 32, player.x - player.width * 0.5, player.y - player.height * 0.5 + 24, 32, 32);
					ctx.globalAlpha = Alpha*0.25;
					ctx.drawImage(Wiz_Sheet, 0, 32, 32, 32, player.x - player.width * 0.5, player.y - player.height * 0.5 + 40, 32, 32);
					ctx.globalAlpha = Alpha*0.25;
					ctx.drawImage(Wiz_Sheet, 0, 32, 32, 32, player.x - player.width * 0.5, player.y - player.height * 0.5 + 56, 32, 32);
					ctx.globalAlpha = Alpha/6;
					ctx.drawImage(Wiz_Sheet, 0, 32, 32, 32, player.x - player.width * 0.5, player.y - player.height * 0.5 + 72, 32, 32);
					ctx.globalAlpha = Alpha/6;
					ctx.drawImage(Wiz_Sheet, 0, 32, 32, 32, player.x - player.width * 0.5, player.y - player.height * 0.5 + 88, 32, 32);
				}
			}
			if(player.dir == "S"){
				if(player.LR == "Left"){
					ctx.globalAlpha = Alpha*0.5;
					ctx.drawImage(Wiz_Sheet, 0, 0, 32, 32, player.x - player.width * 0.5, player.y - player.height * 0.5 - 8, 32, 32);
					ctx.globalAlpha = Alpha*0.5;
					ctx.drawImage(Wiz_Sheet, 0, 0, 32, 32, player.x - player.width * 0.5, player.y - player.height * 0.5 - 24, 32, 32);
					ctx.globalAlpha = Alpha*0.25;
					ctx.drawImage(Wiz_Sheet, 0, 0, 32, 32, player.x - player.width * 0.5, player.y - player.height * 0.5 - 40, 32, 32);
					ctx.globalAlpha = Alpha*0.25;
					ctx.drawImage(Wiz_Sheet, 0, 0, 32, 32, player.x - player.width * 0.5, player.y - player.height * 0.5 - 56, 32, 32);
					ctx.globalAlpha = Alpha/6;
					ctx.drawImage(Wiz_Sheet, 0, 0, 32, 32, player.x - player.width * 0.5, player.y - player.height * 0.5 - 72, 32, 32);
					ctx.globalAlpha = Alpha/6;
					ctx.drawImage(Wiz_Sheet, 0, 0, 32, 32, player.x - player.width * 0.5, player.y - player.height * 0.5 - 88, 32, 32);
				}
				else{
					ctx.globalAlpha = Alpha*0.5;
					ctx.drawImage(Wiz_Sheet, 0, 32, 32, 32, player.x - player.width * 0.5, player.y - player.height * 0.5 - 8, 32, 32);
					ctx.globalAlpha = Alpha*0.5;
					ctx.drawImage(Wiz_Sheet, 0, 32, 32, 32, player.x - player.width * 0.5, player.y - player.height * 0.5 - 24, 32, 32);
					ctx.globalAlpha = Alpha*0.25;
					ctx.drawImage(Wiz_Sheet, 0, 32, 32, 32, player.x - player.width * 0.5, player.y - player.height * 0.5 - 40, 32, 32);
					ctx.globalAlpha = Alpha*0.25;
					ctx.drawImage(Wiz_Sheet, 0, 32, 32, 32, player.x - player.width * 0.5, player.y - player.height * 0.5 - 56, 32, 32);
					ctx.globalAlpha = Alpha/6;
					ctx.drawImage(Wiz_Sheet, 0, 32, 32, 32, player.x - player.width * 0.5, player.y - player.height * 0.5 - 72, 32, 32);
					ctx.globalAlpha = Alpha/6;
					ctx.drawImage(Wiz_Sheet, 0, 32, 32, 32, player.x - player.width * 0.5, player.y - player.height * 0.5 - 88, 32, 32);
				}
			}
			if(player.dir == "A"){
				ctx.globalAlpha = Alpha*0.5;
				ctx.drawImage(Wiz_Sheet, 0, 0, 32, 32, player.x - player.width * 0.5 + 8, player.y - player.height * 0.5, 32, 32);
				ctx.globalAlpha = Alpha*0.5;
				ctx.drawImage(Wiz_Sheet, 0, 0, 32, 32, player.x - player.width * 0.5 + 24, player.y - player.height * 0.5, 32, 32);
				ctx.globalAlpha = Alpha*0.25;
				ctx.drawImage(Wiz_Sheet, 0, 0, 32, 32, player.x - player.width * 0.5 + 40, player.y - player.height * 0.5, 32, 32);
				ctx.globalAlpha = Alpha*0.25;
				ctx.drawImage(Wiz_Sheet, 0, 0, 32, 32, player.x - player.width * 0.5 + 56, player.y - player.height * 0.5, 32, 32);
				ctx.globalAlpha = Alpha/6;
				ctx.drawImage(Wiz_Sheet, 0, 0, 32, 32, player.x - player.width * 0.5 + 72, player.y - player.height * 0.5, 32, 32);
				ctx.globalAlpha = Alpha/6;
				ctx.drawImage(Wiz_Sheet, 0, 0, 32, 32, player.x - player.width * 0.5 + 88, player.y - player.height * 0.5, 32, 32);
			}
			if(player.dir == "D"){
				ctx.globalAlpha = Alpha*0.5;
				ctx.drawImage(Wiz_Sheet, 0, 32, 32, 32, player.x - player.width * 0.5 - 8, player.y - player.height * 0.5, 32, 32);
				ctx.globalAlpha = Alpha*0.5;
				ctx.drawImage(Wiz_Sheet, 0, 32, 32, 32, player.x - player.width * 0.5 - 24, player.y - player.height * 0.5, 32, 32);
				ctx.globalAlpha = Alpha*0.25;
				ctx.drawImage(Wiz_Sheet, 0, 32, 32, 32, player.x - player.width * 0.5 - 40, player.y - player.height * 0.5, 32, 32);
				ctx.globalAlpha = Alpha*0.25;
				ctx.drawImage(Wiz_Sheet, 0, 32, 32, 32, player.x - player.width * 0.5 - 56, player.y - player.height * 0.5, 32, 32);
				ctx.globalAlpha = Alpha/6;
				ctx.drawImage(Wiz_Sheet, 0, 32, 32, 32, player.x - player.width * 0.5 - 72, player.y - player.height * 0.5, 32, 32);
				ctx.globalAlpha = Alpha/6;
				ctx.drawImage(Wiz_Sheet, 0, 32, 32, 32, player.x - player.width * 0.5 - 88, player.y - player.height * 0.5, 32, 32);
			}
			ctx.globalAlpha = Alpha;
		}
	},
	effect: function(){
		if(this.cd > 0){
			this.cd-=1;
		}
		if(this.cast > 0){
			this.cast-=1;
		}
		if(this.timeLeft > 0){
			this.timeLeft-=1;
		}
		if(this.onScreen == 1 && this.cast == 0){
			for(E in AllEnemies){
				if(collision(player.dir, player, AllEnemies[E])){
					onHit(AllEnemies[E]);
					if(this.maxNum < 9){
						this.maxNum+=1;
						if(typemarker5.x != -100 && typemarker6.x != -100){
							typemarker4.text = "+ Time";
							typemarker4.x = player.x-player.width*2;
							typemarker4.y = player.y;
							typemarker4.timeLeft = 20;
						}
						else if(typemarker6.x != -100){
							typemarker5.text = "+ Time";
							typemarker5.x = player.x-player.width*2;
							typemarker5.y = player.y;
							typemarker5.timeLeft = 20;
						}
						else{
							typemarker6.text = "+ Time";
							typemarker6.x = player.x-player.width*2;
							typemarker6.y = player.y;
							typemarker6.timeLeft = 20;
						}
					}
				}
			}
			for(O in ObsList){
				if(collision(player.dir, player, ObsList[O])){
					obsHit(ObsList[O]);
				}
			}
		}
		if(this.onScreen == 1 && this.cast == 0 && this.used == 0){
			player.dirct = 10;
			hptimer = 10;
			player.speed = player.speed2 * 16;
			this.used = 1;
			Wind.currentTime = 0;
			Wind.play();
		}
		if(player.x > 772 && player.dir == "D" && this.onScreen == 1){
			player.dir = "W";
			player.y-=16;
			player.dirct = hptimer;
		}
		else if(player.x < 28 && player.dir == "A" && this.onScreen == 1){
			player.dir = "S";
			player.y+=16;
			player.dirct = hptimer;
		}
		else if(player.y > 548 && player.dir == "S" && this.onScreen == 1){
			player.dir = "D";
			player.x+=16;
			player.dirct = hptimer;
		}
		else if(player.y < 28 && player.dir == "W" && this.onScreen == 1){
			player.dir = "A";
			player.x-=16;
			player.dirct = hptimer;
		}
		if(this.timeLeft <=0 && this.onScreen == 1){
			if(this.num >= this.maxNum){
				player.speed = player.speed2 * 4;
				this.onScreen = 0;
				this.num = 0;
			}
			else{
				this.num++;
				this.timeLeft = 10;
				player.dirct = 10;
				hptimer+=10;
				player.speed = player.speed2 * 16;
				if (87 in keysDown){
					player.dir = "W";
				}
				if (65 in keysDown){
					player.dir = "A";
				}
				if (83 in keysDown){
					player.dir = "S";
				}
				if (68 in keysDown){
					player.dir = "D";
				}
				else{
					player.dir = player.dir;
				}
			}
		}
	},
	// Spawn
	shoot: function(){
	if(this.cd == 0){
		this.cd = this.cdTop;
		this.timeLeft = 10;
		this.onScreen = 1;
		this.used = 0;
		this.maxNum = 4;
	}
	}
};