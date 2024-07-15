import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuThirtyOneComponent } from './home-ru-thirty-one/home-ru-thirty-one.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeRuThirtyOneComponent }];
@NgModule({
  declarations: [HomeRuThirtyOneComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ThirtyOneRuArtickleModule {}
