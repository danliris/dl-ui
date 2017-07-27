import {inject, computedFrom} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from "./service";
import {moveBefore} from 'aurelia-dragula';
import {Dialog} from '../../../components/dialog/dialog';
import {BoardFormView} from './dialog-view/board-form-view';
import {DealFormView} from './dialog-view/deal-form-view';
import {StageFormView} from './dialog-view/stage-form-view';

var moment = require("moment");

@inject(Router, Dialog, Service)
export class View {
	formOptions = {
		editText: "Ubah",
		deleteText: "Hapus",
        cancelText: "Kembali"
    };

    constructor(router, dialog, service) {
        this.router = router;
		this.dialog = dialog;
		this.service = service;

		this.type = ["type-1", "type-2", "type-3", "type-4"];
		this.stages = [];
		this.map = [];

		this.index = 0;
    }

	async activate(params) {
		this.boardId = params.id;
        await this.getBoardData();
		await this.getStageData();
    }

	async getBoardData() {
		await this.service.getBoardById(this.boardId)
			.then((result) => {
				this.board = result;
			});
	}

	async getStageData() {
		this.stages = [];
		this.map = [];

		var arg = {
			_id: this.boardId
        };

        await this.service.searchStage(arg)
            .then((result) => {
				for (var data of result.data) {
					var total = 0;

					data.deals = data.deals.map((deal) => {
						deal.closeDate = moment(deal.closeDate).format("DD MMM YYYY");
						total += deal.amount;

						return deal;
					});

					this.map[data.code] = data.deals;

					this.stages.push({
						_id: data._id,
						code: data.code,
						name: data.name,
						total: total,
						map: this.map[data.code]
					});
				}
            });
	}

    itemDropped(item, target, source, sibling, itemVM, siblingVM) {
		let sourceArr;
		let targetArr;
		let sourceStage = this.getStage(source.dataset.code);
		let targetStage = this.getStage(target.dataset.code);

		sourceArr = sourceStage.map;
		targetArr = targetStage.map;

		if (source.dataset.code == target.dataset.code) {
			let itemId = item.dataset.id;
			let siblingId = sibling ? sibling.dataset.id : null;
			let indexOfSource = this.arrayObjectIndexOf(sourceArr, itemId, "_id");

			moveBefore(sourceArr, (arr) => arr._id == itemId, (arr) => arr._id == siblingId);

			if (indexOfSource != this.arrayObjectIndexOf(sourceArr, itemId, "_id")) { /* Jika posisi tidak sama */
				var updateData = {
					_id: sourceStage._id,
					deals: [],
					type: "Activity"
				};

				var total = 0;

				for (var source of sourceArr) {
					total += source.amount;
					updateData.deals.push(source._id);
				}

				this.service.updateStage(updateData)
					.then(() => {
						sourceStage.total = total;
					});
			}
		}
		else {
			let theItem;
			let siblingIndex;

			theItem = sourceArr[parseInt(item.dataset.index)];
			siblingIndex = sibling != undefined ? parseInt(sibling.dataset.index) : 'end';

			sourceArr.splice(parseInt(item.dataset.index), 1);
			if (parseInt(siblingIndex) === 0) {
				targetArr.unshift(theItem);
			} else if (siblingIndex === 'end') {
				targetArr.push(theItem);
			} else {
				targetArr.splice(parseInt(siblingIndex), 0, theItem);
			}

			var totalSource = 0, totalTarget = 0;

			var updateDataSource = {
				_id: sourceStage._id,
				deals: [],
				type: "Activity"
			};

			for (var source of sourceArr) {
				totalSource += source.amount;
				updateDataSource.deals.push(source._id);
			}

			var updateDataTarget = {
				_id: targetStage._id,
				deals: [],
				type: "Activity"
			};

			for (var target of targetArr) {
				totalTarget += target.amount;
				updateDataTarget.deals.push(target._id);
			}

			this.service.updateStage(updateDataSource)
				.then(() => {
					this.service.updateStage(updateDataTarget)
						.then(() => {
							var activityData = {
								dealId: item.dataset.id,
								type: "MOVE",
								field: {
									sourceStageId: updateDataSource._id,
									targetStageId: updateDataTarget._id
								}
							};

							this.service.createActivity(activityData)
								.then(() => {
									sourceStage.total = totalSource;
									targetStage.total = totalTarget;
								});
						});
				});
		}
	}

    getStage(code) {
		let l = {};

		for (var i = 0; i < this.stages.length; i++) {
			if (this.stages[i].code == code) {
				l = this.stages[i];
				break;
			}
		}

		return l;
	}

	createDeal() {
		var params = {
			stages: this.stages,
			currency: this.board.currency.code,
			type: "Add"
		};

        this.dialog.show(DealFormView, params)
            .then(response => {
                if (!response.wasCancelled) {
					this.getStageData();
				}
            });
    }

	createStage() {
		this.dialog.show(StageFormView, { id: this.boardId, type: "Add" })
            .then(response => {
                if (!response.wasCancelled) {
					this.getStageData();
				}
            });
	}

	@computedFrom("stages.length")
	get hasStages() {
		return this.stages.length > 0;
	}

	detail(id, stageName) {
		this.router.navigateToRoute('deal', { id: id, stage: encodeURIComponent(stageName.trim()), boardId: this.boardId });
	}

	editStage(stage) {
		this.dialog.show(StageFormView, { id: stage._id, type: "Edit" })
            .then(response => {
                if (!response.wasCancelled) {
					stage.name = response.output.name;
				}
            });
	}

	editCallback() {
		this.dialog.show(BoardFormView, { id: this.boardId, type: "Edit" })
            .then(response => {
				if (!response.wasCancelled) {
					this.getBoardData();
				}
			});
	}

	deleteCallback(event) {
		this.dialog.prompt("Apakah anda yakin mau menghapus board ini?", "Hapus Board")
            .then(response => {
                if (response == "ok") {
					this.service.deleteBoard({ _id: this.boardId })
						.then(result => {
							this.cancelCallback();
						});
                }
            });
    }

	cancelCallback() {
		this.router.navigateToRoute('list');
	}

	arrayObjectIndexOf(myArray, searchTerm, property) {
		for (var i = 0, len = myArray.length; i < len; i++) {
			if (myArray[i][property] === searchTerm) return i;
		}
		return -1;
	}
}