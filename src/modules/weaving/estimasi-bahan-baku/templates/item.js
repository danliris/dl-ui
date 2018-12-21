import { inject, BindingEngine } from 'aurelia-framework';

var EBBLoader = require('../../../../loader/ebb-loader');

@inject(BindingEngine)
export class Item {
    constructor(bindingEngine) {
        this.bindingEngine = bindingEngine;
    }

    activate(context) {
        this.data = [
            {
              sopNoEBB: "0912/00-2018",
              noKonstruksi: "CD 133 72 63",
              jnsLusiSatu: "CD",
              asalLusiSatu: "SSS",
              qtyLusiSatu: 50,
              jnsLusiDua: "CD",
              asalLusiDua: "SSS",
              qtyLusiDua: 50,
              jnsPknSatu: "CD",
              asalPknSatu: "SSS",
              qtyPakanSatu: 50,
              jnsPknDua: "CD",
              asalPknDua: "SSS",
              qtyPakanDua: 50
            },
            {
              sopNoEBB: "0913/00-2018",
              noKonstruksi: "CD 133 72 63",
              jnsLusiSatu: "CD",
              asalLusiSatu: "SSS",
              qtyLusiSatu: 100,
              jnsLusiDua: "CD",
              asalLusiDua: "SSS",
              qtyLusiDua: 100,
              jnsPknSatu: "CD",
              asalPknSatu: "SSS",
              qtyPakanSatu: 100,
              jnsPknDua: "CD",
              asalPknDua: "SSS",
              qtyPakanDua: 100
            }
          ];
        this.error = context.error;
        this.options = context.context.options;
        this.readOnly = context.options.readOnly;
    }

    // get ebbLoader() {
    //     return EBBLoader;
    // }

    get addItems() {
        return (event) => {
            this.data.Items.push({})
        };
    }
}
