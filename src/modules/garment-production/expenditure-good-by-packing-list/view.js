import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service, PackingInventoryService } from './service';
import { Base64Helper } from '../../../utils/base-64-coded-helper';
import { StatusHelper } from '../../../utils/disable-update';

@inject(Router, Service, PackingInventoryService)
export class View {
    isView = true;

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

    _attachPackingListQuantity(packingList) {
        if (!packingList || !this.data || !this.data.Items)
            return;

        const packingItems = this._value(packingList, 'Items', 'items') || [];
        const qtyByPackingListSizeId = new Map();

        for (const packingItem of packingItems) {
            const details = this._value(packingItem, 'Details', 'details') || [];
            for (const detail of details) {
                const sizes = this._value(detail, 'Sizes', 'sizes') || [];
                for (const sizeItem of sizes) {
                    const id = Number(this._value(sizeItem, 'Id', 'id') || 0);
                    if (id)
                        qtyByPackingListSizeId.set(id, Number(this._value(sizeItem, 'Quantity', 'quantity') || 0));
                }
            }
        }

        this.data.Items.forEach(item => {
            const id = Number(item.PackingListSizeId || 0);
            if (id && qtyByPackingListSizeId.has(id))
                item.PackingListQuantity = qtyByPackingListSizeId.get(id);
        });
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
                this._attachPackingListQuantity(packingList);
            } catch (e) {
                console.warn('Packing List tidak dapat dimuat untuk QTY PL.', e);
            }
        }

        if ((this.data.Items || []).some(item => Number(item.ReturQuantity || 0) > 0))
            this.deleteCallback = null;

        if (this.data.IsReceived) {
            this.deleteCallback = null;
            this.editCallback = null;
        }

        const isSuccess = this.data.StatusBOMD365 === 'Success' || this.data.StatusIOMD365 === 'Success';
        StatusHelper.disableEditDelete(this, isSuccess);
    }

    cancelCallback() {
        this.router.navigateToRoute('list');
    }

    editCallback() {
        const idEncoded = Base64Helper.encode(this.data.Id);
        this.router.navigateToRoute('edit', { id: idEncoded });
    }

    deleteCallback() {
        if (!confirm(`Hapus ${this.data.ExpenditureGoodNo}?`))
            return;

        this.service.delete(this.data)
            .then(() => this.cancelCallback())
            .catch(e => {
                this.error = e;
                alert(typeof this.error === 'string' ? this.error : 'Missing Some Data');
            });
    }
}
