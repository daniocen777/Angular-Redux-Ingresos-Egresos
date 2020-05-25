import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Módulos
import { AppRoutingModule } from "./app-routing.module";
// NGRX
import { StoreModule } from "@ngrx/store";
import { appReducers } from "./app.reducer";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
// Firebase
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
// Enviroments
import { environment } from "src/environments/environment";

// Componentes
import { AppComponent } from "./app.component";
// Mis módulos
import { AuthModule } from "./auth/auth.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,

    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
