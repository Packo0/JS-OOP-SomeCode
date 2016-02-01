// var animal = {
//     toString: function() {
//         return 'animal';
//     }
// };


// //s clasichesko OOP si shimnahme funkcionalnostta na ES5 Object.create za po stari browseri
// // function createObject(objToCreate) {
// //     function Constructor() {}
// //     Constructor.prototype = objToCreate;
// //     return new Constructor();
// // }


// // var dog = createObject(animal);
// // dog.name = 'Pesho';


// //the right way to make objects
// var dog = Object.create(animal); //pravi obekt s prototype animal

// dog.name = 'Pesho';
// dog.age = 5;

// //vmesto gornoto da si setvam propertitata s tochka moje da se napravi i taka
// //nasledi mi animal i posle prazen obekt s koito si opisvam vsichki propertita koito iskam da ima dog
// //Object.defineProperties(animal) izvikva Object.create vyrhu animal
// var dog = Object.defineProperties(animal, {
//     name: {
//         value: 'Pesho',
//     },
//     age: {
//         value: 5,
//     },
//     bark: {
//         value: function() {
//             return 'bark';
//         }
//     }
// });

// console.log();


// // var dog = {
// //     name: 'Pesho',
// //     //override toString na kucheto
// //     toString: function() {
// //         return 'dog';
// //     }
// // };



// //nasledqvane dve dolni sledi ne e mnnogo dobre da se pipa zatova se pravi s gotovi funkcii naprimer Object.prototype
// //dog.__proto__ = animal;

// console.log(dog.toString());
// console.log(animal.toString());

//create class sys konstruktor i propertita
var animal = (function() {
    //animal e = na samiq obekt ne ni trqbva object.create shtoto nqma kvo da nasledqvame
    var animal = {
        //function konstructor init iskame da ni e funkciqta koqto shte e konstructor kym animal
        init: function(name, age) {
            this.name = name; // shte se izvika toq setter na red: 75
            this.age = age;
            return this; //ako ne varnem this nie izvikvame init-a kato standartna funckiq i she poluchim undefined
        },
        //tova neshto otgovarq kogato nqkoi kaje var someName = animal.name;
        get name() 
		{
            return this._name; //private promenliva _name
        },
        set name(value) {
            if (value.length < 3) {
                throw new Error('Sorry, name should be at least 3 symbols!');
            }

            this._name = value;
        },
        toString: function() {
            return this.name + ' ' + this.age;
        }

    };
    return animal;
}());

//nasledqvane 
var cat = (function(parent) {
    //kotkata vzema vsichko ot animal i nishto drugo
    var cat = Object.create(parent);

    //tova e ekvivalentno na tova na 105 red
    Object.defineProperty(cat, 'init', {
        function(name, age, sleep) {
            parent.init.call(this, name, age);
            this.sleep = sleep;
            return this;
        }
    });

    cat.init = function(name, age, sleep) {
        parent.init.call(this, name, age);
        this.sleep = sleep;
        return this;
    };

    cat.toString = function() {
        var base = parent.toString.call(this);
        return base + ' ' + this.sleep;
    };

    return cat;

}(animal));

var someAnimal = Object.create(animal).init('Pesho', 5);

var someCat = Object.create(cat).init('Gosho', 18, true);
console.log(someCat);
console.log(someCat.toString());
console.log(someAnimal);
// someAnimal.name = 'pasf';

console.log();
