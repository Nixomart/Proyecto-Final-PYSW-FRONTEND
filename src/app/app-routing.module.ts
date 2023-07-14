import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';

import { FormularioAlumnoComponent } from './components/administrador/formulario-alumno/formulario-alumno.component';
import { ListaAlumnosComponent } from './components/administrador/lista-alumnos/lista-alumnos.component';



import { PerfilComponent } from './components/alumno/perfil/perfil.component';
import { VerSubscripcionComponent } from './components/alumno/ver-subscripcion/ver-subscripcion.component';
import { SemanarutinasComponent } from './components/alumno/semanarutinas/semanarutinas.component';
import { FormularioInsumosComponent } from './components/administrador/formulario-insumos/formulario-insumos.component';
import { ListaInsumosComponent } from './components/administrador/lista-insumos/lista-insumos.component';
import { InsumosComponent } from './components/alumno/insumos/insumos.component';
import { GenerarRutinasComponent } from './components/entrenador/generar-rutinas/generar-rutinas.component';
import { FormularioPagosComponent } from './components/administrador/formulario-pagos/formulario-pagos.component';
import { FormulariopagosssComponent } from './components/administrador/formulariopagosss/formulariopagosss.component';
import { AsistenciasComponent } from './components/entrenador/asistencias/asistencias.component';
import { Jefe1Component } from './components/jefe1/jefe1.component';
import { CalendarComponent } from './components/entrenador/calendar/calendar.component';
import { CalendarioAlumnoComponent } from './components/alumno/calendario-alumno/calendario-alumno.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'navbar', component: NavbarComponent },

  // Rutas del Administrador
  { path: 'administrador/formulario/insumo/:id', component: FormularioInsumosComponent },
  { path: 'administrador/lista-insumos', component: ListaInsumosComponent },
  { path: 'administrador/formulario/alumno', component: FormularioAlumnoComponent },
  { path: 'administrador/formulario/alumno/:id', component: FormularioAlumnoComponent },
  { path: 'administrador/lista-alumnos', component: ListaAlumnosComponent },
  { path: 'administrador/formpagos', component: FormularioPagosComponent },
  { path: 'administrador/formpagossss', component: FormulariopagosssComponent },

  { path: 'home', component: HomeComponent },
//ENTRENADOR
{ path: 'generarRutinas', component: GenerarRutinasComponent},
{ path: 'asistencia', component: AsistenciasComponent},
{ path: 'calendar', component: CalendarComponent},
  //rutas alumno
  { path: 'alumno/perfil', component: PerfilComponent },
  { path: 'alumno/cuota', component: VerSubscripcionComponent },
  { path: 'alumno/calendario', component: SemanarutinasComponent },
  { path: 'alumno/calendarioGoogle', component: CalendarioAlumnoComponent },
  { path: 'alumno/insumos', component: InsumosComponent },
  { path: '**', component: HomeComponent },

  //RUTAS ENCARGADO
  { path: 'encargado/estadisticas', component: Jefe1Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
