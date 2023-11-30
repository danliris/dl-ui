import { inject, bindable, computedFrom } from "aurelia-framework";

import { GarmentProductionService } from "../service";

@inject(GarmentProductionService)
export class Detail {
  @bindable selectedSize;
  constructor(garmentProductionService) {
    this.garmentProductionService = garmentProductionService;
  }

  activate(context) {
    this.context = context;
    this.items = context.context.items;
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    this.readOnly = this.options.readOnly;

    this.isCreate = context.context.options.isCreate;
    this.isEdit = context.context.options.isEdit;
    this.selecetedSize = context.context.options.item;

    this.itemOptions = {
      error: this.error,
      isCreate: this.isCreate,
      readOnly: this.readOnly,
      isEdit: this.isEdit,
    };

    if (this.data.size) {
      this.selectedSize = {
        size: this.data.size,
      };
    }

    this.selectSize = [];
    this.selecetedSize.details.forEach((detail) => {
      detail.sizes
        .filter((x) => x.packingOutItemId != undefined)
        .forEach((s) => this.selectSize.push(s));
    });
  }

  get sizeLoader() {
    return (keyword) => {
      var info = {
        // keyword: keyword,
        filter: JSON.stringify({
          PackingOutNo: this.data.packingOutNo,
          IsReceived: false,
        }),
      };

      return this.garmentProductionService
        .getPackingOutByNo(info)
        .then((result) => {
          var noList = [];

          for (var header of result.data) {
            for (var item of header.Items) {
              var itemData = {};
              itemData.packingOutItemId = item.Id;
              itemData.size = item.Size;
              itemData.quantity = item.Quantity;
              itemData.color = item.Description;

              var selected = this.items.find(
                (x) => x.data.packingOutItemId == item.Id
              );

              var selected2 = this.selectSize.find(
                (x) => x.packingOutItemId == item.Id
              );

              if (!selected && !selected2) {
                noList.push(itemData);
              }
            }
          }

          return noList;
        });
    };
  }

  sizeView = (size) => {
    var sizeName = size.size.Size || size.size.size;
    // var sizeName = size.SizeName;
    return `${sizeName}`;
  };

  selectedSizeChanged(newValue) {
    if (newValue) {
      this.data.color = newValue.color;
      this.data.quantity = newValue.quantity;
      this.data.packingOutItemId = newValue.packingOutItemId;
      this.data.size = newValue.size;
    }
  }
}
