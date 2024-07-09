import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuTwentyFourComponent } from './home-ru-twenty-four/home-ru-twenty-four.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeRuTwentyFourComponent }];
@NgModule({
  declarations: [HomeRuTwentyFourComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TwentyFourRuArtickleModule {}
