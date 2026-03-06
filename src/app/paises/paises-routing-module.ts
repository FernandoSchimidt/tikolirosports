import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaisesList } from './paises-list/paises-list';
import { PaisesForm } from './paises-form/paises-form';

const routes: Routes = [
  { path: '', redirectTo: 'paises', pathMatch: 'full' },
  { path: 'paises', component: PaisesList },
  { path: 'novo', component: PaisesForm },
  { path: ':id/editar', component: PaisesForm }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaisesRoutingModule { }
