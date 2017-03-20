class Vertex{
	constructor(index, type, position){
		this.index = index;
		this.connections = [];
		this.type = type;

		this.position = position;
		this.v = new Vector(0, 0);

		this.sum = 0;
	}

	addConnection(weight, destination){
		this.connections.push(new Edge(this, weight, destination));
	}
}

class Edge{
	constructor(source, weight, destination){
		this.source = source;
		this.weight = weight;
		this.destination = destination;		 
	}
}

class Network{
	constructor(){
		this.vertices = [];
	}

	addNode(index, type, vector){
		this.vertices.push(new Vertex(index, type, vector));
		return this.vertices[this.vertices.length - 1];
	}

	addNodeConnection(index_a, index_b){ 
		this.vertices[index_a].addConnection(Math.random(), network.vertices[index_b]);
	}
}