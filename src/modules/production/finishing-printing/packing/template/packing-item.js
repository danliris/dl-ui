export class PackingItem {

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
    
    get weightTotal() {
        return this.data.weightTotalAmount ? this.data.weightTotalAmount.toFixed(2) : (this.data.Weight * this.data.Quantity).toFixed(2);
    }

    get lengthTotal() {
        return this.data.lengthTotalAmount ? this.data.lengthTotalAmount.toFixed(2) : (this.data.Length * this.data.Quantity).toFixed(2);
    }

    // grades = ["", "A", "B", "C", "AA", "BB", "CC", "BS", "AVAL"];
    grades = ["", "A", "B", "C", "BS FINISH", "BS MATERIAL", "AVAL"];

    controlOptions = {
        control: {
            length: 12
        }
    };
}