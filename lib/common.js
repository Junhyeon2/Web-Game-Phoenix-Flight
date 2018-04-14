/*
 * CONSTANT VALUE
 */
const maxNumOfFireball = 10;
const maxNumOfFirewall = 5;
const numOfState = 2;
const timeOfAnim = 700;
/*
 * GLOBAL VARIABLE
 */
var divWrapper,
	divIntro,
	divIntroMain,
	divIntroName,
	divIntroDesc,
	divPlay,
	divPlayDist,
	divPlayScore,
	divEnd,
	btnIntroMain,
	btnIntroDesc,
	btnReplay,
	txtIntroName,
	txtPlayController,
	tdPlayFireball,
	tdPlayFirewall,
	tdPlayState;

var stIntroMain,
	stIntroDesc,
	stReplayBtn,
	stEnemy,
	stRun,
	stSync;

var flagIntroMain = true,
	flagIntroDesc = true,
	flagReplayBtn = true;

var tdArrPlayFireball = new Array(),
	tdArrPlayFirewall = new Array(),
	tdArrplayState = new Array();

var userName,
	player,
	myScore,
	sync = false;
	dist = 0,
	score = 0,
	playerVelocity = 2,
	enemyVelocity = 1,
	level = 0,
	bgVelocity = 0;
	fireballPower = 1,
	timeEnemyAppear = 400,
	numOfFireball = 0,
	numOfFirewall = 0,
	isCastFirewall = false,
	time = 0,
	totalScore = 0;

var enemyArr = new Array(),
	itemArr = new Array(),
	scoreArr = new Array(10);

var	audioFire,
	audioHit,
	audioSkill,
	audioSuper,
	audioItem,
	audioExplosion;
var introBgm, playBgm;
/*
 * WINDOW EVENT HANDLE
 */
window.addEventListener("load", function(){
	document.body.style.backgroundSize = window.innerWidth+"px "+window.innerHeight+"px";
	initGlobalVariable();
	initEvent();
	introAnim();
	initFirebase();
});
window.addEventListener("resize",function(){
	document.body.style.backgroundSize = window.innerWidth+"px "+window.innerHeight+"px";
});
/*
 * INITIAL FUNCTION
 */
function initGlobalVariable(){

	divWrapper = document.getElementById("wrapper");
	divIntro = document.getElementById("intro");
	divIntroMain = document.getElementById("intro_main");
	divIntroName = document.getElementById("intro_name");
	divIntroDesc = document.getElementById("intro_desc");
	divPlay = document.getElementById("play");
	divPlayDist = document.getElementById("play_dist");
	divPlayScore = document.getElementById("play_score");
	divEnd = document.getElementById("end");

	btnIntroMain = document.getElementById("intro_main_btn");
	btnIntroDesc = document.getElementById("intro_desc_btn")
	btnReplay = document.getElementById("replay_btn");
	txtIntroName = document.getElementById("intro_name_txt");
	txtPlayController = document.getElementById("play_controller");

	tdPlayFireball = document.getElementById("paly_fireball");
	tdPlayFirewall = document.getElementById("play_firewall");
	tdPlayState = document.getElementById("play_state");
	tableEnd = document.getElementById("end_table");

	myScore = document.getElementById("my_score");

	tdArrPlayFireball = new Array();
	tdArrPlayFirewall = new Array();
	tdArrplayState = new Array();

	audioFire = new Audio("./aud/fire.mp3");
	audioSkill = new Audio("./aud/skill.mp3");
	audioSuper = new Audio("./aud/super.mp3");
	audioHit = new Audio("./aud/hit.mp3");
	audioItem = new Audio("./aud/item.mp3");
	audioExplosion = new Audio("./aud/explosion.mp3");
	//bgmIntro = new Audio("./aud/intro_bgm.mp3");
	//bgmIntro.loop = true;
	//bgmPlay = new Audio("./aud/play_bgm.mp3");
	//bgmPlay.loop = true;


	createFireballTable();
	createFirewallTable();
	createStateTable();
	createScoreTable();
}

function initEvent(){
	btnIntroMain.addEventListener("keydown", eventIntroMainKeyDown);
	txtIntroName.addEventListener("keydown", eventIntroNameKeyDown);
	txtIntroName.addEventListener("keyup", eventIntroNameKeyUp);
	btnIntroDesc.addEventListener("keydown", eventIntroDescKeyDown);
	divIntroName.addEventListener("click", eventIntroNameClick)
	divPlay.addEventListener("click", eventPlayClick);
	txtPlayController.addEventListener("keydown", eventPlayKeyDown);
	txtPlayController.addEventListener("keyup", eventPlayKeyUp);
	btnReplay.addEventListener("keydown", eventReplay);

}

function initFirebase(){
	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyAkxgIlrJQc_Wf3uoAdmuADP0Goeot0-o0",
		authDomain: "hyeony-project.firebaseapp.com",
		databaseURL: "https://hyeony-project.firebaseio.com",
		projectId: "hyeony-project",
		storageBucket: "hyeony-project.appspot.com",
		messagingSenderId: "744998320231"
	};
	firebase.initializeApp(config);
}

function createFireballTable(){
	var table = document.createElement("table");
	table.align = "left";
	table.style.borderSpacing = "3px";
	table.style.paddingLeft = "45px";

	var tr = document.createElement("tr");
	table.appendChild(tr);

	for(var i=0; i<maxNumOfFireball; ++i){
		var td = document.createElement("td");
		td.style.width = "10px";
		td.style.height = "20px";
		td.style.background =  "linear-gradient(to bottom right, gray , white)";
		td.style.borderRadius = "2px";
		td.style.border = "1px solid black";
		tr.appendChild(td);

		tdArrPlayFireball.push(td);
	}
	tdPlayFireball.appendChild(table);
}
function createFirewallTable(){
	var table = document.createElement("table");
	table.align = "left";
	table.style.borderSpacing = "3px";
	table.style.paddingLeft = "45px";

	var tr = document.createElement("tr");
	table.appendChild(tr);

	for(var i=0; i<maxNumOfFirewall; ++i){
		var td = document.createElement("td");
		td.style.width = "10px";
		td.style.height = "20px";
		td.style.background =  "linear-gradient(to bottom right, gray , white)";
		td.style.borderRadius = "2px";
		td.style.border = "1px solid black";
		tr.appendChild(td);

		tdArrPlayFirewall.push(td);
	}
	tdPlayFirewall.appendChild(table);
}
function createStateTable(){
	var table = document.createElement("table");
	table.align = "center";
	table.style.borderSpacing = "7px";

	var tr = document.createElement("tr");
	table.appendChild(tr);

	for(var i=0; i<numOfState; ++i){
		var td = document.createElement("td");
		td.style.width = "70px";
		td.style.height = "25px";
		tr.appendChild(td);

		tdArrplayState.push(td);
	}
	tdPlayState.appendChild(table);

	tdArrplayState[0].style.backgroundImage = "url(\"./img/icon/icon_fireball_lv.png\")";
	tdArrplayState[1].innerText = "Level: " + fireballPower;
}
function createScoreTable(){
	var titleTr = document.createElement("tr");
	tableEnd.appendChild(titleTr);

	var rankTd = document.createElement("td");
	//nameTd.style.width = "100%";
	rankTd.style.height = "50px";
	rankTd.innerText = "순위";
	titleTr.appendChild(rankTd);

	var nameTd = document.createElement("td");
	//nameTd.style.width = "100%";
	nameTd.style.height = "50px";
	nameTd.innerText = "아이디";
	titleTr.appendChild(nameTd);

	var scoreTd = document.createElement("td");
	//scoreTd.style.width = "100%";
	scoreTd.style.height = "50px";
	scoreTd.innerText = "점수";
	titleTr.appendChild(scoreTd);

	tableEnd.appendChild(titleTr);

	for(var i = 0; i<10; ++i){
		var tr = document.createElement("tr");
		tableEnd.appendChild(tr);
		scoreArr[i] = new Array(2);
		for(var j=0; j<3; ++j){
			var td = document.createElement("td");
			td.style.height = "45px";
			if(j == 0){
				td.innerText = (i+1)+"";
			}else{
				td.innerText = "-";
				scoreArr[i][j-1] = td;
			}
			tr.appendChild(td);

			//tdArrplayState.push(td);
		}
		tableEnd.appendChild(tr);
	}
}
function introAnim(){
	$("#intro_img").fadeIn(2000, function(){
		animIntroMain();
	});
}
/*
 * ANIMATION
 */
function animIntroMain(){
	if(flagIntroMain){
		$("#intro_main_btn").fadeIn(1000);
	}else{
		$("#intro_main_btn").fadeOut(1000);
	}
	flagIntroMain = !flagIntroMain;

	btnIntroMain.focus();
	stIntroMain = setTimeout("animIntroMain()", 1000);

	if(divIntroMain.style.display == "none"){
		clearTimeout(stIntroMain);
		txtIntroName.focus();
	}
}
function animIntroDesc(){
	if(flagIntroDesc){
		$("#intro_desc_btn").fadeIn(1000);
	}else{
		$("#intro_desc_btn").fadeOut(1000);
	}
	flagIntroDesc = !flagIntroDesc;

	btnIntroDesc.focus();
	stIntroDesc = setTimeout("animIntroDesc()", 100);

	if(divIntroDesc.style.display == "none"){
		clearTimeout(stIntroDesc);
		//bgmIntro.pause();
		//bgmPlay.play();
		changeBgm();
		creatPlayer();
		txtPlayController.focus();
		run();
	}
}
function animReplayBtn(){
	if(flagReplayBtn){
		$("#replay_btn").fadeIn(1000);
	}else{
		$("#replay_btn").fadeOut(1000);
	}
	flagReplayBtn = !flagReplayBtn;

	btnReplay.focus();
	stReplayBtn = setTimeout("animReplayBtn()", 100);

	if(divEnd.style.display == "none"){
		clearTimeout(stReplayBtn);
	}
}
function animPlayer(){
	isCastFirewall = true;
	$("#play").fadeIn(200).fadeOut(200).fadeIn(200);
	for(var i=0; i<enemyArr.length; ++i){
		clearTimeout(enemyArr[i].stMove);
		clearTimeout(enemyArr[i].stAnim);
	}
	setTimeout(function(){
		isCastFirewall = false;
	}, 2800);
}
/*
 * EVENT HANDLE
 */

function eventIntroMainKeyDown(event){
	if(event.keyCode == 32){
		$("#intro_main").fadeOut(timeOfAnim, function(){
			divIntroMain.style.display = "none";
			divIntroName.style.display = "block";
		});
	}
}
function eventIntroNameKeyDown(event){
	var blankCheck = txtIntroName.value;

	if(blankCheck.trim() == ""){
	}else{
		if(event.keyCode == 13){
			userName = txtIntroName.value;
			$("#intro_name").fadeOut(timeOfAnim, function(){
				divIntroName.style.display = "none";
				divIntroDesc.style.display = "block";
				$("#desc_img").fadeIn(2000, function(){
					animIntroDesc();
				});
			});
		}
	}
}
function eventIntroNameKeyUp(event){
	if($("#intro_name_txt").val().length > 8) {
            $("#intro_name_txt").val($("#intro_name_txt").val().substring(0, 8));
        }
}
function eventIntroNameClick(event){
	txtIntroName.focus();
}
function eventIntroDescKeyDown(event){
	if(event.keyCode == 32){
		$("#intro_desc").fadeOut(timeOfAnim, function(){
			divIntroDesc.style.display = "none";
			divIntro.style.display = "none";
			divPlay.style.display = "block";
		});
	}
}
function eventPlayClick(event){
	txtPlayController.focus();
}
function eventPlayKeyDown(event){
	switch(event.keyCode){
		case 17:
			createFirewall();
			break;
		case 32:
			createFireball();
			break;
		case 37:
			player.velX = -playerVelocity;
			break;
		case 38:
			player.velY = -playerVelocity;
			break;
		case 39:
			player.velX = playerVelocity;
			break;
		case 40:
			player.velY = playerVelocity;
			break;
	}
}
function eventPlayKeyUp(event){
	if(event.keyCode == 37 || event.keyCode == 39){
		player.velX = 0;
	}else if(event.keyCode == 38 || event.keyCode == 40){
		player.velY = 0;
	}
}
function eventReplay(event){
	if(event.keyCode == 32){
		$("#end").fadeOut(timeOfAnim, function(){
			divPlay.style.display = "block";
			dist = 0;
			score = 0;
			playerVelocity = 2;
			enemyVelocity = 1;
			time = 0;
			level = 0;
			timeEnemyAppear = 400;
			numOfFireball = 0;
			numOfFirewall = 0;
			totalScore = 0;
			fireballPower = 1;
			bgVelocity = 0;

			for(var i=0; i<enemyArr.length; ++i){
				enemyArr[i].screen.removeChild(enemyArr[i].img)
			}
			enemyArr = new Array();
			for(var i=0; i<maxNumOfFireball; ++i)
				tdArrPlayFireball[i].style.background = "linear-gradient(to bottom right, gray , white)";
			for(var i=0; i<maxNumOfFirewall; ++i)
				tdArrPlayFirewall[i].style.background = "linear-gradient(to bottom right, gray , white)";

			creatPlayer();
			txtPlayController.focus();
			run();
		});
	}
}
/*
 * CREATE OBJECT
 */
function creatPlayer(){
	player = new Player(divPlay, 96, 66, 252, 580);
	player.init();
}
function createFireball(){
	//&& numOfFireball > 0
	if(player.isAlive && numOfFireball > 0){
		var posX = player.x + player.width/2;
		var posY = player.y;
		var fireball = new Fireball(divPlay, 25, 100, posX - 12.5, posY - 100, fireballPower);
		fireball.init();

		tdArrPlayFireball[(numOfFireball-1)].style.background = "linear-gradient(to bottom right, gray , white)";
		numOfFireball--;
		var aud = audioFire.cloneNode();
		aud.play();
	}
}
function createFirewall(){
	//&& numOfFirewall > 0
	if(player.isAlive && numOfFirewall > 0){
		animPlayer();
		var posX = player.x + player.width/2;
		var posY = player.y;
		var firewall = new Firewall(divPlay, 600, 69, 0, 700);
		firewall.init();

		tdArrPlayFirewall[(numOfFirewall-1)].style.background = "linear-gradient(to bottom right, gray , white)";
		numOfFirewall--;
		var aud = audioSkill.cloneNode();
		aud.play();
	}
}
function insertData(){
	var d = new Date();
  var n = d.getTime();
	firebase.database().ref('phoenixFlight/'+n).set({
    userName: userName,
    score: totalScore
  });
	sync = true;
}
function selectData(){
	var scoreResult = [];
	firebase.database().ref('phoenixFlight').orderByChild('score').limitToLast(10).once('value').then(function(snapshot) {
		snapshot.forEach(function(child) {
			scoreResult.push(child.val());
    });
		divPlay.style.display = "none";
		$("#end").fadeIn(timeOfAnim);
		animReplayBtn();
		showScoreTable(scoreResult);
	});
	sync = false;
}
function syncData(){
	stSync = setTimeout(function(){
		syncData();
	},100);
	if(sync == true){
		clearTimeout(stSync);
		selectData();
	}
}
function showScoreTable(scoreResult){
	for(var i=scoreResult.length-1; i>=0; --i){
		scoreArr[scoreResult.length-1 - i][0].innerText = scoreResult[i].userName;
		scoreArr[scoreResult.length-1 - i][1].innerText = scoreResult[i].score;
	}
}
/*
 * RUN
 */
function run(){
	tdArrplayState[1].innerText = "Level: " + fireballPower;
	if(!isCastFirewall){
		for(var i=0; i<numOfFireball; ++i){
			tdArrPlayFireball[i].style.background = "linear-gradient(to bottom right, red , orange)";
		}
		for(var i=0; i<numOfFirewall; ++i){
			tdArrPlayFirewall[i].style.background = "linear-gradient(to bottom right, red , orange)";
		}

		if(time%300 == 0 && numOfFireball < 10){
			numOfFireball++;
		}

		if(!player.superMode){
			if(time%2000 == 0){
				if(timeEnemyAppear <= 100){
					timeEnemyAppear = 100;
				}else{
					timeEnemyAppear -= 50;
				}
			}
			if(time%3000 == 0){
				if(level >= 8){
					level = 8;
				}else{
					level += 1;
				}
				if(enemyVelocity >= 8){
					enemyVelocity = 8;
				}else{
					enemyVelocity += 0.5;
				}
				bgVelocity += 3;
			}
		}
		//몬스터 생성
		if(time%timeEnemyAppear == 0){
			var rand = getRandomByRange(4, 0);
			if(player.superMode)
				rand = 6;
			for(var i=0; i<5; ++i){
				if(i == rand)
					continue;
				var enemy = new Enemy(divPlay, 120, 96, i*120+1, -96, level, enemyVelocity);
				enemy.init();
				enemyArr.push(enemy);
			}
		}

		//배경 이동
		divPlayDist.innerText = parseInt(dist/100) + "M";
		dist += bgVelocity;
		divPlay.style.backgroundPosition = "0px " + dist + "px";

		//점수 갱신
		divPlayScore.innerText = score + "점";
	}
	time++; // 1 time = 10miilsecond;  100time -> 1sec  200
	stRun = setTimeout(function(){
		run();
	}, 10);
	if(!player.isAlive){
		totalScore = score + parseInt(dist/100);
		myScore.innerText = "종합 점수: " + totalScore;
		for(var i=0; i<enemyArr.length; ++i){
			clearTimeout(enemyArr[i].stMove);
		}
		clearTimeout(stEnemy);
		clearTimeout(stRun);
		$("#play").effect("shake", {distance: 5, times:3}, 500, function(){
			insertData();
			syncData();
		});
	}
}

function onYouTubePlayerAPIReady() {
	introBgm = new YT.Player('intro_bgm', {
		height: '1',
		width: '1',
		videoId: '4QJEvfA_5ag',
		events: {
			'onReady': onIntroBgmReady,
			'onStateChange': onIntroBgmStateChange
		}
	});
}
function onIntroBgmReady(event) {
	event.target.playVideo();
}

function onIntroBgmStateChange(event) {
	if (event.data == YT.PlayerState.PLAYING) {

	}else if(event.data == YT.PlayerState.ENDED){
		event.target.playVideo();
	}
}
function onYouTubeIframeAPIReady() {
	playBgm = new YT.Player('play_bgm', {
		height: '1',
		width: '1',
		videoId: 'a3hzrfFaUic',
		events: {
			'onReady': onPlayBgmReady,
			'onStateChange': onPlayBgmStateChange
		}
	});
}
function onPlayBgmReady(event) {
}

function onPlayBgmStateChange(event) {
	if (event.data == YT.PlayerState.PLAYING) {
	}else if(event.data == YT.PlayerState.ENDED){
		event.target.playVideo();
	}
}

function changeBgm() {
	introBgm.stopVideo();
	playBgm.playVideo();
}
