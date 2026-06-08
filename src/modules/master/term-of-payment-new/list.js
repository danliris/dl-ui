import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import { Base64Helper } from '../../../utils/base-64-coded-helper';

@inject(Router, Service)
export class List {
    context = ["Rincian"];
    columns = [
		{ field: "Code", title: "Code" },
		{ field: "Days", title: "Days" },
		{ field: "Description", title: "Description" },
	];

	constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    loader = (info) => {
		var order = {};
		if (info.sort)
			order[info.sort] = info.order;

		var arg = {
			page: parseInt(info.offset / info.limit, 10) + 1,
			size: info.limit,
			keyword: info.search,
			order: order,
			select: ['Code', 'Days', 'Description']
		}

		return this.service.search(arg)
			.then(result => {
				return {
					total: result.info.total,
					data: result.data
				}
			});
    }

    contextCallback(event) {
		var arg = event.detail;
		var data = arg.data;
		switch (arg.name) {
			case "Rincian":
				const encoded = Base64Helper.encode(data.Id);
           		this.router.navigateToRoute('view', { id: encoded });
				break;
		}
    }

    view(data) {
        const encoded = Base64Helper.encode(data.Id);
        this.router.navigateToRoute('view', { id: encoded });
    }

	create() {
		this.router.navigateToRoute('create');
	}
}
