import {bindable} from 'aurelia-framework';
import { Config } from "aurelia-api";
import { Container } from 'aurelia-dependency-injection';

export class NewProduct {
    async activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
    }

    get getTotLength(){
        var totLength = 0;
        if(this.data && this.data.length && this.data.returQuantity){
            totLength = Number(this.data.length) * Number(this.data.returQuantity);
        }
        return totLength;
    }

    get getTotWeight(){
        var totWeight = 0;
        if(this.data && this.data.weight && this.data.returQuantity){
            totWeight = Number(this.data.weight) * Number(this.data.returQuantity);
        }
        return totWeight;
    }

    controlOptions = {
        control: {
        length: 12
        }
    };
}