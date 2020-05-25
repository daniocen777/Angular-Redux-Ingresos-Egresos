import * as fromIngresoEgreso from "./ingreso-egreso.actions";
import { IngresoEgreso } from "./ingreso-egreso.model";
import { AppState } from "../app.reducer";

export interface IngresoEgresoState {
  items: IngresoEgreso[];
}

// Para añadir el ingreso-egreso
export interface AppStateIngresoEgreso extends AppState {
  ingresoEgreso: IngresoEgresoState;
}

const initState: IngresoEgresoState = {
  items: [],
};

export function ingresoEgresoReducer(
  state = initState,
  action: fromIngresoEgreso.acciones
): IngresoEgresoState {
  switch (action.type) {
    case fromIngresoEgreso.SET_ITEMS:
      return {
        items: [
          // Mejor retornar un nuevo estado
          ...action.items.map((item) => {
            return { ...item }; // Nuevo elemento
          }),
        ],
      };

    case fromIngresoEgreso.UNSET_ITEMS:
      return {
        items: [],
      };

    default:
      return state;
  }
}
