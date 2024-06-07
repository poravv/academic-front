import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { homeComponent } from './admin/pages/home/home.component';
import { CiudadComponent } from './admin/pages/referenciales/ciudad/ciudad.component';
import { CiudadCreateComponent } from './admin/pages/referenciales/ciudad/ciudad-create/ciudad-create.component';
import { CreateMasivoComponent } from './admin/pages/create-masivo/create-masivo.component';
import { DeleteMasivoComponent } from './admin/pages/delete-masivo/delete-masivo.component';
import { CursoComponent } from './admin/pages/referenciales/curso/curso.component';
import { CursoCreateComponent } from './admin/pages/referenciales/curso/curso-create/curso-create.component';
import { TurnoComponent } from './admin/pages/referenciales/turno/turno.component';
import { TurnoCreateComponent } from './admin/pages/referenciales/turno/turno-create/turno-create.component';
import { DocumentosComponent } from './admin/pages/referenciales/documentos/documentos.component';
import { DocumentosCreateComponent } from './admin/pages/referenciales/documentos/documentos-create/documentos-create.component';
import { TipoEvaluacionComponent } from './admin/pages/referenciales/tipo_evaluacion/tipo_evaluacion.component';
import { TipoEvaluacionCreateComponent } from './admin/pages/referenciales/tipo_evaluacion/turno-create/tipo_evaluacion-create.component';
import { AnhoLectivoComponent } from './admin/pages/referenciales/anho_lectivo/anho_lectivo.component';
import { AnhoLectivoCreateComponent } from './admin/pages/referenciales/anho_lectivo/anho_lectivo-create/anho_lectivo-create.component';

const routes: Routes = [
  { path: '', component: homeComponent },
  { path: 'create-masivo/:type', component: CreateMasivoComponent },
  { path: 'delete-masivo/:type', component: DeleteMasivoComponent },
  {
    path: 'ciudad',
    children: [
      { path: 'list', component: CiudadComponent },
      { path: 'create', component: CiudadCreateComponent }
    ]
  },
  {
    path: 'curso',
    children: [
      { path: 'list', component: CursoComponent },
      { path: 'create', component: CursoCreateComponent }
    ]
  },
  {
    path: 'turno',
    children: [
      { path: 'list', component: TurnoComponent },
      { path: 'create', component: TurnoCreateComponent }
    ]
  },
  {
    path: 'documentos',
    children: [
      { path: 'list', component: DocumentosComponent },
      { path: 'create', component: DocumentosCreateComponent }
    ]
  },
  {
    path: 'tipo_evaluacion',
    children: [
      { path: 'list', component: TipoEvaluacionComponent },
      { path: 'create', component: TipoEvaluacionCreateComponent }
    ]
  },
  {
    path: 'anho_lectivo',
    children: [
      { path: 'list', component: AnhoLectivoComponent },
      { path: 'create', component: AnhoLectivoCreateComponent }
    ]
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
