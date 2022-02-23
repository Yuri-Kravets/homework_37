'use strict';

function controller(view,model) {
    view.init('todoForm');

    return {
        getData(dbKey) {
            if(!dbKey) throw new Error('Database key is not defined');
            return model.getData(dbKey);
        },

        setData(data) {
            if(!this.validateData(data)) throw new Error('Validation Error!');
            model.setData(data);
        },

        validateData(data) {
            if(Object.keys(data).length === 0) return false;


            for(const key in data) {
                if(data[key] === '') return false;

            }

            return true;
        },
        changeCompleted(itemId, dbKey, status) {
            if(!itemId) throw new Error('itemId is not defined');

            model.changeCompleted(itemId, dbKey, status);
        },

        removeTodoItem(dbKey, itemId) {
            if(!itemId) throw new Error('No id provided');

            model.removeTodoItem(dbKey, itemId)
        },

        removeAll(dbKey) {
            model.removeAll(dbKey);
        }
    }
}