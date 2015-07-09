var Animal = (function() {
    function Animal(name, age) {
        this.name = name;
        this.age = age;
    }

    Animal.prototype.toString = function() {
        return this.name + ' ' + this.age;
    };

    Animal.prototype.eat = function() {
        return 'Eat ....';
    };

    return Animal;
}());


var Cat = (function(parent) {
    function Cat(name, age, sleep) {
        parent.call(this, name, age);
        this.sleep = sleep;
    }

    Cat.prototype = parent.prototype;

    Cat.prototype.toString = function() {
        var baseResult = parent.prototype.toString.call(this);
        return baseResult + ' ' + this.sleep;

    };

    return Cat;

}(Animal));
debugger;
//new operatora setva prototipite
var someCat = new Cat('Pesho', 5, true);

console.log(someCat);
