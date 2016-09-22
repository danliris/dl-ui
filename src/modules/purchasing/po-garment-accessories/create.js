import {inject, bindable, BindingEngine, observable} from 'aurelia-framework'
import {Router} from 'aurelia-router';
import {Service} from './service';

@inject(Router, Service, BindingEngine, Element)
export class Create {
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
        this.data = {};
        
        this.qty = 1;
    }

    attached() {
        this.bindingEngine.propertyObserver(this, "product").subscribe((newValue, oldValue) => {
            this.updatePrice(newValue, this.qty);
        });
        this.bindingEngine.propertyObserver(this, "qty").subscribe((newValue, oldValue) => {
            this.updatePrice(this.product, newValue);
        });
        
    }
    
    back() {
        this.router.navigateToRoute('list');
    }

    save() {
        this.data.items = this.data.items ? this.data.items : [];
        this.data.items.push({ product: this.product, qty: this.qty, price: this.price });
        
        console.log(JSON.stringify(this.data));
        this.service.create(this.data)
            .then(result => {
                this.back();
            })
            .catch(e => {
                console.log(e);
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