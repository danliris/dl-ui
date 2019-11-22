import { computedFrom } from "aurelia-framework";

export class Item {
    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;

        this.isEdit = this.context.isEdit;
        this.showOrigin = this.context.isEdit;
    }

    changeCheckBox() {
        this.context.context.checkedAll = this.context.items.reduce((accItem, currItem) => {
            return accItem && currItem.Details.reduce((accDetail, currDetail) => accDetail && currDetail.IsSave, true);
        }, true);
    }

    @computedFrom("context.fc", "data.CuttingInQuantity")
    get dataPreparingQuantity() {
        this.data.RemainingQuantity = this.data.CuttingInQuantity;
        this.data.Price=(this.data.BasicPrice) + ((this.data.ComodityPrice * 25/100) * this.data.CuttingInQuantity);
        
        if (this.showOrigin) {
            this.showOrigin = false;
        } else {
            this.data.PreparingQuantity = this.data.CuttingInQuantity * this.context.fc || this.data.PreparingRemainingQuantity;
        }

        if (!this.isEdit) {
            this.data.BasicPrice = this.data.PreparingBasicPrice * this.context.fc;
            this.data.Price=(this.data.BasicPrice) + ((this.data.ComodityPrice * 25/100) * this.data.CuttingInQuantity);
        }

        return this.data.PreparingQuantity;
    }

    set dataPreparingQuantity(value) {
        this.data.PreparingQuantity = value;
    }
}