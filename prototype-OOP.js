var vehicle = (function() {
    var vehicle = {};
    vehicle.init = function(brand) {
        this.brand = brand;
        return this;
    };

    vehicle.move = function() {
        return this.brand + ' is moving...';
    };

    return vehicle;
}());

var car = (function(parent) {
    var car = Object.create(parent);

    //getter i setter za wheels s defineProperty
    Object.defineProperty(car, 'wheels', {
        get: function() {
            return this._wheels;
        },

        set: function(value) {
            if (value > 4) {
                throw new Error('Car must have less than 5 wheels for some reason');
            }
            this._wheels = value;
        }
    });

    // Object.defineProperty(car, 'init', {
    //     function(brand, wheels) {
    //         parent.init.call(this, brand);
    //         this.wheels = wheels;
    //         return this;
    //     }
    // });
    car.init = function(brand, wheels) {
        parent.init.call(this, brand);
        this.wheels = wheels;
        return this;
    };



    Object.defineProperty(car, 'move', {
        function() {
            return parent.move.call(this) + ' with' + this.wheels + ' wheels';
        }
    });

    // car.move = function() {
    //     return parent.move.call(this) + ' with' + this.wheels + ' wheels';
    // };

    return car;
}(vehicle));

var someVehicle = Object.create(vehicle).init('Mercedes');
console.log(someVehicle);
console.log(someVehicle.move());

var someCar = Object.create(car).init('Audi', 4);
console.log(someCar);
console.log(someCar.move());

//dd
