

onmessage = function(e) {
  	doSomething();
    postMessage(e.data);
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function doSomething() {
	sum = 0;
	for (var i = 0; i < 100000; i++) {
		sum += getRandomInt(0,i);
	}
}