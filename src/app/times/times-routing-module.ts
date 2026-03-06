import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimesList } from './times-list/times-list';
import { TimesForm } from './times-form/times-form';

const routes: Routes = [
  { path: '', component: TimesList },
  { path: 'novo', component: TimesForm },
  { path: ':id/editar', component: TimesForm }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimesRoutingModule { }
