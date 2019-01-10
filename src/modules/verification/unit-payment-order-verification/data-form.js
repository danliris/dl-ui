import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service, MongoService } from './service';
import moment from 'moment';
import numeral from 'numeral';
var UnitPaymentOrderLoader = require('../../../loader/unit-payment-order-loader');

@inject(Service, MongoService)
export class DataForm {

    @bindable readOnly; //false
    @bindable data = {};
    @bindable SPB;
    @bindable items = [];
    // @bindable tableItems;
    totalPaid = 0;

    constructor(service, mongoService) {
        this.service = service;
        this.mongoService = mongoService;
        this.SPBQuery = { "position": 3 };

        this.selectSPB = [
            'division.name', 'division.code',
            'supplier.name', 'supplier.code',
            'currency.code',
            'category.code', 'category.name',
            'paymentMethod',
            'invoceNo',
            'invoceDate',
            'pibNo',
            'useVat', //pph
            'useIncomeTax', //ppn
            'vatRate',
            'no',
            'date',
            'remark',
            'items.unitReceiptNote.no',
            'items.unitReceiptNote.items.product.name',
            'items.unitReceiptNote.items.deliveredQuantity',
            'items.unitReceiptNote.items.deliveredUom.unit',
            'items.unitReceiptNote.items.pricePerDealUnit',
            'items.unitReceiptNote.items.correction.correctionNo',
            'items.unitReceiptNote.items.purchaseOrder.purchaseOrderExternal.no',
            'items.unitReceiptNote.items.purchaseOrder.purchaseRequest.no',
            'items.unitReceiptNote.items.currency.code'
        ];
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        if (this.data && this.data._id) {
            this.mapItems(this.data);
        } else {
            this.data.VerifyDate = moment(new Date()).format("DD-MMM-YYYY");
        }


    }

    context = ["Rincian Purchase Request"];

    columns = [
        { field: "productName", title: "Nama Barang" },
        {
            field: "deliveredQuantity", title: "Jumlah", formatter: (value, data) => {
                return numeral(value).format('(0,0)');
            }
        },
        {
            field: "pricePerDealUnit", title: "Harga Satuan", formatter: (value, data) => {
                return numeral(value).format('(0,0.00)');
            }
        },
        {
            field: "totalPrice", title: "Harga Total", formatter: (value, data) => {
                return numeral(value).format('(0,0.00)');
            }
        },
        { field: "currency", title: "Mata Uang" },
        { field: "no", title: "No Bon Terima Unit" },
        { field: "purchaseOrderExternalNo", title: "No PO Eksternal" },
        { field: "purchaseRequestNo", title: "No PR" },
        { field: "correctionNo", title: "No Koreksi" },
    ]

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        editText: "Ubah",
        deleteText: "Hapus",
    };

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false,
        pagination: false
    }

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    numericOptions = {
        label: {
            length: 4
        },
        control: {
            length: 2
        }
    }


    SPBChanged(newValue, oldValue) {
        if (this.SPB) {

            this.data = Object.assign(this.data, this.SPB)

            this.mapItems(this.data);

            this.context.tableItems.refresh();

            //this is "Nominal PPH"
            var useIncomeTax = this.data.useVat ? parseFloat(((this.data.vatRate * this.totalPaid) / 100).toFixed(2)) : 0;

            //this is "Nominal PPN"
            var useVat = this.data.useIncomeTax ? parseFloat((0.1 * this.totalPaid).toFixed(2)) : 0;

            this.data.useVat = useVat;
            this.data.useIncomeTax = useIncomeTax;

            this.data.remark = parseFloat((this.totalPaid + useVat - useIncomeTax).toFixed(2)); //this is "Total Paid"    

            this.data.UnitPaymentOrderNo = this.SPB.no;


        } else {
            this.data = Object.assign(this.data, {})
            this.items = [];
            this.context.tableItems.refresh();
        }
    }

    mapItems(data) {
        var dataItems = [];
        this.totalPaid = 0;
        for (var dataItem of data.items) {
            for (var unitItem of dataItem.unitReceiptNote.items) {
                var item = {};
                item.no = dataItem.unitReceiptNote.no;
                item.productName = unitItem.product.name;
                item.deliveredQuantity = unitItem.deliveredQuantity;
                item.currency = unitItem.currency.code;
                item.pricePerDealUnit = unitItem.pricePerDealUnit;
                item.totalPrice = parseFloat((parseFloat(item.deliveredQuantity) * parseFloat(item.pricePerDealUnit)).toFixed(2));
                item.correctionNo = unitItem.correction.correctionNo;
                item.purchaseOrderExternalNo = unitItem.purchaseOrder.purchaseOrderExternal.no;
                item.purchaseRequestNo = unitItem.purchaseOrder.purchaseRequest.no;

                dataItems.push(item);

                this.totalPaid += item.totalPrice;
            }
        }
        this.items = dataItems;
        // this.context.tableItems.refresh();
    }

    get unitPaymentOrderLoader() {
        return UnitPaymentOrderLoader;
    }

}