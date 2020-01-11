import { inject, useView } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { PurchasingService } from '../../service';
import { ServiceCore } from '../../service-core';

@inject(DialogController, PurchasingService, ServiceCore)
@useView("modules/merchandiser/cost-calculation/template/data-form/pr-master-dialog.html")
export class PRMasterDialog {
    data = {};
    error = {};

    constructor(controller, prService, coreService) {
        this.controller = controller;
        this.answer = null;
        this.prService = prService;
        this.coreService = coreService;
    }

    options = {
        showColumns: false,
        showToggle: false,
        pagination: false,
        search: false,
        clickToSelect: true,
        height: 500
    }

    columns = [
        { field: "isSelected", radio: true, sortable: false, },
        { field: "PRNo", title: "Nomor PR" },
        { field: "RONo", title: "Nomor RO" },
        { field: "Article", title: "Artikel" },
        { field: "PO_SerialNumber", title: "No. PO" },
        { field: "Category.name", title: "Kategori" },
        { field: "Product.Code", title: "Kode Barang" },
        { field: "Composition.Composition", title: "Komposisi" },
        { field: "Const.Const", title: "Konstruksi" },
        { field: "Yarn.Yarn", title: "Yarn" },
        { field: "Width.Width", title: "Width" },
        { field: "ProductRemark", title: "Keterangan" },
        { field: "Quantity", title: "Jumlah" },
        { field: "UomUnit", title: "Satuan" },
    ];

    loader = (info) => {
        this.selectedData = [];

        var order = {};
        if (info.sort)
            order[info.sort] = info.order;

        var arg = {
            page: 1,
            size: 25,
            keyword: info.search,
            order: order,
            select: JSON.stringify({
                "Id": "1", "PRType": "1", "SCId": "1", "SCNo": "1", "PRNo": "1", "RONo": "1", "Article": "1",
                "Items.Id": "1", "Items.PO_SerialNumber": "1",
                "Items.CategoryId": "1", "Items.CategoryName": "1",
                "Items.ProductId": "1", "Items.ProductCode": "1", "Items.ProductName": "1",
                "Items.ProductRemark": "1", "Items.Quantity": "1", "Items.BudgetPrice": "1",
                "Items.UomId": "1", "Items.UomUnit": "1", "Items.PriceUomId": "1", "Items.PriceUomUnit": "1"
            }),
            filter: JSON.stringify(this.filter),
        }

        return this.prService.search(arg)
            .then(result => {
                result.data.map(data => {
                    return data;
                });

                let data = [];
                for (const d of result.data) {
                    for (const i of d.Items) {
                        data.push(Object.assign({
                            PRMasterId: d.Id,
                            PRMasterItemId: i.Id,
                            POMaster: i.PO_SerialNumber,

                            PRNo: d.PRNo,
                            RONo: d.RONo,
                            Article: d.Article,

                            Category: {
                                Id: i.CategoryId,
                                // code: i.CategoryCode,
                                name: i.CategoryName,
                            },
                            Product: {
                                Id: i.ProductId,
                                Code: i.ProductCode,
                                Name: i.ProductName,
                            },
                            Description: i.ProductRemark,
                            Uom: {
                                Id: i.UomId,
                                Unit: i.UomUnit
                            },
                            BudgetPrice: i.BudgetPrice,
                            PriceUom: {
                                Id: i.PriceUomId,
                                Unit: i.PriceUomUnit
                            }
                        }, i));
                    }
                }

                let fabricItemsProductIds = data
                    .filter(i => i.Category.name === "FABRIC")
                    .map(i => i.Product.Id);

                if (fabricItemsProductIds.length) {
                    return this.coreService.getGarmentProductsByIds(fabricItemsProductIds)
                        .then(result => {
                            data.filter(i => i.Category.name === "FABRIC")
                                .forEach(i => {
                                    const product = result.find(d => d.Id == i.Product.Id);

                                    i.Product = product;
                                    i.Composition = product;
                                    i.Const = product;
                                    i.Yarn = product;
                                    i.Width = product;
                                });

                            return {
                                total: data.length,
                                data: data
                            }
                        });
                } else {
                    return {
                        total: data.length,
                        data: data
                    }
                }
            });
    }

    activate(params) {
        this.filter = {};
        this.filter["PRType == \"MASTER\" || PRType == \"SAMPLE\""] = true;
        this.filter["SCId"] = params.SCId;
        this.filter["IsValidatedMD2"] = true;
    }

    select() {
        if (this.selectedData && this.selectedData.length > 0) {
            this.controller.ok(this.selectedData[0]);
        } else {
            alert("Belum ada yang dipilih!")
        }
    }
}
