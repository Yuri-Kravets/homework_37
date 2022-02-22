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

    },
    init() {
        this.getForm();
    }
}