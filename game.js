var audio1 = new Audio("audio/steps1.mp3") ;
var audio2 = new Audio("audio/steps2.mp3") ;
var audio3 = new Audio("audio/Black.mp3") ;
var audio4 = new Audio("audio/ding.mp3") ;
var audio5 = new Audio ("audio/back.mp3");

levelNow=1;

//click start show the main page
function start(){
	document.getElementById("gamearea").style.display="block";
}
//fist level initial
function init(){
	audio5.autoplay = true;
	audio5.load(); 	
	document.addEventListener('keydown', function(event) {
    if(event.keyCode == 37) {
		if(moveFlag){
			check();
			move();
			audio1.play();
			moveFlag = false;
			
		}
    }
    else if(event.keyCode == 39) {
		if(!moveFlag){
			check();
			move();
			audio2.play();
			moveFlag = true;
		}
    }
	});
	start();
	imageNumber = 0;
	
	//set game timer 25 seconds
	i = 30;
	
	flag=0;
	randomNumber=0;
	timer = 0;
	//switch between left and right
	moveFlag = true;
	
	modal = document.getElementById('myModal');
    timebar=document.getElementById("timebar");
	levelbar=document.getElementById("levelbar");

	levelbar.innerHTML="Level 1";

	human = document.getElementById("human");
	light=document.getElementById("light");
	bear=document.getElementById("bear");
	document.getElementById('win').style.display= "none";
	document.getElementById('lose').style.display= "none";
	light.style.backgroundColor="green";
	bear.src="images/sleep.png";
	human.src="images/c_0.png"
	human.style.left="10px";
	human.style.bottom="2px";
	setTime();
	
	//set the timer for random switch the bear from sleep to wake up
	(function loop() {
		var rand = Math.round(Math.random() * 4) + 2;
		timer=setTimeout(function() {
				change();
				loop(); 
		}, rand*1000);
	}());
		
}

//second level initial
function init2(){
	audio5.autoplay = true;
	audio5.load(); 	
	document.addEventListener('keydown', function(event) {
    if(event.keyCode == 37) {
		if(moveFlag){
			check();
			move();
			audio1.play();
			moveFlag = false;
			
		}
    }
    else if(event.keyCode == 39) {
		if(!moveFlag){
			check();
			move();
			audio2.play();
			moveFlag = true;
		}
    }
	});
	start();
	imageNumber = 0;
	
	//set timer
	i = 25;
	
	flag=0;
	randomNumber=0;
	timer = 0;
	//switch between left and right
	moveFlag = true;
	
	modal = document.getElementById('myModal');

    timebar=document.getElementById("timebar");
    levelbar=document.getElementById("levelbar");

    levelbar.innerHTML="Level "+levelNow;

	human = document.getElementById("human");
	light=document.getElementById("light");
	bear=document.getElementById("bear");
	document.getElementById('win').style.display= "none";
	document.getElementById('lose').style.display= "none";
	light.style.backgroundColor="green";
	bear.src="images/sleep.png";
	human.src="images/c_0.png"
	human.style.left="10px";
	human.style.bottom="2px";
	setTime();
	
	//set the timer for random switch the bear from sleep to wake up
	(function loop() {
		var rand = Math.round(Math.random() * 4) + 1;
		timer=setTimeout(function() {
				change2();
				loop(); 
		}, rand*1000);
	}());
		
}

//set game timer
function setTime(){
		timer1 = setInterval(function(){
		if(i== -1){
			clearInterval(timer1);
			clearTimeout(timer);
			modal.style.display = "block";
			document.getElementById('timeout').style.display= "block";
            document.getElementById('btn1').style.display= "none";
			document.getElementById('win').style.display= "none";
			document.getElementById('lose').style.display= "none";
            $("#gamearea").keydown(false);
		}else{
			timebar.innerHTML = "Timer: "+i;
			--i;
		}
	},1000);
}

//CHECK THE BOUND AND THE STATUS
function check(){
	var rect = human.getBoundingClientRect();
	var rect1 = gamearea.getBoundingClientRect();
	var result=rect.right-rect1.right;
	if(result>0){

		clearInterval(timer1);
		clearTimeout(timer);
		modal.style.display = "block";
		document.getElementById('win').style.display= "block";
		document.getElementById('lose').style.display= "none";
		document.getElementById('timeout').style.display= "none";
		$("#gamearea").keydown(false);
	}
	if(flag==1){
		clearInterval(timer1);
		clearTimeout(timer);
		modal.style.display = "block";
		document.getElementById('lose').style.display= "block";
		document.getElementById('win').style.display= "none";
        document.getElementById('btn1').style.display= "none";
		document.getElementById('timeout').style.display= "none";
		$("#gamearea").keydown(false);
		
	}

}

//TRY AGAIN FUNCTION
function tryagarin(){
	modal.style.display = "none";
	clearInterval(timer1);
	clearTimeout(timer);
	init();
}
function nextlevel(){
	modal.style.display = "none";
    levelNow++;
	clearInterval(timer1);
	clearTimeout(timer);
	init2();
	
}

//CHANGE THE STATUS OF THE BEAR (SLEEP AND WAKE UP)
function change(){
	if(flag==0){
		audio4.play();
		light.style.backgroundColor="red";
		setTimeout(function(){bear.src="images/wakeup2.png";		flag = 1;},1500);
	}
	else if(flag==1){
		audio3.play();
		light.style.backgroundColor="green";
		bear.src="images/sleep.png";
		flag=0;
	}
}

function change2(){
	if(flag==0){
		audio4.play();
		light.style.backgroundColor="red";
		setTimeout(function(){bear.src="images/wakeup1.png";		flag = 1;},1000);
	}
	else if(flag==1){
		audio3.play();
		light.style.backgroundColor="green";
		bear.src="images/sleep.png";
		flag=0;
	}
}
//MOVE FUNCTION OF THE HUMAN
function move(){
	human.style.left = parseInt(human.style.left) + 5 + 'px'
	imageNumber++;
	imageNumber = imageNumber % 4
	document.getElementById("human").src = "images/c_" + imageNumber + ".png";
}
