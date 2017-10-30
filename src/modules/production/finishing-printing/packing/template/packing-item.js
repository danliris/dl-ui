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
        return (this.data.weight * this.data.quantity).toFixed(2);
    }

    get lengthTotal() {
        return (this.data.length * this.data.quantity).toFixed(2);
    }

    // grades = ["", "A", "B", "C", "AA", "BB", "CC", "BS", "AVAL"];
    grades = ["", "A", "B", "C"];

    controlOptions = {
        control: {
            length: 12
        }
    };
}