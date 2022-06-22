import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SortComponent } from './sort/sort.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'sort' },
  {path: 'sort', component: SortComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
