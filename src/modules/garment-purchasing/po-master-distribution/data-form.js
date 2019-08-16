import { inject, bindable, computedFrom } from 'aurelia-framework'
import { PurchaseRequestService, DeliveryOrderService } from './service';
var SupplierLoader = require('../../../loader/garment-supplier-loader');

@inject(PurchaseRequestService, DeliveryOrderService)
export class DataForm {
    @bindable readOnly = false;
    @bindable isEdit = false;
    @bindable data = {};
    @bindable title;
    @bindable selectedSupplier;
    @bindable selectedDeliveryOrder;

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah"
    };

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    itemsColumns = [
        { header: "Nomor PO External" },
        { header: "Nomor PR" },
        { header: "Nomor Referensi PR" },
        { header: "Barang" },
        { header: "Dipesan" },
        { header: "Diterima" },
        { header: "Satuan" },
        { header: "Konversi" },
        { header: "Jumlah Kecil" },
        { header: "Satuan Kecil" },
        { header: "Harga" },
        { header: "Harga Total" },
        { header: "Mata Uang" },
        { header: "Catatan" },
    ]

    @computedFrom("data.Supplier")
    get deliveryOrderLoader() {
        return (keyword) => {
            var info = {
                keyword: keyword,
                filter: JSON.stringify({
                    "BillNo != null": true,
                    // "CustomsId > 0": true,
                    "Items.Any(Details.Any(PRNo != null && PRNo.StartsWith(\"PR\") && PRNo.EndsWith(\"M\")))": true,
                    "SupplierId": this.data.Supplier ? this.data.Supplier.Id : 0
                }),
                select: JSON.stringify({ "DONo": "1", "Id": "1" }),
                search: JSON.stringify(["DONo"]),
                order: { "DONo": "asc" }
            };
            return this.doService.search(info)
                .then((result) => {
                    return result.data.map(data => {
                        data.toString = function () { return `${this.doNo} - ${this.supplierName}`; };
                        return data;
                    });
                });
        }
    }

    @computedFrom("data.deliveryOrder")
    get supplierType() {
        let supplierType;
        if (this.data.deliveryOrder && this.data.deliveryOrder.supplier) {
            supplierType = (this.data.deliveryOrder.supplier.import || false) ? "Import" : "Lokal";
        }
        return supplierType;
    }

    get supplierLoader() {
        return SupplierLoader;
    }

    supplierView = (data) => {
        return `${data.Code || data.code} - ${data.Name || data.name}`;
    };

    constructor(PurchaseRequestService, DeliveryOrderService) {
        this.prService = PurchaseRequestService;
        this.doService = DeliveryOrderService;
    }

    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        this.itemOptions = {
            isEdit: this.isEdit
        };
    }

    selectedSupplierChanged(newValue) {
        this.context.selectedDeliveryOrderViewModel.editorValue = "";
        this.selectedDeliveryOrder = null;

        if (newValue) {
            this.data.Supplier = newValue;
        } else {
            this.data.Supplier = null;
        }
    }

    async selectedDeliveryOrderChanged(newValue) {
        if (this.data.Items) {
            this.data.Items.splice(0);
        } else {
            this.data.Items = [];
        }
        this.context.error = null;

        if (newValue) {
            this.data.deliveryOrder = await this.doService.read(newValue.Id);

            if (this.data.deliveryOrder) {
                this.data.DOId = this.data.deliveryOrder.Id;
                this.data.DONo = this.data.deliveryOrder.doNo;
                this.data.DODate = this.data.deliveryOrder.doDate;

                let items = [];
                let purchaseRequestIds = [];

                for (const item of this.data.deliveryOrder.items) {
                    for (const detail of item.fulfillments) {
                        if (detail.pRNo && detail.pRNo.startsWith("PR") && detail.pRNo.endsWith("M")) {
                            items.push({
                                DOItemId: item.Id,
                                DODetailId: detail.Id,
                                EPONo: item.purchaseOrderExternal.no,
                                PRId: detail.pRId,
                                PRNo: detail.pRNo,
                                POSerialNumber: detail.poSerialNumber,
                                Product: detail.product,
                                DealQuantity: detail.dealQuantity,
                                DOQuantity: detail.doQuantity,
                                Uom: detail.purchaseOrderUom,
                                Conversion: detail.conversion,
                                SmallQuantity: detail.smallQuantity,
                                SmallUom: detail.smallUom,
                                PricePerDealUnit: detail.pricePerDealUnit,
                                PriceTotal: detail.priceTotal,
                                Currency: item.currency,
                                Remark: detail.product.Remark
                            });

                            if (purchaseRequestIds.indexOf(detail.pRId) < 0) purchaseRequestIds.push(detail.pRId);
                        }
                    }
                }

                let filter = {};
                filter[purchaseRequestIds.map(id => `Id == ${id}`).join(" or ")] = true;
                filter["PRType"] = "MASTER";
                filter["SCId > 0"] = true;

                const purchaseRequests = await this.prService.search({
                    filter: JSON.stringify(filter),
                    select: JSON.stringify({ "Id": "1", "PRType": "1", "SCId": "1", "SCNo": "1" }),
                });

                items.forEach(item => {
                    const purchaseRequest = purchaseRequests.data.find(d => d.Id == item.PRId);
                    item.SCId = purchaseRequest ? purchaseRequest.SCId : 0;

                    this.data.Items.push(item);
                });
            }

        } else {
            this.data.deliveryOrder = null;
            this.data.DOId = 0;
            this.data.DONo = null;
            this.data.DODate = null;
        }
    }
}
