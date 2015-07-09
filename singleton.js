var databases = (function() {
    var items = [],
        db = {
            add: function(item) {
                items.push(item);
                return this;
            },
            list: function() {
                return items.slice();
            }
        };

    return {
        get: function() {
            return db;
        }
    };
}());

console.log(databases.get()
    .add('Hon ')
    .add('john')
    .list());

console.log(databases.get()
    .add('Hon 1')
    .add('john 1')
    .list()
);
//poluchavam edin i sashti obekt t.e. pri vtoriq pat she printira vsichkite 4 obekta
