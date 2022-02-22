'use strict';
const view = {
    formId: 'todoForm',
    form: null,
    getForm() {
        const form = document.querySelector(this.formId);
        if(form) {
            // form ? this.form = form : null;
            return
        }
    },

    setEvents() {
        this.form.addEventListener(
            'submit',
        this.submitHandler.bind(this))
    },

    submitHandler(event) {
        event.preventDefault();
    },

    findInputsData () {
        return  Array.from(this
        .form
        .querySelectorAll('input[type=text], textarea'))
        .reduce (
            (acc,item) => {
                acc[item,name] = item.value
                return acc;
            },
            {}
        )    
    },

    init() {
        this.getForm();
    }
}