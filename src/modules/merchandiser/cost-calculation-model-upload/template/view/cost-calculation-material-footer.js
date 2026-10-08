import numeral from 'numeral';

const PROCESS_CATEGORIES = [
    "PROCESS CUTTING",
    "PROCESS SEWING",
    "PROCESS FINISHING"
];

export class CostCalculationMaterialFooter {
    activate(context) {
        this.context = context;
        this.colspan = 9;
    }

    get totalOngkir() {
        return this.context.items.reduce((total, item) =>
            total + numeral(item.data && item.data.TotalShippingFee || 0).value(), 0);
    }

    get totalMaterial() {
        return this.context.items.reduce((total, item) => {
            const categoryName = item.data && item.data.Category && ( item.data.Category.Name || item.data.Category.name );

            if (categoryName && !PROCESS_CATEGORIES.includes(categoryName)) {
                total += numeral(item.data.Total || 0).value();
            }

            return total;
        }, 0);
    }

    get totalProcess() {
        return this.context.items.reduce((total, item) => {
            const categoryName = item.data && item.data.Category && ( item.data.Category.Name || item.data.Category.name );

            if (PROCESS_CATEGORIES.includes(categoryName)) {
                total += numeral(item.data.Total || 0).value();
            }

            return total;
        }, 0);
    }
}