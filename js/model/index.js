'use strict';

const model = {
    controller: null,

    getData () {
        return JSON.parse(localStorage.getItem(this.formId));
    },
    setData(data) {
        if(!localStorage.getItem(this.formId)) {
            let arr = [];
            arr.push(data);
            localStorage.setItem(
                this.formId,
                JSON.stringify(arr)
            );
            return;
        }
        
        let existingData = localStorage.getItem(this.formId);
        existingData =JSON.parse(existingData);
        existingData.push(data);
        localStorage.setItem(
            this.formId,
            JSON.stringify(existingData)
        )
        return;
    },
    updateTodoItem (id) {
        const data = this.getData();
        if (data[id].completed === 'true') {
            data[id].completed = 'false';

        } else  {
            data[id].completed = 'true';
        }
        localStorage.clear();
        localStorage.setItem(
            this.formId,
            JSON.stringify(data)
        );
        
    },
    removeTodoItem (target) {
    
        target.parentElement.remove();
        const data = this.getData();
        data.splice(target.id,1);
        
        localStorage.clear();
        document.querySelectorAll('div.col-4.taskWrapper').forEach(divTask => {
            divTask.remove();
        });
        localStorage.setItem(
            this.formId,
            JSON.stringify(data)
        );
        this.preFillHandler();
    },
    removeAll () {
        localStorage.clear();
        document.querySelectorAll('div.col-4.taskWrapper').forEach(divTask => {
            divTask.remove();
        });
        this.countId = 0;
    },
    init(controllerInstance) {
        this.controller = controllerInstance;
    }

}