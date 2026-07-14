import { inject, bindable } from "aurelia-framework";
import { Service, GarmentService } from "./service";

@inject(Service, GarmentService)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable show;

  formOptions = {
    cancelText: "Kembali",
    saveText: "Close Order Subcon",
    deleteText: "Hapus",
    //editText: "Ubah"
  };

  constructor(service, garmentService) {
    this.service = service;
    this.garmentService = garmentService;

    this.showDetail = false;
    this.isSearching = false;
  }

  formatDate(value) {
  if (!value) {
      return null;
    }
    return String(value).split("T")[0];
  }

  bind(context) {
    this.context = context || {};

    this.data = this.context.data || {};
    this.error = this.context.error || {};
    this.context.data = this.data;
    this.context.error = this.error;
    this.data.DeliveryDate = this.formatDate(this.data.DeliveryDate);
    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;

    this.showDetail = Boolean(
      this.data.RoNo &&
      (
        this.data.Article ||
        this.data.Comodity ||
        this.data.Buyer ||
        this.data.Quantity !== null &&
        this.data.Quantity !== undefined ||
        this.data.DeliveryDate
      )
    );
  }

  async searching() {
    if (this.isSearching) {
      return;
    }

    const roNo = String(this.data.RoNo || "").trim();

    this.clearError();
    this.clearDetail();

    if (!roNo) {
      this.error.RoNo = "No. RO wajib diisi.";
      return;
    }
    this.data.RoNo = roNo;
    this.isSearching = true;

    try {
      const cuttingResult = await this.garmentService.searchCutting({
        page: 1,
        size: 10,
        filter: JSON.stringify({
          RONo: roNo
        })
      });

      const cuttingData = (cuttingResult.data || []).find(item =>
        this.normalize(item.RONo) === this.normalize(roNo)
      );

      if (!cuttingData) {
        this.error.RoNo =
          `No. RO "${roNo}" tidak ditemukan.`;

        return;
      }
      const costResult = await this.service.searchCC({
        page: 1,
        size: 10,
        filter: JSON.stringify({
          RO_Number: roNo
        })
      });

      const costCalculation = (costResult.data || []).find(item =>
        this.normalize(item.RO_Number) === this.normalize(roNo)
      );

      if (!costCalculation) {
        this.error.RoNo =
          `RO "${roNo}" ditemukan pada Cutting In, tetapi Cost Calculation tidak ditemukan.`;

        return;
      }
      this.data.Article = costCalculation.Article || "";
      this.data.Comodity = costCalculation.Comodity.Name;
      this.data.Buyer = costCalculation.Buyer.Name;
      this.data.BuyerBrand = costCalculation.BuyerBrand.Name;
      this.data.Quantity = costCalculation.Quantity;
      const rawDeliveryDate = costCalculation.DeliveryDate;
      this.data.DeliveryDate = rawDeliveryDate
        ? new Date(new Date(rawDeliveryDate).getTime() + 7 * 3600000).toISOString().slice(0, 10)
        : null;
      this.showDetail = true;
    } catch (error) {
      this.clearDetail();
      this.error.RoNo =
        error && error.message
          ? error.message
          : "Pencarian RO gagal. Periksa koneksi atau layanan API.";
    } finally {
      this.isSearching = false;
    }
  }

  reset() {
    if (this.isSearching) {
      return;
    }
    this.data.RoNo = null;
    this.clearDetail();
    this.clearError();
  }

  clearDetail() {
    this.data.Article = null;
    this.data.Comodity = null;
    this.data.Buyer = null;
    this.data.BuyerBrand = null;
    this.data.Quantity = null;
    this.data.DeliveryDate = null;
    this.showDetail = false;
  }

  clearError() {
    this.error = {};
    this.context.error = this.error;
  }

  normalize(value) {
    return String(value || "")
      .trim()
      .toUpperCase();
  }
}
