import { Router } from "aurelia-router";
import { Service } from "./../service";
var ShiftLoader = [];

@inject(Service, Router)
export class CreateForm {

    get Shift() {
        return ShiftLoader;
    }
}