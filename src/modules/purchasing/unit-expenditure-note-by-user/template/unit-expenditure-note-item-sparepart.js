import { bindable, computedFrom, inject, BindingEngine } from 'aurelia-framework'
import { Service } from "../service";
var PRLoader = require("../../../../loader/unit-receipt-loader");

@inject(BindingEngine)
export class UnitExpenditureNoteItem {

  constructor(bindingEngine) {
    this.bindingEngine = bindingEngine;
    this.subscription = null;
  }

  async activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = this.context.error;		
    // Prefer options from parent context (collection context.options)
    this.options = (this.context && this.context.context && this.context.context.options) || this.context.options || {};
    this.readOnly = this.options.readOnly || this.data.IsDisabled;
    this.data.selectedPRItem = this.data.PRNo;
    this.data.IsSave = !!this.data.IsSave;

    if (this.data.RemainingQuantity === undefined || this.data.RemainingQuantity === null) {
    this.data.RemainingQuantity = 0;
    }
 
    if (this.isEdit && this.data.URNItemId) {
      await this.loadRemainingQuantity();
    }

    this.isShowing = false;

    // Expand if there are initial validation errors
    if (this.error && Object.keys(this.error).some(k => this.error[k])) {
      this.isShowing = true;
    }

    // Simple observer: watch the `error` reference and auto-expand when any error appears
    this.subscription = this.bindingEngine.propertyObserver(this, 'error')
      .subscribe((newVal) => {
        if (newVal && Object.keys(newVal).some(k => newVal[k])) {
          this.isShowing = true;
        }
      });
  }

  unbind() {
    if (this.subscription && this.subscription.dispose) {
      this.subscription.dispose();
      this.subscription = null;
    }
  }

  toggle() {
		this.isShowing = !this.isShowing;
	}

   async loadRemainingQuantity() {
      try {
        const result = await PRLoader(this.data.PRNo || '');
        const urnItem = result.find(item => item.Id === this.data.URNItemId);
        if (urnItem) {
          this.data.RemainingQuantity = urnItem.RemainingQuantity || 0;
        } else {
          this.data.RemainingQuantity = 0;
        }
      } catch (error) {
        this.data.RemainingQuantity = 0;
      }
    }

  @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }

  changeCheckBox() {
    this.data.IsSave = !!this.data.IsSave;
  }

  removeItem() {
    // reset validation errors for this item
    if (this.error && typeof this.error === 'object') {
      Object.keys(this.error).forEach(key => {
        try {
          this.error[key] = undefined;
        } catch (e) {
          try { delete this.error[key]; } catch (ee) {}
        }
      });
    }

    // call parent remove if exists
    if (this.context && this.context.context && this.context.context.options && this.context.context.options.remove) {
      this.context.context.options.remove(this.data);
    }
  }

   @computedFrom("data.Id")
  get isEdit() {
    return (this.data.Id || '').toString() != '';
  }

  get usedPR() {
  if (!this.context.context || !this.context.context.items)
    return [];

  return this.context.context.items
    .filter(i => i.data && i.data.URNItemId)
    .map(i => i.data.URNItemId);
}

  get prLoader() {
    return async (keyword) => {
      // Build filter based on DivisionId and UnitId from Unit input
      const filter = {};
      
      if (this.options.divisionId) {
        filter.DivisionId = String(this.options.divisionId);
      }
      if (this.options.unitId) {
        filter.UnitId = String(this.options.unitId);
      }

      console.log("PR Loader Filter:", filter);

      const result = await PRLoader(keyword, filter);
      const usedPR = this.usedPR;
      
      // Filter locally based on DivisionId and UnitId if backend doesn't filter
      this.filteredPRItems = result.filter(item => {
        const matchDivision = !filter.DivisionId || item.DivisionId === filter.DivisionId;
        const matchUnit = !filter.UnitId || item.UnitId === filter.UnitId;
        return matchDivision && matchUnit && !usedPR.includes(item.Id);
      });
      
      return this.filteredPRItems;
    }
  }

  PRView = (data) => {
      return `${data.PRNo || data.prNo}-${data.ProductName}-${data.RemainingQuantity}`;
  }

unitPRChanged(e) {
    const item = this.data.selectedPRItem;
    if (!item) return;
    this.data.URNItemId = item.Id;
    this.data.PRId = item.PRId;
    this.data.PRNo = item.PRNo;
    this.data.EPODetailId = item.EPODetailId;
    this.data.EPOId = item.EPOId;
    this.data.EPONo = item.EPONo;
    this.data.DODetailId = item.DODetailId;
    this.data.ProductId = item.ProductId;
    this.data.ProductCode = item.ProductCode;
    this.data.ProductName = item.ProductName;
    this.data.ProductRemark = item.ProductRemark;
    this.data.RemainingQuantity = item.RemainingQuantity;
    this.data.CategoryId = item.CategoryId;
    this.data.CategoryName = item.CategoryName;
    this.data.CategoryCode = item.CategoryCode;
    this.data.Uom = item.Uom;
    this.data.UomId = item.UomId;
    this.data.PricePerDealUnit = item.PricePerDealUnit; 
    this.data.IsStorage = item.IsStorage;

    delete this.data.selectedPRItem;
}
}