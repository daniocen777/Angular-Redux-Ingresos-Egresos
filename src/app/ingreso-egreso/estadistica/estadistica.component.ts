import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducer";
import { Subscription } from "rxjs";
import { IngresoEgreso } from "../ingreso-egreso.model";

@Component({
  selector: "app-estadistica",
  templateUrl: "./estadistica.component.html",
  styleUrls: ["./estadistica.component.css"],
})
export class EstadisticaComponent implements OnInit {
  ingresos: number;
  egresos: number;
  cantidadIngreso: number;
  cantidadEgreso: number;
  subscription: Subscription = new Subscription();
  // Para la gráfica
  public doughnutChartLabels: string[] = ["Ingresos", "Egresos"];
  public doughnutChartData: number[] = [];

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.subscription = this.store
      .select("ingresoEgreso")
      .subscribe((ingresoEgreso) => {
        this.contarIngresoEgreso(ingresoEgreso.items);
      });
  }

  contarIngresoEgreso(items: IngresoEgreso[]) {
    this.ingresos = 0;
    this.egresos = 0;
    this.cantidadEgreso = 0;
    this.cantidadIngreso = 0;

    items.forEach((item) => {
      if (item.tipo === "ingreso") {
        this.cantidadIngreso += 1;
        this.ingresos += item.monto;
      } else {
        this.cantidadEgreso += 1;
        this.egresos += item.monto;
      }
    });
    this.doughnutChartData = [this.ingresos, this.egresos];
  }
}
