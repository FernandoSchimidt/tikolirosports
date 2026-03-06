import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidosList } from './pedidos.list/pedidos.list';
import { PedidosNew } from './pedidos.new/pedidos.new';
import { PedidosDetalhe } from './pedidos.detalhe/pedidos.detalhe';

const routes: Routes = [
  { path: '', component: PedidosList },
  { path: 'novo', component: PedidosNew },
  { path: 'pedido/:id', component: PedidosDetalhe }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
