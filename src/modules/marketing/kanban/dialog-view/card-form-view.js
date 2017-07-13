import {inject, useView} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';

@inject(DialogController)
@useView("./card-form-view.html")
export class CardFormView {
    constructor(controller) {
        this.controller = controller;
        this.error = {};
    }

    attached() {
        this.data.board = "";
        this.data.unit = "";
    }

    activate(data) {
        this.data = data;
    }

    save()
    {
        this.error = {};

        if(this.data.board == "") {
            this.error.board = "Board is required";
        }
        
        if(this.data.unit == "") {
            this.error.unit = "Unit is required";
        }

        if(Object.getOwnPropertyNames(this.error).length == 0)
            this.controller.ok(this.data);
    }
}