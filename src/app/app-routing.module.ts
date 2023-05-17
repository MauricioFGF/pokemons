import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PokemonProfileComponent } from './components/pokemon-profile/pokemon-profile.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pokemon', redirectTo: '', pathMatch: 'full' },
  { path: 'pokemon/:id', component: PokemonProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
