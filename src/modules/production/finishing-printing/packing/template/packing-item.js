export class PackingItem {

    activate(context) {
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        if (!this.data.weight) {
            this.data.weight = 0;
        }
        if (!this.data.quantity) {
            this.data.quantity = 0;
        }
        if (!this.data.length) {
            this.data.length = 0;
        }
    }

    get weightTotal() {
        return this.data.weight * this.data.quantity;
    }

    get lengthTotal() {
        return this.data.length * this.data.quantity;
    }

    grades = ["", "A", "B", "C", "AA", "BB", "CC", "BS", "AVAL"];

    controlOptions = {
        control: {
            length: 12
        }
    };
}