import { inject, bindable, computedFrom } from "aurelia-framework";
import { Service } from "./service";

let ShippingAreaLoader = require("../../../loader/output-shipping-loader");
var DOSalesLoader = require("../../../loader/do-sales-loader");
@inject(Service)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable data;
  @bindable error;
  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah",
  };
  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 4,
    },
  };
  adjItemColumns = ["No. SPP", "Qty Order", "Jenis Order", "Material", "Unit", "Buyer", "Warna", "Motif", "Grade 1", "QTY Pack", "Satuan Pack", "Satuan", "QTY Satuan", "QTY Total", "No Dokumen"];
  itemColumns = [
    "No. SPP",
    "Buyer",
    "Material",
    "Unit",
    "Warna",
    "Motif",
    "Jenis",
    "Grade 1",
    "Grade 2",
    "Keterangan",
    "Qty Packing",
    "Packing",
    "Qty Keluar",
    "Berat (KG)"
  ];
  shifts = ["PAGI", "SIANG"];
  detailOptions = {};
  types = ["OUT", "ADJ"];
  destinationAreas = ["PENJUALAN", "BUYER", "INSPECTION MATERIAL", "TRANSIT", "PACKING", "GUDANG JADI"];
  areas = [
    "INSPECTION MATERIAL",
    "PROD",
    "TRANSIT",
    "PACK",
    "GUDANG JADI",
    "SHIPPING",
    "AWAL",
    "LAB",
  ];
  constructor(service) {
    this.service = service;
  }

  groups = ["A", "B"];

  doSalesQuery = { DOSalesCategory: "DYEINGPRINTING" };

  get shippingAreaLoader() {
    return ShippingAreaLoader;
  }

  get doSalesLoader() {
    return DOSalesLoader;
  }

  areaMovementTextFormatter = (areaInput) => {
    return `${areaInput.bonNo}`;
  };

  doTextFormatter = (deliveryOrder) => {
    return `${deliveryOrder.DOSalesNo}`;
  };

  @computedFrom("data.id")
  get isEdit() {
    return (this.data.id || "").toString() != "";
  }

  @computedFrom("data.type")
  get isAdj() {
    return this.data && this.data.type == "ADJ";
  }

  bind(context) {
    this.context = context;
    this.data = this.context.data;

    this.data.area = "SHIPPING";

    this.error = this.context.error;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;

    if (this.data.bonNo) {
      this.selectedShipping = {};
      this.selectedShipping.bonNo = this.data.bonNo;
    }
    if (this.data.destinationArea) {
      this.destinationArea = this.data.destinationArea;
    }

    if (this.destinationArea !== "BUYER") {

      this.isSales = true;
      if (this.readOnly) {
        this.itemColumns = [
          "No. SPP",
          "Buyer",
          "Material",
          "Unit",
          "Warna",
          "Motif",
          "Jenis",
          "Grade 1",
          "Grade 2",
          "Keterangan",
          "Qty Packing",
          "Packing",
          "Qty Keluar",
          "Berat (KG)"
        ];
      } else {
        if (this.isEdit) {
          this.itemColumns = [
            "No. SPP",
            "Buyer",
            "Material",
            "Unit",
            "Warna",
            "Motif",
            "Jenis",
            "Grade 1",
            "Grade 2",
            "Keterangan",
            "Qty Packing",
            "Packing",
            "Qty Keluar",
            "Berat (KG)",
            ""
          ];
        } else {
          this.itemColumns = [
            "No. SPP",
            "Buyer",
            "Material",
            "Unit",
            "Warna",
            "Motif",
            "Jenis",
            "Grade 1",
            "Grade 2",
            "Keterangan",
            "Qty Packing",
            "Packing",
            "Qty Keluar",
            "Berat (KG)"
          ];
        }
      }


    } else {

      this.isSales = false;
      if (this.readOnly) {
        this.itemColumns = [
          "No. SPP",
          "Buyer",
          "Material",
          "Unit",
          "Warna",
          "Motif",
          "Jenis",
          "Grade 1",
          "Grade 2",
          "Keterangan",
          "Qty Packing",
          "Packing",
          "Qty Keluar",
          "Berat (KG)",
          "SJ",
        ];
      } else {
        if (this.isEdit) {
          this.itemColumns = [
            "No. SPP",
            "Buyer",
            "Material",
            "Unit",
            "Warna",
            "Motif",
            "Jenis",
            "Grade 1",
            "Grade 2",
            "Keterangan",
            "Qty Packing",
            "Packing",
            "Qty Keluar",
            "Berat (KG)",
            "SJ",
            ""
          ];
        } else {
          this.itemColumns = [
            "No. SPP",
            "Buyer",
            "Material",
            "Unit",
            "Warna",
            "Motif",
            "Jenis",
            "Grade 1",
            "Grade 2",
            "Keterangan",
            "Qty Packing",
            "Packing",
            "Qty Keluar",
            "Berat (KG)",
            "SJ",
          ];
        }
      }


    }
    this.detailOptions = {
      isEdit: this.isEdit,
      isSales: this.isSales
    };

    if (this.data.type == "OUT") {
      if (this.data.shippingProductionOrders) {
        this.data.displayShippingProductionOrders = this.data.shippingProductionOrders;
      }
    } else {
      if (this.data.transitProductionOrders) {
        this.data.adjTransitProductionOrders = this.data.transitProductionOrders;

      }
      if (this.data.shippingProductionOrders) {
        this.data.adjShippingProductionOrders = this.data.shippingProductionOrders;
      }

    }

    if (this.data.deliveryOrder) {
      this.selectedDO = {};
      this.selectedDO.Id = this.data.deliveryOrder.id;
      this.selectedDO.DOSalesNo = this.data.deliveryOrder.no;
    }
  }
  addItemCallback = (e) => {
    this.data.adjShippingProductionOrders =
      this.data.adjShippingProductionOrders || [];
    this.data.adjShippingProductionOrders.push({});
  };

  @bindable selectedShipping;
  selectedShippingChanged(n, o) {
    if (this.selectedShipping) {
      this.data.inputShippingId = this.selectedShipping.id;
      if (this.selectedShipping.shippingProductionOrders) {
        this.data.displayShippingProductionOrders = this.selectedShipping.shippingProductionOrders.filter(
          (s) => !s.hasNextAreaDocument
        );
        this.data.bonNo = this.selectedShipping.bonNo;
        this.data.deliveryOrder = this.selectedShipping.deliveryOrder;
        this.data.inputShippingId == this.selectedShipping.id;
      }
    }
  }
  shippingQuery = {
    DestinationArea: "PENJUALAN",
  };
  @bindable selectedDO;
  async selectedDOChanged(n, o) {
    if (this.selectedDO) {
      this.data.deliveryOrder = {};
      this.data.deliveryOrder.id = this.selectedDO.Id;
      this.data.deliveryOrder.no = this.selectedDO.DOSalesNo;
      if (!this.isEdit && this.selectedDO.Id)
        this.data.displayShippingProductionOrders = await this.service.getProductionOrderFromInput(
          this.selectedDO.Id
        );
    }
  }

  @bindable destinationArea;
  destinationAreaChanged(n, o) {
    if (this.destinationArea) {
      this.data.destinationArea = this.destinationArea;
      if (this.destinationArea !== "BUYER") {

        this.isSales = true;
        if (this.readOnly) {
          this.itemColumns = [
            "No. SPP",
            "Buyer",
            "Material",
            "Unit",
            "Warna",
            "Motif",
            "Jenis",
            "Grade 1",
            "Grade 2",
            "Keterangan",
            "Qty Packing",
            "Packing",
            "Qty Keluar",
            "Berat (KG)"
          ];
        } else {
          if (this.isEdit) {
            this.itemColumns = [
              "No. SPP",
              "Buyer",
              "Material",
              "Unit",
              "Warna",
              "Motif",
              "Jenis",
              "Grade 1",
              "Grade 2",
              "Keterangan",
              "Qty Packing",
              "Packing",
              "Qty Keluar",
              "Berat (KG)",
              ""
            ];
          } else {
            this.itemColumns = [
              "No. SPP",
              "Buyer",
              "Material",
              "Unit",
              "Warna",
              "Motif",
              "Jenis",
              "Grade 1",
              "Grade 2",
              "Keterangan",
              "Qty Packing",
              "Packing",
              "Qty Keluar",
              "Berat (KG)"
            ];
          }
        }


      } else {

        this.isSales = false;
        if (this.readOnly) {
          this.itemColumns = [
            "No. SPP",
            "Buyer",
            "Material",
            "Unit",
            "Warna",
            "Motif",
            "Jenis",
            "Grade 1",
            "Grade 2",
            "Keterangan",
            "Qty Packing",
            "Packing",
            "Qty Keluar",
            "Berat (KG)",
            "SJ",
          ];
        } else {
          if (this.isEdit) {
            this.itemColumns = [
              "No. SPP",
              "Buyer",
              "Material",
              "Unit",
              "Warna",
              "Motif",
              "Jenis",
              "Grade 1",
              "Grade 2",
              "Keterangan",
              "Qty Packing",
              "Packing",
              "Qty Keluar",
              "Berat (KG)",
              "SJ",
              ""
            ];
          } else {
            this.itemColumns = [
              "No. SPP",
              "Buyer",
              "Material",
              "Unit",
              "Warna",
              "Motif",
              "Jenis",
              "Grade 1",
              "Grade 2",
              "Keterangan",
              "Qty Packing",
              "Packing",
              "Qty Keluar",
              "Berat (KG)",
              "SJ",
            ];
          }
        }


      }
      this.detailOptions.isSales = this.isSales;
      if (!this.data.id) {
        this.selectedShipping = null;
        this.data.deliveryOrder = null;
        this.selectedDO = null;
        this.data.bonNo = null;
        this.data.inputShippingId = 0;
        this.data.displayShippingProductionOrders = [];
      }
    }
  }

  ExportToExcel() {
    this.service.generateExcel(this.data.id);
  }
}
