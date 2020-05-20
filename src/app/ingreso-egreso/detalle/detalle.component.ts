import { Component, OnInit, OnDestroy } from "@angular/core";
import { AppState } from "../../app.reducer";
import { Store } from "@ngrx/store";
import { IngresoEgreso } from "../ingreso-egreso.model";
import { Subscription } from "rxjs";
import { IngresoEgresoService } from "../ingreso-egreso.service";

import Swal from "sweetalert2";

@Component({
  selector: "app-detalle",
  templateUrl: "./detalle.component.html",
  styleUrls: ["./detalle.component.css"],
})
export class DetalleComponent implements OnInit, OnDestroy {
  items: IngresoEgreso[];
  subscription: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) {}

  ngOnInit() {
    this.subscription = this.store
      .select("ingresoEgreso")
      .subscribe((ingresoEgreso) => {
        this.items = ingresoEgreso.items;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  borrarItem(item: IngresoEgreso) {
    this.ingresoEgresoService
      .borrarIngresoEgreso(item.uid)
      .then(() => {
        Swal.fire("Eliminado", item.descripcion, "success");
      })
      .catch((err) => {
        Swal.fire("Error en el registro", err.message, "error");
      });
  }
}
