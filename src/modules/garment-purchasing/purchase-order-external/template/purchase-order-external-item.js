import { bindable, computedFrom } from 'aurelia-framework'
import { factories } from 'powerbi-client';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

var UomLoader = require('../../../../loader/uom-loader');

const resource = 'master/garmentProducts';
const POresource = 'garment-internal-purchase-orders';
export class PurchaseOrderItem {
  @bindable selectedDealUom;
  @bindable price;
  @bindable qty;
  conversionError = '';
  masterMissing = false;
  async activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    this.isUseVat = this.context.context.options.isUseVat || false;
    this.checkOverBudget = this.context.context.options.checkOverBudget;
    this.kurs = this.context.context.options.kurs;
    this.selectedDealUom = this.data.dealUom;
    this.price = this.data.PricePerDealUnit;
    this.qty = this.data.DealQuantity;
    this.isEdit = this.context.context.options.isEdit || false;
    if (!this.data.budgetUsed) {
      this.data.budgetUsed = 0;
    }
    if (!this.data.totalBudget) {
      this.data.totalBudget = 0;
    }
    if (this.data.DealUom) {
      this.selectedDealUom = this.data.DealUom;
    }
    if (!this.data.SmallUom && this.data.Product) {
      if (this.data.Product.Id) {
        var config = Container.instance.get(Config);
        var endpoint = config.getEndpoint("core");
        var productUri = `${resource}/${this.data.Product.Id}`;
        await endpoint.find(productUri)
          .then((result) => {
            var product = result.data;
            this.data.SmallUom = product.UOM;
          });
      }
    }

    // BARU: tentukan apakah baris ini memakai konversi manual
    await this.detectManualConversion();

    if (!this.options.readOnly) {
      await this.loadConversion();
    }
    this.data.SmallQuantity = parseFloat(this.data.DealQuantity * this.data.Conversion).toFixed(2);
    if (!this.data.UsedBudget) {
      this.data.budgetUsed = (this.data.DealQuantity * this.data.PricePerDealUnit * this.kurs.Rate);
    }
    else {
      this.data.budgetUsed = this.data.UsedBudget;
    }
    // this.data.DefaultQuantity = parseFloat(this.data.DefaultQuantity).toFixed(2);
    // this.data.DealQuantity = parseFloat(this.data.DealQuantity).toFixed(2);
    // if(this.data.Id){
    //   if(this.data.POId){
    //     var config = Container.instance.get(Config);
    //     var endpoint = config.getEndpoint("purchasing-azure");
    //     var pOUri=`${POresource}/${this.data.POId}`;
    //     await endpoint.find(pOUri)
    //         .then((result) => {
    //           var PO=result.data;
    //           this.data.Initial=PO.remainingBudget+this.data.;
    //         });
    //   }
    // }
    if (this.options.readOnly) {
      this.data.PricePerDealUnit = parseFloat(this.data.PricePerDealUnit).toFixed(4);
    }

    // Store default values for comparison later
    if (this.data.Id) {
      this.defaultPricePerDealUnit = this.data.BudgetPrice;
    }
    else {
      this.defaultPricePerDealUnit = this.data.DefaultPricePerDealUnit;
    }
    this.defaultDealQuantity = this.data.DefaultQuantity;

    if (!this.options.readOnly)
      this.checkIsOverBudget();
  }

  bind() {
    if (this.context.context.options.resetOverBudget == true) {
      this.price = this.data.BudgetPrice;
      this.qty = this.data.DefaultQuantity;
      this.context.context.options.resetOverBudget = false;
      if (this.error) {
        if (this.error.overBudgetRemark) {
          this.error.overBudgetRemark = "";
        }
      }
    }
  }

  checkIsOverBudget() {
    if (!this.options.readOnly)
      if (this.context.context.options.checkOverBudget) {
        this.data.UsedBudget = parseFloat(this.data.budgetUsed.toFixed(4));

        var totalDealPrice = parseFloat((this.data.remainingBudget - parseFloat(this.data.budgetUsed.toFixed(4))).toFixed(4));

        if (this.data.UENItemId) {
          totalDealPrice = parseFloat((this.data.BudgetFromUEN - parseFloat(this.data.budgetUsed.toFixed(4))).toFixed(4));
        }
        if (totalDealPrice < 0) {
          this.data.IsOverBudget = true;

          let overBudgetAmount = [];
          if (this.defaultDealQuantity < this.data.DealQuantity && this.defaultPricePerDealUnit < (this.data.PricePerDealUnit * this.kurs.Rate)) {
            let remark = ["Selisih Qty", "Selisih Harga"];

            this.data.OverBudgetType = remark.map(r => `- ${r}`).join('\n');

            let OBQty = parseFloat((this.data.DealQuantity - this.defaultDealQuantity) * (this.data.PricePerDealUnit * this.kurs.Rate));
            let OBPrice = parseFloat(((this.data.PricePerDealUnit * this.kurs.Rate) - this.defaultPricePerDealUnit) * this.defaultDealQuantity);

            overBudgetAmount.push(OBQty, OBPrice);
            this.data.OverBudgetAmount = parseFloat((OBQty + OBPrice).toFixed(4));
          }
          else if (this.defaultDealQuantity < this.data.DealQuantity) {
            this.data.OverBudgetType = "- Selisih Qty";

            this.data.OverBudgetAmount = parseFloat((
              (this.data.DealQuantity * this.data.PricePerDealUnit * this.kurs.Rate) -
              (this.defaultDealQuantity * this.defaultPricePerDealUnit)
            ).toFixed(4));

            overBudgetAmount.push(this.data.OverBudgetAmount);
          }
          else if (this.defaultPricePerDealUnit < (this.data.PricePerDealUnit * this.kurs.Rate)) {
            this.data.OverBudgetType = "- Selisih Harga";

            this.data.OverBudgetAmount = parseFloat((
              (this.data.DealQuantity * this.data.PricePerDealUnit * this.kurs.Rate) -
              (this.defaultDealQuantity * this.defaultPricePerDealUnit)
            ).toFixed(4));

            //console.log("OverBudgetAmount", this.data.OverBudgetAmount);
            overBudgetAmount.push(this.data.OverBudgetAmount);
          }

          this.data.OverBudgetAmountStr = overBudgetAmount.map(r => `- ${r}`).join("\n")

        } else {
          this.data.IsOverBudget = false;
          this.data.OverBudgetRemark = "";
          this.data.OverBudgetType = "";
          this.data.OverBudgetAmountStr = "";
          this.data.OverBudgetAmount = 0;
        }
      }
  }

  updatePrice() {
    // if (this.data.UseIncomeTax) {
    //   this.data.PricePerDealUnit = (100 * this.price) / 110;
    // } else {
    //   this.data.PricePerDealUnit = this.price;
    // }
    this.checkIsOverBudget();
  }

  selectedDealUomChanged(newValue) {
    if (newValue && newValue.Id) {
      this.data.DealUom = newValue;
      if (this.options && !this.options.readOnly) this.loadConversion();
    }
  }

  get quantityConversion() {
    this.data.SmallQuantity = parseFloat(parseFloat(this.data.DealQuantity) * this.data.Conversion).toFixed(2);
    return this.data.SmallQuantity;
  }

  @computedFrom("data.Conversion")
  get conversionText() {
    var v = Number(this.data.Conversion);
    if (isNaN(v)) return '';
    return v.toLocaleString('id-ID', { minimumFractionDigits: 4, maximumFractionDigits: 4 });
  }

  conversionChanged(e) {
    this.data.SmallQuantity = parseFloat(parseFloat(this.data.DealQuantity) * this.data.Conversion).toFixed(2);
  }

  async findConversion(big, small) {
    var endpoint = Container.instance.get(Config).getEndpoint("core");
    var unitOf = (u) => (u.Unit || u.unit || '').toString().trim().toUpperCase();
    var result = await endpoint.find('master/uom-conversions', { keyword: unitOf(big), size: 100 });
    var list = (result && result.data) || [];
    return list.find(c =>
      (c.BigUomId === big.Id || (c.BigUomUnit || '').trim().toUpperCase() === unitOf(big)) &&
      (c.SmallUomId === small.Id || (c.SmallUomUnit || '').trim().toUpperCase() === unitOf(small))
    );
  }

  async loadConversion() {
    // BARU: kalau baris ini memakai konversi manual, jangan timpa dengan nilai master
    if (this.data.IsManualConversion) {
      this.conversionError = '';
      this.data.ConversionMissing = false;
      this.conversionChanged();
      return;
    }

    var big = this.data.DealUom;
    var small = this.data.SmallUom;
    if (!big || !small) return;

    var norm = (u) => (u.Unit || u.unit || '').toString().trim().toUpperCase();
    if (big.Id === small.Id || norm(big) === norm(small)) {
      this.data.Conversion = 1;
      this.data.ConversionMissing = false;
      this.masterMissing = false;
      this.conversionError = '';
    } else {
      try {
        var found = await this.findConversion(big, small);
        if (found) {
          this.data.Conversion = Number(found.Value);
          this.data.ConversionMissing = false;
          this.masterMissing = false;
          this.conversionError = '';
        } else {
          this.data.Conversion = 1;
          this.data.ConversionMissing = true;
          this.masterMissing = true;
          this.conversionError = 'Master Konversi Satuan Belum Dibuat';
        }
      } catch (e) {
        this.data.Conversion = 1;
        this.data.ConversionMissing = true;
        this.masterMissing = true;
        this.conversionError = 'Gagal mengambil Master Satuan Konversi';
      }
    }
    this.conversionChanged();
  }

  // BARU: dipanggil saat kotak centang konversi manual diubah
  manualConversionChanged(e) {
    // tunggu sampai checkbox selesai memperbarui nilai IsManualConversion
    setTimeout(() => {
      if (this.data.IsManualConversion) {
        this.conversionError = '';
        this.data.ConversionMissing = false;
        this.data.Conversion = 0;
        this.conversionChanged();
      } else {
        this.data.Conversion = 1;
        if (this.masterMissing) {
          this.data.ConversionMissing = true;
          this.conversionError = 'Master Konversi Satuan Belum Dibuat';
          this.conversionChanged();
        } else {
          this.loadConversion();
        }
      }
    }, 0);
  }

  // BARU: untuk baris yang sudah tersimpan, tentukan apakah konversinya manual
  // (nilai tersimpan berbeda dari master). Flag ini tidak tersimpan di database.
  async detectManualConversion() {
    if (this.data.IsManualConversion !== undefined) return;
    this.data.IsManualConversion = false;
    if (!this.data.Id) return;
    var big = this.data.DealUom;
    var small = this.data.SmallUom;
    if (!big || !small || !this.data.Conversion) return;
    var norm = (u) => (u.Unit || u.unit || '').toString().trim().toUpperCase();
    var master = null;
    if (big.Id === small.Id || norm(big) === norm(small)) {
      master = 1;
    } else {
      try {
        var found = await this.findConversion(big, small);
        if (found) master = Number(found.Value);
      } catch (e) {
        return;
      }
    }
    if (master === null) {
      this.masterMissing = true;
      if (Number(this.data.Conversion) !== 1) {
        this.data.IsManualConversion = true;
      }
    }
  }

  priceChanged(e) {
    if (e.detail)
      this.data.budgetUsed = parseFloat(e.detail) * parseFloat(this.data.DealQuantity) * this.kurs.Rate;
    else {
      this.data.budgetUsed = parseFloat(this.data.PricePerDealUnit) * parseFloat(this.data.DealQuantity) * this.kurs.Rate;
    }
    this.checkIsOverBudget();
  }

  qtyChanged(e) {
    if (e.detail)
      this.data.budgetUsed = parseFloat(e.detail) * parseFloat(this.data.PricePerDealUnit) * this.kurs.Rate;
    else {
      this.data.budgetUsed = parseFloat(this.data.PricePerDealUnit) * parseFloat(this.data.DealQuantity) * this.kurs.Rate;
    }
    // this.data.budgetUsed=parseFloat(e.srcElement.value)* this.data.PricePerDealUnit * this.kurs.Rate;
    this.checkIsOverBudget();
  }

  useIncomeTaxChanged(e) {
    this.checkIsOverBudget();
  }

  get uomLoader() {
    return UomLoader;
  }

  uomView = (uom) => {
    return uom.Unit
  }

  get prNo() {
    return `${this.data.PRNo} - ${this.data.PO_SerialNumber} - ${this.data.Article}`;
  }

  get product() {
    return this.data.Product.Name;
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}