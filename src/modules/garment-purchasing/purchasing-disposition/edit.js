import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import * as _ from 'underscore';


@inject(Router, Service)
export class Edit {
    hasCancel = true;
    hasSave = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.isView = false;
    }

    bind() {
        this.data = this.data || {};
        this.error = {};
    }

    async activate(params) {
        // var id = params.id;
        // this.data = await this.service.getById(id);
        // if(this.data.Currency){
        //     this.selectedCurrency=this.data.Currency;
        // }

        // if(this.data.Supplier){
        //     this.selectedSupplier=this.data.Supplier;
        // }

        // if(this.data.Division){
        //     this.selectedDivision=this.data.Division;
        // }

        // if(this.data.Category){
        //     this.selectedCategory=this.data.Category;
        // }
        var id = params.id;
        this.data = await this.service.getById(id);
        
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
        if (this.data.Position != 1 && this.data.Position != 6) {
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
            //var calculateDppSplit = this.data.DPP / this.data.Items.length;
            this.data.Items = this.data.Items.map(item => {
                var mappingItem = {
                    Id: item.Id,
                    CurrencyCode: item.CurrencyCode,
                    CurrencyRate: item.CurrencyRate,
                    CurrencyId: item.CurrencyId,
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
                    IncomeTaxName: item.IncomeTaxName,
                    IncomeTaxId: item.IncomeTaxId,
                    IncomeTaxRate: item.IncomeTaxRate,
                    Details: item.Details,
                    EPOId: item.EPOId,
                    EPONo: item.EPONo,
                    GarmentDispositionPurchaseId: item.GarmentDispositionPurchaseId,
                    IncomeTaxValue: item.IncomeTaxValue,
                    IncomeTaxValueView: item.Details.map(detail => detail['PaidPrice']).reduce((sum, current) => sum + current, 0) * (item.IncomeTaxRate / 100),
                    IsDispositionCreated: item.IsDispositionCreated,
                    IsDispositionPaid: item.IsDispositionPaid,
                    IsUseIncomeTax: item.IsUseIncomeTax,
                    IsIncomeTax: item.IsUseIncomeTax,
                    IsPayIncomeTax: item.IsPayIncomeTax,
                    IsUseVat: item.IsUseVat,
                    IsPayVAT: item.IsPayVat,
                    VatValue: item.VatValue,
                    VatValueView: item.Details.map(detail => detail['PaidPrice']).reduce((sum, current) => sum + current, 0) * (item.VatRate / 100),
                    DispositionAmountPaid: item.DispositionAmountPaid,
                    DispositionAmountCreated: item.DispositionAmountCreated,
                    DispositionQuantityCreated: item.DispositionQuantityCreated,
                    DispositionQuantityPaid: item.DispositionQuantityPaid,
                    DPPValue: item.Details.map(detail => detail['PaidPrice']).reduce((sum, current) => sum + current, 0),
                    Active: item.Active,
                    CreatedAgent: item.CreatedAgent,
                    CreatedBy: item.CreatedBy,
                    CreatedUtc: item.CreatedUtc,
                    LastModifiedAgent: item.LastModifiedAgent,
                    LastModifiedBy: item.LastModifiedBy,
                    LastModifiedUtc: item.LastModifiedUtc,
                    VatRate : item.VatRate,
                    VatId : item.VatId,
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
       // console.log(this);
    }

    cancel(event) {
        this.router.navigateToRoute('view', { id: this.data.Id });
    }

    save(event) {
        // if(this.data.Items){
        //     this.data.Amount=0;
        //     this.data.IncomeTaxValue=0;
        //     this.data.DPP=0;
        //     this.data.VatValue=0;
        //     for(var item of this.data.Items){
        //         if(item.Details){
        //             for(var detail of item.Details){
        //                 var pph=0;
        //                 var ppn=0;
        //                 if(item.UseIncomeTax){
        //                     var rate= item.IncomeTax.Rate ? item.IncomeTax.Rate : item.IncomeTax.rate;
        //                     pph=detail.PaidPrice*(parseFloat(rate)/100);
        //                 }
        //                 if(item.UseVat){
        //                     ppn=detail.PaidPrice*0.1;
        //                 }
        //                 this.data.IncomeTaxValue+=pph;
        //                 this.data.VatValue+=ppn;
        //                 this.data.DPP+=detail.PaidPrice;
        //                 if(this.data.IncomeTaxBy=="Supplier"){
        //                     this.data.Amount+=detail.PaidPrice+ppn;
        //                 }
        //                 else
        //                     this.data.Amount+=detail.PaidPrice+ppn+pph;
        //             }
        //         }
        //     }
        // }
        // this.service.update(this.data)
        //   .then(result => {
        //     this.cancel();
        //   })
        //   .catch(e => {
        //     this.error = e;
        //   })

        //console.log("data atas",this.data);
        //console.log("item atas",this.data.Items);

        var bodyRequest = {};
        bodyRequest.Amount = this.data.Amount;
        bodyRequest.Bank = this.data.Bank;
        bodyRequest.Category = this.data.Category;
        //bodyRequest.Currency = this.data.Currency;
        bodyRequest.CurrencyCode = this.data.CurrencyCode;
        bodyRequest.CurrencyDate = this.data.CurrencyDate;
        bodyRequest.CurrencyId = this.data.CurrencyId;
        bodyRequest.CurrencyName = this.data.CurrencyName;
        bodyRequest.DPP = this.data.DPP;
        bodyRequest.Id = this.data.Id;
        bodyRequest.IncomeTaxValue = this.data.IncomeTaxValue;
        bodyRequest.IncomeTaxValueView = this.data.IncomeTaxValueView;
        bodyRequest.MiscAmount = this.data.MiscAmount;
        bodyRequest.PaymentDueDate = this.data.PaymentDueDate;
        bodyRequest.PaymentType = this.data.PaymentType;
        bodyRequest.ProformaNo = this.data.ProformaNo;
        bodyRequest.Remark = this.data.Remark;
        //bodyRequest.Supplier = this.data.Supplier;
        bodyRequest.SupplierCode = this.data.SupplierCode;
        bodyRequest.SupplierId = this.data.SupplierId;
        bodyRequest.SupplierIsImport = this.data.SupplierIsImport;
        bodyRequest.SupplierName = this.data.SupplierName;
        bodyRequest.VatValue = this.data.VatValue;
        bodyRequest.VatValueView = this.data.VatValueView;
        bodyRequest.CreatedAgent = this.data.CreatedAgent;
        bodyRequest.CreatedBy = this.data.CreatedBy;
        bodyRequest.CreatedUtc = this.data.CreatedUtc;
        bodyRequest.LastModifiedAgent = this.data.LastModifiedAgent;
        bodyRequest.LastModifiedBy = this.data.LastModifiedBy;
        bodyRequest.LastModifiedUtc = this.data.LastModifiedUtc;
        bodyRequest.Id = this.data.Id;
        bodyRequest.ConfirmationOrderNo = this.data.ConfirmationOrderNo;
        bodyRequest.DispositionNo = this.data.DispositionNo;
        
        bodyRequest.Items = [];
        this.data.Items.forEach(element => {
            element.Items.forEach(item =>{
                var itemDisp ={};
                itemDisp.CurrencyRate = item.CurrencyRate;
                itemDisp.DPPValue = item.DPPValue;
                itemDisp.DispositionAmountCreated = item.DispositionAmountCreated;
                itemDisp.DispositionPaidCreated=item.DispositionPaidCreated;
                itemDisp.EPOId = item.EPOId;
                itemDisp.EPONo = item.EPONo;
                itemDisp.IncomeTax = item.IncomeTax;
                itemDisp.IncomeTaxId = item.IncomeTaxIdId;
                itemDisp.IncomeTaxName = item.IncomeTaxName;
                itemDisp.IncomeTaxRate = item.IncomeTaxRate;
                itemDisp.IncomeTaxValue = item.IncomeTaxValue;
                itemDisp.IncomeTaxValueView = item.IncomeTaxValueView;
                itemDisp.IsIncomeTax = item.IsIncomeTax;
                itemDisp.IsPayIncomeTax = item.IsPayIncomeTax;
                itemDisp.IsPayVAT = item.IsPayVAT;
                itemDisp.IsUseIncomeTax = item.IsUseIncomeTax;
                itemDisp.IsUseVat = item.IsUseVat;
                itemDisp.VatId = item.VatId;
                itemDisp.VatRate = item.VatRate;
                itemDisp.VatValue = item.VatValue;
                itemDisp.VatValueView = item.VatValueView;
                itemDisp.Details = item.Details;
                itemDisp.Invoice = element.Invoice;
                itemDisp.Id = item.Id;
                itemDisp.CreatedAgent = item.CreatedAgent;
                itemDisp.CreatedBy = item.CreatedBy;
                itemDisp.CreatedUtc = item.CreatedUtc;
                itemDisp.LastModifiedAgent = item.LastModifiedAgent;
                itemDisp.LastModifiedBy = item.LastModifiedBy;
                itemDisp.LastModifiedUtc = item.LastModifiedUtc;
                itemDisp.GarmentDispositionPurchaseId = item.GarmentDispositionPurchaseId;
                itemDisp.IsDispositionCreated = item.IsDispositionCreated;
                itemDisp.CurrencyCode = item.CurrencyCode;
                itemDisp.CurrencyDate = item.CurrencyDate;
                itemDisp.CurrencyId = item.CurrencyId;
                
                bodyRequest.Items.push(itemDisp);
            });
        });


        this.dataConv = bodyRequest;

        //console.log(this.dataConv);

        if (this.dataConv.Items) {
            this.dataConv.Amount = 0;
            this.dataConv.IncomeTaxValue = 0;
            this.dataConv.IncomeTaxValueView = 0;
            this.dataConv.DPP = 0;
            this.dataConv.VatValue = 0;
            this.dataConv.VatValueView = 0;
            var incomeTaxCalculate = 0;
            var vatCalculate = 0;
            for (var item of this.dataConv.Items) {
                // if(item.Details){
                //     for(var detail of item.Details){
                var pph = 0;
                var pphView = 0;
                var ppn = 0;
                var ppnView = 0;
                if (item.IsIncomeTax) {
                  // var rate= item.IncomeTax ? item.IncomeTax.Rate : 0;
                  // pph=parseFloat(detail.PriceTotal)*parseFloat(rate)*0.01;
                  pphView = item.IncomeTaxValueView ? item.IncomeTaxValueView : item.IncomeTaxValue;
                }
                if (item.IsPayIncomeTax) {
                    // var rate= item.IncomeTax ? item.IncomeTax.Rate : 0;
                    // pph=parseFloat(detail.PriceTotal)*parseFloat(rate)*0.01;
                    pph = item.IncomeTaxValue ? item.IncomeTaxValueView : item.IncomeTaxValue;
                }
                if (item.IsPayVAT) {
                    // ppn=detail.PriceTotal*0.1;
                    ppn = item.VatValue;
                }
                if (item.IsUseVat) {
                    // ppn=detail.PriceTotal*0.1;
                    ppnView = item.VatValueView ? item.VatValueView : item.VatValue;
                }
                this.dataConv.IncomeTaxValue+=pphView;
                this.dataConv.IncomeTaxValueView +=pphView;                        
                this.dataConv.VatValue+=ppnView;
                this.dataConv.VatValueView+=ppnView;                        
                this.dataConv.DPP+=item.DPPValue;
                incomeTaxCalculate +=pph;
                vatCalculate +=ppn;
                // if(this.data.IncomeTaxBy=="Supplier"){
                //     this.data.Amount+=detail.PaidPrice+ppn;
                // }
                // else
                //     this.data.Amount+=detail.PaidPrice+ppn+pph;
                //     }
                // }
            }
            // this.data.Amount =(this.data.DPP+this.data.VatValue+this.data.MiscAmount)-this.data.IncomeTaxValue;
            this.dataConv.Amount = (this.dataConv.DPP + vatCalculate + this.dataConv.MiscAmount) - incomeTaxCalculate;
            // this.data.IncomeTaxValue = this.data.IncomeTaxValueView;
            // this.data.VatValue = this.data.VatValueView;


        }
        //console.log("save edit", this.dataConv);
        this.service.update(this.dataConv)
            .then(result => {
                alert("Data berhasil dibuat");
                // this.router.navigateToRoute('create',{}, { replace: true, trigger: true });
                this.router.navigateToRoute('view', { id: this.data.Id });

            })
            .catch(e => {
                if (e.statusCode == 500) {
                    alert("Terjadi Kesalahan Pada Sistem!\nHarap Simpan Kembali!");
                } else {
                    this.error = e;
                }
            })
    }
}

