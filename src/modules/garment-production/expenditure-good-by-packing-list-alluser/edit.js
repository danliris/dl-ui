import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service, PackingInventoryService } from './service';
import { Base64Helper } from '../../../utils/base-64-coded-helper';

@inject(Router, Service, PackingInventoryService)
export class View {
    isEdit = true;

    constructor(router, service, packingInventoryService) {
        this.router = router;
        this.service = service;
        this.packingInventoryService = packingInventoryService;
    }

    _value(obj, pascal, camel) {
        if (!obj) return null;
        if (obj[pascal] !== undefined && obj[pascal] !== null)
            return obj[pascal];
        return obj[camel];
    }

    async activate(params) {
        const idDecoded = Base64Helper.decode(params.id);
        this.data = await this.service.read(idDecoded);
        this.selectedUnit = this.data.Unit;

        if (this.data.Buyer)
            this.data.BuyerView = `${this.data.Buyer.Code || ''}${this.data.Buyer.Code ? ' - ' : ''}${this.data.Buyer.Name || ''}`;

        if (this.data.PackingListId) {
            try {
                const response = await this.packingInventoryService.getDataByPackingLisId(this.data.PackingListId);
                const packingList = response && response.data ? response.data : response;
                const packingItems = this._value(packingList, 'Items', 'items') || [];
                const qtyBySizeId = new Map();

                for (const packingItem of packingItems) {
                    const details = this._value(packingItem, 'Details', 'details') || [];
                    for (const detail of details) {
                        const sizes = this._value(detail, 'Sizes', 'sizes') || [];
                        for (const sizeItem of sizes) {
                            const sizeId = Number(this._value(sizeItem, 'Id', 'id') || 0);
                            if (sizeId)
                                qtyBySizeId.set(sizeId, Number(this._value(sizeItem, 'Quantity', 'quantity') || 0));
                        }
                    }
                }

                (this.data.Items || []).forEach(item => {
                    const id = Number(item.PackingListSizeId || 0);
                    if (id && qtyBySizeId.has(id))
                        item.PackingListQuantity = qtyBySizeId.get(id);
                });
            } catch (e) {
                console.warn('Packing List tidak dapat dimuat untuk QTY PL.', e);
            }
        }
    }

    bind() {
        this.error = {};
    }

    cancelCallback() {
        const idEncoded = Base64Helper.encode(this.data.Id);
        this.router.navigateToRoute('view', { id: idEncoded });
    }

    saveCallback() {
        this.service.update(this.data)
            .then(() => this.cancelCallback())
            .catch(e => this.error = e);
    }
}
