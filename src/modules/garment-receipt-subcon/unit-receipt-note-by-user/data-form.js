import {
  inject,
  bindable,
  BindingEngine,
  observable,
  computedFrom,
} from "aurelia-framework";
import { Service } from "./service";
// var UnitLoader = require('../../../loader/unit-loader');
var SupplierLoader = require("../../../loader/garment-supplier-loader");
var UnitLoader = require("../../../loader/garment-units-loader");
var DeliveryOrderLoader = require("../../../loader/garment-subcon-delivery-order-for-unit-receipt-note-loader");
var DeliveryReturnLoader = require("../../../loader/garment-delivery-retur-loader");

var moment = require("moment");

@inject(Service, BindingEngine, Element)
export class DataForm {
  @bindable readOnly = false;
  @bindable data = {};
  @bindable error = {};
  @bindable title;
  @bindable unit;
  @bindable supplier;
  @bindable deliveryOrder;
  @bindable storage;
  @bindable deliveryReturn;
  @bindable URNType;
  @bindable expenditure;
  @bindable category;
  @bindable uen;
  @bindable options = {};

  typeOptions = ["TERIMA SUBCON", "PROSES"];

  filterDR = {
    IsUsed: false,
  };

  constructor(service, bindingEngine, element) {
    this.service = service;
    this.bindingEngine = bindingEngine;
    this.element = element;

    this.auInputOptions = {
      label: {
        length: 4,
        align: "right",
      },
      control: {
        length: 5,
      },
    };

    this.deliveryOrderItem = {
      columns: [
        { header: "No PO" },
        { header: "Barang" },
        { header: "Lokasi" },
        { header: "Qty SJ" },
        { header: "Qty Terima" },
        { header: "Satuan SJ" },
        { header: "Konversi" },
        { header: "Qty Kecil" },
        { header: "Qty Kecil" },
        { header: "Keterangan" },
        { header: "Design/Color" },
      ],
      onRemove: function () {
        this.bind();
      },
    };

    this.deliveryReturnItemFabric = {
      columns: [
        { header: "Kode Barang" },
        { header: "Nama Barang" },
        { header: "Keterangan Barang" },
        { header: "RO Asal" },
        { header: "Jumlah" },
        { header: "Satuan" },
        { header: "Design/Color" },
        { header: "Warna" },
        { header: "Rak" },
        { header: "Box" },
        { header: "Level" },
        { header: "Area" },
      ],
      onRemove: function () {
        this.bind();
      },
    };

    this.deliveryReturnItem = {
      columns: [
        { header: "Kode Barang" },
        { header: "Nama Barang" },
        { header: "Keterangan Barang" },
        { header: "RO Asal" },
        { header: "Jumlah" },
        { header: "Satuan" },
        { header: "Design/Color" },
      ],
      onRemove: function () {
        this.bind();
      },
    };
  }

  @computedFrom("data.Id")
  get isEdit() {
    return (this.data.Id || "").toString() != "";
  }

  @computedFrom("data.Supplier", "data.Unit")
  get filter() {
    var filter = {};
    if (this.data.Supplier) {
      filter.SupplierId = this.data.Supplier.Id;
    }

    return filter;
  }

  @computedFrom("data.Unit")
  get filterUnit() {
    var storageFilter = {};
    if (this.data.Unit) {
      storageFilter.UnitName = this.data.Unit.Name;
    }

    return storageFilter;
  }

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;
    if (!this.readOnly && !this.isEdit) {
      this.deliveryOrderItem.columns.push({ header: "" });
    }
    if (this.data.URNType == "PROSES") {
      this.isProcess = true;
    } else {
      this.isProcess = false;
    }
  }

  supplierChanged(newValue, oldValue) {
    var selectedSupplier = newValue;

    if (selectedSupplier) {
      this.data.Supplier = selectedSupplier;
    } else {
      this.data.Supplier = null;
    }

    this.resetErrorDeliveryOrder();
    this.context.deliveryOrderAU.editorValue = "";
    this.data.DOId = null;
    this.storage = null;
    // this.data.IsStorage = false;
    this.data.Storage = null;
  }

  unitChanged(newValue, oldValue) {
    var selectedUnit = newValue;

    if (selectedUnit) {
      this.data.Unit = selectedUnit;
      this.options.Unit = this.data.selectedUnit;
    } else {
      this.data.Unit = null;
    }

    this.resetErrorDeliveryOrder();
    this.context.deliveryOrderAU.editorValue = "";
    this.data.DOId = null;
    this.storage = null;
    this.data.Storage = null;
    // this.data.IsStorage = false;
  }

  async deliveryReturnChanged(newValue, oldValue) {
    var selectedDR = newValue;
    this.data.UnitFrom = null;
    this.data.StorageFrom = null;
    if (selectedDR) {
      this.data.ReturnDate = selectedDR.ReturnDate;
      this.data.Unit = selectedDR.Unit;
      this.unit = selectedDR.Unit;
      this.Storage = selectedDR.Storage.Name;
      this.data.Unit = selectedDR.Unit;
      this.data.ReturnType = selectedDR.ReturnType;
      this.data.UnitDONo = selectedDR.UnitDONo;
      this.data.DRId = selectedDR.Id;
      this.data.DRNo = selectedDR.DRNo;
      this.data.Article = selectedDR.Article;
      this.data.RONo = selectedDR.RONo;
      this.data.Storage = selectedDR.Storage;
      this.data.Storage = {
        _id: selectedDR.Storage.Id,
        name: selectedDR.Storage.Name,
        code: selectedDR.Storage.Code,
      };
      // this.data.Items=[];
      var DRItems = [];
      var UnitDO = await this.service.getUnitDOById(selectedDR.UnitDOId);

      var OldUnitDO = {};
      if (UnitDO.UnitDOFromId) {
        OldUnitDO = await this.service.getUnitDOById(UnitDO.UnitDOFromId);

        this.data.UnitFrom = OldUnitDO.UnitSender;
        this.data.StorageFrom = OldUnitDO.Storage;

        this.data.UnitSender = OldUnitDO.UnitRequest.Name;
        this.data.StorageSender = OldUnitDO.StorageRequest.name;
      }

      for (var dritem of selectedDR.Items) {
        var dup = UnitDO.Items.find((a) => a.Id == dritem.UnitDOItemId);
        var DRItem = {};
        if (dup) {
          var oldURN = await this.service.getById(dup.URNId);
          if (oldURN.URNType == "GUDANG LAIN") {
            this.isDiffStorage = true;
          }
          var same = oldURN.Items.find((a) => a.Id == dup.URNItemId);
          if (same) {
            DRItem.DRId = dritem.DRId;
            DRItem.DesignColor = dritem.DesignColor;
            DRItem.DRItemId = dritem.Id;
            DRItem.UENItemId = dritem.UENItemId;
            DRItem.UnitDOItemId = dritem.UnitDOItemId;
            DRItem.PricePerDealUnit = same.PricePerDealUnit;
            DRItem.SmallUom = dritem.Uom;
            DRItem.SmallQuantityE = dritem.Quantity;
            DRItem.SmallQuantity = DRItem.SmallQuantityE;
            DRItem.Product = dritem.Product;
            DRItem.Product.Remark = dup.ProductRemark;
            DRItem.Article = same.Article;
            DRItem.Conversion = parseFloat(same.Conversion);
            DRItem.EPOItemId = dup.EPOItemId;
            DRItem.PRId = same.PRId;
            DRItem.PRNo = same.PRNo;
            DRItem.DODetailId = dup.DODetailId;
            DRItem.POItemId = dup.POItemId;
            DRItem.POSerialNumber = dup.POSerialNumber;
            DRItem.PRItemId = dup.PRItemId;
            DRItem.POId = same.POId;
            DRItem.Uom = same.Uom;
            DRItem.Quantity = DRItem.SmallQuantity / DRItem.Conversion;
            DRItem.RONo = dritem.RONo;
            DRItem.ReceiptQuantity = DRItem.SmallQuantity / DRItem.Conversion;
            DRItem.ReceiptCorrection = DRItem.SmallQuantity / DRItem.Conversion;
            DRItem.OrderQuantity = 0;
            DRItem.DOCurrencyRate = dup.DOCurrency.Rate;
            (DRItem.Rack = dritem.Rack),
              (DRItem.Level = dritem.Level),
              (DRItem.Box = dritem.Box),
              (DRItem.Colour = dritem.Colour),
              (DRItem.Area = dritem.Area),
              DRItems.push(DRItem);
          }
        }
      }
      this.data.DRItems = DRItems;
    } else {
      this.deliveryOrder = null;
      this.unit = null;
      this.storage = null;
      this.data.Storage = null;
      this.data.ReturnDate = null;
      this.data.ReturnType = "";
      this.data.Unit = null;
      this.data.UnitDONo = "";
      this.data.DRId = null;
      this.data.DRNo = "";
      this.data.Article = "";
      this.data.RONo = "";
      this.supplier = null;
      this.data.UnitFrom = null;
      this.data.StorageFrom = null;
    }
  }

  URNTypeChanged(newValue) {
    this.data.URNType = newValue;
    if (this.data.URNType == "PROSES") {
      this.isProcess = true;
      this.deliveryOrder = null;
      this.unit = null;
      this.storage = null;
      this.data.Storage = null;
      this.data.ReturnDate = null;
      this.data.ReturnType = "";
      this.data.Unit = null;
      this.data.UnitDONo = "";
      this.data.DRId = null;
      this.data.DRNo = "";
      this.data.Article = "";
      this.data.RONo = "";
      this.supplier = null;
      this.data.UnitFrom = null;
      this.data.StorageFrom = null;
      this.data.ExpenditureId = null;
      this.data.ExpenditureNo = "";
      this.data.Category = "";
      if (this.data.Items) {
        this.data.Items.splice(0);
      }
    } else {
      this.isProcess = false;
      this.deliveryReturn = null;
      this.unit = null;
      this.storage = null;
      this.data.Storage = null;
      this.deliveryOrder = null;
      this.data.ReturnType = "";
      this.unit = null;
      this.storage = null;
      this.data.Storage = null;
      this.data.ReturnDate = null;
      this.data.Unit = null;
      this.data.UnitDONo = "";
      this.data.DRId = null;
      this.data.DRNo = "";
      this.data.Article = "";
      this.data.RONo = "";
      this.data.UnitFrom = null;
      this.data.StorageFrom = null;
      this.data.ExpenditureId = null;
      this.data.ExpenditureNo = "";
      this.data.Category = "";
      if (this.data.Items) {
        this.data.Items.splice(0);
      }
    }
  }

  deliveryOrderChanged(newValue, oldValue) {
    var selectedDo = newValue;
    if (selectedDo) {
      this.data.DOId = selectedDo.Id;
      this.data.DONo = selectedDo.doNo;
      this.data.Article = selectedDo.article;
      this.data.RONo = selectedDo.roNo;
      this.data.BeacukaiNo = selectedDo.beacukaiNo;
      this.data.BeacukaiDate = selectedDo.beacukaiDate;
      this.data.BeacukaiType = selectedDo.beacukaiType;

      var selectedItem = selectedDo.items || [];
      var _items = [];
      for (var item of selectedItem) {
        var _item = {};

        _item.DOItemId = item.Id;
        _item.POSerialNumber = item.POSerialNumber;
        _item.Product = item.Product;
        _item.Uom = item.Uom;
        _item.PricePerDealUnit = item.PricePerDealUnit;
        _item.DOQuantity = item.DOQuantity;
        _item.Unit = this.data.Unit;
        _items.push(_item);
      }
      this.data.Items = _items;
    } else {
      this.data.DOId = null;
      this.data.Items = [];
    }
    this.resetErrorItems();
    this.data.Storage = null;
    this.storage = null;
    // this.data.IsStorage = false;
  }

  storageChanged(newValue) {
    var selectedStorage = newValue;
    if (selectedStorage) {
      if (selectedStorage._id) {
        this.data.Storage = selectedStorage;
      } else {
        this.storage = null;
        this.data.Storage = null;
      }
    } else {
      this.storage = null;
      this.data.Storage = undefined;
    }
  }

  resetErrorDeliveryOrder() {
    if (this.error) {
      if (this.error.DeliveryOrder) {
        this.error.DeliveryOrder = null;
      }
      if (this.error.Storage) {
        this.error.Storage = null;
      }
    }
  }

  resetErrorItems() {
    if (this.error) {
      if (this.error.Storage) {
        this.error.Storage = null;
      }
      if (this.error.Items) {
        this.error.Items = null;
      }
    }
  }

  get unitLoader() {
    return UnitLoader;
  }

  get supplierLoader() {
    return SupplierLoader;
  }

  get deliveryOrderLoader() {
    return DeliveryOrderLoader;
  }

  unitView = (unit) => {
    return `${unit.Code} - ${unit.Name}`;
  };

  supplierView = (supplier) => {
    return `${supplier.code} - ${supplier.name}`;
  };

  get deliveryReturnLoader() {
    return DeliveryReturnLoader;
  }
}
