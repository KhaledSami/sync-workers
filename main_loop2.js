var fps = 0;
var lowestFps = 9999;
var averageFps = 0;
var frameCount = 0;
var lastRun;
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;
var fpsMeter = document.getElementById("fps-meter");
var lowestFpsMeter = document.getElementById("fps-meter2");
var averageFpsMeter = document.getElementById("fps-meter3");
var images = [
	document.getElementById("img1"),
	document.getElementById("img2"),
	document.getElementById("img3"),
	document.getElementById("img4"),
	document.getElementById("img5"),
	document.getElementById("img6"),
	document.getElementById("img7"),
	document.getElementById("img8"),
	document.getElementById("img9")
];

var worker = null;
var responseList = [];
var requestList = [];

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame || 
    window.webkitRequestAnimationFrame   || 
    window.mozRequestAnimationFrame      || 
    window.oRequestAnimationFrame        || 
    window.msRequestAnimationFrame       || 
    function(callback, element){
        window.setTimeout(function(){
           
            callback(+new Date);
        }, 1000 / 60);
    };
})();

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function mainLoop() {
	if(!lastRun) {
        lastRun = performance.now();
        requestAnimFrame(mainLoop);
        return;
    }
    
    frameCount++;
    
    var delta = (performance.now() - lastRun) / 1000;
    fps = (1 / delta);
    if (frameCount > 60 && lowestFps > fps) {
    	lowestFps = fps;
    }
    averageFps+= fps;
    lastRun = performance.now();
    
    updateMeters();

    doSomething();

    draw();

    drawImages();

   	sendRequestList();
    
    requestAnimFrame(mainLoop);
}

function updateMeters() {
	fpsMeter.innerHTML = "Fps: " + fps.toFixed(2);
    lowestFpsMeter.innerHTML = "Min: " + lowestFps.toFixed(2);
    averageFpsMeter.innerHTML = "Average: " + (averageFps / frameCount).toFixed(2);
}
function draw() {
	context.clearRect(0, 0, width, height);
	context.beginPath();
	context.rect(0, 0, width, height);
	context.fillStyle = "red";
	context.fill();
}

function drawImages() {	
	var unit = width / 4;
	var index = 0;
	for (var y = 0; y < width; y+= unit) {
		for (var x = 0; x < height; x+= unit) {
			if (index < responseList.length && responseList[index] != -1) {
				context.drawImage(images[responseList[index] % 8], x, y, unit, unit);
			}
			index++;
		}
	}
}

function start() {
	worker = new Worker('worker2.js');
	window.setTimeout(function() {
		console.log("worker initialized");
		worker.onmessage = function(e) {
			var idx = e.data[0];
			responseList[idx] = idx;
		};
		mainLoop();	
	}, 5000);	
}


function sendRequestList() {
	responseList = [];	
	for (var i = 0; i <= 15; i++) {
		responseList.push(-1);
	}
	for (var i = 0; i <= 15; i++) {
		worker.postMessage([i]);
	}
}

function doSomething() {
	sum = 0;
	for (var i = 0; i < 200000; i++) {
		sum += getRandomInt(0,i);
	}
}


start();


