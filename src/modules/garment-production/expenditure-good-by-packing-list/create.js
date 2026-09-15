import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { activationStrategy } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class Create {
    isCreate = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    activate() {
        this.isCreate = true;
    }

    bind() {
        this.data = { Items: [] };
        this.error = {};
    }

    determineActivationStrategy() {
        return activationStrategy.replace;
    }

    cancelCallback() {
        this.router.navigateToRoute('list');
    }

    _id(obj) {
        if (!obj) return 0;
        return obj.Id !== undefined ? obj.Id : (obj.id !== undefined ? obj.id : 0);
    }

    _value(obj, pascal, camel) {
        if (!obj) return null;
        if (obj[pascal] !== undefined && obj[pascal] !== null)
            return obj[pascal];
        return obj[camel];
    }


    _getSizeName(item) {
        return item.SizeName
            || (item.Size && (item.Size.Size || item.Size.size))
            || '-';
    }

    _getSizeId(item) {
        if (!item)
            return 0;

        if (item.Size)
            return Number(this._id(item.Size) || 0);

        return Number(item.SizeId || item.sizeId || 0);
    }

    _getUomId(item) {
        if (!item)
            return 0;

        if (item.Uom)
            return Number(this._id(item.Uom) || 0);

        return Number(item.UomId || item.uomId || 0);
    }

    _getPackingListGroupKey(item) {
        const packingListSizeId = Number(item.PackingListSizeId || 0);

        if (packingListSizeId)
            return `PLSIZE:${packingListSizeId}`;

        return `FALLBACK:${item.RONo || ''}:${this._getSizeId(item)}:${this._getUomId(item)}`;
    }


    _getOverRemainingGroups() {
        const groups = new Map();

        for (const item of this.data.Items || []) {
            if (!item || !item.FinishedGoodStockId)
                continue;

            const quantity = Number(item.Quantity || 0);
            if (quantity <= 0)
                continue;

            const key = this._getPackingListGroupKey(item);

            if (!groups.has(key)) {
                groups.set(key, {
                    Key: key,
                    PackingListSizeId: Number(item.PackingListSizeId || 0) || null,
                    RONo: item.RONo || '-',
                    SizeName: this._getSizeName(item),
                    RemainingQuantity: Number(item.RemainingQuantity || 0),
                    Quantity: 0
                });
            }

            groups.get(key).Quantity += quantity;
        }

        return Array.from(groups.values())
            .filter(group => group.Quantity > group.RemainingQuantity);
    }

    _getInvalidStockItems() {
        return (this.data.Items || []).filter(item => {
            if (!item || !item.FinishedGoodStockId)
                return false;

            const quantity = Number(item.Quantity || 0);
            const stockQuantity = Number(item.StockQuantity || 0);

            return quantity > stockQuantity;
        });
    }

    _buildOverRemainingMessage(groups) {
        const details = groups.map(group => {
            const over = group.Quantity - group.RemainingQuantity;

            return `RO ${group.RONo} size ${group.SizeName}`;
        }).join('\n');

        return (
            `Quantity melebihi sisa packing list:\n\n${details}` +
            `\n\nApakah Anda yakin ingin tetap melanjutkan?`
        );
    }

    _buildStockErrorMessage(items) {
        const details = items.map(item => {
            const quantity = Number(item.Quantity || 0);
            const stockQuantity = Number(item.StockQuantity || 0);

            return `RO ${item.RONo || '-'} Size ${this._getSizeName(item)} ` +
                `(${item.FinishedGoodStockNo || '-'}): ` +
                `Quantity Ambil ${quantity}, Quantity Stock ${stockQuantity}`;
        }).join('\n');

        return (
            `Quantity melebihi Stock:\n\n${details}` +
            `\n\nData tidak dapat disimpan.`
        );
    }

    _buildPayload() {
        const selectedItems = (this.data.Items || [])
            .filter(item =>
                item &&
                item.FinishedGoodStockId &&
                Number(item.Quantity || 0) > 0
            )
            .map(item => ({
                isSave: true,

                FinishedGoodStockId: item.FinishedGoodStockId,

                PackingListItemId: item.PackingListItemId || null,
                PackingListDetailId: item.PackingListDetailId || null,
                PackingListSizeId: item.PackingListSizeId || null,

                RONo: item.RONo,
                ContractNo: item.ContractNo,
                Article: item.Article,

                BuyerBrand: item.BuyerBrand ? {
                    Id: this._id(item.BuyerBrand),
                    Code: this._value(item.BuyerBrand, 'Code', 'code') || '',
                    Name: this._value(item.BuyerBrand, 'Name', 'name') || ''
                } : null,

                Comodity: item.Comodity ? {
                    Id: this._id(item.Comodity),
                    Code: this._value(item.Comodity, 'Code', 'code') || '',
                    Name: this._value(item.Comodity, 'Name', 'name') || ''
                } : null,
                Quantity: Number(item.Quantity || 0),
                Description: item.ItemDescription || ''
            }));

        return {
            Unit: this.data.Unit,
            Buyer: this.data.Buyer,
            ExpenditureType: this.data.ExpenditureType,
            ExpenditureDate: this.data.ExpenditureDate,
            Invoice: this.data.Invoice,
            InvoiceId: this.data.InvoiceId || 0,
            PackingListId: this.data.PackingListId,
            Carton: Number(this.data.Carton || 0),
            Description: this.data.Description || '',
            IsReceived: !!this.data.IsReceived,
            Items: selectedItems
        };
    }

    saveCallback() {
        if (!this.data.PackingListId) {
            alert('Packing List belum dipilih.');
            return;
        }

        const overRemainingGroups = this._getOverRemainingGroups();

        if (overRemainingGroups.length) {
            const confirmed = confirm(
                this._buildOverRemainingMessage(overRemainingGroups)
            );

            if (!confirmed)
                return;
        }

        const invalidStockItems = this._getInvalidStockItems();

        if (invalidStockItems.length) {
            alert(
                this._buildStockErrorMessage(invalidStockItems)
            );
            return;
        }

        const payload = this._buildPayload();

        if (!payload.Items.length) {
            alert('Isi Quantity minimal pada satu Items.');
            return;
        }

        payload.ExpenditureDate = payload.ExpenditureDate
            ? moment.utc(payload.ExpenditureDate).local().format()
            : null;

        console.log('Expenditure Good multi-RO payload:', payload);

        this.service.create(payload)
            .then(() => {
                alert('Data berhasil dibuat');
                this.router.navigateToRoute('create', {}, {
                    replace: true,
                    trigger: true
                });
            })
            .catch(e => {
                this.error = e;
                if (typeof this.error === 'string')
                    alert(this.error);
                else
                    alert('Missing Some Data');
            });
    }
}
