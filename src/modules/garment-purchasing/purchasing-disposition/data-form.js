import { inject, bindable, containerless, computedFrom, BindingEngine, TaskQueue } from 'aurelia-framework'
import { Service } from "./service";
import { moment } from "moment";
var SupplierLoader = require('../../../loader/garment-supplier-loader');
// var CurrencyLoader = require('../../../loader/garment-currency-loader');
var CurrencyLoader = require('../../../loader/garment-currencies-by-latest-date-loader');
// var CurrencyLoader = require('../../../loader/garment-currencies-bi-by-latest-date-loader');
var CategoryLoader = require('../../../loader/garment-category-loader');
var accountSignatureLoader = require('../../../loader/garment-account-signature-loader');

//var IncomeTaxLoader = require('../../../loader/income-tax-loader');

@containerless()
@inject(Service, BindingEngine, TaskQueue)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable title;
    @bindable selectedSupplier;
    @bindable selectedCurrency;
    @bindable selectedCategory;
    @bindable incomeTaxValue;
    @bindable incomeTaxValueView;
    @bindable vatValue;
    @bindable vatValueView;
    @bindable IsApprovedManager;


    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    itemPaymentType = ["T/T AFTER", "FREE", "T/T BEFORE"];
    itemCategory = ["FABRIC", "ACCESSORIES"];
    // itemsColumns = [{ header: "Nomor External PO" },
    // { header: "Kena PPN" },
    // { header: "Nominal PPN" },
    // { header: "Kena PPH" },
    // { header: "PPH" },
    // { header: "Nominal PPH" },
    // { header: "Disposisi yang sudah dibuat" },
    // // { header: "Disposisi yang sudah dibayar"},
    // { header: "" }];

    itemsColumns = [{ header: "", header : "Invoice"}];

    constructor(service, bindingEngine, taskQueue) {
        this.service = service;
        this.bindingEngine = bindingEngine;
        this.previewWidth = 60;
        this.previewHeight = 600;
        this.taskQueue = taskQueue;
        this._itemSubscriptions = new Map();
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        this.data.DocumentsFile = this.data.DocumentsFile || [];
        this.data.DocumentsFileName = this.data.DocumentsFileName || [];
        this.documentsPathTemp = [].concat(this.data.DocumentsPath);
        if (this.data.supplier) {
            this.selectedSupplier = this.data.supplier;
        }
         this.IsApprovedManager ={
            UserName: this.data.ApprovedManagerBy || ""
        };
    }

    @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }

    @computedFrom("data.Supplier && data.Currency && data.Category")
    get filter() {
        var filter = {};
        if(this.data.Id){
            filter = {
                supplierId: this.data.SupplierId,
                currencyId: this.data.CurrencyId,
                currencyCode: this.data.CurrencyCode,
                category: this.data.Category,
                paymentType: this.data.PaymentType,
            }
            for(var item of this.data.Items){
                for(var detail of item.Items){
                    detail.filter=filter;
                }

            }
        }
        else if (this.data.Supplier && this.data.Currency && this.data.Category && this.data.Division) {
            filter = {
                supplierId: this.data.Supplier.Id || this.data.Supplier._id,
                currencyId: this.data.Currency.Id || this.data.Currency._id,
                categoryId: this.data.Category.Id || this.data.Category._id,
                currencyCode: this.data.Currency.Code
            }
        }
        return filter;
    }

    selectedCategoryChanged(newValue) {
        this.data.Category = {};
        if (this.data.Items)
            this.data.Items.splice(0);
        var _selectedCategory = newValue;
        if (_selectedCategory.Id || _selectedCategory._id) {
            this.data.Category = _selectedCategory;
            this.data.categoryId = _selectedCategory.Id || _selectedCategory._id;
            this.data.Category.Name = _selectedCategory.name;
            this.data.Category.Id = _selectedCategory._id;
            this.data.Category.Code = _selectedCategory.code;
        }
        else {
            this.data.Category = {};
            this.data.Items.splice(0);
        }
    }

    selectedSupplierChanged(newValue) {
        this.data.Supplier = {};
        if (this.data.Items)
            this.data.Items.splice(0);
        var _selectedSupplier = newValue;
        console.log(newValue);
        if (_selectedSupplier.Id || _selectedSupplier._id) {
            this.data.Supplier = _selectedSupplier;
            this.data.SupplierId = _selectedSupplier.Id || _selectedSupplier._id;
            this.data.SupplierName = _selectedSupplier.name;
            this.data.SupplierCode = _selectedSupplier.code;
            this.data.SupplierIsImport = _selectedSupplier.import;
            this.data.VendorAccountD365 = _selectedSupplier.codeD365 || _selectedSupplier.CodeD365;
            this.data.Bank = _selectedSupplier.bankDetail
            // this.data.Supplier._id=_selectedSupplier.Id;
            // this.data.Supplier.code=_selectedSupplier.Code;
            // this.data.Supplier.name=_selectedSupplier.Name;
        }
        else {
            this.data.Supplier = {};
             this.data.Bank = "";
            this.data.Items.splice(0);
        }
    }

    selectedCurrencyChanged(newValue) {
        this.data.Currency = {};
        if (this.data.Items)
            this.data.Items.splice(0);
        if (newValue.Id) {
            this.data.Currency = newValue;
            this.data.Currency._id = newValue.Id;
            this.data.Currency.code = newValue.code;
            this.data.Currency.name = newValue.code;
            this.data.CurrencyId = newValue.Id;
            this.data.CurrencyCode = newValue.code;
            this.data.CurrencyName = newValue.code;
            this.data.CurrencyRate = newValue.rate;
            this.data.CurrencyDate = newValue.date;
        }
        else {
            this.data.Currency = {};
            this.data.Items.splice(0);
        }
    }

    get supplierLoader() {
        return SupplierLoader;
    }

    get supplierQuery(){
        var result = { "Active" : true }
        return result;   
    }

    get currencyLoader() {
        return CurrencyLoader;
    }

    get addItems() {
        return (event) => {
            this.data.Items.push(
                {
                    SupplierId: this.data.SupplierId,
                    CurrencyId: this.data.CurrencyId,
                    CurrencyCode: this.data.CurrencyCode,
                    Category: this.data.Category,
                    PaymentType: this.data.PaymentType,
                    Id: 0
                })
        };
    }

    currencyView = (currency) => {
        // return currency.code+ " - " + currency.date.substring(0,10);
        return currency.Code? currency.Code:currency.code;

    }

    supplierView = (supplier) => {
        var code = supplier.code || supplier.Code;
        var name = supplier.name || supplier.Name;
        return `${code} - ${name}`
    }

    itemsChanged(e) {
        if (this.data.Items) {
            this.data.Amount = 0;
            this.data.IncomeTaxValue = 0;
            this.data.IncomeTaxValueView = 0;            
            this.data.DPP = 0;
            this.data.VatValue = 0;
            this.data.VatValueView = 0;
            console.log(this.data.Items);
            for (var detail of this.data.Items) {
                if(detail.Items)
                for (var item of detail.Items) {
                // if(item.Details){
                //     for(var detail of item.Details){
                var pph = 0;
                var pphView = 0;
                var ppn = 0;
                var ppnView = 0;
                var dpp = item.DPPValue != undefined || item.DPPValue != null ? item.DPPValue : 0;
                if (item.IsIncomeTax) {
                  // var rate= item.IncomeTax ? item.IncomeTax.Rate : 0;
                  // pph=parseFloat(detail.PriceTotal)*parseFloat(rate)*0.01;
                  pphView = item.IncomeTaxValueView;
                }
                if (item.IsPayIncomeTax) {
                    // var rate= item.IncomeTax ? item.IncomeTax.Rate : 0;
                    // pph=parseFloat(detail.PriceTotal)*parseFloat(rate)*0.01;
                    pph = item.IncomeTaxValue;
                }
                if (item.IsPayVAT) {
                    // ppn=detail.PriceTotal*0.1;
                    ppn = item.VatValue;
                }
                if (item.IsUseVat) {
                    // ppn=detail.PriceTotal*0.1;
                    ppnView = item.VatValueView;
                }
                this.data.IncomeTaxValue += pph;
                this.data.IncomeTaxValueView += pphView;
                this.data.VatValue += ppn;
                this.data.DPP += dpp;
                this.data.VatValueView +=ppnView;
                // this.data.Amount+=dpp+ppn+pph+this.data.MiscAmount;
                this.data.Amount += Number(parseFloat((dpp + ppn + this.data.MiscAmount) - pph).toFixed(3));

                //     }
                // }
            }
        }
        }
        // console.log("itemChanged",this.data);
    }

    get removeItems() {
        return (event) => //console.log(event.detail);
        {

            if (this.data.Items) {
                this.data.Amount = 0;
                this.data.IncomeTaxValue = 0;
                this.data.IncomeTaxValueView = 0;
                this.data.DPP = 0;
                this.data.VatValue = 0;
                this.data.VatValueView = 0;
                for (var detail of this.data.Items) {
                    if(detail.Items)
                    for (var item of detail.Items) {
                    // if(item.Details){
                    //     for(var detail of item.Details){
                    var pph = 0;
                    var pphView = 0;
                    var ppn = 0;
                    var ppnView = 0;
                    // var dpp = item.DPPValue? item.DPPValue:0;
                    var dpp = item.DPPValue != undefined || item.DPPValue != null ? item.DPPValue : 0;

                    if (item.IsIncomeTax) {
                      // var rate= item.IncomeTax ? item.IncomeTax.Rate : 0;
                      // pph=parseFloat(detail.PriceTotal)*parseFloat(rate)*0.01;
                      pphView = item.IncomeTaxValueView;
                    }
                    if (item.IsPayIncomeTax) {
                        // var rate= item.IncomeTax ? item.IncomeTax.Rate : 0;
                        // pph=parseFloat(detail.PriceTotal)*parseFloat(rate)*0.01;
                        pph = item.IncomeTaxValue;
                    }
                    if (item.IsPayVAT) {
                        // ppn=detail.PriceTotal*0.1;
                        ppn = item.VatValue;
                    }
                    if (item.IsUseVat) {
                        // ppn=detail.PriceTotal*0.1;
                        ppnView = item.VatValueView;
                    }
                    this.data.IncomeTaxValue += pph;
                    this.data.IncomeTaxValueView += pphView;                    
                    this.data.VatValue += ppn;
                    this.data.VatValueView += ppnView;
                    this.data.DPP += dpp;
                    // this.data.Amount+=dpp+ppn+pph+this.data.MiscAmount;
                    this.data.Amount += Number(parseFloat((dpp + ppn + this.data.MiscAmount) - pph).toFixed(3));


                    //     }
                    // }
                }
            }
        }
        }
    }

    divisionView = (division) => {
        return division.name || division.Name;
    }

    categoryView = (category) => {
        var code = category.code || category.Code;
        var name = category.name || category.Name;
        return `${code} - ${name}`;
    }

    get categoryLoader() {
        return CategoryLoader;
    }

    // @computedFrom("!isView")
    set dppVal(v) { };
    get dppVal() {
        if (!this.readOnly) {
            if (this.data.Items) {
                this.data.Amount = 0;
                this.data.IncomeTaxValue = 0;
                this.data.IncomeTaxValueView = 0;                
                this.data.DPP = 0;
                this.data.VatValue = 0;
                this.data.VatValueView = 0;
                for (var detail of this.data.Items) {
                    if(detail.Items)
                    for (var item of detail.Items) {
                    // if(item.Details){
                    //     for(var detail of item.Details){
                        var pph = 0;
                        var pphView = 0;
                        var ppn = 0;
                        var ppnView = 0;
                        // var dpp = item.DPPValue? item.DPPValue:0;
                        var dpp = item.DPPValue != undefined || item.DPPValue != null ? item.DPPValue : 0;

                        if (item.IsIncomeTax) {
                        // var rate= item.IncomeTax ? item.IncomeTax.Rate : 0;
                        // pph=parseFloat(detail.PriceTotal)*parseFloat(rate)*0.01;
                        pphView = item.IncomeTaxValueView;
                        }
                        if (item.IsPayIncomeTax) {
                            // var rate= item.IncomeTax ? item.IncomeTax.Rate : 0;
                            // pph=parseFloat(detail.PriceTotal)*parseFloat(rate)*0.01;
                            pph = item.IncomeTaxValue;
                        }
                        if (item.IsPayVAT) {
                            // ppn=detail.PriceTotal*0.1;
                            ppn = item.VatValue;
                        }
                        if (item.IsUseVat) {
                            // ppn=detail.PriceTotal*0.1;
                            ppnView = item.VatValueView;
                        }
                        this.data.IncomeTaxValue += pph;
                        this.data.IncomeTaxValueView += pphView;                    
                        this.data.VatValue += ppn;
                        this.data.VatValueView += ppnView;                    
                        this.data.DPP += dpp;
                        // this.data.Amount+=dpp+ppn+pph+this.data.MiscAmount;
                        this.data.Amount += Number(parseFloat((dpp + ppn + this.data.MiscAmount) - pph).toFixed(3));


                        //     }
                        // }
                    }
                }
                return this.data.DPP;
            }
            else return 0;
        }

    }
    set vatVal(v) { };
    get vatVal() {
        if (!this.readOnly) {
            if (this.data.Items) {
                this.data.Amount = 0;
                this.data.IncomeTaxValue = 0;
                this.data.IncomeTaxValueView = 0;
                this.data.DPP = 0;
                this.data.VatValue = 0;
                this.data.VatValueView = 0;
                for (var detail of this.data.Items) {
                    
                    if(detail.Items)
                        for (var item of detail.Items) {
                        // if(item.Details){
                        //     for(var detail of item.Details){
                        var pph = 0;
                        var pphView = 0;
                        var ppn = 0;
                        var ppnView = 0;
                        // var dpp = item.DPPValue? item.DPPValue:0;
                        var dpp = item.DPPValue != undefined || item.DPPValue != null ? item.DPPValue : 0;

                        if (item.IsIncomeTax) {
                        // var rate= item.IncomeTax ? item.IncomeTax.Rate : 0;
                        // pph=parseFloat(detail.PriceTotal)*parseFloat(rate)*0.01;
                        pphView = item.IncomeTaxValueView;
                        }
                        if (item.IsPayIncomeTax) {
                            // var rate= item.IncomeTax ? item.IncomeTax.Rate : 0;
                            // pph=parseFloat(detail.PriceTotal)*parseFloat(rate)*0.01;
                            pph = item.IncomeTaxValue;
                        }
                        if (item.IsPayVAT) {
                            // ppn=detail.PriceTotal*0.1;
                            ppn = item.VatValue;
                        }
                        if (item.IsUseVat) {
                            // ppn=detail.PriceTotal*0.1;
                            ppnView = item.VatValueView;
                        }
                        this.data.IncomeTaxValue += pph;
                        this.data.IncomeTaxValueView += pphView;                    
                        this.data.VatValue += ppn;
                        this.data.VatValueView += ppnView;                    
                        this.data.DPP += dpp;
                        // this.data.Amount+=dpp+ppn+pph+this.data.MiscAmount;
                        this.data.Amount += Number(parseFloat((dpp + ppn + this.data.MiscAmount) - pph).toFixed(3));


                        //     }
                        // }
                    }
                }
                    return this.data.VatValue;
            }
            else return 0;
        }
    }

    set vatValView(v) { };
    get vatValView() {
        if (!this.readOnly) {
            if (this.data.Items) {
                this.data.Amount = 0;
                this.data.IncomeTaxValue = 0;
                this.data.IncomeTaxValueView = 0;                
                this.data.DPP = 0;
                this.data.VatValue = 0;
                this.data.VatValueView = 0;
                for (var detail of this.data.Items) {
                    
                    if(detail.Items)
                        for (var item of detail.Items) {
                    // if(item.Details){
                    //     for(var detail of item.Details){
                    var pph = 0;
                    var pphView =0;
                    var ppn = 0;
                    var ppnView = 0;
                    // var dpp = item.DPPValue? item.DPPValue:0;
                    var dpp = item.DPPValue != undefined || item.DPPValue != null ? item.DPPValue : 0;

                    if (item.IsIncomeTax) {
                      // var rate= item.IncomeTax ? item.IncomeTax.Rate : 0;
                      // pph=parseFloat(detail.PriceTotal)*parseFloat(rate)*0.01;
                      pphView = item.IncomeTaxValueView;
                    }
                    if (item.IsPayIncomeTax) {
                        // var rate= item.IncomeTax ? item.IncomeTax.Rate : 0;
                        // pph=parseFloat(detail.PriceTotal)*parseFloat(rate)*0.01;
                        pph = item.IncomeTaxValue;
                    }
                    if (item.IsPayVAT) {
                        // ppn=detail.PriceTotal*0.1;
                        ppn = item.VatValue;
                    }
                    if (item.IsUseVat) {
                        // ppn=detail.PriceTotal*0.1;
                        ppnView = item.VatValueView;
                    }
                    this.data.IncomeTaxValue += pph;
                    this.data.IncomeTaxValueView += pph;
                    
                    this.data.VatValue += ppn;
                    this.data.VatValueView += ppnView;                    
                    this.data.DPP += dpp;
                    // this.data.Amount+=dpp+ppn+pph+this.data.MiscAmount;
                    this.data.Amount += Number(parseFloat((dpp + ppn + this.data.MiscAmount) - pph).toFixed(3));


                    //     }
                    // }
                }
            }
                return this.data.VatValueView;
            }
            else return 0;
        }
    }
    set incomeTaxVal(v) { };
    get incomeTaxVal() {
        if (!this.readOnly) {
            if (this.data.Items) {
                this.data.Amount = 0;
                this.data.IncomeTaxValue = 0;
                this.data.IncomeTaxValueView = 0;                
                this.data.DPP = 0;
                this.data.VatValue = 0;
                this.data.VatValueView =0;
                for (var detail of this.data.Items) {
                    
                    if(detail.Items)
                        for (var item of detail.Items) {
                    // if(item.Details){
                    //     for(var detail of item.Details){
                    var pph = 0;
                    var pphView = 0;
                    var ppn = 0;
                    var ppnView = 0;
                    // var dpp = item.DPPValue? item.DPPValue:0;
                    var dpp = item.DPPValue != undefined || item.DPPValue != null ? item.DPPValue : 0;

                    if (item.IsIncomeTax) {
                      // var rate= item.IncomeTax ? item.IncomeTax.Rate : 0;
                      // pph=parseFloat(detail.PriceTotal)*parseFloat(rate)*0.01;
                      pphView = item.IncomeTaxValueView;
                    }
                    if (item.IsPayIncomeTax) {
                        // var rate= item.IncomeTax ? item.IncomeTax.Rate : 0;
                        // pph=parseFloat(detail.PriceTotal)*parseFloat(rate)*0.01;
                        pph = item.IncomeTaxValue;
                    }
                    if (item.IsPayVAT) {
                        // ppn=detail.PriceTotal*0.1;
                        ppn = item.VatValue;
                    }
                    if (item.IsUseVat) {
                        // ppn=detail.PriceTotal*0.1;
                        ppnView = item.VatValueView;
                    }
                    this.data.IncomeTaxValue += pph;
                    this.data.IncomeTaxValueView += pphView;                    
                    this.data.VatValue += ppn;
                    this.data.VatValueView += ppnView;                    
                    this.data.DPP += dpp;
                    this.data.Amount += Number(parseFloat((dpp + ppn + this.data.MiscAmount) - pph).toFixed(3));

                    //     }
                    // }
                }
            }
                return this.data.IncomeTaxValue;
            }
            else return 0;

        }
    }

    set incomeTaxValView(v) { };
    get incomeTaxValView() {
        if (!this.readOnly) {
            if (this.data.Items) {
                this.data.Amount = 0;
                this.data.IncomeTaxValue = 0;
                this.data.IncomeTaxValueView = 0;                
                this.data.DPP = 0;
                this.data.VatValue = 0;
                this.data.VatValueView =0;
                for (var detail of this.data.Items) {
                    
                    if(detail.Items)
                        for (var item of detail.Items) {
                    // if(item.Details){
                    //     for(var detail of item.Details){
                    var pph = 0;
                    var pphView = 0;
                    var ppn = 0;
                    var ppnView = 0;
                    // var dpp = item.DPPValue? item.DPPValue:0;
                    var dpp = item.DPPValue != undefined || item.DPPValue != null ? item.DPPValue : 0;

                    if (item.IsIncomeTax) {
                      // var rate= item.IncomeTax ? item.IncomeTax.Rate : 0;
                      // pph=parseFloat(detail.PriceTotal)*parseFloat(rate)*0.01;
                      pphView = item.IncomeTaxValueView;
                    }
                    if (item.IsPayIncomeTax) {
                        // var rate= item.IncomeTax ? item.IncomeTax.Rate : 0;
                        // pph=parseFloat(detail.PriceTotal)*parseFloat(rate)*0.01;
                        pph = item.IncomeTaxValue;
                    }
                    if (item.IsPayVAT) {
                        // ppn=detail.PriceTotal*0.1;
                        ppn = item.VatValue;
                    }
                    if (item.IsUseVat) {
                        // ppn=detail.PriceTotal*0.1;
                        ppnView = item.VatValueView;
                    }
                    this.data.IncomeTaxValue += pph;
                    this.data.IncomeTaxValueView += pphView;                    
                    this.data.VatValue += ppn;
                    this.data.VatValueView += ppnView;                    
                    this.data.DPP += dpp;
                    this.data.Amount += Number(parseFloat((dpp + ppn + this.data.MiscAmount) - pph).toFixed(3));

                    //     }
                    // }
                }
            }
                return this.data.IncomeTaxValueView;
        }
            else return 0;

        }
    }

     get accountSignatureLoader1() {
            return (keyword) => accountSignatureLoader(keyword, { Position: "Manager Purchasing" }); //Username ganti dengan jabatan atau posisi dari Account Signature yang diinginkan
        }
    
    ApprovedManagerView = (unit) => {
        return `${unit.UserName}`;
    }
        
    IsApprovedManagerChanged(newValue) {
        this.IsApprovedManager = newValue;
        if (this.IsApprovedManager){
        this.data.ApprovedManagerBy = this.IsApprovedManager.UserName;
        }else{
        this.data.ApprovedManagerBy = "";
        this.IsApprovedManager = null;
        }
    }

    onAddDocument() {
      this.data.DocumentsFile.push("");
      this.data.DocumentsFileName.push("");
      this.documentsPathTemp.push("");
      
      if (!this.error.DocumentsFile) {
          this.error.DocumentsFile = [];
      }
      this.error.DocumentsFile.push("");
  }

  onRemoveDocument(index) {
      this.data.DocumentsFile.splice(index, 1);
      this.data.DocumentsFileName.splice(index, 1);
      this.documentsPathTemp.splice(index, 1);
      
    
      if (this.error.DocumentsFile && this.error.DocumentsFile.length > index) {
          this.error.DocumentsFile.splice(index, 1);
      }
  }

  downloadDocument(index) {
      const linkSource = this.data.DocumentsFile[index];
      const downloadLink = document.createElement("a");
      const fileName = this.data.DocumentsFileName[index];

      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
  }

  documentInputChanged(index) {
      let documentInput = document.getElementById('documentInput' + index);

      if (documentInput.files[0]) {
          let reader = new FileReader();
          reader.onload = event => {
              let base64Document = event.target.result;
              const base64Content = base64Document.substring(base64Document.indexOf(',') + 1);
              if (base64Content.length * 6 / 8 > 52428800) {
                  documentInput.value = "";
                  this.data.DocumentsFile[index] = "";
                  this.data.DocumentsFileName[index] = "";
                  alert("Maximum Document Size is 50 MB")
              } else {
                  this.data.DocumentsFile[index] = base64Document;
                  this.data.DocumentsFileName[index] = documentInput.value.replace(/^.*[\\\/]/, '');
                  
                  if (this.error.DocumentsFile && this.error.DocumentsFile[index]) {
                      this.error.DocumentsFile[index] = "";
                  }
              }
          }
          reader.readAsDataURL(documentInput.files[0]);
      }
  }

  validateDocuments() {
      let isValid = true;
      
     
      if (!this.error.DocumentsFile) {
          this.error.DocumentsFile = [];
      }
      
      if (this.data.DocumentsFileName && this.data.DocumentsFileName.length > 0) {
          for (let i = 0; i < this.data.DocumentsFileName.length; i++) {
          
              if (!this.data.DocumentsFile[i] || this.data.DocumentsFile[i] === "") {
           
                  if (!this.documentsPathTemp[i] || this.documentsPathTemp[i] === "") {
                      this.error.DocumentsFile[i] = "File harus di-upload";
                      isValid = false;
                  }
              } else {
                  
                  this.error.DocumentsFile[i] = "";
              }
          }
      }
      
      return isValid;
  }

  //atur review dan ukuran pop up
  updatePreviewSize() {
          const modalDialog = document.querySelector('#pdfPreviewModal .modal-dialog');
          const embed = document.getElementById('pdfEmbed');
          const excelDiv = document.getElementById('excelTable');
          const imagePreview = document.getElementById('imagePreview');
          
          if (modalDialog) {
              modalDialog.style.width = `${this.previewWidth}%`;
              modalDialog.style.maxWidth = `${this.previewWidth}%`;
          }
          if (embed) {
              embed.style.height = `${this.previewHeight}px`;
          }
          if (excelDiv) {
              excelDiv.style.maxHeight = `${this.previewHeight}px`;
          }
          if (imagePreview) {
              imagePreview.style.maxHeight = `${this.previewHeight}px`;
          }
      }
  
      initResizable() {
          const modal = document.getElementById('pdfPreviewModal');
          if (!modal) return;
          const handles = modal.querySelectorAll('.resize-handle');         
          handles.forEach(handle => {
              handle.addEventListener('mousedown', (e) => {
                  e.preventDefault();
                  this.isResizing = true;
                  this.resizeDirection = handle.dataset.direction;
                  this.startX = e.clientX;
                  this.startY = e.clientY;
                  
                  const modalDialog = modal.querySelector('.modal-dialog');
                  const rect = modalDialog.getBoundingClientRect();
                  this.startWidth = rect.width;
                  this.startHeight = this.previewHeight;
                
                  document.addEventListener('mousemove', this.handleResize);
                  document.addEventListener('mouseup', this.stopResize);
                  
                  modalDialog.style.transition = 'none';
              });
          });
      }
  
      handleResize = (e) => {
          if (!this.isResizing) return;
          
          const deltaX = e.clientX - this.startX;
          const deltaY = e.clientY - this.startY;
          const modalDialog = document.querySelector('#pdfPreviewModal .modal-dialog');
          
          if (this.resizeDirection.includes('e')) {
              const newWidth = this.startWidth + deltaX;
              const windowWidth = window.innerWidth;
              const widthPercent = Math.max(30, Math.min(100, (newWidth / windowWidth) * 100));
              this.previewWidth = Math.round(widthPercent);
          }
          
          if (this.resizeDirection.includes('w')) {
              const newWidth = this.startWidth - deltaX;
              const windowWidth = window.innerWidth;
              const widthPercent = Math.max(30, Math.min(100, (newWidth / windowWidth) * 100));
              this.previewWidth = Math.round(widthPercent);
          }
          
          if (this.resizeDirection.includes('s')) {
              const newHeight = this.startHeight + deltaY;
              this.previewHeight = Math.max(300, Math.min(1000, Math.round(newHeight)));
          }
          
          if (this.resizeDirection.includes('n')) {
              const newHeight = this.startHeight - deltaY;
              this.previewHeight = Math.max(300, Math.min(1000, Math.round(newHeight)));
          }
          
          this.updatePreviewSize();
      }
  
      stopResize = () => {
          if (this.isResizing) {
              this.isResizing = false;
              this.resizeDirection = null;
              
              const modalDialog = document.querySelector('#pdfPreviewModal .modal-dialog');
              if (modalDialog) {
                  modalDialog.style.transition = '';
              }
              
              document.removeEventListener('mousemove', this.handleResize);
              document.removeEventListener('mouseup', this.stopResize);
          }
      }
  
      previewDocument(index) {
          const fileUrl = this.data.DocumentsFile[index];
          const fileName = this.data.DocumentsFileName[index];
          const embed = document.getElementById('pdfEmbed');
          const excelDiv = document.getElementById('excelTable');
          const imagePreview = document.getElementById('imagePreview');
          const modalLabel = document.getElementById('previewModalLabel');
  
          const lowerFileName = fileName.toLowerCase();
          if (lowerFileName.endsWith('.pdf')) {
              modalLabel.innerText = 'Preview PDF';
              embed.src = fileUrl;
              embed.style.display = 'block';
              excelDiv.style.display = 'none';
              imagePreview.style.display = 'none';
              this.updatePreviewSize();
              $('#pdfPreviewModal').modal('show');
              setTimeout(() => this.initResizable(), 100);
          } else if (lowerFileName.endsWith('.xlsx') || lowerFileName.endsWith('.xls')) {
              modalLabel.innerText = 'Preview Excel';
              embed.style.display = 'none';
              excelDiv.style.display = 'block';
              imagePreview.style.display = 'none';
              excelDiv.innerHTML = '<p>Loading Excel...</p>';
  
              fetch(fileUrl)
                  .then(response => response.arrayBuffer())
                  .then(data => {
                      const workbook = XLSX.read(data, { type: 'array' });
                      const sheetName = workbook.SheetNames[0];
                      const worksheet = workbook.Sheets[sheetName];
                      const html = XLSX.utils.sheet_to_html(worksheet);
                      excelDiv.innerHTML = html;
                  })
                  .catch(error => {
                      excelDiv.innerHTML = '<p>Error loading Excel file.</p>';
                      console.error('Error fetching or parsing Excel:', error);
                  });
  
              this.updatePreviewSize();
              $('#pdfPreviewModal').modal('show');
              setTimeout(() => this.initResizable(), 100);
          } else if (lowerFileName.endsWith('.jpg') || lowerFileName.endsWith('.jpeg') || lowerFileName.endsWith('.png') || lowerFileName.endsWith('.gif') || lowerFileName.endsWith('.bmp') || lowerFileName.endsWith('.webp')) {
              modalLabel.innerText = 'Preview Image';
              imagePreview.src = fileUrl;
              embed.style.display = 'none';
              excelDiv.style.display = 'none';
              imagePreview.style.display = 'block';
              this.updatePreviewSize();
              $('#pdfPreviewModal').modal('show');
              setTimeout(() => this.initResizable(), 100);
          } else {
              alert('Preview not supported for this file type.');
          }
      }

}
