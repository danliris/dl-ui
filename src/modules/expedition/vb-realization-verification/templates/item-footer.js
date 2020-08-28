export class ItemFooter {
    activate(context) {
        this.context = context;
        this.data = this.context.data;
        console.log(this.data);
        console.log(this.context);
    }

    get getValueReqReal() {

        var res = 0

        return res;
    }

    get getStatusReqReal() {

        var res = 0

        return res;
    }

    get getIncomeTax() {
        var qty = this.context.items
            .map((item) => {
                var amount = item.data.Amount


                if (item.UseIncomeTax)
                    amount += amount * item.IncomeTaxRate;
                return amount;
            });
        return qty
            .reduce((prev, curr, index) => { return prev + curr }, 0);
    }

    get getAmountVB() {
        // var item = this.context.
        return this.context.options.vbRequestDocumentAmount
    }

    get getAmountAll() {
        var qty = this.context.items
            .map((item) => {
                var amount = item.data.Amount


                if (item.UseIncomeTax)
                    amount += amount * item.IncomeTaxRate;

                if (item.UseVat)
                    amount += amount * 0.1;
                return amount;
            });
        return qty
            .reduce((prev, curr, index) => { return prev + curr }, 0);
    }

    get getAmountVAT() {
        var qty = this.context.items
            .map((item) => {
                var amount = item.data.Amount
                if (item.UseVat)
                    amount += amount * 0.1;
                return amount;
            });
        return qty
            .reduce((prev, curr, index) => { return prev + curr }, 0);
    }

    get getAmountTotal() {
        var qty = this.context.items
            .map((item) => item.data.Amount);
        return qty
            .reduce((prev, curr, index) => { return prev + curr }, 0);
    }
}
