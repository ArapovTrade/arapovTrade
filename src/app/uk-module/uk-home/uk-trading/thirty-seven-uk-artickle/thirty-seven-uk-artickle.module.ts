import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkThirtySevenComponent } from './home-uk-thirty-seven/home-uk-thirty-seven.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeUkThirtySevenComponent }];
@NgModule({
  declarations: [HomeUkThirtySevenComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ThirtySevenUkArtickleModule {}
