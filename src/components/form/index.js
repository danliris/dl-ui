
export function configure(config) {
    config.globalResources(
        './basic/checkbox',
        './basic/datepicker-no-default',
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

        './do/do-item-collection',
        './po/po-item-collection',
        './po-external/po-external-item-collection',
        './unit-receipt-note/unit-receipt-note-item-collection'
    );
}