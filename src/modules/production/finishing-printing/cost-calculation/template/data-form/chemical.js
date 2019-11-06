import numeral from 'numeral';
numeral.defaultFormat("0,0.00");

export class Chemical {

    controlOptions = {
        control: {
            length: 12
        }
    };

    constructor() {
    }


    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        console.log(this.options);
        this.readOnly = this.options.readOnly || false;
    }

    bind() {

    }

    get priceTotal() {
        return this.data.Chemical.Price * this.data.Quantity;
    }

}