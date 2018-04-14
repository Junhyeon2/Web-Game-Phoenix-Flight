/*
 * OBJECT: Player
 */
var Player = function(screen, width, height, x, y){
	this.screen = screen;
	this.img;
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.velX = 0;
	this.velY = 0;
	this.div;
	this.srcArr;
	this.idx = 0;
	this.stAnim;
	this.stMove;
	this.isAlive = true;
	this.animRotate = 0;
	this.animScale = 1;
	this.stAnimCollisionEnemy;
	this.superMode = false;
	this.srcArr = [
		"./img/player/player_normal_1.png",
		"./img/player/player_normal_2.png"
	];
	this.init = function(){
		this.img = document.createElement("img");
		this.img.src = this.srcArr[0];
		this.img.style.width = this.width+"px";
		this.img.style.height = this.height+"px";
		this.img.style.position = "absolute";
		this.img.style.left = this.x + "px";
		this.img.style.top = this.y + "px";

		this.screen.appendChild(this.img);

		this.div = document.createElement("div");
		this.div.style.margin = "0 10px 0 10px";
		this.div.style.width = (this.width-20)+"px";
		this.div.style.height = this.height+"px";
		this.div.style.position = "absolute";
		this.div.style.left = this.x + "px";
		this.div.style.top = this.y + "px";

		this.screen.appendChild(this.div);


		this.anim()
		this.move();
	}
	this.anim = function(){
		var me = this;
		this.idx++;

		if(this.idx == this.srcArr.length){
			this.idx = 0;
		}
		this.img.src = this.srcArr[this.idx];

		this.stAnim = setTimeout(function(){
			me.anim();
		}, 300);
	}
	this.move = function(){
		var me = this;

		this.collisionOutline();

		this.x += this.velX;
		this.y += this.velY;
		this.img.style.left = this.x + "px";
		this.img.style.top = this.y + "px"
		this.div.style.left = this.x + "px";
		this.div.style.top = this.y + "px"
		this.stMove = setTimeout(function(){
			me.move();
		}, 10);

		this.collision();
	}
	this.collisionOutline = function(){
		if(this.x <= 2)
			this.x = 2;
		else if(this.x >= 502)
			this.x = 502;

		if(this.y <= 2)
			this.y = 2;
		else if(this.y >= 634)
			this.y = 634;
	}
	this.collision = function(){
		if(!this.superMode){
			for(var i=0; i<enemyArr.length; ++i){
				if(hitTest(this.div, enemyArr[i].div)){
					if(this.isAlive){
						var aud = audioHit.cloneNode();
						aud.play();
						clearTimeout(this.stAnim);
						clearTimeout(this.stMove);
						this.animCollisionEnemy();
					}
					this.isAlive = false;
				}
			}
		}else{
			for(var i=0; i<enemyArr.length; ++i){
				if(hitTest(this.div, enemyArr[i].div)){
					if(enemyArr[i].isHited == false){
						var aud = audioHit.cloneNode();
						aud.play();
						enemyArr[i].isHited = true;
						enemyArr[i].collision();
						clearTimeout(enemyArr[i].stMove);
						clearTimeout(enemyArr[i].stAnim);
						score += enemyArr[i].score;
						enemyArr[i].screen.removeChild(enemyArr[i].img);
						enemyArr[i].screen.removeChild(enemyArr[i].div);
						enemyArr.splice(i, 1);
					}
				}
			}
		}
	}
	this.animCollisionEnemy = function(){
		var me = this;
		this.animRotate += 10;
		if(this.animScale <= 0.1){
			this.animScale = 0.1
		}else{
			this.animScale -= 0.02;
		}
		this.img.style.transform = "rotate("+this.animRotate+"deg) scale("+this.animScale+", "+this.animScale+")";

		this.stAnimCollisionEnemy = setTimeout(function(){
			me.animCollisionEnemy();
		}, 25);

		if(this.animRotate >= 360){
			this.screen.removeChild(this.img);
			this.screen.removeChild(this.div);
			clearTimeout(this.stAnimCollisionEnemy);
		}
	}
}
/*
 * OBJECT: Enemy
 */
var Enemy = function(screen, width, height, x, y, level, vel){
	this.screen = screen;
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.velY = vel;
	this.img;
	this.div;
	this.srcArr;
	this.stMove;
	this.stAnim;
	this.idx = 0;
	this.isHited = false;
	this.stAnimCollision;
	this.animRotate = 0;
	this.animScale = 1;
	this.rotateImg;
	this.hp = level;
	this.colorArr = ["white", "yellow", "green", "orange", "blue", "purple", "red", "black"];
	this.score = 100 * level;

	this.init = function(){
		this.srcArr = [
			"./img/enemy/enemy_"+this.colorArr[level-1]+"_1.png",
			"./img/enemy/enemy_"+this.colorArr[level-1]+"_2.png",
			"./img/enemy/enemy_"+this.colorArr[level-1]+"_3.png",
			"./img/enemy/enemy_"+this.colorArr[level-1]+"_4.png"
		];
		this.img = document.createElement("img");
		this.img.src = this.srcArr[0];

		this.img.style.position = "absolute";
		this.img.style.width = this.width + "px";
		this.img.style.height = this.height + "px";
		this.img.style.left = this.x + "px";
		this.img.style.top = this.y + "px";

		this.screen.appendChild(this.img);

		this.div = document.createElement("div");

		this.div.style.position = "absolute";
		this.div.style.margin = "0 25px 0 25px";
		this.div.style.width = (this.width-50) + "px";
		this.div.style.height = this.height + "px";
		this.div.style.left = this.x + "px";
		this.div.style.top = this.y + "px";

		this.screen.appendChild(this.div);

		this.anim();
		this.move();

	}
	this.initRotateImg = function(){
		this.rotateImg = document.createElement("img");
		this.rotateImg.src = this.img.src;
		this.rotateImg.style.position = "absolute";
		this.rotateImg.style.width =  this.width + "px";
		this.rotateImg.style.height =  this.height + "px";;
		this.rotateImg.style.left =  this.x + "px";;
		this.rotateImg.style.top =  this.y + "px";;
		this.screen.appendChild(this.rotateImg);
	}
	this.anim = function(){
		var me = this;
		this.idx++;
		if(this.idx == this.srcArr.length){
			this.idx = 0;
		}
		this.img.src = this.srcArr[this.idx];
		this.stAnim = setTimeout(function(){
			me.anim();
		}, 300);
	}
	this.move = function(){
		var me = this;

		this.y += this.velY;
		this.img.style.top = this.y + "px";

		this.div.style.top = this. y + "px";

		this.stMove = setTimeout(function(){
			me.move();
		},10);

		this.collisionBottom();
	}
	this.collisionBottom = function(){
		if(this.y >= 700){
			for(var i=0; i<enemyArr.length; ++i){
				if(this == enemyArr[i]){
					clearTimeout(enemyArr[i].stMove);
					clearTimeout(enemyArr[i].stAnim);
					enemyArr[i].screen.removeChild(enemyArr[i].img);
					enemyArr[i].screen.removeChild(enemyArr[i].div);
					enemyArr.splice(i, 1);
				}
			}
		}
	}
	this.collision = function(){

		this.initRotateImg();
		this.animCollision();

	}
	this.animCollision = function(){
		var me = this;
		this.animRotate += 10;
		if(this.animScale <= 0.1){
			this.animScale = 0.1
		}else{
			this.animScale -= 0.02;
		}
		this.rotateImg.style.transform = "rotate("+this.animRotate+"deg) scale("+this.animScale+", "+this.animScale+")";

		this.stAnimCollision = setTimeout(function(){
			me.animCollision();
		}, 25);

		if(this.animRotate >= 360){
			clearTimeout(this.stAnimCollision);
			this.screen.removeChild(this.rotateImg);
		}
	}
}

/*
 * OBJECT: Fireball
 */
var Fireball = function(screen, width, height, x, y, power){
	this.screen = screen;
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.img;
	this.velY = 3;
	this.stAnim;
	this.stMove;
	this.srcArr;
	this.idx = 0;
	this.explosionImg;
	this.explosionSrcArr;
	this.explosionIdx = 0;
	this.stExplosion;
	this.power = power;

	this.init = function(){
		this.srcArr = [
			"./img/fireball/fireball_01.png",
			"./img/fireball/fireball_02.png",
			"./img/fireball/fireball_03.png",
			"./img/fireball/fireball_04.png",
			"./img/fireball/fireball_05.png",
			"./img/fireball/fireball_06.png",
			"./img/fireball/fireball_07.png",
			"./img/fireball/fireball_08.png",
			"./img/fireball/fireball_09.png",
			"./img/fireball/fireball_10.png"
		];
		this.img = document.createElement("img");
		this.img.src = this.srcArr[0];
		this.img.style.width = this.width+"px";
		this.img.style.height = this.height+"px";

		this.img.style.position = "absolute";
		this.img.style.left = this.x+"px";
		this.img.style.top = this.y+"px";

		this.screen.appendChild(this.img);

		this.explosionSrcArr = [
			"./img/explosion/explosion_01.png",
			"./img/explosion/explosion_02.png",
			"./img/explosion/explosion_03.png",
			"./img/explosion/explosion_04.png",
			"./img/explosion/explosion_05.png",
			"./img/explosion/explosion_06.png",
			"./img/explosion/explosion_07.png",
			"./img/explosion/explosion_08.png",
			"./img/explosion/explosion_09.png",
			"./img/explosion/explosion_10.png"
		];
		this.anim();
		this.move();
	}

	this.anim = function(){
		var me = this;
		this.idx++;
		if(this.idx == this.srcArr.length){
			this.idx = 4;
		}
		this.img.src = this.srcArr[this.idx];
		this.stAnim = setTimeout(function(){
			me.anim();
		}, 50);
	}
	this.animExplosion = function(){
		var me = this;
		if(this.explosionIdx == 0){
			this.explosionImg = document.createElement("img");
			this.explosionImg.src = this.explosionSrcArr[0];
			this.explosionImg.style.position = "absolute";
			this.explosionImg.style.zIndex = "1";
			this.explosionImg.style.width = "96px";
			this.explosionImg.style.height = "160px";
			this.explosionImg.style.left = (this.x-37) + "px";
			this.explosionImg.style.top = (this.y-80) + "px";
			this.screen.appendChild(this.explosionImg);
		}else{
			this.explosionImg.src = this.explosionSrcArr[this.explosionIdx];
		}
		this.explosionIdx++;
		this.stExplosion = setTimeout(function(){
			me.animExplosion();
		}, 80);

		if(this.explosionIdx == this.explosionSrcArr.length){
			clearTimeout(this.stExplosion);
			this.screen.removeChild(this.explosionImg);
		}
	}
	this.move = function(){
		var me = this;

		this.y -= this.velY;
		this.img.style.top = this.y+"px";

		this.stMove = setTimeout(function(){
			me.move();
		}, 10);

		this.collisionTop();
		this.collisionEnemy();
	}
	this.collisionTop = function(){
		if(this.y <= -100){
			clearTimeout(this.stAnim);
			clearTimeout(this.stMove);
			this.screen.removeChild(this.img);
		}
	}
	this.collisionEnemy = function(){
		for(var i=0; i<enemyArr.length; ++i){
			if(hitTest(this.img, enemyArr[i].img)){
				this.animExplosion();
				clearTimeout(this.stAnim);
				clearTimeout(this.stMove);
				this.screen.removeChild(this.img);

				if(enemyArr[i].isHited == false){
					enemyArr[i].isHited = true;
					enemyArr[i].hp -= this.power;
					var aud = audioExplosion.cloneNode();
					aud.play();
					if(enemyArr[i].hp <= 0){
						if(!player.superMode){
							if(getRandomByRange(5, 1)%5 == 0){
								var item = new Item(this.screen, 60, 60, enemyArr[i].x, enemyArr[i].y);
								item.init();
								itemArr.push(item);
							}
						}
						enemyArr[i].collision();
						score += enemyArr[i].score;
						clearTimeout(enemyArr[i].stMove);
						clearTimeout(enemyArr[i].stAnim);
						enemyArr[i].screen.removeChild(enemyArr[i].img);
						enemyArr[i].screen.removeChild(enemyArr[i].div);
						enemyArr.splice(i, 1);

					}else{
						enemyArr[i].isHited = false;
					}
				}

			}
		}
	}

}

/*
 * OBJECT: Firewall
 */
var Firewall = function(screen, width, height, x, y){
	this.screen = screen;
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.img;
	this.velY = 3;
	this.stAnim;
	this.stMove;
	this.srcArr;
	this.idx = 0;

	this.init = function(){
		this.srcArr = [
			"./img/firewall/firewall_01.png",
			"./img/firewall/firewall_02.png",
			"./img/firewall/firewall_03.png",
			"./img/firewall/firewall_04.png",
		];
		this.img = document.createElement("img");
		this.img.src = this.srcArr[0];
		this.img.style.width = this.width+"px";
		this.img.style.height = this.height+"px";

		this.img.style.position = "absolute";
		this.img.style.left = this.x+"px";
		this.img.style.top = this.y+"px";

		this.screen.appendChild(this.img);

		this.anim();
		this.move();
	}
	this.anim = function(){
		var me = this;
		this.idx++;
		if(this.idx == this.srcArr.length){
			this.idx = 0;
		}
		this.img.src = this.srcArr[this.idx];
		this.stAnim = setTimeout(function(){
			me.anim();
		}, 50);
	}
	this.move = function(){
		var me = this;

		this.y -= this.velY;
		this.img.style.top = this.y+"px";

		this.stMove = setTimeout(function(){
			me.move();
		}, 10);

		this.collisionTop();
		this.collisionEnemy();
	}
	this.collisionTop = function(){
		if(this.y <= -69){
			clearTimeout(this.stAnim);
			clearTimeout(this.stMove);
			this.screen.removeChild(this.img);
		}
	}
	this.collisionEnemy = function(){
		for(var i=0; i<enemyArr.length; ++i){
			var curY = parseInt(this.img.style.top);
			var targetY = parseInt(enemyArr[i].img.style.top);
			if(curY < targetY){
				if(enemyArr[i].isHited == false){
					enemyArr[i].isHited = true;
					if(!player.superMode){
						if(getRandomByRange(5, 1)%5 == 0){
							var item = new Item(this.screen, 60, 60, enemyArr[i].x, enemyArr[i].y);
							item.init();
							itemArr.push(item);
						}
					}
					var aud = audioExplosion.cloneNode();
					aud.play();
					enemyArr[i].collision();
					clearTimeout(enemyArr[i].stMove);
					clearTimeout(enemyArr[i].stAnim);
					score += enemyArr[i].score;
					enemyArr[i].screen.removeChild(enemyArr[i].img);
					enemyArr[i].screen.removeChild(enemyArr[i].div);
					enemyArr.splice(i, 1);
				}
			}
		}
	}
}
var Item = function(screen, width, height, x, y){
	this.screen = screen;
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.velX = 0;
	this.velY = -2.5;
	this.gravity = 0.03;
	this.stMove;
	this.img;
	this.imgSrcArr = [
		"./img/item/item_01.png",
		"./img/item/item_02.png",
		"./img/item/item_03.png",
		"./img/item/item_04.png",
		"./img/item/item_05.png"
	];
	this.kindArr = ["level_up", "charge", "skill", "slow", "super"];
	this.kind;

	this.init = function(){
		this.img = document.createElement("img");
		var rand = getRandomByRange(4, 0);
		this.img.src = this.imgSrcArr[rand];
		this.kind = this.kindArr[rand];
		this.img.style.position = "absolute";
		this.img.style.width = this.width + "px";
		this.img.style.height = this.height + "px";
		this.img.style.left = this.x + "px";
		this.img.style.top = this.y + "px";

		this.screen.appendChild(this.img);
		this.velX = getRandomByRange(1, -1);
		this.move();
	}
	this.move = function(){
		var me = this;

		this.velY += this.gravity;

		this.y += this.velY;
		this.x += this.velX;

		if(this.x >= 600 - this.width || this.x <= 0){
			this.velX =- 1*this.velX;
		}

		this.img.style.top = this.y + "px";
		this.img.style.left = this.x + "px";

		this.stMove = setTimeout(function(){
			me.move();
		}, 10);

		this.collision();
	}
	this.collision = function(){
		if(this.y >= 700){
			for(var i=0; i<itemArr.length; ++i){
				if(this == itemArr[i]){
					clearTimeout(itemArr[i].stMove);
					itemArr[i].screen.removeChild(itemArr[i].img)
					itemArr.splice(i, 1);
				}
			}
		}else{
			if(hitTest(this.img, player.img)){
				for(var i=0; i<itemArr.length; ++i){
					if(this == itemArr[i]){
						this.itemEffect(itemArr[i].kind);
						clearTimeout(itemArr[i].stMove);
						itemArr[i].screen.removeChild(itemArr[i].img)
						itemArr.splice(i, 1);
					}
				}
			}
		}
	}
	this.itemEffect = function(kind){
		var aud = audioItem.cloneNode();
		aud.play();
		switch(kind){
			case "level_up":
				this.effectLevelUp();
				break;
			case "charge":
				this.effectCharge();
				break;
			case "skill":
				this.effectSkill();
				break;
			case "slow":
				this.effectSlow();
				break;
			case "super":
				this.effectSuper();
				break;
		}
	}
	this.effectLevelUp = function(){
		if(fireballPower + 1 >= 8)
			fireballPower = 8;
		else
			fireballPower += 1;
	}
	this.effectCharge = function(){
		if(numOfFireball + 3 >= 10)
			numOfFireball = 10;
		else
			numOfFireball += 3;
	}
	this.effectSkill = function(){
		if(numOfFirewall+1 >= 5)
			numOfFirewall = 5;
		else
			numOfFirewall++;
	}
	this.effectSlow = function(){
		if(timeEnemyAppear+50 >= 400)
			timeEnemyAppear = 400;
		else
			timeEnemyAppear += 50;
	}
	this.effectSuper = function(){
		var prevBgVelocity = bgVelocity;
		var prevTimeEnemyAppear = timeEnemyAppear;
		var prevEnemyVelocity = enemyVelocity;
		if(player.isAlive){
			var aud = audioSuper.cloneNode();
			aud.play();

			for(var i=0; i<enemyArr.length; ++i){
				enemyArr[i].velY = 10;
			}

			bgVelocity = 20;
			timeEnemyAppear = 50;
			enemyVelocity = 10;

			player.superMode = true;
			player.srcArr = [
				"./img/player/player_super_1.png",
				"./img/player/player_super_2.png"
			];

			setTimeout(function(){
				bgVelocity = prevBgVelocity;
				timeEnemyAppear = prevTimeEnemyAppear;
				enemyVelocity = prevEnemyVelocity;
			}, 9000);

			setTimeout(function(){
				player.superMode = false;
				$(player.img).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
				player.srcArr = [
					"./img/player/player_normal_1.png",
					"./img/player/player_normal_2.png"
				];
			}, 10000);
		}
	}
}