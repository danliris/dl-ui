import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Dialog} from '../../../components/dialog/dialog';
import {BoardFormView} from './dialog-view/board-form-view';
import {Service} from "./service";

@inject(Router, Dialog, Service)
export class List {

    constructor(router, dialog, service) {
        this.router = router;
        this.dialog = dialog;
        this.service = service;

		// localStorage.setItem('kanban', JSON.stringify({"data": [], "index": 0}));
        
        this.columns = [
            { field: "board", title: "Board" },
			{ field: "unit", title: "Unit" }
        ];

        this.context = ["Rincian"];
	}

    contextShowCallback(index, name, data) {
        return true;
    }

    contextClickCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "Rincian":
                this.router.navigateToRoute('board', { id: data._id });
                break;
        }
    }

    loader = (info) => {
        var order = {};

        if (info.sort)
            order[info.sort] = info.order;

        this.arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order
        };

		var obj = JSON.parse(localStorage.getItem('kanban'));
		
        return {
			total: obj.data.length,
			data: obj.data
		};
    }

    create() {
        this.dialog.show(BoardFormView, {})
            .then(response => {
                if(!response.wasCancelled) {
					var obj = JSON.parse(localStorage.getItem('kanban'));
					
					obj.data.push({_id: obj.index++, board: response.output.board, unit: response.output.unit});

					localStorage.setItem('kanban', JSON.stringify(obj));
					
					this.kanbanTable.refresh();
				}
            });
    }
}