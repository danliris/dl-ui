export class DetailFooter {
    activate(context) {
        this.context = context;
    }

    get columnIndex() {
        const columns = (this.context && this.context.columns) || [];
        return columns.indexOf('QTY AMBIL');
    }

    get columnsAfter() {
        const columns = (this.context && this.context.columns) || [];
        return Math.max(columns.length - this.columnIndex - 1, 0);
    }

    get totalQuantity() {
        const items = (this.context && this.context.items) || [];
        return items
            .filter(entry => entry && entry.data && entry.data.FinishedGoodStockId)
            .reduce((sum, entry) => sum + Number(entry.data.Quantity || 0), 0);
    }
}
