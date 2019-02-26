//Замыкания
//1
function Planet(name) {
    this.name = name;
    this.getName = function () {
        return 'Planet name is ' + this.name;
    }
}

function PlanetWithSatellite(name, sateliteName) {
    Planet.call(this, name);
    this.satelliteName = sateliteName;
    this.getName = function () {
        return 'Planet name is ' + this.name + ' ' + 'The satellite is ' + this.satelliteName;
    }
}

let planet = new Planet('earth');
console.log(planet.getName());
let satelite = new PlanetWithSatellite('earth', 'moon');
console.log(satelite.getName());

//2
function Building(name, numberOfFloors) {
    this.name = name;
    this.numberOfFloors = numberOfFloors || 1;

    this.getFloors = function () {
        return this.numberOfFloors;
    }

    this.setFloors = function (number) {
        return this.numberOfFloors = number;
    }
}

function BlockOfFlats(numberOfFlats) {
    Building.call(this);
    this.numberOfFlats = numberOfFlats;
    let flatsOnFloor = {
        floors: null,
        numberOfFlats: null
    };
    this.countFloors = function () {
        flatsOnFloor.floors = this.getFloors();
        flatsOnFloor.numberOfFlats = this.getFloors() * this.numberOfFlats;
        return flatsOnFloor;
    }
}

function Supermarket(numberOfShops) {
    Building.call(this);
    this.numberOfShops = numberOfShops;
    let shopsOnFloor = {
        floors: null,
        numberOfShops: null
    };
    this.countShops = function () {
        shopsOnFloor.floors = this.getFloors();
        shopsOnFloor.numberOfShops = this.getFloors() * this.numberOfShops;
        return shopsOnFloor;
    }
}

var house = new BlockOfFlats(10);
console.log(house.getFloors());
console.log(house.setFloors(10));
console.log(house.getFloors());
console.log(house.countFloors());

var supermarket = new Supermarket(5);
console.log(supermarket.getFloors());
console.log(supermarket.setFloors(10));
console.log(supermarket.getFloors());
console.log(supermarket.countShops());

//3
function Furniture(name, prise) {
    this.name = name;
    this.prise = prise;
}

Furniture.prototype.getInfo = function () {
    return `${this.name} - ${this.prise}`;
}

function OfficeFurniture(name, prise, hasDrawers) {
    Furniture.apply(this, arguments);
    this.hasDrawers = hasDrawers;
}

OfficeFurniture.prototype = Object.create(Furniture.prototype);
OfficeFurniture.prototype.constructor = OfficeFurniture;

OfficeFurniture.prototype.getInfo = function () {
    Furniture.prototype.getInfo.apply(this);
    return `${this.name} - ${this.prise}, Drawers: ${this.hasDrawers}`;
}

const office = new OfficeFurniture("chair", 100, true);
console.log(office.getInfo());

function HomeFurniture(name, prise, comfortable) {
    Furniture.apply(this, arguments);
    this.comfortable = comfortable;
}

HomeFurniture.prototype = Object.create(Furniture.prototype);
HomeFurniture.prototype.constructor = HomeFurniture;

HomeFurniture.prototype.getInfo = function () {
    Furniture.prototype.getInfo.apply(this);
    return `${this.name} - ${this.prise}, Comfortable: ${this.comfortable}`;
}

const home = new HomeFurniture("armchair", 300, true);
console.log(home.getInfo());

//4
function User(name, dateOfRegistration) {
    this.name = name;
    this.dateOfRegistration = dateOfRegistration;
}

let date = new Date();
date = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();

User.prototype.getInfo = function () {
    return `${this.name}: ${this.dateOfRegistration}`;
}

function Admin(name, dateOfRegistration, superAdmin) {
    User.apply(this, arguments);
    this._superAdmin = superAdmin;
}

Admin.prototype = Object.create(User.prototype);
Admin.prototype.constructor = Admin;

Admin.prototype.getInfo = function () {
    User.prototype.getInfo.apply(this);
    return `${this.name}:  
    Registration: ${this.dateOfRegistration}. 
    Valid till: ${this.validDate} 
    Admin: ${this._superAdmin}.`;
}

function Guest(name, dateOfRegistration, superAdmin) {
    User.apply(this, arguments);
    this.superAdmin = superAdmin;
    let days = (24 * 60 * 60 * 1000) * 7;
    let milisec = Date.parse(date);
    let weekMilisec = milisec + days;
    let valid = new Date(weekMilisec);
    this.validDate = valid.toString();
}

Guest.prototype = Object.create(User.prototype);
Guest.prototype.constructor = Guest;

Guest.prototype.getInfo = function () {
    User.prototype.getInfo.apply(this);
    return `${this.name}:  
    Registration: ${this.dateOfRegistration}. 
    Valid till: ${this.validDate} 
    Admin: ${this.superAdmin}.`;
}
const admin = new Admin("Tanya", date, false);
console.log(admin.getInfo());
const guest = new Guest("Tanya", date, false);
console.log(guest.getInfo());
