import {
  inject,
  bindable
} from 'aurelia-framework';
import {
  Service
} from "./service";
import {
  Router
} from 'aurelia-router';
import moment from 'moment';

let UnitLoader = require('../../../loader/unit-loader');
let MachineLoader = require('../../../loader/weaving-machine-loader');

@inject(Router, Service)
export class List {
  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  listDataFlag = false;

  blocks = ["", "A", "B", "C", "D", "E", "F"];

  columns = [{
    field: "WeavingUnit",
    title: "Unit Weaving"
  }, {
    field: "MachineNumber",
    title: "No. Mesin"
  }, {
    field: "Area",
    title: "Area"
  }, {
    field: "Block",
    title: "Blok"
  }, {
    field: "KaizenBlock",
    title: "Blok Kaizen"
  }, {
    field: "Location",
    title: "Lokasi"
  }, {
    field: "Maintenance",
    title: "Maintenance"
  }, {
    field: "OperatorName",
    title: "Operator"
  }, ];

  controlOptions = {
    label: {
      length: 4
    },
    control: {
      length: 6
    }
  }

  tableOptions = {
    search: false,
    showToggle: false,
    showColumns: false,
    pagination: false,
    sortable: false,
  }

  loader = (info) => {
    this.info = {};

    //Get All
    if (!this.WeavingUnit && !this.MachineDocument && !this.Block) {
      return this.listDataFlag ? this.service.getAll().then(result => {
        // if (result && result.length > 0) {
        //   let getUnitPromises = result.map(planning =>
        //     this.service.getUnitById(planning.WeavingUnit)
        //   );

        //   return Promise.all(getUnitPromises).then(weavingUnits => {
        //     for (var machinePlanning of result) {
        //       if (weavingUnits && weavingUnits.length > 0) {
        //         let weavingUnit = weavingUnits.find(
        //           unitResult => machinePlanning.WeavingUnit == unitResult.Id
        //         );
        //         machinePlanning.WeavingUnit = weavingUnit.Name;
        //       }
        //     }
        //     return {
        //       data: result,
        //       total: length
        //     };
        //   });
        // }
        return {
          data: result,
          total: length
        };
      }) : {
        data: {},
        total: 0
      };
    }

    //Get By Fill Weaving Unit Only
    if (this.WeavingUnit && !this.MachineDocument && !this.Block) {
      let WeavingUnitIdContainer = this.WeavingUnit.Id;

      return this.listDataFlag ? this.service.getByWeavingUnit(WeavingUnitIdContainer).then(result => {
        // if (result && result.length > 0) {
        //   let getUnitPromises = result.map(planning =>
        //     this.service.getUnitById(planning.WeavingUnit)
        //   );

        //   return Promise.all(getUnitPromises).then(weavingUnits => {
        //     for (var machinePlanning of result) {
        //       if (weavingUnits && weavingUnits.length > 0) {
        //         let weavingUnit = weavingUnits.find(
        //           unitResult => machinePlanning.WeavingUnit == unitResult.Id
        //         );
        //         machinePlanning.WeavingUnit = weavingUnit.Name;
        //       }
        //     }
        //     return {
        //       data: result,
        //       total: length
        //     };
        //   });
        // }
        return {
          data: result,
          total: length
        };
      }) : {
        data: {},
        total: 0
      };
    }

    //Get By Fill Machine Document Only
    if (!this.WeavingUnit && this.MachineDocument && !this.Block) {
      let MachineDocumentIdContainer = this.MachineDocument.Id;

      return this.listDataFlag ? this.service.getByMachine(MachineDocumentIdContainer).then(result => {
        // if (result && result.length > 0) {
        //   let getUnitPromises = result.map(planning =>
        //     this.service.getUnitById(planning.WeavingUnit)
        //   );

        //   return Promise.all(getUnitPromises).then(weavingUnits => {
        //     for (var machinePlanning of result) {
        //       if (weavingUnits && weavingUnits.length > 0) {
        //         let weavingUnit = weavingUnits.find(
        //           unitResult => machinePlanning.WeavingUnit == unitResult.Id
        //         );
        //         machinePlanning.WeavingUnit = weavingUnit.Name;
        //       }
        //     }
        //     return {
        //       data: result,
        //       total: length
        //     };
        //   });
        // }
        return {
          data: result,
          total: length
        };
      }) : {
        data: {},
        total: 0
      };
    }

    //Get By Fill Block Only
    if (!this.WeavingUnit && !this.MachineDocument && this.Block) {
      let BlockContainer = this.Block;

      return this.listDataFlag ? this.service.getByBlock(BlockContainer).then(result => {
        // if (result && result.length > 0) {
        //   let getUnitPromises = result.map(planning =>
        //     this.service.getUnitById(planning.WeavingUnit)
        //   );

        //   return Promise.all(getUnitPromises).then(weavingUnits => {
        //     for (var machinePlanning of result) {
        //       if (weavingUnits && weavingUnits.length > 0) {
        //         let weavingUnit = weavingUnits.find(
        //           unitResult => machinePlanning.WeavingUnit == unitResult.Id
        //         );
        //         machinePlanning.WeavingUnit = weavingUnit.Name;
        //       }
        //     }
        //     return {
        //       data: result,
        //       total: length
        //     };
        //   });
        // }
        return {
          data: result,
          total: length
        };
      }) : {
        data: {},
        total: 0
      };
    }

    //Get By Fill Weaving Unit and Machine Document
    if (this.WeavingUnit && this.MachineDocument && !this.Block) {
      let WeavingUnitIdContainer = this.WeavingUnit.Id;
      let MachineDocumentIdContainer = this.MachineDocument.Id;

      return this.listDataFlag ? this.service.getByWeavingUnitMachine(WeavingUnitIdContainer, MachineDocumentIdContainer).then(result => {
        // if (result && result.length > 0) {
        //   let getUnitPromises = result.map(planning =>
        //     this.service.getUnitById(planning.WeavingUnit)
        //   );

        //   return Promise.all(getUnitPromises).then(weavingUnits => {
        //     for (var machinePlanning of result) {
        //       if (weavingUnits && weavingUnits.length > 0) {
        //         let weavingUnit = weavingUnits.find(
        //           unitResult => machinePlanning.WeavingUnit == unitResult.Id
        //         );
        //         machinePlanning.WeavingUnit = weavingUnit.Name;
        //       }
        //     }
        //     return {
        //       data: result,
        //       total: length
        //     };
        //   });
        // }
        return {
          data: result,
          total: length
        };
      }) : {
        data: {},
        total: 0
      };
    }

    //Get By Fill Weaving Unit and Block
    if (this.WeavingUnit && !this.MachineDocument && this.Block) {
      let WeavingUnitIdContainer = this.WeavingUnit.Id;
      let BlockContainer = this.Block;

      return this.listDataFlag ? this.service.getByWeavingUnitBlock(WeavingUnitIdContainer, BlockContainer).then(result => {
        // if (result && result.length > 0) {
        //   let getUnitPromises = result.map(planning =>
        //     this.service.getUnitById(planning.WeavingUnit)
        //   );

        //   return Promise.all(getUnitPromises).then(weavingUnits => {
        //     for (var machinePlanning of result) {
        //       if (weavingUnits && weavingUnits.length > 0) {
        //         let weavingUnit = weavingUnits.find(
        //           unitResult => machinePlanning.WeavingUnit == unitResult.Id
        //         );
        //         machinePlanning.WeavingUnit = weavingUnit.Name;
        //       }
        //     }
        //     return {
        //       data: result,
        //       total: length
        //     };
        //   });
        // }
        return {
          data: result,
          total: length
        };
      }) : {
        data: {},
        total: 0
      };
    }

    //Get By Fill Machine and Block
    if (!this.WeavingUnit && this.MachineDocument && this.Block) {
      let MachineDocumentIdContainer = this.MachineDocument.Id;
      let BlockContainer = this.Block;

      return this.listDataFlag ? this.service.getByMachineBlock(MachineDocumentIdContainer, BlockContainer).then(result => {
        // if (result && result.length > 0) {
        //   let getUnitPromises = result.map(planning =>
        //     this.service.getUnitById(planning.WeavingUnit)
        //   );

        //   return Promise.all(getUnitPromises).then(weavingUnits => {
        //     for (var machinePlanning of result) {
        //       if (weavingUnits && weavingUnits.length > 0) {
        //         let weavingUnit = weavingUnits.find(
        //           unitResult => machinePlanning.WeavingUnit == unitResult.Id
        //         );
        //         machinePlanning.WeavingUnit = weavingUnit.Name;
        //       }
        //     }
        //     return {
        //       data: result,
        //       total: length
        //     };
        //   });
        // }
        return {
          data: result,
          total: length
        };
      }) : {
        data: {},
        total: 0
      };
    }

    //Get By Fill Weaving Unit, Machine and Block
    if (this.WeavingUnit && this.MachineDocument && this.Block) {
      let WeavingUnitIdContainer = this.WeavingUnit.Id;
      let MachineDocumentIdContainer = this.MachineDocument.Id;
      let BlockContainer = this.Block;

      return this.listDataFlag ? this.service.getAllSpecified(WeavingUnitIdContainer, MachineDocumentIdContainer, BlockContainer).then(result => {
        // if (result && result.length > 0) {
        //   let getUnitPromises = result.map(planning =>
        //     this.service.getUnitById(planning.WeavingUnit)
        //   );

        //   return Promise.all(getUnitPromises).then(weavingUnits => {
        //     for (var machinePlanning of result) {
        //       if (weavingUnits && weavingUnits.length > 0) {
        //         let weavingUnit = weavingUnits.find(
        //           unitResult => machinePlanning.WeavingUnit == unitResult.Id
        //         );
        //         machinePlanning.WeavingUnit = weavingUnit.Name;
        //       }
        //     }
        //     return {
        //       data: result,
        //       total: length
        //     };
        //   });
        // }
        return {
          data: result,
          total: length
        };
      }) : {
        data: {},
        total: 0
      };
    }
  }

  get units() {
    return UnitLoader;
  }

  get machines() {
    return MachineLoader;
  }

  searchMachinePlannings() {
    this.listDataFlag = true;

    this.machinePlanningReportsTable.refresh();
  }

  reset() {
    this.listDataFlag = false;

    this.WeavingUnit = null;
    this.MachineDocument = undefined;
    this.Block = "";

    this.WeavingUnitIdContainer = null;
    this.MachineDocumentIdContainer = null;
    this.BlockContainer = null;

    this.machinePlanningReportsTable.refresh();
  }

  exportToExcel() {
    //Get All
    if (!this.WeavingUnit && !this.MachineDocument && !this.Block) {
      return this.listDataFlag ? this.service.getXlsAll().then(result => {
        return {
          data: result,
          total: length
        };
      }) : {
        data: {},
        total: 0
      };
    }

    //Get By Fill Weaving Unit Only
    if (this.WeavingUnit && !this.MachineDocument && !this.Block) {
      let WeavingUnitIdContainer = this.WeavingUnit.Id;

      return this.listDataFlag ? this.service.getXlsByWeavingUnit(WeavingUnitIdContainer).then(result => {
        return {
          data: result,
          total: length
        };
      }) : {
        data: {},
        total: 0
      };
    }

    //Get By Fill Machine Document Only
    if (!this.WeavingUnit && this.MachineDocument && !this.Block) {
      let MachineDocumentIdContainer = this.MachineDocument.Id;

      return this.listDataFlag ? this.service.getXlsByMachine(MachineDocumentIdContainer).then(result => {
        return {
          data: result,
          total: length
        };
      }) : {
        data: {},
        total: 0
      };
    }

    //Get By Fill Block Only
    if (!this.WeavingUnit && !this.MachineDocument && this.Block) {
      let BlockContainer = this.Block;

      return this.listDataFlag ? this.service.getXlsByBlock(BlockContainer).then(result => {
        return {
          data: result,
          total: length
        };
      }) : {
        data: {},
        total: 0
      };
    }

    //Get By Fill Weaving Unit and Machine Document
    if (this.WeavingUnit && this.MachineDocument && !this.Block) {
      let WeavingUnitIdContainer = this.WeavingUnit.Id;
      let MachineDocumentIdContainer = this.MachineDocument.Id;

      return this.listDataFlag ? this.service.getXlsByWeavingUnitMachine(WeavingUnitIdContainer, MachineDocumentIdContainer).then(result => {
        return {
          data: result,
          total: length
        };
      }) : {
        data: {},
        total: 0
      };
    }

    //Get By Fill Weaving Unit and Block
    if (this.WeavingUnit && !this.MachineDocument && this.Block) {
      let WeavingUnitIdContainer = this.WeavingUnit.Id;
      let BlockContainer = this.Block;

      return this.listDataFlag ? this.service.getXlsByWeavingUnitBlock(WeavingUnitIdContainer, BlockContainer).then(result => {
        return {
          data: result,
          total: length
        };
      }) : {
        data: {},
        total: 0
      };
    }

    //Get By Fill Machine and Block
    if (!this.WeavingUnit && this.MachineDocument && this.Block) {
      let MachineDocumentIdContainer = this.MachineDocument.Id;
      let BlockContainer = this.Block;

      return this.listDataFlag ? this.service.getXlsByMachineBlock(MachineDocumentIdContainer, BlockContainer).then(result => {
        return {
          data: result,
          total: length
        };
      }) : {
        data: {},
        total: 0
      };
    }

    //Get By Fill Weaving Unit, Machine and Block
    if (this.WeavingUnit && this.MachineDocument && this.Block) {
      let WeavingUnitIdContainer = this.WeavingUnit.Id;
      let MachineDocumentIdContainer = this.MachineDocument.Id;
      let BlockContainer = this.Block;

      return this.listDataFlag ? this.service.getXlsAllSpecified(WeavingUnitIdContainer, MachineDocumentIdContainer, BlockContainer).then(result => {
        return {
          data: result,
          total: length
        };
      }) : {
        data: {},
        total: 0
      };
    }
  }
}
