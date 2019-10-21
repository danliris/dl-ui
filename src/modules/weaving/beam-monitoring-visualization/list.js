import {
  inject
} from "aurelia-framework";
import {
  Service
} from "./service";
import {
  Router
} from "aurelia-router";
import moment from 'moment';

@inject(Router, Service)
export class List {
  constructor(router, service) {
    this.router = router;
    this.service = service;

    this.type = ["type-1", "type-2", "type-3", "type-4"];
    this.phase = ["EmptyStock", "Warping", "Sizing", "Reaching", "Tying", "Loom"]
    this.map = [];

    for (var phase of this.phase) {
      this.map[phase] = {
        beam: []
      };
    }

    this.stages = [{
        name: "Stok Kosong",
        phase: "EmptyStock",
        map: this.map["EmptyStock"],
        inputTotal: 0,
        goodOutputTotal: 0,
        badOutputTotal: 0
      },
      {
        name: "Proses Warping",
        phase: "Warping",
        map: this.map["Warping"],
        inputTotal: 0,
        goodOutputTotal: 0,
        badOutputTotal: 0
      },
      {
        name: "Proses Sizing",
        phase: "Sizing",
        map: this.map["Sizing"],
        inputTotal: 0,
        goodOutputTotal: 0,
        badOutputTotal: 0
      },
      {
        name: "Proses Reaching",
        phase: "Reaching",
        map: this.map["Reaching"],
        inputTotal: 0,
        goodOutputTotal: 0,
        badOutputTotal: 0
      },
      {
        name: "Proses Tying",
        phase: "Tying",
        map: this.map["Tying"],
        inputTotal: 0,
        goodOutputTotal: 0,
        badOutputTotal: 0
      },
      {
        name: "Proses Loom",
        phase: "Loom",
        map: this.map["Loom"],
        inputTotal: 0,
        goodOutputTotal: 0,
        badOutputTotal: 0
      }
    ];

    this.index = 0;
    this.totalData = 0;
    this.count = 0;
    this.page = 1;
    this.size = 500;
  }

  async activate() {
    await this.getData();
    // this.getQC();
  }

  async getData() {
    var arg = {
      page: this.page,
      size: this.size,
      filter: JSON.stringify({
        isComplete: false
      }),
      /* "instruction.steps.process" */
      select: ["code", "currentStepIndex", "cart.cartNumber", "instruction.steps._id", "instruction.steps.deadline", "instruction.steps.processArea", "productionOrder.orderNo", "productionOrder.salesContractNo", "productionOrder.deliveryDate", "productionOrder.buyer.name", "productionOrder.orderQuantity"],
      order: {
        "productionOrder.deliveryDate": "asc"
      }
    };

    await this.service.search(arg)
      .then((result) => {
        this.totalData = result.info.total;
        this.count += result.info.count;

        for (var data of result.data) {
          if (data && data.process) {
            var area = (!data.processArea || data.processArea === "") ? "Blank" : data.processArea;
            var stage = this.stages.find(o => o.area == area);

            // if (data.type === "Input") {
            var obj = {
              code: data.code,
              process: data.process ? data.process : "-",
              salesContractNo: (data.productionOrder && data.productionOrder.salesContractNo) ? data.productionOrder.salesContractNo : "-",
              productionOrderNo: (data.productionOrder && data.productionOrder.orderNo) ? data.productionOrder.orderNo : "-",
              buyer: (data.productionOrder && data.productionOrder.buyer && data.productionOrder.buyer.name) ? data.productionOrder.buyer.name : "-",
              cart: data.cart ? data.cart.cartNumber : "-",
              orderQuantity: data.productionOrder ? data.productionOrder.orderQuantity : "-",
              deadline: data.deadline ? moment(data.deadline).format("DD MMM YYYY") : "-",
              deliveryDate: (data.productionOrder && data.productionOrder.deliveryDate) ? moment(data.productionOrder.deliveryDate).format("DD MMM YYYY") : "-",
              input: data.inputQuantity,
              stepsLength: data.stepsLength,
              currentStepIndex: data.currentStepIndex
            };

            stage.inputTotal += data.inputQuantity;
            this.map[area].input.push(obj);
            // } else {
            //   var obj = {
            //     code: data.code,
            //     process: data.process ? data.process : "-",
            //     salesContractNo: (data.productionOrder && data.productionOrder.salesContractNo) ? data.productionOrder.salesContractNo : "-",
            //     productionOrderNo: (data.productionOrder && data.productionOrder.orderNo) ? data.productionOrder.orderNo : "-",
            //     buyer: (data.productionOrder && data.productionOrder.buyer && data.productionOrder.buyer.name) ? data.productionOrder.buyer.name : "-",
            //     cart: data.cart ? data.cart.cartNumber : "-",
            //     orderQuantity: data.productionOrder ? data.productionOrder.orderQuantity : "-",
            //     deadline: data.deadline ? moment(data.deadline).format("DD MMM YYYY") : "-",
            //     deliveryDate: (data.productionOrder && data.productionOrder.deliveryDate) ? moment(data.productionOrder.deliveryDate).format("DD MMM YYYY") : "-",
            //     goodOutput: data.goodOutput,
            //     badOutput: data.badOutput,
            //     stepsLength: data.stepsLength,
            //     currentStepIndex: data.currentStepIndex
            //   };

            //   stage.goodOutputTotal += data.goodOutput ? data.goodOutput : 0;
            //   stage.badOutputTotal += data.badOutput ? data.badOutput : 0;
            //   this.map[area].output.push(obj);
            // }
          }
        }

        if (this.totalData != this.count) {
          this.page++;
          this.getData();
        }
      });
  }
}
