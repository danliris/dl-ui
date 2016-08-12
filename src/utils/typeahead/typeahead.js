import {inject, bindable} from 'aurelia-framework';
var Horsey = require('horsey');

@inject(Element)
export class Typeahead {
    @bindable 
    @bindable value;
    id = '';

    constructor(element) {
        var now = new Date();
        var stamp = now / 1000 | 0;
        var code = stamp.toString(36);
        this.id = `_${code}`;
        this.element = element; 
    }

    attached() {
        var input = this.element.querySelector(`input[id="${this.id}"]`);

        Horsey(input, {
            predictNextSearch: function(info){
                console.log(this.value);
                this.value.data = info.selection
                this.value.ok = info.selection.name;
            }.bind(this),
            source: function (data, done) {
                fetch(`http://localhost:8900/v1/core/fabric?keyword=${data.input}`) // TO-DO: update with real API in PRD environment.
                    .then(result => {
                        result.json().then(json => {
                            console.log(json);
                            done(null, [{
                                list: json.data
                            }])
                        })
                    });
            },
            getText: 'name',
            getValue: '_id'
        })
    }
}