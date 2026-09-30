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
    this.selectedItem = context.context.options.item;

    this.itemOptions = {
      error: this.error,
      isCreate: this.isCreate,
      readOnly: this.readOnly,
      isEdit: this.isEdit,
    };

     if (this.data.size) {
      this.selectedSize = {
        size: this.data.size,
        quantity: this.data.quantity,
        color: this.data.color,
        packingOutItemId: this.data.packingOutItemId,
      };
    }

    this.selectSize = [];
    if (this.selectedItem && this.selectedItem.details) {
      this.selectedItem.details.forEach((detail) => {
        if (detail.sizes) {
          detail.sizes
            .filter(
              (x) =>
                x.packingOutItemId != undefined &&
                x.packingOutItemId != null
            )
            .forEach((s) => {
              this.selectSize.push(s);
            });
        }
      });
    }

    console.log("items:", this.items);
    console.log("selectedItem:", this.selectedItem);
    console.log("data:", this.data);
    console.log("selectedSize:", this.selectedSize);
    console.log("selectSize:", this.selectSize);
  }

  get sizeLoader() {
    return (keyword) => {
      var info = {
        filter: JSON.stringify({
          PackingOutNo: this.data.packingOutNo,
          IsReceived: false,
        }),
      };

      var noList = [];

      return this.garmentProductionService
        .getPackingOutByNo(info)
        .then((result) => {
          var selectedIds = [];
          this.items.forEach((x) => {
            if ( x.data && x.data.packingOutItemId != undefined && x.data.packingOutItemId != null ) {

              if (
                this.isEdit &&
                this.data.packingOutItemId == x.data.packingOutItemId
              ) {
                return;
              }

              selectedIds.push(x.data.packingOutItemId);
            }
          });

          this.selectSize.forEach((x) => {
            if (
              x.packingOutItemId != undefined &&
              x.packingOutItemId != null
            ) {
              
              if (
                this.isEdit &&
                this.data.packingOutItemId == x.packingOutItemId
              ) {
                return;
              }

              selectedIds.push(x.packingOutItemId);
            }
          });

          /*
           * Hilangkan duplicate ID
           */
          selectedIds = selectedIds.filter(
            (value, index, self) => self.indexOf(value) === index
          );

          console.log("selectedIds:", selectedIds);

          /*
           * =========================================================
           * 3. Ambil data dari Packing Out
           * =========================================================
           */
          for (var header of result.data || []) {
            for (var item of header.Items || []) {
              console.log("Packing Out Item:", item);

              /*
               * Size sudah digunakan -> jangan tampilkan
               */
              if (selectedIds.indexOf(item.Id) !== -1) {
                continue;
              }

              var itemData = {};

              itemData.packingOutItemId = item.Id;
              itemData.size = item.Size;
              itemData.quantity = item.Quantity;
              itemData.color = item.Description;

              noList.push(itemData);
            }
          }

          console.log("size list:", noList);

          return noList;
        });
    };
  }

  sizeView = (size) => {
    if (!size) {
      return "";
    }
    if (size.size != undefined && size.size != null) {
      if (typeof size.size === "string") {
        return size.size;
      }
      if (typeof size.size === "object") {
        return size.size.Size || size.size.size || "";
      }
    }

    if (size.Size != undefined && size.Size != null) {
      return size.Size;
    }

    return "";
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
