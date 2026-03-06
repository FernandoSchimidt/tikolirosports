import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'produtos', pathMatch: 'full' },
  {
    path: 'produtos',
    loadChildren: () =>
      import('./produtos/produtos-module')
        .then(m => m.ProdutosModule),
  },
  {
    path: 'clientes',
    loadChildren: () =>
      import('./clientes/clientes-module')
        .then(m => m.ClientesModule)
  },
  {
    path: 'categorias',
    loadChildren: () =>
      import('./categorias/categorias-module')
        .then(m => m.CategoriasModule)
  },
  {
    path: 'times',
    loadChildren: () =>
      import('./times/times-module')
        .then(m => m.TimesModule)
  },
  {
    path: 'paises',
    loadChildren: () =>
      import('./paises/paises-module')
        .then(m => m.PaisesModule)
  },
  {
    path: 'estoque',
    loadChildren: () =>
      import('./estoque/estoque-module')
        .then(m => m.EstoqueModule)
  },
  {
    path: 'pedidos',
    loadChildren: () =>
      import('./pedidos/pedidos-module')
        .then(m => m.PedidosModule)
  }
];