class Vector{
	constructor(x, y){
		this.x = x;
		this.y = y;
	}

	scalarMultiply(a){
		return new Vector(this.x * a, this.y * a);
	}

	magnitude(){
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	normalize(){
		var m = this.magnitude();
		return new Vector(this.x / m, this.y / m);
	}

	subtract(b){
		return new Vector(this.x - b.x, this.y - b.y);
	}

	direction(b){
		return this.subtract(b).normalize().invert(); 
	}

	invert(){
		return new Vector(-this.x, -this.y);
	}

	add(b){
		return new Vector(this.x + b.x, this.y + b.y);
	}
 
	draw(p, c){
		strokeWeight(1);
		line(p.x, p.y, this.x + p.x, this.y + p.y);

		fill(c[0], c[1], c[2]);
		ellipse(p.x, p.y, 5, 5);
		noFill();
	}
}