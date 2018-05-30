import { Router } from 'aurelia-router';
import { Service } from './service';
import { inject, bindable, computedFrom, BindingEngine } from 'aurelia-framework';
const costCalculationGarmentLoader = require('../../../loader/cost-calculation-garment-loader');

@inject(Router, Service, BindingEngine)
export class DataForm {

  length2 = {
    label: {
      align: "left",
      length: 2
    }
  }
  length4 = {
    label: {
      align: "left",
      length: 4
    }
  }
  CCG_M_FabricInfo = {
    columns: [
      { header: "Fabric", value: "Category" },
      { header: "Name", value: "Material" },
      { header: "Description", value: "Description" },
      { header: "Quantity", value: "Quantity" },
      { header: "Remark", value: "Information" }
    ]
  }
  CCG_M_AccessoriesInfo = {
    columns: [
      { header: "Accessories  ", value: "Category" },
      { header: "Name", value: "Material" },
      { header: "Description", value: "Description" },
      { header: "Quantity", value: "Quantity" },
      { header: "Remark", value: "Information" }
    ]
  }
  CCG_M_RateInfo = {
    columns: [
      { header: "Ongkos", value: "Category" },
      { header: "Name", value: "Material" },
      { header: "Description", value: "Description" },
      { header: "Quantity", value: "Quantity" },
      { header: "Remark", value: "Information" }
    ]
  }
  RO_Garment_SizeBreakdownsInfo = {
    columns: [
      { header: "Color", value: "Color" },
      { header: "Size Range", value: "RO_Garment_SizeBreakdowns_Detail" },
    ],
    options: { readOnly: this.readOnly },
    onAdd: function () {
      this.data.RO_Garment_SizeBreakdowns.push({});
    }.bind(this)
  };

  @bindable title;
  @bindable data = {};
  @bindable error = {};
  @bindable readOnly;
  disabled = true;
  shown = false;

  @bindable costCalculationGarment;
  CCG_M_Fabric = [];
  CCG_M_Accessories = [];
  CCG_M_Rate = [];

  @computedFrom("data.Id")
  get isEdit() {
    return (this.data.Id || '').toString() != '';
  }

  get costCalculationGarmentLoader() {
    return costCalculationGarmentLoader;
  }

  get filterCostCalculationGarment() {
    return { "RO_GarmentId": null }
  }

  constructor(router, service, bindingEngine) {
    this.router = router;
    this.service = service;
    this.bindingEngine = bindingEngine;
  }

  @bindable imageUpload;
  imageUploadChanged(newValue) {
    let imageInput = document.getElementById('imageInput');
    let reader = new FileReader();
    reader.onload = event => {
      let base64Image = event.target.result;
      this.imagesSrc.push(base64Image);
      this.imagesSrcChanged(this.imagesSrc);
    }
    reader.readAsDataURL(imageInput.files[imageInput.files.length - 1]);
  }

  @bindable imagesSrc = [];
  imagesSrcChanged(newValue) {
    this.data.ImagesFile = [];
    newValue.forEach(imageSrc => {
      this.data.ImagesFile.push(imageSrc);
    })
  }

  removeImage(index) {
    this.imagesSrc.splice(index, 1);
    this.imagesSrcChanged(this.imagesSrc);
  }

  async bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;
    this.readOnly = this.context.readOnly ? this.context.readOnly : false;
    this.RO_Garment_SizeBreakdownsInfo.options.readOnly = this.readOnly;
    if (this.data.CostCalculationGarment) {
      this.costCalculationGarment = this.data.CostCalculationGarment;
    }
    this.data.ImagesFile = this.data.ImagesFile ? this.data.ImagesFile : [];
    this.data.ImagesName = this.data.ImagesName ? this.data.ImagesName : [];
    this.imagesSrc = this.data.ImagesFile.slice();
  }

  async costCalculationGarmentChanged(newValue) {
    if (newValue && newValue.Id) {
      if (!this.isEdit) {
        this.data.CostCalculationGarment = await this.service.getCostCalculationGarmentById(newValue.Id);
      }
      if (this.data.CostCalculationGarment.CostCalculationGarment_Materials.length !== 0) {
        this.CCG_M_Fabric = this.data.CostCalculationGarment.CostCalculationGarment_Materials.filter(item => item.Category.Name.toUpperCase() === "FAB");
        this.CCG_M_Accessories = this.data.CostCalculationGarment.CostCalculationGarment_Materials.filter(item => item.Category.Name.toUpperCase() === "ACC");
        this.CCG_M_Rate = this.data.CostCalculationGarment.CostCalculationGarment_Materials.filter(item => item.Category.Name.toUpperCase() === "ONG");
      }
    }
  }

  @computedFrom('data.CostCalculationGarment')
  get hasCostCalculationGarment() {
    return this.data.CostCalculationGarment && this.data.CostCalculationGarment.Id;
  }

  @computedFrom("CCG_M_Fabric")
  get hasCCG_M_Fabric() {
    return this.CCG_M_Fabric.length !== 0;
  }

  @computedFrom("CCG_M_Accessories")
  get hasCCG_M_Accessories() {
    return this.CCG_M_Accessories.length !== 0;
  }

  @computedFrom("CCG_M_Rate")
  get hasCCG_M_Rate() {
    return this.CCG_M_Rate.length !== 0;
  }

  get total() {
    this.data.Total = 0;
    if (this.data.RO_Garment_SizeBreakdowns) {
      this.data.RO_Garment_SizeBreakdowns.forEach(sb => {
        if (sb.RO_Garment_SizeBreakdown_Details) {
          sb.RO_Garment_SizeBreakdown_Details.forEach(sbd => {
            this.data.Total += sbd.Quantity;
          })
        }
      })
    }
    return this.data.Total;
  }
}
