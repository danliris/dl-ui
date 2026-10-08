import { observable } from 'aurelia-framework';

export class Detail {
    @observable quantity = 0;

    activate(context) {
        this.context = context;
        this.data = context.data || {};
        this.error = context.error || {};
        this.options = context.options || {};
        this.collectionItems = (context.context && context.context.items) || [];
        this.readOnly = !!this.options.readOnly;
        this.isPersisted =!!(this.data.Id || this.data.id);
        this.quantityReadOnly =
            this.readOnly ||
            this.isPersisted ||
            !this.data.FinishedGoodStockId;
        this.quantity = Number(this.data.Quantity || 0);
        this.quantityError = null;
        this._validateStock(this.quantity);
        this._validateGroupQuantity();
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

    _getGroupKey(row) {
        const packingListSizeId = Number(row.PackingListSizeId || 0);
        if (packingListSizeId)
            return `PLSIZE:${packingListSizeId}`;

        const sizeId = row.Size ? (row.Size.Id || row.Size.id || 0) : 0;
        const uomId = row.Uom ? (row.Uom.Id || row.Uom.id || 0) : 0;
        const colour = String(row.PackingListColour || row.Colour || '').trim().toUpperCase();
        return `FALLBACK:${row.RONo || ''}:${sizeId}:${uomId}:${colour}`;
    }

    _validateGroupQuantity() {
        if (!this.data || !this.data.ShowPartialColumns)
            return;

        const key = this._getGroupKey(this.data);
        const groupRows = this.collectionItems
            .map(entry => entry.data)
            .filter(row => row && this._getGroupKey(row) === key);

        if (!groupRows.length)
            return;

        const remainingQuantity = Number(this.data.RemainingQuantity || 0);
        const totalQuantity = groupRows
            .filter(row => row.FinishedGoodStockId)
            .reduce((sum, row) => sum + Number(row.Quantity || 0), 0);

        const tolerance = 0.000001;
        const message = Math.abs(totalQuantity - remainingQuantity) > tolerance
            ? `Total QTY Ambil (${totalQuantity}) harus sama dengan Sisa Packing List (${remainingQuantity}).`
            : null;

        groupRows.forEach(row => {
            row.PackingListQuantityMismatchMessage = message;
        });
    }

    quantityChanged(newValue) {
        if (!this.data)
            return;

        let quantity = Number(newValue || 0);

        if (Number.isNaN(quantity))
            quantity = 0;
        this.data.Quantity = quantity;
        this._validateStock(quantity);
        this._validateGroupQuantity();
    }
}
