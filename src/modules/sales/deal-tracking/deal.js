import {inject, computedFrom} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from "./service";
import {Dialog} from '../../../components/dialog/dialog';
import {ActivityFormView} from './dialog-view/activity-form-view';
import {DealFormView} from './dialog-view/deal-form-view';
import {HyperlinkFormView} from './dialog-view/hyperlink-form-view';

var moment = require("moment");
var AccountLoader = require("../../../loader/account-loader");

@inject(Router, Service, Dialog)
export class Deal {
    formOptions = {
        editText: "Ubah",
        deleteText: "Hapus",
        cancelText: "Kembali"
    };

    constructor(router, service, dialog) {
        this.router = router;
        this.service = service;
        this.dialog = dialog;

        this.attachments = [];

        this.filter = {
            notes: true,
            task: true,
            move: true
        };

        this.resetActivityFilter();

        this.error = {};
    }

    async activate(params) {
        this.dealId = params.id;
        this.boardId = params.boardId;
        this.stageName = decodeURIComponent(params.stage);

        await this.getDealData();
        await this.getBoardData();
        await this.getActivityData();
    }

    async getBoardData() {
        await this.service.getBoardById(this.boardId)
            .then((result) => {
                this.board = result;
            });
    }

    async getDealData() {
        this.deal = {};

        await this.service.getDealById(this.dealId)
            .then((result) => {
                this.deal = result;
                this.deal.fullName = `${this.deal.contact.firstName} ${this.deal.contact.lastName}`;
            });
    }

    async getActivityData() {
        var arg = {
            _id: this.dealId,
            boardId: this.boardId,
            page: this.activityFilter.page,
            size: this.activityFilter.size,
            order: this.activityFilter.order
        };

        await this.service.searchActivity(arg)
            .then((result) => {
                this.activityFilter.page++;
                this.activityFilter.total = result.info.total;

                for (var data of result.data) {
                    switch (data.type) {
                        case "ADD": {
                            this.activities.push({
                                icon: "fa fa-plus",
                                notes: this.deal.name + " dibuat",
                                date: moment(data._createdDate).format("DD MMM YYYY"),
                                time: moment(data._createdDate).format("HH:mm"),
                                visibility: true
                            });
                            break;
                        }
                        case "TASK": {
                            this.activities.push({
                                _id: data._id,
                                type: data.type,
                                icon: "fa fa-tasks",
                                title: (data._createdBy == result.info.username ? "Kamu" : data._createdBy) + " membuat sebuah tugas",
                                code: data.code,
                                status: data.field.status,
                                taskTitle: data.field.title,
                                notes: data.field.notes,
                                assignedTo: data.field.assignedTo ? data.field.assignedTo.username : "-",
                                dueDate: moment(data.field.dueDate).format("DD MMM YYYY HH:mm"),
                                date: moment(data._createdDate).format("DD MMM YYYY"),
                                time: moment(data._createdDate).format("HH:mm")
                            });
                            break;
                        }
                        case "NOTES": {
                            this.activities.push({
                                _id: data._id,
                                type: data.type,
                                icon: "fa fa-sticky-note",
                                title: (data._createdBy == result.info.username ? "Kamu" : data._createdBy) + " meninggalkan sebuah catatan",
                                notes: data.field.notes,
                                attachments: data.field.attachments,
                                date: moment(data._createdDate).format("DD MMM YYYY"),
                                time: moment(data._createdDate).format("HH:mm")
                            });
                            break;
                        }
                        case "MOVE": {
                            this.activities.push({
                                type: data.type,
                                icon: "fa fa-window-restore",
                                notes: (data._createdBy == result.info.username ? "Kamu" : data._createdBy) + " memindahkan " + this.deal.name + " dari " + (data.field.from ? data.field.from : "-") + " ke " + (data.field.to ? data.field.to : "-"),
                                date: moment(data._createdDate).format("DD MMM YYYY"),
                                time: moment(data._createdDate).format("HH:mm")
                            });
                            break;
                        }
                    }
                }
            });
    }

    loadMore() {
        this.getActivityData();
    }

    create() {
        var activityData;
        if (document.getElementById("notes-tab").checked) {
            if (!this.notes || this.notes === '') {
                this.error.notes = "Notes is required";
            }
            else {
                activityData = {
                    dealId: this.dealId,
                    type: "NOTES",
                    field: {
                        notes: this.notes,
                        attachments: this.attachments
                    }
                };

                this.service.upsertActivityAttachment(activityData)
                    .then((result) => {
                        this.resetActivityFilter();
                        this.getActivityData();
                        this.resetField();
                    })
                    .catch(e => {
                        this.error = e;
                    })
            }
        }
        else {
            activityData = {
                dealId: this.dealId,
                type: "TASK",
                field: {
                    title: this.title,
                    notes: this.notes,
                    assignedTo: this.assignedTo,
                    dueDate: this.dueDate
                }
            };

            this.service.createActivity(activityData)
                .then((result) => {
                    this.resetActivityFilter();
                    this.getActivityData();
                    this.resetField();
                })
                .catch(e => {
                    this.error = e;
                })
        }
    }

    editActivity(activity) {
        this.dialog.show(ActivityFormView, { id: activity._id, type: activity.type, formatBytes: this.formatBytes })
            .then(response => {
                if (!response.wasCancelled) {
                    if (activity.type == "TASK") {
                        activity.taskTitle = response.output.title;
                        activity.notes = response.output.notes;
                        activity.assignedTo = response.output.assignedTo.username;
                        activity.dueDate = moment(response.output.dueDate).format("DD MMM YYYY HH:mm");
                    }
                    else {
                        this.resetActivityFilter();
                        this.getActivityData();
                    }
                }
            });
    }

    deleteActivity(id) {
        this.dialog.prompt("Apakah anda yakin mau menghapus aktivitas ini?", "Hapus Aktivitas")
            .then(response => {
                if (response == "ok") {
                    this.service.deleteActivity({ _id: id })
                        .then(result => {
                            this.resetActivityFilter();
                            this.getActivityData();
                        });
                }
            });
    }

    updateTaskStatus(id, checked) {
        var updateData = {
            _id: id,
            status: checked,
            type: "Update Task Status"
        };

        this.service.updateActivity(updateData);
    }

    createHyperlink() {
        this.dialog.show(HyperlinkFormView, {})
            .then(response => {
                if (!response.wasCancelled) {
                    this.notes += `<a href='${response.output.url}' target='${response.output.newTab}'>${response.output.linkText}</a>`;
                }
            });
    }

    uploadFile() {
        var fileUpload = document.getElementById("fileUpload");

        if (fileUpload) {
            for (var file of fileUpload.files) {
                file.newSize = this.formatBytes(file.size);
                this.attachments.push(file);
            }
        }
    }

    getFile(fileNameStorage) {
        this.service.getFile(fileNameStorage);
    }

    deleteFile(index, activity) {
        this.dialog.prompt("Apakah anda yakin mau menghapus attachment ini?", "Hapus Attachment")
            .then(response => {
                if (response == "ok") {
                    var data = {
                        _id: activity._id,
                        fileName: activity.attachments[index].fileNameStorage,
                        attachments: activity.attachments
                    };

                    data.attachments.splice(index, 1);

                    this.service.deleteFile(data);
                }
            });
    }

    formatBytes(bytes, decimals) {
        if (bytes == 0) return '0 Bytes';
        var k = 1000,
            dm = decimals || 2,
            sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    deleteAttachment(index) {
        this.attachments.splice(index, 1);
    }

    resetField() {
        this.attachments = [];
        this.notes = "";
        this.title = "";
        this.assignedTo = undefined;
        this.dueDate = undefined;
        this.error = {};
    }

    resetActivityFilter() {
        this.activities = [];

        this.activityFilter = {
            page: 1,
            size: 15,
            total: 0,
            order: { "_createdDate": "desc" }
        };    
    }

    editCallback() {
        var params = {
            id: this.dealId,
            stageName: this.stageName,
            currency: this.board.currency.code,
            type: "Edit"
        };

        this.dialog.show(DealFormView, params)
            .then(response => {
                if (!response.wasCancelled) {
                    this.getDealData();
                }
            });
    }

    deleteCallback() {
        this.dialog.prompt("Apakah anda yakin mau menghapus deal ini?", "Hapus Deal")
            .then(response => {
                if (response == "ok") {
                    this.service.deleteDeal({ _id: this.dealId })
                        .then(result => {
                            this.cancelCallback();
                        });
                }
            });
    }

    @computedFrom("activities.length")
    get isActivitiesEqualTotal() {
        return this.activityFilter.total == this.activities.length;
    }

    cancelCallback() {
        this.router.navigateToRoute('board', { id: this.boardId });
    }

    get accountLoader() {
        return AccountLoader;
    }
}