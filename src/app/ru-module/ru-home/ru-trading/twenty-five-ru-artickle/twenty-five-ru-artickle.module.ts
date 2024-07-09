import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuTwentyFiveComponent } from './home-ru-twenty-five/home-ru-twenty-five.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeRuTwentyFiveComponent }];
@NgModule({
  declarations: [HomeRuTwentyFiveComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TwentyFiveRuArtickleModule {}
