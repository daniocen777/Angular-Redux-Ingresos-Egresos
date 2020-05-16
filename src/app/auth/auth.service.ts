import { Injectable } from "@angular/core";

import { AngularFireAuth } from "angularfire2/auth";
import { AngularFirestore } from "angularfire2/firestore";
import * as firebase from "firebase";

import { Router } from "@angular/router";

import { map } from "rxjs/operators";

import Swal from "sweetalert2";

import { User } from "./user.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afDB: AngularFirestore
  ) {}

  // Escuchar el estado del usuario
  initAuthListener() {
    this.afAuth.authState.subscribe((fbUser: firebase.User) => {
      console.log(fbUser);
    });
  }

  crearUsuario(nombre: string, email: string, password: string) {
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
          });
      })
      .catch((error) => {
        Swal.fire("Error en el registro", error.message, "error");
        /* console.error(error); */
      });
  }

  login(email: string, password: string) {
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then((resp) => {
        // console.log(resp);
        this.router.navigate(["/"]);
      })
      .catch((error) => {
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
