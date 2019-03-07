
function developerMethod()
{
	console.log('----------------------------------------------');
	console.log('|                                            |');
	console.log('|           Developer : Rahul Gupta.         |');
	console.log('|           If you are a true Coder,         |');
	console.log('|           Never copy others code.          |');
	console.log('|                                            |');
	console.log('----------------------------------------------');
}


function transitionMethod()
{
	var introClass=document.getElementById('intro-class');
	var introHead=document.getElementById('intro-head');
	var clsName = "reduced-intro";
	var arr = introClass.className.split(" ");
	if (arr.indexOf(clsName) == -1) 
	{
		introClass.className += " " + clsName;
	}
	clsName = "reduced-head";
	arr = introClass.className.split(" ");
	if (arr.indexOf(clsName) == -1) 
	{
		introHead.className += " " + clsName;
	}

	var btnStart=document.getElementById('btn-start');
	btnStart.style.display='none';
	var description=document.getElementById('description');
	description.style.display='none';
	var gameWrapper=document.getElementById('gameWrapper');
	gameWrapper.style.display='block';
	var resultContainer=document.getElementById('resultContainer');
	resultContainer.style.display='block';
	var landingPage=document.getElementById('landingPage');
	
	landingPage.classList.remove('background-class');
}



var gameBoard=document.getElementById('gameBoard');



function initializeWindow(){
	if(window.innerWidth>=1360 && window.innerHeight>=632)
	{
		gameBoard.width=window.innerWidth*0.25;
		gameBoard.height=window.innerHeight*0.4;
	}
	
	else if(window.innerWidth<=800 && window.innerHeight<=1280)
	{
		gameBoard.width=window.innerWidth*0.65;
		gameBoard.height=window.innerHeight*0.35;
	}
	this.fx=5+Math.random()*(gameBoard.width-5);
	this.fy=5+Math.random()*(gameBoard.height-5);
}

window.addEventListener('resize',function(event){

	
	if(window.innerWidth<=380)
	{
		gameBoard.width=window.innerWidth*0.8;
		gameBoard.height=window.innerHeight*0.4;
	}
	
	else if(window.innerWidth>=1360 && window.innerHeight>=632)
	{
		gameBoard.width=window.innerWidth*0.25;
		gameBoard.height=window.innerHeight*0.4;
	}
	
	
	this.fx=5+Math.random()*(gameBoard.width-5);
	this.fy=5+Math.random()*(gameBoard.height-5);
});

var c=gameBoard.getContext('2d');


function gameMethod()
{
	// c.clearRect(0,0,gameBoard.width,gameBoard.height);
	
	this.gameOver=false;
	this.nTail=15;
	this.score=0;
	this.velocity=2;
	this.direction='right';
	
	this.x=gameBoard.width/2;
	this.y=gameBoard.height/2;
	console.log('inside game method');
	

	this.btnRestart.style.display='none';
	this.result.innerHTML='';
	initializeWindow();
	animate();
	console.log('after animate');
}

function createHead(x,y)
{
	c.beginPath();
	c.arc(x,y,3.5,0,2*Math.PI,false);
	c.fillStyle='white';
	c.fill();


}
function createTail(x,y)
{
	c.beginPath();
	c.arc(x,y,3.5,0,2*Math.PI,false);
	c.fillStyle='white';
	c.fill();
}

function createFood(x,y)
{
	c.beginPath();
	c.arc(x,y,6,0,2*Math.PI,false);
	c.fillStyle='orange';
	c.fill();
}
var x;
var y;

var tailx=[];
var taily=[];
var nTail;

var direction;

var score;
var velocity;

var fx;
var fy;
var gameOver;

function gameLogicMethod()
{
	var prex=tailx[0];
	var prey=taily[0];
	var prexx,preyy,px,py;
	
	createFood(this.fx,this.fy);

	//--------------------------Tail creation and moving-------------------------------
	

	this.tailx[0]=this.x;
	this.taily[0]=this.y;
	for(var i=1;i<=this.nTail;i++)
	{
		prexx=this.tailx[i];
		preyy=this.taily[i];
		this.tailx[i]=prex;
		this.taily[i]=prey;
		prex=prexx;
		prey=preyy;
	}
	

	createHead(this.x,this.y);
	

	for(var i=1;i<=this.nTail;i++)
		createTail(this.tailx[i],this.taily[i]);

	

	//---------------------------Movements---------------------------------

	
	if(this.direction==='up')
		this.y-=this.velocity;
	else if(this.direction==='down')
		this.y+=this.velocity;
	else if(this.direction==='left')
		this.x-=this.velocity;
	else if(this.direction==='right')
		this.x+=this.velocity;

	if(this.x>=gameBoard.width)
		this.x=0;
	else if(this.x<0)
		this.x=gameBoard.width;
	else if(this.y>=gameBoard.height)
		this.y=0;
	else if(this.y<0)
		this.y=gameBoard.height;


	//------------------------Food eating--------------------------------

	if((this.x>=this.fx-6 && this.x<=this.fx+6) && (this.y>=fy-6 && this.y<=this.fy+6))
	{
		this.fx=5+Math.random()*gameBoard.width-5;
		this.fy=5+Math.random()*gameBoard.height-5;
		createFood(this.fx,this.fy);
		console.log('ate food');
		this.score+=5;
		this.nTail+=2;
		this.velocity+=0.05;
	}

	var scoreBoard=document.getElementById('scoreBoard');
	scoreBoard.innerHTML='Score : '+this.score;

	//-------------------------Get Tangled-------------------------------


	for(var i=1;i<=this.nTail;i++)
	{
		if(this.x==this.tailx[i] && this.y==this.taily[i])
		{
			this.gameOver=true;
			console.log('gameOver');
		}
	}	
}
var result=document.getElementById('result');
var btnRestart=document.getElementById('btn-restart');
function animate()
{
	if(this.gameOver==true)
	{
		this.result.innerText='Oops, Game over.';
		this.btnRestart.style.display='inline-block';
		return;
	}
	else
	{
		requestAnimationFrame(animate);
		c.clearRect(0,0,gameBoard.width,gameBoard.height);
		gameLogicMethod();
	}

}


window.addEventListener('keypress',function(event){
	if(event.key==='w')	
		this.direction='up';
	else if(event.key==='s')	
		this.direction='down'
	else if(event.key==='a')
		this.direction='left';
	else if(event.key==='d')
		this.direction='right';	
});


/*
  -----------------------------------------------
  |												|
  |												|		
  | Got Retarded with this game....why the hell	|
  |     snake is not getting tangled .... 		|	
  |												|	
  |												|
  -----------------------------------------------
  */