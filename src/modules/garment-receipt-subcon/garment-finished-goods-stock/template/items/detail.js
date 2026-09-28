export class Detail {
  warehouseOptions =['','G01', 'G02'];
  areaOptions =['','A','B','C','D'];
  lineOptions =['','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17'];
  palletOptions =['','P01','P02','P03','P04','P05'];

  activate(context) {
    this.context = context;
    this.data = context.data || {};
    this.error = context.error || {};
    this.options = context.options || {};
    this.readOnly = !!this.options.readOnly;
  }
}
