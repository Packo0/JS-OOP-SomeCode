var mod = (function() {
    return {
        x: 'file-1',
        y: 'file-2'
    };
}());

var mod = (function() {
    return {
        x: 'file 1'
    };
}());


var mod = (function() {
    return {
        y: 'file 1'
    };
}());

console.log(mod.x, mod.y);
