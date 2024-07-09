import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuTwentyThreeComponent } from './home-ru-twenty-three/home-ru-twenty-three.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeRuTwentyThreeComponent }];
@NgModule({
  declarations: [HomeRuTwentyThreeComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TwentyThreeRuArtickleModule {}
