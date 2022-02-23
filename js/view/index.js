'use strict';
const view = {
    formId: null,
    form: null,
    todo:null,
    controller: null,
    countId: 0,

    findForm() {
        const form = document.getElementById(this.formId);

        if(form === null || form.nodeName !== 'FORM') {
            throw new Error ('There is no such form on the page');
        }

        this.form = form;
        return form;
    },
    findTodo() {
        const todo = document.getElementById('todoItems');
        if(todo === null) {
            throw new Error ('There is no such TODO on the page');
        }
        this.todo = todo;
        
        return todo;
        
    },
    addFormHandler() {
        this.form.addEventListener(
            'submit',
            (event) => this.formHandler(event)
        ); 
    },
    addTodoHandler() {
        this.todo.addEventListener(
            'click',
            (event) => this.todoHandler(event)
        ); 
    },
    todoHandler (event) {
        if (event.target.tagName === 'INPUT') {
            if (event.target.type === 'checkbox') {
                this.updateTodoItem(event.target.id); 
            } 
            if (event.target.type === 'button') {
                this.removeTodoItem(event.target);
            }
            
        } 
    },
    
    preFillTodoList() {
        document
            .addEventListener(
                'DOMContentLoaded',  
            this.preFillHandler.bind(this)

            )
    },
    preFillHandler(){
        const data = this.getData();

        if(data !== null) {
            if (data.length > 0) {
                this.countId = 0;
                data.forEach(todoItem => {
                    todoItem.id = this.countId;
                    this.countId ++;
                    const template = this.createTemplate(todoItem);
                    document
                        .getElementById('todoItems')
                        .prepend(template);
                })
            }
        }
    },
    formHandler(event) {
        event.preventDefault();       
        if (event.submitter.id === 'del'){
            if(confirm('точно удалить?')) {
                this.removeAll();
                return
            }
            return
        }     
        const inputs = this.findInputs(event.target);
        const data = {};

            inputs.forEach(input => {
                //console.log(input);
                data[input.name] = input.value;
            });
            data['completed'] = 'false';
            this.setData(data);
            data.id = this.countId ++;
            const template = this.createTemplate(data);
            document.getElementById('todoItems')
                .prepend(template);
                //console.log(event.target);
                event.target.reset();
    },
    createCheckBox (id,innerContent,completed) {
        const checkBox = this.createElement('div','form-check');
        
            const checkInput = this.createElement('input','form-check-input','checkbox');
            checkInput.setAttribute('id', id);
            checkBox.prepend(checkInput);
            
            const checkLabel = this.createElement('label','form-check-label');
            checkLabel.setAttribute('for', id);
            if (innerContent) {
                checkLabel.innerHTML = innerContent;
            }
            if (completed === 'true') {
                checkInput.setAttribute('checked','');
            }
            
            checkBox.prepend(checkLabel);
        return checkBox;
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

    // getForm() {
    //     const form = document.querySelector(this.formId);
    //     if(form) {
    //         // form ? this.form = form : null;
    //         return
    //     }
    // },

    // setEvents() {
    //     this.form.addEventListener(
    //         'submit',
    //     this.submitHandler.bind(this))
    // },

    // submitHandler(event) {
    //     event.preventDefault();
    //     const data = this.findInputsData();

    // },

    createTemplate({title,description,completed,id}) {

        const todoItem = this.createElement('div','col-4');
        todoItem.setAttribute('id', id);
        
        const taskWrapper = this.createElement('div','taskWrapper');
        
        todoItem.classList.add('taskWrapper');
        todoItem.append(taskWrapper);
        const taskHeading = this.createElement(
            'div',
            'taskHeading',
            '',
            title
        );
        const taskDescription = this.createElement(
            'div',
            'taskDescription',
            '',
            description   
            );
        taskWrapper.append(taskHeading);
        taskWrapper.append(taskDescription);

        const todoCheckBox = this.createCheckBox(
            id,
            'Done',
            completed
        
            );
        todoItem.append(todoCheckBox);

        const removeItemBtn = this.createElement(
            'input',
            ['btn','btn-danger'],
            'button'
            );
            removeItemBtn.setAttribute('value','Delete');
            removeItemBtn.setAttribute('id',id);
        todoItem.append(removeItemBtn);

        return todoItem
    },
    createElement(nodeName, classes, type, innerContent) {
        const el = document.createElement(nodeName);

        if(Array.isArray(classes)) {
            classes.forEach(singleClassName => {
                el.classList.add(singleClassName);
            })
        } else {
            el.classList.add(classes);
        }
        if (type !== '' && type) {
            el.setAttribute('type', type);
        }
        if (innerContent) {
            el.innerHTML = innerContent;
        }
        
        return el;
    },
    
    findInputs(target) {
        return target.querySelectorAll(
            'input:not([type=submit]), textarea'
        );
    },
    init(controllerInstance) {
        if(typeof todoListFormId !== 'string' || todoListFormId.length === 0)  {
            throw new Error ('To do list ID is not valid');
        }
        //this.formId = todoListFormId;
        
        this.findForm();
        this.addFormHandler();
        this.findTodo();
        this.addTodoHandler();
        this.preFillTodoList();
        this.controller = controllerInstance;
    }, 
    // initController(todoListFormId ) {
    //     this.controller = controllerInstance;
    // }
}