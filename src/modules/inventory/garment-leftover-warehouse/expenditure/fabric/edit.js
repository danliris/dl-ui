import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

const StockLoader = require('../../../../../loader/garment-leftover-warehouse-stock-loader');

@inject(Router, Service)
export class Edit {
    isEdit = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    get stockLoader() {
        return StockLoader;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);

        const stockIds = this.data.Items.map(i => `Id==${i.StockId}`).join("||");
        let filter = {};
        filter[stockIds] = true;
        const stocksResult = await this.service.searchStock({ filter: filter });

        for (const item of this.data.Items) {
            item.Stock = stocksResult.data.find(i => i.Id == item.StockId) || {};
            item.Stock.Quantity += item.Quantity;
        }

        this.error = {};
    }

    cancelCallback(event) {
        this.router.navigateToRoute('view', { id: this.data.Id });
    }

    saveCallback(event) {
        this.service.update(this.data)
            .then(result => {
                this.router.navigateToRoute('view', { id: this.data.Id });
            })
            .catch(e => {
                this.error = e;
            })
    }
}
