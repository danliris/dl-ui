export class ItemFooter {
    activate(context) {
        this.context = context;
        this.data = this.context.data;
        
        var diff = this.getValueReqReal;

        this.status = diff < 0 ? "Kurang" : diff > 0 ? "Sisa" : "Sesuai";
    }

    get getStatusReqReal() {

        var res = 0

        return res;
    }

    get getValueReqReal() {

        var res = 0

        var qty = this.context.items
            .map((item) => {
                let incomeTax = 0;
                let vat = 0;
                var amount = item.data.Amount


                if (item.data.UseIncomeTax && item.data.IncomeTaxBy == "Supplier")
                    incomeTax = amount * (item.data.IncomeTaxRate / 100);

                if (item.data.UseVat)
                    vat = amount * 0.1;

                

                return amount - incomeTax + vat;
            });
        var sum = qty
            .reduce((prev, curr, index) => { return prev + curr }, 0);

        return this.context.options.vbRequestDocumentAmount - sum;
    }

    get getIncomeTax() {
        var qty = this.context.items
            .map((item) => {
                var amount = 0

                if (item.data.UseIncomeTax && item.data.IncomeTaxBy == "Supplier")
                    amount += item.data.Amount * (item.data.IncomeTaxRate / 100);
                
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
                let incomeTax = 0;
                let vat = 0;
                var amount = item.data.Amount


                if (item.data.UseIncomeTax && item.data.IncomeTaxBy == "Supplier")
                    incomeTax = amount * (item.data.IncomeTaxRate / 100);

                if (item.data.UseVat)
                    vat = amount * 0.1;


                return amount - incomeTax + vat;
            });
        return qty
            .reduce((prev, curr, index) => { return prev + curr }, 0);
    }

    get getAmountVAT() {
        var qty = this.context.items
            .map((item) => {
                var amount = 0
                if (item.data.UseVat)
                    amount += item.data.Amount * 0.1;
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
