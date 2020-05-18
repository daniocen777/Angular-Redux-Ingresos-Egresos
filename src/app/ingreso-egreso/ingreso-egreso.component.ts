import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { IngresoEgreso } from "./ingreso-egreso.model";

@Component({
  selector: "app-ingreso-egreso",
  templateUrl: "./ingreso-egreso.component.html",
  styleUrls: ["./ingreso-egreso.component.css"],
})
export class IngresoEgresoComponent implements OnInit {
  // Trabajando con reactive forms
  forma: FormGroup;
  tipo = "ingreso";

  constructor() {}

  ngOnInit() {
    this.forma = new FormGroup({
      // FormControl("valor por defercto", Validaciones)
      descripcion: new FormControl("", Validators.required),
      monto: new FormControl(0, Validators.min(1)),
    });
  }

  crearIngresoEgreso() {
    const ingresoEgreso = new IngresoEgreso({
      ...this.forma.value,
      tipo: this.tipo,
    });
    console.log(ingresoEgreso);
  }
}
