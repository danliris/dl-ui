import {inject, computedFrom} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from "./service";

var moment = require("moment");

@inject(Router, Service)
export class List {
    constructor(router, service) {
        this.router = router;
		this.service = service;

		this.type = ["type-1", "type-2", "type-3", "type-4"];
		this.map = [];

		this.stages = [];

		this.index = 0;
		this.totalData = 0;
		this.count = 0;
		this.page = 1;
		this.size = 200;
	}

	async activate() {
		await this.getData();
	}

	async getData() {
		var arg = {
			page: this.page,
			size: this.size,
            filter: JSON.stringify({ isComplete: false }),
            select: ["code", "currentStepIndex", "cart.cartNumber", "instruction.steps.process", "instruction.steps._id", "instruction.steps.deadline", "instruction.steps.processArea", "productionOrder.orderNo", "productionOrder.salesContractNo", "productionOrder.deliveryDate", "productionOrder.buyer.name", "productionOrder.orderQuantity"]
        };

		await this.service.search(arg)
			.then((result) => {
				this.totalData = result.info.total;
				this.count += result.info.count;

				for (var data of result.data) {
					var index = (data.currentStepIndex === data.instruction.steps.length) ? data.currentStepIndex - 1 : data.currentStepIndex;
					var step = data.instruction.steps[index];
					var machine = data.dailyOperationMachine;

					var obj = {
						code: data.code,
						process: step.process,
						salesContractNo: (data.productionOrder && data.productionOrder.salesContractNo) ? data.productionOrder.salesContractNo : "-",
						productionOrderNo: (data.productionOrder && data.productionOrder.orderNo) ? data.productionOrder.orderNo : "-",
						buyer: (data.productionOrder && data.productionOrder.buyer && data.productionOrder.buyer.name) ? data.productionOrder.buyer.name : "-",
						cart: data.cart ? data.cart.cartNumber : "-",
						orderQuantity: data.productionOrder ? data.productionOrder.orderQuantity : "-",
						deadline: step.deadline ? moment(step.deadline).format("DD MMM YYYY") : "-",
						deliveryDate: (data.productionOrder && data.productionOrder.deliveryDate) ? moment(data.productionOrder.deliveryDate).format("DD MMM YYYY") : "-",
						input: data.inputQuantity
					};

					var stage = this.stages.find(o => o.name == machine);

					if(!stage) {
						this.map[machine] = [];
						this.stages.push({
							name: machine,
							map: this.map[machine],
							total: data.inputQuantity
						});
					}
					else {
						stage.total += data.inputQuantity;
					}
					
					this.map[machine].push(obj);
				}

				if(this.totalData != this.count) {
					this.page++;
					this.getData();
				}
			});
	}
}