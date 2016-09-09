import {inject, bindable, BindingEngine, observable} from 'aurelia-framework'
import {Router} from 'aurelia-router';
import {Service} from './service';

@inject(Router, Service, BindingEngine, Element)
export class Edit {
    uri = require('../../../host').core + "/v1/core/accesories";

        name = '';
        qty = '';
        price = '';
        product = {};

    constructor(router, service, bindingEngine, element) {
        this.router = router;
        this.service = service;
        this.bindingEngine = bindingEngine;
        this.element = element;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
    }

    attached() {  
        for (var item of this.data.items) {
            this.product = item.product;
            this.name = item.product.code + ' - ' + item.product.name + '@' + item.product.price;
            this.qty = item.qty;
            this.price = item.price
        }
          
        this.bindingEngine.propertyObserver(this, "product").subscribe((newValue, oldValue) => {
            this.updatePrice(newValue, this.qty);
        });
        this.bindingEngine.propertyObserver(this, "qty").subscribe((newValue, oldValue) => {
            this.updatePrice(this.product, newValue);
        });
        
    }

    view() {
        this.router.navigateToRoute('view', { id: this.data._id });
    }

    save() {
        this.data.items = [];
        this.data.items.push({ product: this.product, qty: this.qty, price: this.price });
        
        this.service.update(this.data).then(result => {
            this.view();
        }).catch(e => {
            this.error = e;
        })
    }

    updatePrice(product, qty) {
        console.log('update')
        this.price = product.price * qty;
    }
    
    map(result) {
        var list = result.data.map(item => {
            var _item = item;
            _item.label = `${_item.code} - ${_item.name} @ ${_item.price}`;
            return _item
        });
        console.log(list);
        return list;
    }
}
