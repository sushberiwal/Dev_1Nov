// super
// constructor
// extends


// this is defined on runtime
// this cannot be changed
class Car{

    // method
    constructor(name , mileage , color){
        this.name = name;
        this.mileage = mileage;
        this.color = color;
    }

    getDetails(){
        console.log("Inside get details");
        console.log(this);
        console.log(`${this.name} has ${this.mileage} mileage and color is ${this.color}`);
    }
}
// let bmw = new Car("bmw" , "9" , "white");
// bmw.getDetails();
// let mercedes = new Car("merc" , "8" , "black");
// mercedes.getDetails();
// console.log(bmw);

class Automatic extends Car{

    constructor(name , mileage , color , turbo , automatic){
        super(name , mileage , color);
        this.turbo = turbo
        this.automatic = automatic
    }

    getDetails(){
        console.log(this);
    }
}

let automaticCar = new Automatic("bmw" , "9" , "white" ,"supercharged" , "automatic");
automaticCar.getDetails();

