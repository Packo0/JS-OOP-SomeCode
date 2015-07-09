var db = (function() {
    var lastId = 0,
        objects = [];

    function getNextId() {
        return ++lastId;
    }

    function addObject(obj) {
        obj.id = getNextId();
        objects.push(obj);
    }

    function listObject() {
        return objects.slice();
    }

    return {
        add: addObject,
        list: listObject,
    };
}());

db.add({
    name: 'John'
});
console.log(db.list());


//evil hacker
var objs = db.list();
objs.push({
    name: 'Hacked u'
});
console.log(db.list());
