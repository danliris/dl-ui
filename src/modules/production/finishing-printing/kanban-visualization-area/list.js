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
		this.area = ["Blank", "Area Pre Treatment", "Area Dyeing", "Area Printing", "Area Finishing", "Area QC"]
		this.map = [];

		for (var area of this.area) {
			this.map[area] = { input: [], output: [] };
		}

		this.stages = [
			{ name: "Blank", area: "Blank", map: this.map["Blank"], inputTotal: 0, goodOutputTotal: 0, badOutputTotal: 0 },
			{ name: "Pre Treatment", area: "Area Pre Treatment", map: this.map["Area Pre Treatment"], inputTotal: 0, goodOutputTotal: 0, badOutputTotal: 0 },
			{ name: "Dyeing", area: "Area Dyeing", map: this.map["Area Dyeing"], inputTotal: 0, goodOutputTotal: 0, badOutputTotal: 0 },
			{ name: "Printing", area: "Area Printing", map: this.map["Area Printing"], inputTotal: 0, goodOutputTotal: 0, badOutputTotal: 0 },
			{ name: "Finishing", area: "Area Finishing", map: this.map["Area Finishing"], inputTotal: 0, goodOutputTotal: 0, badOutputTotal: 0 },
			{ name: "QC", area: "Area QC", map: this.map["Area QC"], inputTotal: 0, goodOutputTotal: 0, badOutputTotal: 0 }
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
            filter: JSON.stringify({ isComplete: false }), /* "instruction.steps.process" */
            select: ["code", "currentStepIndex", "cart.cartNumber", "instruction.steps._id", "instruction.steps.deadline", "instruction.steps.processArea", "productionOrder.orderNo", "productionOrder.salesContractNo", "productionOrder.deliveryDate", "productionOrder.buyer.name", "productionOrder.orderQuantity"],
			order: { "productionOrder.deliveryDate": "asc" }
        };

		await this.service.search(arg)
			.then((result) => {
				this.totalData = result.info.total;
				this.count += result.info.count;

				for (var data of result.data) {
					if (data && data.process) {
						var area = (!data.processArea || data.processArea === "") ? "Blank" : data.processArea;
						var stage = this.stages.find(o => o.area == area);
						
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

							stage.inputTotal += data.inputQuantity;
							this.map[area].input.push(obj);
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

							stage.goodOutputTotal += data.goodOutput ? data.goodOutput : 0;
							stage.badOutputTotal += data.badOutput ? data.badOutput : 0;
							this.map[area].output.push(obj);
						}
					}
				}

				if (this.totalData != this.count) {
					this.page++;
					this.getData();
				}
			});
	}

	// getQC() {
	// 	this.totalQC = 0;
	// 	this.qualityControl = [];

	// 	var arg = {
	// 		page: 1,
	// 		size: Number.MAX_SAFE_INTEGER,
    //         filter: JSON.stringify({ isUsed: false }),
    //         select: ["code", "productionOrderNo", "cartNo", "buyer", "fabricGradeTests.finalLength"]
    //     };

	// 	this.service.searchQC(arg)
	// 		.then((result) => {
	// 			this.qualityControl = result.data;

	// 			for (var data of result.data) {
	// 				for (var test of data.fabricGradeTests) {
	// 					this.totalQC += test.finalLength;
	// 				}
	// 			}
	// 		});
	// }
}