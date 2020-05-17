import { Injectable } from "@angular/core";

import { AngularFireAuth } from "angularfire2/auth";
import { AngularFirestore } from "angularfire2/firestore";
import * as firebase from "firebase";

import { Router } from "@angular/router";

import { Store } from "@ngrx/store";
import {
  ActivarLoadingAction,
  DesactivarLoadingAction,
} from "../shared/ui.actions";

import { map } from "rxjs/operators";

import Swal from "sweetalert2";

import { User } from "./user.model";
import { AppState } from "../app.reducer";
import { SetUserAction } from "./auth.actions";
import { Subscription } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private userSubscription: Subscription = new Subscription();

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afDB: AngularFirestore,
    private store: Store<AppState>
  ) {}

  // Escuchar el estado del usuario
  initAuthListener() {
    this.afAuth.authState.subscribe((fbUser: firebase.User) => {
      if (fbUser) {
        this.userSubscription = this.afDB
          .doc(`${fbUser.uid}/usuario`)
          .valueChanges()
          .subscribe((usuarioObj: any) => {
            // console.log(usuarioObj);
            const newUser = new User(usuarioObj);
            this.store.dispatch(new SetUserAction(newUser));
          });
      } else {
        // Si ya no se tiene el usuario firebase, desuscribirse
        this.userSubscription.unsubscribe();
      }
    });
  }

  crearUsuario(nombre: string, email: string, password: string) {
    // dispatch de la acción
    this.store.dispatch(new ActivarLoadingAction());

    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then((resp) => {
        // Creanod usuario en la BD
        const user: User = {
          uid: resp.user.uid,
          nombre: nombre,
          email: resp.user.email,
        };
        /* Mandando a firebase */
        // primer Nivel/Segundo Nivel
        this.afDB
          .doc(`${user.uid}/usuario`)
          .set(user)
          .then(() => {
            this.router.navigate(["/"]);
            this.store.dispatch(new DesactivarLoadingAction());
          });
      })
      .catch((error) => {
        this.store.dispatch(new DesactivarLoadingAction());
        Swal.fire("Error en el registro", error.message, "error");
      });
  }

  login(email: string, password: string) {
    this.store.dispatch(new ActivarLoadingAction());

    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then((resp) => {
        // console.log(resp);
        this.router.navigate(["/"]);
        this.store.dispatch(new DesactivarLoadingAction());
      })
      .catch((error) => {
        this.store.dispatch(new DesactivarLoadingAction());
        Swal.fire("Error en el login", error.message, "error");
        /* console.error(error); */
      });
  }

  logout() {
    this.router.navigate(["/login"]);
    this.afAuth.auth.signOut(); // cerrando sesión
  }

  isAuth() {
    return this.afAuth.authState.pipe(
      map((fbUser) => {
        if (fbUser == null) {
          this.router.navigate(["/login"]);
        }
        return fbUser != null;
      })
    );
  }
}
