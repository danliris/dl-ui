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

        // if (this.selection) {
        //     this.fetch(`${uri}=${this.text}`)
        //         .then(list => {
        //             var item = list.find((item, index, arr) => {
        //                 return this.getValue(item) == this.getValue(this.selection);
        //             });
        //             if (item) {
        //                 this.setSelection(item);
        //             }
        //         })
        // }
    }

    fetch(uri) {
        return new Promise((resolve, reject) => {
            fetch(uri)
                .then(result => {
                    result.json().then(json => {
                        var list = this.map ? this.map(json) : json.data;
                        if (!list || list.length < 1) {
                            var newSelection = {};
                            newSelection[this.options.label] = this.text;
                            this.setSelection(newSelection);
                        }
                        resolve(list);
                    });
                });
        });
    }

    @computedFrom("selection", "options.label")
    get text() {
        return this.selection ? this.selection[this.options.label] : '';
    }
    set text(value) {
        this.selection = this.selection || {};
        this.selection[this.options.label] = value;
    }

    setSelection(selection) {
        this.selection = selection;
        this.value = this.getValue(this.selection);
        this.selectionChanged();
    }

    getValue(data) {
        return this.options.value ? data[this.options.value] : null;
    }

    textchanged(event) { 
        var newSelection = {};
        newSelection[this.options.label] = this.text;
        this.setSelection(newSelection);

    }
    selectionChanged() {
        var event;

        if (document.createEvent) {
            event = document.createEvent("CustomEvent");
            event.initCustomEvent("changed", true, true, this.selection);
        } else {
            event = document.createEventObject();
            event.eventType = "changed";
        }

        event.eventName = "changed";

        if (document.createEvent) {
            this.element.dispatchEvent(event);
        } else {
            this.element.fireEvent("on" + event.eventType, event);
        }
    }
}