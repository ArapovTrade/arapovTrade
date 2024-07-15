import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuThirtyThreeComponent } from './home-ru-thirty-three/home-ru-thirty-three.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeRuThirtyThreeComponent }];
@NgModule({
  declarations: [HomeRuThirtyThreeComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ThirtyThreeRuArtickleModule {}
