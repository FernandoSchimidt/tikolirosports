import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Clientes } from './clientes/clientes';
import { ClientesNew } from './clientes-new/clientes-new';


const routes: Routes = [
  { path: '', component: Clientes },
  { path: 'novo', component: ClientesNew },
  { path: ':id/editar', component: ClientesNew }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
