import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import * as _ from 'underscore';


@inject(Router, Service)
export class View {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }
    hasCancel = true;
    hasEdit = true;
    hasDelete = true;
    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        
        var nullInvoiceCount = this.data.Items.filter(item => item.Invoice !== null).length;
        //console.log("Number of items with null invoice:", nullInvoiceCount);
        this.data.proformaView = nullInvoiceCount > 0 ? true : false;
        if (this.data.Currency) {
            this.selectedCurrency = this.data.Currency;
        }

        if (this.data.Supplier) {
            this.selectedSupplier = this.data.Supplier;
        }

        if (this.data.Division) {
            this.selectedDivision = this.data.Division;
        }

        if (this.data.Category) {
            this.selectedCategory = this.data.Category;
        }
        if (this.data.Position != 1) {
            this.hasDelete = false;
        }
        if (this.data.Position != 1) {
            this.hasEdit = false;
        }
        if (this.data.SupplierId) {
            this.selectedSupplier = {
                _id: this.data.SupplierId,
                name: this.data.SupplierName,
                code: this.data.SupplierCode,
                import: this.data.SupplierIsImport
            }
        }

        if (this.data.CurrencyId) {
            this.selectedCurrency = {
                id: this.data.CurrencyId,
                code: this.data.CurrencyCode ? this.data.CurrencyCode : "",
                rate: this.data.CurrencyRate,
                name: this.data.CurrencyCode ? this.data.CurrencyCode : "",
                Name: this.data.CurrencyCode ? this.data.CurrencyCode : "",
                date: this.data.CurrencyDate ? this.data.CurrencyDate : "",
            }
            this.data.Currency = this.selectedCurrency;
        }

        if (this.data.Items) {
            this.data.Items = this.data.Items.map(item => {
                var mappingItem = {
                    Currency: {
                        Code: item.CurrencyCode,
                        Rate: item.CurrencyRate,
                        Id: item.CurrencyId,
                    },
                    IncomeTax: {
                        Name: item.IncomeTaxName,
                        Id: item.IncomeTaxId,
                        Rate: item.IncomeTaxRate,
                    },
                    Vat: {
                        Id: item.VatId,
                        Rate: item.VatRate,
                    },
                    Details: item.Details,
                    EPOId: item.EPOId,
                    EPONo: item.EPONo,
                    GarmentDispositionPurchaseId: item.GarmentDispositionPurchaseId,
                    IncomeTaxValue: item.IncomeTaxValue,
                    IncomeTaxValueView: item.IncomeTaxValue,
                    IsDispositionCreated: item.IsDispositionCreated,
                    IsDispositionPaid: item.IsDispositionPaid,
                    IsUseIncomeTax: item.IsUseIncomeTax,
                    IsIncomeTax: item.IsUseIncomeTax,
                    IsPayIncomeTax: item.IsPayIncomeTax,
                    IsUseVat: item.IsUseVat,
                    IsPayVAT: item.IsPayVat,
                    VatValue: item.VatValue,
                    VatValueView: item.VatValue,
                    DispositionAmountPaid: item.DispositionAmountPaid,
                    DispositionAmountCreated: item.DispositionAmountCreated,
                    DispositionQuantityCreated: item.DispositionQuantityCreated,
                    DispositionQuantityPaid: item.DispositionQuantityPaid,
                    Active: item.Active,
                    CreatedAgent: item.CreatedAgent,
                    CreatedBy: item.CreatedBy,
                    CreatedUtc: item.CreatedUtc,
                    LastModifiedAgent: item.LastModifiedAgent,
                    LastModifiedBy: item.LastModifiedBy,
                    LastModifiedUtc: item.LastModifiedUtc,
                    Invoice : item.Invoice
                };
                return mappingItem;
            });


            var groupObj = _.groupBy(this.data.Items, 'Invoice');

            var mappedGroup = _.map(groupObj);

            var ItemGroups = [];

            mappedGroup.forEach((element, index) => {
                var headData = {};
                element.forEach((x, i) => {
                    
                    if (i == 0) {
                        
                        headData = x;
                        headData.Items = [];
                        
                    }
                    
                    if (headData.Items != undefined) {
                        headData.Items.push(x);
                    }
                });
                // var headData = element[0]
                
                //     headData.PackagingList = element;
                ItemGroups.push(headData);
            });

            this.data.Items = ItemGroups;

        }
        //console.log("view by id", this.data);
        // this.data.Items
        // console.log("view",this.data);
    }

    // cancelCallback(event) {
    //   this.router.navigateToRoute('list');
    // }

    // editCallback(event) {
    //   this.router.navigateToRoute('edit', { id: this.data.Id });
    // }

    // deleteCallback(event) {
    //   this.service.delete(this.data)
    //     .then(result => {
    //       this.cancelCallback();
    //     });
    // }

    cancel(event) {
        var r = confirm("Apakah anda yakin akan keluar?")
        if (r == true) {
            this.router.navigateToRoute('list');
        }
    }

    edit(event) {
        var r = confirm("Apakah anda yakin akan mengubah data ini?")
        if (r == true) {
            this.router.navigateToRoute('edit', { id: this.data.Id });
        }
    }

    delete(event) {
        var r = confirm("Apakah anda yakin akan menghapus data ini?")
        if (r == true) {
            this.service.delete(this.data.Id).then(result => {
                this.cancel();
            });
        }
    }
}
