

onmessage = function(e) {
  var requestList = e.data[0];
  var sentTime = e.data[1];
  var currentTime = performance.now();
  responseList = [];
  var index = 0;
  while (currentTime - sentTime <= 16 && index < requestList.length) {
  	responseList.push(requestList[index]);
  	index++;
  	doSomething();
  	currentTime = performance.now();
  }
  postMessage(responseList);
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