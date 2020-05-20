import * as fromIngresoEgreso from "./ingreso-egreso.actions";
import { IngresoEgreso } from "./ingreso-egreso.model";

export interface IngresoEgresoState {
  items: IngresoEgreso[];
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
