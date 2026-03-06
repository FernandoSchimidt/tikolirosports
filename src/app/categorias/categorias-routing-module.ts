import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasList } from './categorias-list/categorias-list';
import { CategoriasNew } from './categorias-new/categorias-new';

const routes: Routes = [
  { path: '', component: CategoriasList },
  { path: 'nova', component: CategoriasNew },
  { path: ':id/editar', component: CategoriasNew }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
