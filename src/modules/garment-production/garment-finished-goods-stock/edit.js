import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { Base64Helper } from '../../../utils/base-64-coded-helper';

@inject(Router, Service)
export class Edit {
  hasCancel = true;
  hasSave = true;
  hasView = false;
  isEdit = true;
  hasCreate = false;

  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  bind() {
    this.error = {};
    this.checkedAll = true;
  }

  async activate(params) {
    const ro = Base64Helper.decode(params.ro);
    const result = await this.service.getByRONo(ro);
    const stockItems = Array.isArray(result) ? result : [];
    const first = stockItems[0] || {};
    this.data = {
      Id: first.Id || 0,
      RONo: first.RONo || '',
      UnitName: first.Unit ? first.Unit.Name : '',
      ComodityName: first.Comodity ? first.Comodity.Name : '',
      Article: first.Article || '',
      Quantity: stockItems.reduce(
        (sum, item) => sum + (parseFloat(item.Quantity) || 0),
        0
      ),
      UomUnit: first.Uom ? first.Uom.Unit : '',
      Items: stockItems.map(item => {
        const stockQuantity = parseFloat(item.Quantity) || 0;

        return {
          Id: item.Id,
          SourceId: item.Id,
          FinishedGoodStockNo: item.FinishedGoodStockNo,
          Size: item.Size ? item.Size.Size : '',
          Colour: item.Colour || '',
          StockQuantity: stockQuantity,
          IsShowing: false,
          Details: [
            {
              Id: item.Id,
              SourceId: item.Id,
              FinishedGoodStockNo: item.FinishedGoodStockNo,
              Colour: item.Colour || '',
              Quantity: stockQuantity,
              Box: item.Box || '',
              Rack: item.Rack || '',
              StockQuantity: stockQuantity,
              IsSplitChild: false
            }
          ]
        };
      }),
      isEdit: true
    };
  }

  cancel() {
    this.router.navigateToRoute('list');
  }

  validate() {
    let isValid = true;
    const nextError = { Items: [] };

    if (!this.data || !Array.isArray(this.data.Items)) {
      this.error = nextError;
      return true;
    }

    this.data.Items.forEach((item, itemIndex) => {
      const itemError = {
        Details: []
      };

      const details = Array.isArray(item.Details) ? item.Details : [];

      if (details.length === 0) {
        itemError.DetailsCount = 'Minimal harus ada satu detail untuk setiap size';
        isValid = false;
      }

      let detailTotal = 0;

      details.forEach((detail, detailIndex) => {
        const detailError = {};
        const quantity = parseFloat(detail.Quantity) || 0;

        if (!detail.Box || !detail.Box.trim()) {
          detailError.Box = 'Box harus diisi';
          isValid = false;
        }

        if (!detail.Rack || !detail.Rack.trim()) {
          detailError.Rack = 'Rack harus diisi';
          isValid = false;
        }

        if (quantity <= 0) {
          detailError.Quantity = 'Quantity harus lebih dari 0';
          isValid = false;
        }

        detailTotal += quantity;
        itemError.Details[detailIndex] = detailError;
      });

      const stockQuantity = parseFloat(item.StockQuantity) || 0;

      if (Math.abs(detailTotal - stockQuantity) > 0.0001) {
        itemError.DetailsCount =
          `Total split Size ${item.Size || '-'} harus sama dengan Stock Quantity ${stockQuantity}`;
        isValid = false;
      }

      nextError.Items[itemIndex] = itemError;
    });

    this.error = nextError;
    return isValid;
  }

  buildPayload() {
    const payload = Object.assign({}, this.data);
    payload.Items = [];

    const parents = Array.isArray(this.data.Items)
      ? this.data.Items
      : [];
    parents.forEach(parent => {
      const details = Array.isArray(parent.Details)
        ? parent.Details
        : [];

      details.forEach(detail => {
        payload.Items.push({
          Id: detail.Id,
          SourceId: detail.SourceId || parent.SourceId || parent.Id,
          FinishedGoodStockNo:detail.FinishedGoodStockNo || parent.FinishedGoodStockNo,
          Size: parent.Size,
          Colour: parent.Colour || '',
          Quantity: parseFloat(detail.Quantity) || 0,
          Box: detail.Box || '',
          Rack: detail.Rack || '',     
          IsSplitChild: !!detail.IsSplitChild
        });
      });
    });

    return payload;
  }

  save() {
    if (!this.validate()) {
      return;
    }
    const payload = this.buildPayload();
    const itemQuantitySum = payload.Items.reduce(
      (sum, item) => sum + (parseFloat(item.Quantity) || 0),
      0
    );
    const headerQuantity = parseFloat(this.data.Quantity) || 0;
    if (Math.abs(headerQuantity - itemQuantitySum) > 0.0001) {
      alert('Jumlah Quantity Item harus sama dengan Quantity Sebelumnya');
      return;
    }

    this.service
      .update(payload)
      .then(() => {
        alert('Data berhasil diubah');
        this.router.navigateToRoute('list');
      })
      .catch(error => {
        this.error = error;
      });
  }
}
