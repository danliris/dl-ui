import { observable } from 'aurelia-framework';

export class Detail {
    @observable quantity = 0;

    activate(context) {
        this.context = context;
        this.data = context.data || {};
        this.error = context.error || {};
        this.options = context.options || {};
        this.readOnly = !!this.options.readOnly;
        this.isPersisted =!!(this.data.Id || this.data.id);
        this.quantityReadOnly =
            this.readOnly ||
            this.isPersisted ||
            !this.data.FinishedGoodStockId;
        this.quantity = Number(this.data.Quantity || 0);
        this.quantityError = null;
        this._validateStock(this.quantity);
    }

    _validateStock(quantity) {
        if (!this.data || !this.data.ShowPartialColumns) {
            this.quantityError = null;
            return;
        }

        const stockQuantity = Number(this.data.StockQuantity || 0);

        if (
            this.data.FinishedGoodStockId &&
            Number(quantity || 0) > stockQuantity
        ) {
            this.quantityError =
                `Quantity tidak boleh melebihi Stock (${stockQuantity}).`;
            return;
        }

        this.quantityError = null;
    }

    quantityChanged(newValue) {
        if (!this.data)
            return;

        let quantity = Number(newValue || 0);

        if (Number.isNaN(quantity))
            quantity = 0;
        this.data.Quantity = quantity;
        this._validateStock(quantity);
    }
}
