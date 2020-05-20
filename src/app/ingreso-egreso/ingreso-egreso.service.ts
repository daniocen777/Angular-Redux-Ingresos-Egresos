import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { IngresoEgreso } from "./ingreso-egreso.model";
import { AuthService } from "../auth/auth.service";
import { Store } from "@ngrx/store";
import { AppState } from "../app.reducer";
import { filter, map } from "rxjs/operators";
import { SetItemsAction, UnsetItemsAction } from "./ingreso-egreso.actions";
import { Subscription } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class IngresoEgresoService {
  ingresoEgresoListenerSubscription: Subscription = new Subscription();
  ingresoEgresoItemsSubscription: Subscription = new Subscription();

  constructor(
    private afDB: AngularFirestore,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  // Escuchando los cambios => en el dashboard
  initIngresoEgresoListener() {
    this.ingresoEgresoListenerSubscription = this.store
      .select("auth")
      .pipe(filter((auth) => auth.user != null))
      .subscribe((auth) => this.ingresoEgresoItens(auth.user.uid));
  }

  private ingresoEgresoItens(uid: string) {
    // collection => Arreglo de elemento
    // doc => json
    // snapshotChanges => agrega payload/doc/[exists, ID, metadata...]
    this.ingresoEgresoItemsSubscription = this.afDB
      .collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map((docData) => {
          return docData.map((doc: any) => {
            return {
              uid: doc.payload.doc.id,
              ...doc.payload.doc.data(),
            };
          });
        })
      )
      .subscribe((coleccion: any[]) => {
        this.store.dispatch(new SetItemsAction(coleccion));
      });
  }

  cancelarSubscripciones() {
    this.ingresoEgresoListenerSubscription.unsubscribe();
    this.ingresoEgresoItemsSubscription.unsubscribe();
    this.store.dispatch(new UnsetItemsAction());
  }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    // Extrallendo el uid del usuario
    const user = this.authService.getUsuario();
    // Se necesita el uid del usuario logueado
    return this.afDB
      .doc(`${user.uid}/ingresos-egresos`)
      .collection("items")
      .add({
        ...ingresoEgreso,
      });
  }

  borrarIngresoEgreso(uid: string) {
    const user = this.authService.getUsuario();
    return this.afDB.doc(`${user.uid}/ingresos-egresos/items/${uid}`).delete();
  }
}
