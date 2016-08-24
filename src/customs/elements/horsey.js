import {inject, bindable, bindingMode, computedFrom} from 'aurelia-framework';
var horsey = require('horsey');

@inject(Element)
export class Horsey {
    @bindable src;
    @bindable filter;
    @bindable options;

    @bindable({ defaultBindingMode: bindingMode.twoWay }) selection;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) map;


    constructor(element) {
        this.element = element;
    }

    attached() {
        var uri = `${this.src}?${this.filter ? this.filter : 'keyword'}`;

        horsey(this.element.querySelector('input'), {
            predictNextSearch: info => {
                this.setSelection(info.selection);
            },
            source: (data, done) => {
                this.fetch(`${uri}=${data.input}`)
                    .then(list => {
                        done(null, [{
                            list: list
                        }])
                    });
            },
            getText: this.options.label,
            getValue: this.options.value
        });

        if (this.selection) {
            this.fetch(`${uri}=${this.text}`)
                .then(list => {
                    var item = list.find((item, index, arr) => {
                        return this.getValue(item) == this.getValue(this.selection);
                    });
                    if (item) {
                        this.setSelection(item);
                    }
                })
        }
    }

    fetch(uri) {
        return new Promise((resolve, reject) => {
            fetch(uri)
                .then(result => {
                    result.json().then(json => {
                        resolve(this.map ? this.map(json) : json.data);
                    });
                });
        });
    }

    @computedFrom("selection", "options.label")
    get text() {
        return this.selection ? this.selection[this.options.label] : '';
    }
    set text(value) {
        this.selection[this.options.label] = value;
    }

    setSelection(selection) {
        this.selection = selection;
        this.value = this.getValue(this.selection);
    }

    getValue(data) {
        return data[this.options.value];
    }
}