import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuFourtyThreeComponent } from './home-ru-fourty-three/home-ru-fourty-three.component';

import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeRuFourtyThreeComponent }];

@NgModule({
  declarations: [HomeRuFourtyThreeComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FourtyThreeRuArtickleModule {}
