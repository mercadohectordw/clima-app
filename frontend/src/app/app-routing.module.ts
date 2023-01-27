import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { HistoryComponent } from './components/pages/history/history.component';

const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "history", component: HistoryComponent},
  {path: "", redirectTo: "/home", pathMatch: 'full'},
  {path: "**", redirectTo: "/home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
