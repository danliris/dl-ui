export class Detail {
  rackOptions =['','R1','R2','R3','R4','R5','R6','R7','R8','R9','R10','R11','R12','R13','R14','R15','R16','R17','R18','R19','R20','R21','R22','R23','R24','R25','R26','R27','R28','R29','R30','R31','R32','R33','R34','R35','R36','R37','R38','R39','R40','R41','R42'];
    

  activate(context) {
    this.context = context;
    this.data = context.data || {};
    this.error = context.error || {};
    this.options = context.options || {};
    this.readOnly = !!this.options.readOnly;
  }
}
