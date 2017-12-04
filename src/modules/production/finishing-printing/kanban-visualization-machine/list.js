import { inject, computedFrom } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from "./service";
import { CoreService } from "./core-service";

var moment = require("moment");

@inject(Router, Service, CoreService)
export class List {
	constructor(router, service, coreService) {
		this.router = router;
		this.service = service;
		this.coreService = coreService;

		this.type = ["type-1", "type-2", "type-3", "type-4"];
		this.map = [];

		this.stages = [];

		this.index = 0;
		this.totalData = 0;
		this.count = 0;
		this.page = 1;
		this.size = 500;
	}

	async activate() {
		await this.getMachine();
	}

	async getMachine() {
		this.sortMachine = {
			"Area Pre Treatment": 1,
			"Area Dyeing": 2,
			"Area Printing": 3,
			"Area Finishing": 4,
			"Area Quality Control": 5,
			"Area Gudang": 6
		};

		var arg = {
			page: 1,
			size: Number.MAX_SAFE_INTEGER,
			select: ["name", "process"]
		};

		await this.coreService.search(arg)
			.then((results) => {
				for (var data of results.data) {
					this.map[data.name] = { input: [], output: [] };
					this.stages.push({
						name: data.name,
						map: this.map[data.name],
						inputTotal: 0, goodOutputTotal: 0, badOutputTotal: 0,
						process: data.process
					});
				}

				this.stages.sort((a, b) => {
					var sortA = this.sortMachine[a.process];
					var sortB = this.sortMachine[b.process];
					var nameA = a.name;
					var nameB = b.name;

					sortA = sortA ? sortA : 10;
					sortB = sortB ? sortB : 100;

					if (sortA != sortB)
						return sortA - sortB;
					else
						return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
				});

				this.machineLength = results.data.length;
				this.kanbanMachine =  "width: " + (this.machineLength * 500) + "px";
				this.getData();
			});
	}

	getData() {
		var arg = {
			page: this.page,
			size: this.size,
			filter: JSON.stringify({ isComplete: false }), /* "instruction.steps.process" */
			select: ["code", "currentStepIndex", "cart.cartNumber", "instruction.steps._id", "instruction.steps.deadline", "instruction.steps.processArea", "productionOrder.orderNo", "productionOrder.salesContractNo", "productionOrder.deliveryDate", "productionOrder.buyer.name", "productionOrder.orderQuantity"],
			order: { "productionOrder.deliveryDate": "asc" }
		};

		this.service.search(arg)
			.then((result) => {
				this.totalData = result.info.total;
				this.count += result.info.count;

				for (var data of result.data) {
					if (data && data.process) {
						var machine = data.dailyOperationMachine;
						var stage = this.stages.find(o => o.name == machine);

						if(data.type === "Input") {
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

							if (!stage) {
								this.map[machine] = { input: [], output: [] };

								this.stages.push({
									name: machine,
									map: this.map[machine],
									inputTotal: data.inputQuantity
								});
								
								this.machineLength++;
							}
							else {
								stage.inputTotal += data.inputQuantity;
							}
							
							this.map[machine].input.push(obj);
						}
						else {
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
								goodOutput: data.goodOutput,
								badOutput: data.badOutput,
								stepsLength: data.stepsLength,
								currentStepIndex: data.currentStepIndex
							};

							if (!stage) {
								this.map[machine] = { input: [], output: [] };

								this.stages.push({
									name: machine,
									map: this.map[machine],
									goodOutputTotal: data.goodOutput,
									badOutputTotal: data.badOutput
								});
								
								this.machineLength++;
							}
							else {
								stage.goodOutputTotal += data.goodOutput ? data.goodOutput : 0;
								stage.badOutputTotal += data.badOutput ? data.badOutput : 0;
							}

							this.map[machine].output.push(obj);
						}
					}
				}

				this.kanbanMachine =  "width: " + (this.machineLength * 500) + "px; height: 600px;";
				
				if (this.totalData != this.count) {
					this.page++;
					this.getData();
				}
			});
	}
}