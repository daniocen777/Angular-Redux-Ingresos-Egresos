import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Módulos
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
// NGRX
import { StoreModule } from "@ngrx/store";
import { appReducers } from "./app.reducer";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
// Firebase
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireAuthModule } from "angularfire2/auth";
// Enviroments
import { environment } from "src/environments/environment";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./auth/login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { IngresoEgresoComponent } from "./ingreso-egreso/ingreso-egreso.component";
import { EstadisticaComponent } from "./ingreso-egreso/estadistica/estadistica.component";
import { DetalleComponent } from "./ingreso-egreso/detalle/detalle.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { SidebarComponent } from "./shared/sidebar/sidebar.component";
import { RegisterComponent } from "./auth/register/register.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
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
