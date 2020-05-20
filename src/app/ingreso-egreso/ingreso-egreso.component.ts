import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { IngresoEgreso } from "./ingreso-egreso.model";
import { IngresoEgresoService } from "./ingreso-egreso.service";

import Swal from "sweetalert2";
import { Store } from "@ngrx/store";
import { AppState } from "../app.reducer";
import { Subscription } from "rxjs";
import {
  ActivarLoadingAction,
  DesactivarLoadingAction,
} from "../shared/ui.actions";

@Component({
  selector: "app-ingreso-egreso",
  templateUrl: "./ingreso-egreso.component.html",
  styleUrls: ["./ingreso-egreso.component.css"],
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  // Trabajando con reactive forms
  forma: FormGroup;
  tipo = "ingreso";
  loadingSubscription: Subscription = new Subscription();
  cargando: boolean;

  constructor(
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    // Estado de carga
    this.loadingSubscription = this.store
      .select("ui")
      .subscribe((ui) => (this.cargando = ui.isLoading));
    this.forma = new FormGroup({
      // FormControl("valor por defercto", Validaciones)
      descripcion: new FormControl("", Validators.required),
      monto: new FormControl(0, Validators.min(1)),
    });
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }

  crearIngresoEgreso() {
    this.store.dispatch(new ActivarLoadingAction());
    const ingresoEgreso = new IngresoEgreso({
      ...this.forma.value,
      tipo: this.tipo,
    });
    this.ingresoEgresoService
      .crearIngresoEgreso(ingresoEgreso)
      .then((resp) => {
        this.store.dispatch(new DesactivarLoadingAction());
        Swal.fire("Creado", ingresoEgreso.descripcion, "success");
        this.forma.reset({
          monto: 0,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
