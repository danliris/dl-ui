import {inject, bindable, bindingMode} from 'aurelia-framework';
var HorseyJs = require('horsey');

@inject(Element)
export class Horsey {
    @bindable src;
    @bindable filter;

    @bindable({ defaultBindingMode: bindingMode.twoWay }) selection;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) default;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) units;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) category;
    
    

    @bindable options;

    constructor(element) {
        this.element = element;
    }

    attached() {
        // console.log(this.options);
        this.selection = {};
        var uri = `${this.src}?${this.filter ? this.filter : 'keyword'}`;
        HorseyJs(this.element.querySelector('input'), {
            predictNextSearch: info => {
                // let changeEvent;
                // if (window.CustomEvent) {
                //     changeEvent = new CustomEvent('ce', {
                //         detail: {
                //             value: info.selection
                //         },
                //         bubbles: true
                //     });
                // } else {
                //     changeEvent = document.createEvent('CustomEvent');
                //     changeEvent.initCustomEvent('ce', true, true, {
                //         detail: {
                //             value: info.selection
                //         }
                //     });
                // }
                // this.element.dispatchEvent(changeEvent); 
                this.selection = info.selection;
                this.value = info.selection[eval(this.options).value];
                this.default = info.selection[eval(this.options).default_uom];
                this.units = info.selection[eval(this.options).uom_units];
                this.category = info.selection[eval(this.options).label];
            },
            source: (data, done) => {
                fetch(`${uri}=${data.input}`)
                    .then(result => {
                        result.json().then(json => {
                            done(null, [{
                                list: json.data
                            }])
                        })
                    });
            },
            getText: eval(this.options).label,
            getValue: eval(this.options).value
        })
    }
}