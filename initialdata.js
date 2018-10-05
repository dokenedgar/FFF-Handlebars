//{}
class vehicle{
	constructor(type, color){
		this.type = type;
		this.color = color;
	}

	move(){
		console.log(`${this.type} is moving`);
	}
	paint(color){
		console.log(`${this.type} is painted ${color}`);
	}
}
//Use extends keyword to inherit properties of super/base class
class saloon extends vehicle {
	constructor(type, color){
		super(type, color);
	}
	// class defines its version of paint method, achieving polymorphism
	paint(newColor){
		console.log(`${this.type} is being repainted ${newColor}, from ${this.color}`);
		this.color = newColor;
	}
}

let aToyota = new saloon('car', 'green');
// move method inherited from superclass
aToyota.move();
// uses the paint() method of the inheriting class, not the base class
aToyota.paint('black');

class School {
  constructor(type) {
  	//type of school is hidden in constructor
    let _type = type;
	// type of school is returned via a method, and not accessed directly.
    this.getType = () => {
      return _type;
    }
  }
}

let primarySchool = new School('primary');
console.log(primarySchool.getType());

let space = /\s+/;
console.log(space.test('53fb99a4-f bcd-440'));

console.log();