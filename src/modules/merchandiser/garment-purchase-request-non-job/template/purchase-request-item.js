import {inject, computedFrom} from 'aurelia-framework';
import {bindable} from 'aurelia-framework'
import {CoreService} from '../service';
import numeral from 'numeral';
let CategoryLoader = require('../../../../loader/garment-category-loader');
let UomLoader = require('../../../../loader/uom-loader');

@inject(CoreService)
export class PurchaseRequestItem {
  @bindable selectedCategory;
  @bindable selectedComposition;
  @bindable selectedConst;
  @bindable selectedYarn;
  @bindable selectedWidth;
  @bindable selectedUom;
  @bindable isImport;
  @bindable isCMT;

  get categoryLoader() {
    return CategoryLoader;
  }

  get compositionLoader() {
    return (keyword) => this.coreService.getGarmentProductsDistinctDescription(keyword, JSON.stringify({ Name: "FABRIC", ManufactureType: this.isCMT ? "CMT" : "FOB", OriginType: this.isImport ? "IMPORT" : "LOKAL" })).then(result => {
      // result = result.filter(item => item.OriginType === (this.isImport ? "IMPORT" : "LOKAL") && item.ManufactureType === (this.isCMT ? "CMT" : "FOB"));
      return result;
    });
  }

  get constLoader() {
    return (keyword) => this.coreService.getGarmentProductConsts(keyword, JSON.stringify(this.constFilter)).then(result => {
      // result = result.filter(item => item.OriginType === (this.isImport ? "IMPORT" : "LOKAL") && item.ManufactureType === (this.isCMT ? "CMT" : "FOB"));
      return result;
    });
  }

  get yarnLoader() {
    return (keyword) => this.coreService.getGarmentProductYarns(keyword, JSON.stringify(this.yarnFilter)).then(result => {
      // result = result.filter(item => item.OriginType === (this.isImport ? "IMPORT" : "LOKAL") && item.ManufactureType === (this.isCMT ? "CMT" : "FOB"));
      return result;
    });
  }

  get widthLoader() {
    return (keyword) => this.coreService.getGarmentProductWidths(keyword, JSON.stringify(this.widthFilter)).then(result =>{
      result = result.filter(item => item.OriginType === (this.isImport ? "IMPORT" : "LOKAL") && item.ManufactureType === (this.isCMT ? "CMT" : "FOB")); 
      return result;
    });
  }

  get uomLoader() {
    return UomLoader;
  }

  @computedFrom("data.Product")
  get product() {
    if (this.data && this.data.Product && this.data.Product.Code) {
      return this.data.Product.Code;
    } else {
      return "-";
    }
  }

  // @computedFrom("data.Uom")
  // get uom() {
  //   if (this.data.Uom) {
  //     return this.data.Uom.Unit;
  //   } else {
  //     return "-";
  //   }
  // }

  @computedFrom("data.Quantity", "data.BudgetPrice", "data.PriceConversion")
  get total() {
    this.data.RemainingQuantity = this.data.Quantity;
    if (this.data.PriceConversion > 0) {
      let total = this.data.Quantity * this.data.BudgetPrice / this.data.PriceConversion;
      return numeral(total).format("0,000.00");
    } else {
      return 0;
    }
  }

  @computedFrom("data.Composition")
  get constFilter() {
    let filter = { Name: "FABRIC", ManufactureType: this.isCMT ? "CMT" : "FOB", OriginType: this.isImport ? "IMPORT" : "LOKAL" };
    if (this.data.Composition) {
      filter.Composition = this.data.Composition.Composition;
      filter.OriginType = this.isImport ? "IMPORT" : "LOKAL";
      filter.ManufactureType = this.isCMT ? "CMT" : "FOB";
    } else {
      filter.Composition = "this.data.Composition.Composition";
      filter.OriginType = this.isImport ? "IMPORT" : "LOKAL";
      filter.ManufactureType = this.isCMT ? "CMT" : "FOB";
    }
    return filter;
  }

  @computedFrom("data.Const")
  get yarnFilter() {
    let filter = this.constFilter;
    if (this.data.Const) {
      filter.Const = this.data.Const.Const;
    } else {
      filter.Const = "this.data.Const.Const";
    }
    return filter;
  }

  @computedFrom("data.Yarn")
  get widthFilter() {
    let filter = this.yarnFilter;
    if (this.data.Yarn) {
      filter.Yarn = this.data.Yarn.Yarn;
    } else {
      filter.Yarn = "this.data.Yarn.Yarn";
    }
    return filter;
  }

  controlOptions = {
    control: {
      length: 12
    }
  };

  constructor(coreService) {
    this.coreService = coreService;
  }

  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;

    this.readOnly = this.options.readOnly;
    this.isEdit = context.context.options.isEdit && this.data.Id > 0;
    
    if (this.data) {
      this.selectedCategory = this.data.Category;
      this.selectedComposition = this.data.Composition;
      this.selectedConst = this.data.Const;
      this.selectedYarn = this.data.Yarn;
      this.selectedWidth = this.data.Width;
      this.selectedUom = this.data.Uom;
    }
    if (!this.data.IsImport && !this.isImport) {
      this.data.IsImport = false;
    }
    this.isImport = this.data.IsImport;
    this.isCMT = this.data.IsCMT;

  }

  bind(context) {
    this.compositionViewModel = context.compositionViewModel;
    this.constViewModel = context.constViewModel;
    this.yarnViewModel = context.yarnViewModel;
    this.widthViewModel = context.widthViewModel;
    this.categoryViewModel = context.categoryViewModel;
  }

  isCMTChanged(newValue, oldValue) {
    if (!this.data) {
      return;
    }
    if (newValue === oldValue) {
      return;
    }
    this.isCMT = newValue;
    this.data.IsCMT = newValue;

    this.data.Product = null;

    this.selectedCategory = null;
    this.selectedComposition = null;
    this.selectedConst = null;
    this.selectedYarn = null;
    this.selectedWidth = null;

    if (this.categoryViewModel) {
      this.categoryViewModel.editorValue = "";
      this.categoryViewModel = null;
    }
    if (this.compositionViewModel) {
      this.compositionViewModel.editorValue = "";
      this.compositionViewModel = null;
    }

    if (this.constViewModel) {
      this.constViewModel.editorValue = "";
      this.constViewModel = null;
    }

    if (this.yarnViewModel) {
      this.yarnViewModel.editorValue = "";
      this.yarnViewModel = null;
    }

    if (this.widthViewModel) {
      this.widthViewModel.editorValue = "";
      this.widthViewModel = null;
    }

  }

  isImportChanged(newValue, oldValue) {
    if (!this.data) {
      return;
    }
    if(newValue ===  oldValue) {
      return;
    }
    this.data.IsImport = newValue;

    this.data.Product = null;

    this.selectedCategory = null;
    this.selectedComposition = null;
    this.selectedConst = null;
    this.selectedYarn = null;
    this.selectedWidth = null;

    if (this.categoryViewModel) {
      this.categoryViewModel.editorValue = "";
      this.categoryViewModel._suggestions = [];
    }

    if (this.compositionViewModel) {
      this.compositionViewModel.editorValue = "";
      this.compositionViewModel._suggestions = [];
    }

    if (this.constViewModel) {
      this.constViewModel.editorValue = "";
      this.constViewModel._suggestions = [];
    }

    if (this.yarnViewModel) {
      this.yarnViewModel.editorValue = "";
      this.yarnViewModel._suggestions = [];
    }

    if (this.widthViewModel) {
      this.widthViewModel.editorValue = "";
      this.widthViewModel._suggestions = [];
    }
  }

  async selectedCategoryChanged(newValue) {
    if (newValue) {
      this.data.Category = newValue;

      if (this.data.Category.Name !== "FABRIC") {
        this.coreService.getProductByName(this.data.Category.Name)
          .then(product => {
              
              var dataIsImport = this.data.IsImport ? "IMPORT" : "LOKAL";
              var dataManufacture = this.data.IsCMT ? "CMT" : "FOB";

              if (
                  product &&
                  product.OriginType === dataIsImport &&
                  product.ManufactureType === dataManufacture
              ) {
                  this.data.Product = product;
              } else {
                  this.data.Product = {
                      IsError: true,
                      ErrorMessage:
                          `Tidak ditemukan produk ${this.data.Category.Name} ${dataManufacture} asal ${dataIsImport}`
                  };
              }
          });
      } else {
        this.data.Product = null;
      }
    } else {
      this.data.Category = null;
      this.data.Product = null;
      // this.data.Uom = null;
    }
    if (this.compositionViewModel) {
      this.compositionViewModel.editorValue = "";
      this.compositionViewModel._suggestions = [];
    }
    this.selectedComposition = null;
  }

  selectedCompositionChanged(newValue) {
    if (newValue) {
      this.data.Composition = newValue;
    }
    else {
      this.data.Composition = null;
    }
    if (this.constViewModel) {
      this.constViewModel.editorValue = "";
      this.constViewModel._suggestions = [];
    }
    this.selectedConst = null;
  }

  selectedConstChanged(newValue) {
    if (newValue) {
      this.data.Const = newValue;
    }
    else {
      this.data.Const = null;
    }
    if (this.yarnViewModel) {
      this.yarnViewModel.editorValue = "";
      this.yarnViewModel._suggestions = [];
    }
    this.selectedYarn = null;
  }

  selectedYarnChanged(newValue) {
    if (newValue) {
      this.data.Yarn = newValue;
    }
    else {
      this.data.Yarn = null;
    }
    if (this.widthViewModel) {
      this.widthViewModel.editorValue = "";
      this.widthViewModel._suggestions = [];
    }
    this.selectedWidth = null;
  }

  selectedWidthChanged(newValue) {
    if (newValue) {
      this.data.Width = newValue;
      this.data.Product = this.data.Width;
      // this.data.Uom = {
      //   // Id: this.data.Product.UomId,
      //   // Unit: this.data.Product.UomUnit
      //   Id: 1,
      //   Unit: "MT"
      // };
    }
    else {
      this.data.Width = null;
      this.data.Product = null;
      // this.data.Uom = null;
    }
  }

  selectedUomChanged(newValue) {
  
    this.data.Uom = {
      Id :newValue.Id,
      Unit : newValue.Unit
    } ;
    this.data.PriceUom = newValue;
    this.data.PriceConversion = 1;
  }
}