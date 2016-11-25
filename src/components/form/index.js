
export function configure(config) {
    config.globalResources(
        './pagination',

        './basic/checkbox',
        './basic/datepicker',
        './basic/dropdown',
        './basic/multiline',
        './basic/numeric',
        './basic/radiobutton',
        './basic/textbox',

        './auto-suggests/auto-suggest',
        './auto-suggests/category-auto-suggest',
        './auto-suggests/delivery-order-auto-suggest',
        './auto-suggests/po-auto-suggest',
        './auto-suggests/po-unposted-auto-suggest',
        './auto-suggests/supplier-auto-suggest',
        './auto-suggests/unit-auto-suggest', 
        './auto-suggests/uom-auto-suggest',
        './auto-suggests/currency-auto-suggest',
        './auto-suggests/delivery-order-by-supplier-unit-auto-suggest',
        './auto-suggests/vat-auto-suggest',
        './auto-suggests/unit-receipt-note-auto-suggest',
        './auto-suggests/budget-auto-suggest',
        './auto-suggests/unit-payment-order-auto-suggest',
        './auto-suggests/machine-auto-suggest',
        './auto-suggests/machine-by-unit-auto-suggest',
        './auto-suggests/product-by-uster-auto-suggest',
        './auto-suggests/pr-auto-suggest',
        './auto-suggests/division-auto-suggest',
        './auto-suggests/thread-auto-suggest',
        './auto-suggests/unit-spinning-auto-suggest',

        './do/do-item-collection',
        './po/po-item-collection',
        './po-external/po-external-item-collection',
        './unit-receipt-note/unit-receipt-note-item-collection',
        './unit-payment-order/unit-payment-order-item-collection',
        './pr/pr-item-collection',
        './unit-payment-price-correction-note/unit-payment-price-correction-note-collection',
        './unit-payment-quantity-correction-note/unit-payment-quantity-correction-note-collection'
    );
}
