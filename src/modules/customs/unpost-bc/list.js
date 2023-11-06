import { inject, bindable } from "aurelia-framework";
import { Service } from "./service";

import moment from "moment";

@inject(Service)
export class List {
  @bindable data = [];
  constructor(service) {
    this.service = service;
    this.error = {};
  }

  JenisItems = ["TPB", "PEB"];
  SearchByItems = ["Nomor Aju", "Nomor Daftar"];

  bind(context) {
    this.context = context;
  }

  attached() {}

  activate() {}

  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 4,
    },
  };

  async searching() {
    let args = {
      jenis: this.jenis ? this.jenis : "",
      type: this.type ? this.type : "",
      nomor: this.nomor ? this.nomor : "",
    };

    await this.service.search(args).then((result) => {
      var datas = [];
      for (var _data of result.data) {
        datas.push(_data);
      }
      this.data = datas;
    });

    this.fillTable();
  }

  fillTable() {
    let columns = [];
    columns.push({
      field: "isEdit",
      title: "",
      checkbox: true,
      sortable: false,
      width: 20,
    });

    columns.push({
      field: "TglBCNo",
      title: "Tgl Daftar",
      formatter: (value) => moment(value).format("DD MMM YYYY"),
    });
    columns.push({ field: "BCNo", title: "No Daftar", width: 200 });
    columns.push({ field: "JenisBC", title: "Jenis BC" });
    columns.push({ field: "NoAju", title: "No Aju" });
    columns.push({ field: "CreatedBy", title: "Di Posting Oleh" });

    var bootstrapTableOptions = {
      columns: columns,
      data: this.data,
      fixedColumns: false,
      fixedNumber: 1,
    };

    $(this.tableData)
      .bootstrapTable("destroy")
      .bootstrapTable(bootstrapTableOptions);
  }

  delete() {
    var dataToDelete = [];
    this.data.forEach((s) => {
      if (s.isEdit) {
        s.Jenis = this.jenis;
        dataToDelete.push(s);
      }
    });

    this.data = dataToDelete;

    this.service
      .delete(this.data)
      .then((result) => {
        alert("Data Berhasil Di Unpost");
        this.searching();
      })
      .catch((e) => {
        this.error = e;
      });
  }

  reset() {
    this.jenis = "TPB";
    this.type = "Nomor Aju";
    this.nomor = null;
  }

  get isDisable() {
    var valid = true;
    if (this.data.length > 0) {
      for (var item of this.data) {
        if (item.isEdit) {
          valid = false;
        }
      }
    }
    return valid;
  }
}
