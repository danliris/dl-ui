import {
  inject,
  bindable,
  containerless,
  computedFrom,
  BindingEngine,
} from "aurelia-framework";
import { Service } from "./service";
import { AuthService } from "aurelia-authentication";
var UnitLoader = require('../../../loader/unit-loader');
var UnitDeliveryOrderLoader = require("../../../loader/unit-receipt-loader");
import moment from "moment";

@containerless()
@inject(Service, BindingEngine, AuthService)
export class DataForm {
  @bindable readOnly = false;
  @bindable data = {};
  @bindable error = {};
  @bindable title;
  @bindable options = {};
  @bindable unitDeliveryOrder;
  @bindable unit;
  @bindable TypeUen;
  @bindable selectedAccount;
  @bindable selectedMechanic;


  uenTypes = [" ","Umum Garment", "Unit Umum Garment", "Sparepart"];
  controlOptions = {
    label: {
      align: "right",
      length: 5,
    },
    control: {
      length: 5,
      align: "right",
    },
  };

  constructor(service, bindingEngine, authService) {
    this.service = service;
    this.bindingEngine = bindingEngine;
    this.authService = authService;
  }

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;
    this.isItem = false;

    this.TypeUen = this.data.TypeUen || "";
    this.isItem = !!this.TypeUen;
    this.isItemSparepart = this.TypeUen === "Sparepart";
    this.isItemUnit = this.TypeUen === "Unit Umum Garment";

    // initialize visibility flags based on existing TypeUen (so view/edit shows correct fields)
    this.showNpk = this.TypeUen === "Unit Umum Garment" || this.TypeUen === "Sparepart";
    this.showWarehouseStaff = this.showNpk;
    this.showMechanicName = this.TypeUen === "Sparepart";

    this.selectedAccount = {
    _id: this.data.WarehouseStaffId,
    username: this.data.WarehouseStaff
  };

    this.selectedMechanic = {
      _id: this.data.MechanicId,
      username: this.data.MechanicName
    };

    if (!this.data.Items) {
      this.data.Items = [];
    }

    if (this.data.Items) console.log("items", this.data.Items);
    if (this.data.Items && this.data.Items.length > 0) {
      this.isItem = true;
    }

    this.options.readOnly = this.readOnly;
      
      this.options.add = this.addItems;


    this.options.remove = (item) => {
      if (!this.data.Items) return;
      var index = this.data.Items.indexOf(item);
      if (index > -1) this.data.Items.splice(index, 1);
    };

    this.readOnlySender = true;
    this.auInputOptions = this.controlOptions;
    this.expenditureDateSubscription = this.bindingEngine
      .propertyObserver(this.data, 'ExpenditureDate')
      .subscribe(() => {
        this.expenditureDateChanged();
      });

   
    if (this.data.unit) {
      this.unit = this.data.unit;
      if (this.data.unit.division) {
        this.options.divisionId = this.data.unit.division._id || this.data.unit.division.Id;
      }
      this.options.unitId = this.data.unit._id || this.data.unit.Id || this.data.unitId;
    }
   
    this.expenditureDateChanged();
  }

  expenditureDateChanged() {
    
  }

  uenTypeChanged(event) {
  
    this.data.TypeUen = this.TypeUen;

    this.unit = null;
    this.data.unit = null;
    this.data.unitId = null;
    this.options.unitId = null;
    this.options.divisionId = null;
    this.data.MechanicName = null;
    this.data.WarehouseStaffId = null;
    this.data.WarehouseStaff = null;
    this.selectedAccount = null;
    this.data.UnitReceipt = null;
    this.data.ReceiptName = null;
    this.data.NPKNo = null;
   
 
    // determine which additional fields to show
    this.showNpk = false;
    this.showWarehouseStaff = false;
    this.showMechanicName = false;

    if (this.TypeUen === "Unit Umum Garment") {
      this.showNpk = true;
      this.showWarehouseStaff = true;
    } else if (this.TypeUen === "Sparepart") {
      this.showNpk = true;
      this.showWarehouseStaff = true;
      this.showMechanicName = true;
    }

    if (!this.showNpk) this.data.NPKNo = undefined;
    if (!this.showWarehouseStaff) this.data.WarehouseStaff = undefined;
    if (!this.showMechanicName) this.data.MechanicName = undefined;

    // set isItem based on whether a type was selected
  }

  unitChanged(newValue, oldValue) {
        var _selectedUnit = newValue;

        if (_selectedUnit) {
            this.data.unit = _selectedUnit;
            
            this.data.unit._id = _selectedUnit.Id || _selectedUnit._id;
            this.data.unit.name = _selectedUnit.Name || _selectedUnit.name;
            this.data.unit.code = _selectedUnit.Code || _selectedUnit.code;
            this.data.unitId = _selectedUnit.Id || _selectedUnit._id || "";
            
            var division = _selectedUnit.Division || _selectedUnit.division;
            if (division) {
                this.data.unit.division = division;
                this.data.unit.division._id = division.Id || division._id;
                this.data.unit.division.name = division.Name || division.name;
                this.data.unit.division.code = division.Code || division.code;
                this.options.divisionId = division.Id || division._id;
            } else {
                this.options.divisionId = null;
            }
            this.options.unitId = _selectedUnit.Id || _selectedUnit._id;
            if (this.TypeUen === "Sparepart") {
              this.isItemSparepart = true;
              this.isItem = false;
              this.isItemUnit = false;
            } else if (this.TypeUen === "Unit Umum Garment")  
              {
              this.isItemUnit = true;
              this.isItem = false;
              this.isItemSparepart = false;
            } else {
              this.isItem = true;
              this.isItemSparepart = false;
              this.isItemUnit = false;
            }
        }
        else {
            this.data.unitId = null;
            this.options.divisionId = null;
            this.options.unitId = null;

            this.isItem = false;
            this.isItemSparepart = false;
            this.isItemUnit = false;
        }

    }

  get filterUnitDeliveryOrder() {
    var unitDeliveryOrderFilter = {
      IsUsed: false,
    };
    return unitDeliveryOrderFilter;
  }

  get unitLoader() {
          return UnitLoader;
      }

  get unitDeliveryOrderLoader() {
    return UnitDeliveryOrderLoader;
  }
 

    get items() {
    if (this.isItem) {
      return {
        columns: [
          "No PR",
          "Barang",
          "Kategori",
          "Stock",
          "Jumlah Keluar",
          "Satuan",
          "Keterangan",
        ],
      };
    }

    return { columns: [] };
  }

   get itemsUnit() {
    if (this.isItemUnit) {
      return {
        columns: [
          "No PR",
          "Barang",
          "Kategori",
          "Stock",
          "Jumlah Keluar",
          "Satuan",
          "Keterangan",
          "Area",
        ],
      };
    }

    return { columns: [] };
  }

  get itemsSparepart() {
    if (this.isItemSparepart) {
      return {
        columns: [
          "No PR",
          "Barang",
          "Kategori",
          "Stock",
          "Jumlah Keluar",
          "Satuan",
          "Keterangan",
          "Line",
          "Area",
          "Section",
        ],
      };
    }

    return { columns: [] };
  }

  get addItems() {
    return (event) => {
      if (!this.data.Items) this.data.Items = [];
      this.data.Items.push({});
    };
  }

  canEditOrDelete() {
    const d = this.data || {};
    const items = Array.isArray(d.Items) ? d.Items : [];

    if (items.length === 0) return false;

    return items.every(i => i && (i.IsStorage === true || i.isStorage === true));
}


 unitView = (unit) => {
        return unit.division ?`${unit.division.name} - ${unit.name}` : `${unit.Division.Name} - ${unit.Name}`;
    }


  unbind() 
  {
    if (this.expenditureDateSubscription) {
      this.expenditureDateSubscription.dispose();
    }
  }
  }

