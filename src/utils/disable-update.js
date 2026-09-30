export class StatusHelper {

    // static disableEditDelete(context, createdUtc, condition) {
    //     const isMoreThanOneDay =
    //         moment().diff(moment.utc(createdUtc), 'days') >= 1;

    //     console.log('isMoreThanOneDay', isMoreThanOneDay);
    //     if (condition && isMoreThanOneDay) {
    //         context.editCallback = undefined;
    //         context.deleteCallback = undefined;
    //     }
    // }
    static disableEditDelete(context, condition) {
        if (condition) {
            context.editCallback = undefined;
            context.deleteCallback = undefined;
            context.hasEdit = false;
            context.hasDelete = false;
        }
    }

}