import numeral from 'numeral';
export class DOSalesItem {

    activate(context) {
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        if (!this.data.Weight) {
            this.data.Weight = 0;
        }
        if (!this.data.Quantity) {
            this.data.Quantity = 0;
        }
        if (!this.data.Length) {
            this.data.Length = 0;
        }
    }
    
    get Quantity() {
        return numeral(this.data.Quantity).format('0,000');
    }

    get Weight() {
        return numeral(this.data.Weight).format('0,000.0000');
    }

    get Length() {
        return numeral(this.data.Length).format('0,000.0000');
    }

    controlOptions = {
        control: {
            length: 12
        }
    };
}