import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutosList } from './produtos-list/produtos-list';
import { ProdutosNew } from './produtos-new/produtos-new';

const routes: Routes = [
  { path: '', component: ProdutosList },
  { path: 'novo', component: ProdutosNew },
  { path: ':id/editar', component: ProdutosNew }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutosRoutingModule { }
