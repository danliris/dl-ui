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
        './basic/auto-suggests/po-unposted-auto-suggest', 
        './po/po-item-collection',
        './po-external/po-external-item-collection',
        './do/do-item-collection'
    );
}