export function configure(config) {
    config.globalResources(
        './basic/textbox',
        './basic/numeric',
        './basic/multiline',
        './basic/dropdown',
        './basic/datepicker',
        './basic/checkbox',
        './basic/radiobutton',
        './basic/auto-suggests/auto-suggest',
        './basic/auto-suggests/uom-auto-suggest',
        './basic/auto-suggests/supplier-auto-suggest',
        './basic/auto-suggests/po-textile-auto-suggest', 
        './po/po-item-textile-collection',
        './podl/podl-item-textile-collection',
        './do/do-item-textile-collection'
    );
}