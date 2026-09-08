import { inject, bindable } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
import moment from "moment";
import { Base64Helper } from '../../../utils/base-64-coded-helper';


@inject(Router, Service)
export class List {

  columns = [
    { field: "Comodity.Name", title: "Komoditi" },
    { field: "Article", title: "Artikel" },
    { field: "RONo", title: "Nomor RO" },
    { field: "Unit.Name", title: "Nama Unit" },
    { field: "Size.Size", title: "Size" },
    { field: "Colour", title: "Warna" },
    { field: "Quantity", title: "Quantity", align: "right" },
    { field: "Uom.Unit", title: "Satuan" },
    { field: "WarehouseCode", title: "Kode Gudang" },
    { field: "Area", title: "Area" },
    { field: "LineCode", title: "Kode Line" },
    { field: "PalletCode", title: "Kode Pallet" },
  ];

  warehouseOptions =['','G01', 'G02'];
  areaOptions =['','A','B','C','D'];
  lineOptions =['','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17'];
  palletOptions =['','P01','P02','P03','P04','P05'];

  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  tableOptions = {
    showColumns: false,
    search: false,
    showToggle: false,
    sortable: false,
  };

  loader = (info) => {
    let params = {
      warehouse: this.warehouse ? this.warehouse : "",
      area: this.area ? this.area : "",
      line: this.line ? this.line : "",
      pallet: this.pallet ? this.pallet : "",
      ro: this.ro ? this.ro : "",
    };
    
    return this.flag
      ? this.service.search(params).then((result) => {
          return {
            data: result.data,
          };
        })
      : { data: [] };
  };

  search() {
    this.error = {};
    this.flag = true;
    this.tableList.refresh();
  }

  contextClickCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    const encoded = Base64Helper.encode(data.Id);
  }

  UnitItemChanged(newvalue) {
    if (newvalue) {
      this.pallet = newvalue;
    } else {
      this.pallet = null;
    }
  }

  ExportToExcel() {
    let args = {
      ro: this.ro ? this.ro : "",
      pallet: this.pallet ? this.pallet : "",
      warehouse: this.warehouse ? this.warehouse : "",
      area: this.area ? this.area : "",
      line: this.line ? this.line : "",
    };

    this.service.generateExcel(args);
  }

  reset() {
    this.ro = null;
    this.pallet = null;
    this.warehouse = null;
    this.area = null;
    this.line = null;
    this.pallet = null;
    this.ro = null;
    this.data = [];
    this.flag = false;
    this.tableList.refresh();
  }
}