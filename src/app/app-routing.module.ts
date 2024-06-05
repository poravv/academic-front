import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { homeComponent } from './admin/pages/home/home.component';
import { CiudadComponent } from './admin/pages/referenciales/ciudad/ciudad.component';
import { CiudadCreateComponent } from './admin/pages/referenciales/ciudad/ciudad-create/ciudad-create.component';
import { CreateMasivoComponent } from './admin/pages/create-masivo/create-masivo.component';
import { DeleteMasivoComponent } from './admin/pages/delete-masivo/delete-masivo.component';

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
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
