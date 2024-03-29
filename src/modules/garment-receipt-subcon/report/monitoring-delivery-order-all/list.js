import { inject } from "aurelia-framework";
import { Service } from "./service";

import moment from "moment";

@inject(Service)
export class List {
  constructor(service) {
    this.service = service;

    this.flag = false;

    this.today = new Date();
    this.error = {};
  }

  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 4,
    },
  };

  tableOptions = {
    search: false,
    showToggle: false,
    showColumns: false,
  };
  // attached() {
  // }

  // activate() {

  // }

  columns = [
    { field: "index", title: "No", sortable: false },
    { field: "no", title: "Nomor Surat Jalan", sortable: false },
    {
      field: "doDate",
      title: "Tanggal Surat Jalan",
      sortable: false,
      formatter: function (value, data, index) {
        return moment(value).format("DD MMM YYYY");
      },
    },
    {
      field: "arrivalDate",
      title: "Tanggal Tiba",
      sortable: false,
      formatter: function (value, data, index) {
        return moment(value).format("DD MMM YYYY");
      },
    },
    // { field: "supplierName", title: "Nama Supplier", sortable: false },
    // {
    //   field: "shipmentType",
    //   title: "Jenis Supplier",
    //   sortable: false,
    //   formatter: function (value, data) {
    //     return value == "" ? "Local" : "Import";
    //   },
    // },
    // { field: "shipmentType", title: "Pengiriman", sortable: false },
    // { field: "shipmentNo", title: "No BL/AWB", sortable: false },
    // { field: "isCustoms", title: "Dikenakan Beacukai", sortable: false , formatter: function (value, data) {

    //         return (value)==true? "Ya" : "Tidak";
    //     } },
    // { field: "ePONo", title: "No PO Eksternal", sortable: false },
    // // { field: "prNo", title: "Nomor PR", sortable: false },
    // { field: "prRefNo", title: "Nomor Referensi PR", sortable: false },
    { field: "roNo", title: "Nomor RO", sortable: false },
    { field: "poNo", title: "Nomor PO", sortable: false },
    { field: "productCode", title: "Kode Barang", sortable: false },
    { field: "productName", title: "Nama Barang", sortable: false },
    // {
    //   field: "dealQuantity",
    //   title: "Jumlah Dipesan",
    //   sortable: false,
    //   formatter: (value, data) => {
    //     return value.toLocaleString("en-EN", { minimumFractionDigits: 2 });
    //   },
    // },
    {
      field: "dOQuantity",
      title: "Jumlah Diterima",
      sortable: false,
      formatter: (value, data) => {
        return value.toLocaleString("en-EN", { minimumFractionDigits: 2 });
      },
    },
    { field: "doUom", title: "Satuan", sortable: false },
    // { field: "price", title: "Harga", sortable: false },
    // { field: "doCurrencyCode", title: "Mata Uang", sortable: false },
    // { field: "doCurrencyRate", title: "Rate", sortable: false },
    // { field: "productRemark", title: "Keterangan", sortable: false },
    // { field: "createdBy", title: "Staff Pembelian", sortable: false },
    // { field: "EPOcreatedBy", title: "Staff Pembelian (P/O)", sortable: false },
    { field: "BeacukaiNo", title: "No BC", sortable: false },
    { field: "BeacukaiType", title: "Tipe BC", sortable: false },
    // {
    //   field: "BCDate",
    //   title: "Tanggal BC",
    //   sortable: false,
    //   formatter: function (value, data, index) {
    //     if (moment(value).format("DD MMM YYYY") == "01 Jan 1970") return "-";
    //     else return moment(value).format("DD MMM YYYY");
    //   },
    // },
    {
      field: "BeacukaiDate",
      title: "Tanggal Input BC",
      sortable: false,
      formatter: function (value, data, index) {
        if (moment(value).format("DD MMM YYYY") == "01 Jan 0001") return "-";
        else return moment(value).format("DD MMM YYYY");
      },
    },
    // { field: "BillNo", title: "No BP Besar", sortable: false },
    // { field: "PaymentBill", title: "No BP Kecil", sortable: false },
    { field: "URNNo", title: "Nomor BUM", sortable: false },
    {
      field: "URNDate",
      title: "Tanggal BUM",
      sortable: false,
      formatter: function (value, data, index) {
        if (moment(value).format("DD MMM YYYY") == "01 Jan 1970") return "-";
        else return moment(value).format("DD MMM YYYY");
      },
    },
    {
      field: "urnQuantity",
      title: "Qty",
      sortable: false,
      formatter: (value, data) => {
        return value.toLocaleString("en-EN", { minimumFractionDigits: 2 });
      },
    },
    { field: "urnUom", title: "Satuan", sortable: false },

    { field: "UDONo", title: "Nomor Unit DO", sortable: false },
    {
      field: "UDODate",
      title: "Tanggal Unit DO",
      sortable: false,
      formatter: function (value, data, index) {
        if (moment(value).format("DD MMM YYYY") == "01 Jan 1970") return "-";
        else return moment(value).format("DD MMM YYYY");
      },
    },
    {
      field: "udoQuantity",
      title: "Qty",
      sortable: false,
      formatter: (value, data) => {
        return value.toLocaleString("en-EN", { minimumFractionDigits: 2 });
      },
    },
    { field: "udoUom", title: "Satuan", sortable: false },

    { field: "UENNo", title: "Nomor BUK", sortable: false },
    {
      field: "UENDate",
      title: "Tanggal BUK",
      sortable: false,
      formatter: function (value, data, index) {
        if (moment(value).format("DD MMM YYYY") == "01 Jan 1970") return "-";
        else return moment(value).format("DD MMM YYYY");
      },
    },
    {
      field: "uenQuantity",
      title: "Qty",
      sortable: false,
      formatter: (value, data) => {
        return value.toLocaleString("en-EN", { minimumFractionDigits: 2 });
      },
    },
    { field: "uenUom", title: "Satuan", sortable: false },
  ];

  search() {
    this.error = {};

    if (Object.getOwnPropertyNames(this.error).length === 0) {
      this.flag = true;
      this.doTable.refresh();
    }
  }

  reset() {
    this.no = null;

    this.dateFrom = undefined;
    this.dateTo = undefined;
    this.purchaseOrderExternal = null;
  }

  loader = (info) => {
    var order = {};

    if (info.sort) order[info.sort] = info.order;

    let args = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      no: this.no ? this.no.DONo : "",
      dateTo: this.dateTo ? moment(this.dateTo).format("MM/DD/YYYY") : "",
      dateFrom: this.dateFrom ? moment(this.dateFrom).format("MM/DD/YYYY") : "",
    };
    return this.flag
      ? this.service.search(args).then((result) => {
          var index = 0;
          for (var a of result.data) {
            index++;
            a.index = index;
          }
          return {
            total: result.info.total,
            data: result.data,
          };
        })
      : { total: 0, data: [] };
  };

  xls() {
    this.error = {};
    if (Object.getOwnPropertyNames(this.error).length === 0) {
      let args = {
        no: this.no ? this.no.DONo : "",
        dateTo: this.dateTo ? moment(this.dateTo).format("MM/DD/YYYY") : "",
        dateFrom: this.dateFrom
          ? moment(this.dateFrom).format("MM/DD/YYYY")
          : "",
      };
      this.service.getXls(args).catch((e) => {
        alert(e.replace(e, "Error: ", ""));
      });
    }
  }

  get dOLoader() {
    return (keyword) => {
      var info = {
        keyword: keyword,
        select: JSON.stringify({
          DONo: "DONo",
          Id: "1",
          // supplierName: "SupplierName",
        }),
        search: JSON.stringify(["DONo"]),
        order: { DONo: "asc" },
      };

      return this.service.searchDeliveryOrder(info).then((result) => {
        return result.data.map((data) => {
          data.toString = function () {
            return `${this.DONo} - ${this.Supplier.Name}`;
          };
          return data;
        });
      });
    };
  }

  doView = (tr) => {
    return `${tr.no}`;
  };
}
