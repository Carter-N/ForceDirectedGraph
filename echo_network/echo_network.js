//Graph class that takes node and time
//Add animation to node_connection
//Constant controls
//Documentation
//Git repo

var network = new Network();
var networkSize = 50;
var inputNodes = 2;
var outputNodes = 2;

var connections = 1;

var padding = 100;
var radius = 15;

for(var i = 0; i < networkSize; i++){
	var x = padding + (Math.random() * (window.innerWidth - (padding * 2))); 
	var y = padding + (Math.random() * (window.innerHeight - (padding * 2))); 

	var type = "hidden";

	if(i < inputNodes){
		type = "input";
	}

	if(i >= networkSize - outputNodes){
		type = "output";
	}

	network.addNode(i, type, new Vector(x, y));
}

for(var j = 0; j < networkSize; j++){
	var connectionCanidates = network.vertices.slice(0);
	connectionCanidates.splice(j, 1);
	
	for(var k = 0; k < connections; k++){
		var index = Math.floor(Math.random() * (connectionCanidates.length - 1));
		network.addNodeConnection(j, connectionCanidates[index].index);
		connectionCanidates.splice(index, 1);
	}
}

var drawNetwork = function(network){

	for(var i = 0; i < network.vertices.length; i++){

		var node = network.vertices[i];

		for(var j = 0; j < node.connections.length; j++){
			var connection = node.connections[j];

			var source = connection.source.position;
			var destination = connection.destination.position;

			strokeWeight(connection.weight + 1);
			stroke(0);
			line(source.x, source.y, destination.x, destination.y);
		}
	}

	for(var node of network.vertices){
		strokeWeight(1);
		fill(255);

		//ellipse(node.position.x, node.position.y, radius, radius);

		if(node.type == "input"){
			fill(0);
			textAlign(CENTER, CENTER);
			text("x", node.position.x, node.position.y);
		}

		if(node.type == "output"){
			fill(0);
			textAlign(CENTER, CENTER);
			text("y", node.position.x, node.position.y);
		}

		noFill();
	}
}

var c1 = 50; //speed?
var c2 = 400; //length?
var c3 = 8000; //repulsive strength?
var c4 = 0.1; //???????

var simulateDirectedForceNetwork = function(){
	
	//Timestep loop here

	for(var i = 0; i < network.vertices.length; i++){

		var a = network.vertices[i];
		var netV = new Vector(0, 0);

		for(var j = 0; j < network.vertices.length; j++){	
			
			if(i != j){

				var b = network.vertices[j];
				var dir = a.position.direction(b.position);
				var distance = a.position.subtract(b.position).magnitude();

				var fr = c3 / Math.pow(distance, 2);
				var FR = dir.invert().scalarMultiply(fr);

				netV = netV.add(FR);	
			}
		}

		for(var k = 0; k < a.connections.length; k++){

			var b = a.connections[k].destination;
			var dir = a.position.direction(b.position);
			var distance = a.position.subtract(b.position).magnitude();

			var fs = c1 * Math.log(distance / c2);
			var FS = dir.scalarMultiply(fs);	

			netV = netV.add(FS);
		}

		var centerF = a.position.direction(new Vector(window.innerWidth / 2, window.innerHeight / 2)).scalarMultiply(2);
		netV = netV.add(centerF);

		network.vertices[i].v = netV.scalarMultiply(c4);
		network.vertices[i].position.x += netV.x;
		network.vertices[i].position.y += netV.y;
	}
};

var setup = function(){

	createCanvas(window.innerWidth, window.innerHeight);
	noFill();
};

var x = 0;

var draw = function(){
	x++;
	clear();
	simulateDirectedForceNetwork();
	camera(0, 0, -10);
	drawNetwork(network);
};
 
