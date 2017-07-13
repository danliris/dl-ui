import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {moveBefore} from 'aurelia-dragula';
import {Dialog} from '../../../components/dialog/dialog';
import {CardFormView} from './dialog-view/card-form-view';

@inject(Router, Dialog)
export class View {
    constructor(router, dialog) {
        this.router = router;
		this.dialog = dialog;

        this.headerList = [];
		this.input = [];
		this.process = [];

		this.index = 0;

		this.headerList.push({
			"map": this.input,
			"name": "Input"
		});

		this.headerList.push({
			"map": this.process,
			"name": "Process"
		});

		this.input.push({
			"id": this.index++,
			"name": "Jacky"
		});

		this.process.push({
			"id": this.index++,
			"name": "Rusly"
		});
    }

    itemDropped(item, target, source, sibling, itemVM, siblingVM) {
		let sourceArr;
		let targetArr;

		sourceArr = this.getList(source.dataset.list.toLowerCase());
		targetArr = this.getList(target.dataset.list.toLowerCase());
		
		if (source.dataset.list == target.dataset.list) {
			let itemId = item.dataset.id;
			let siblingId = sibling ? sibling.dataset.id : null;

			moveBefore(sourceArr, (arr) => arr.id == itemId, (arr) => arr.id == siblingId);
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
		}
	}

	submit() {
		this.input.push({
			"id": this.index++,
			"name": this.data
		});

		this.data = "";
	}

	submitHeader() {
		this[this.header] = [];

		this.headerList.push({
			"map": this[this.header],
			"name": this.header
		});

		this.header = "";
	}

    getList(list) {
		let l;

		for(var i = 0; i < this.headerList.length; i++) {
			if(this.headerList[i].name.toLowerCase() == list) {
				l = this.headerList[i].map;
				break;
			}
		}

		return l;
	}

	create() {
        this.dialog.show(CardFormView, {})
            .then(response => {
                if(!response.wasCancelled) {
					
				}
            });
    }

	detail() {
		console.log("detail");
	}

    cancel() {
        this.router.navigateToRoute('list');
    }
}