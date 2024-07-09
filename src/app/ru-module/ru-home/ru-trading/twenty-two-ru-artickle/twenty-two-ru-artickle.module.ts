import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuTwentyTwoComponent } from './home-ru-twenty-two/home-ru-twenty-two.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeRuTwentyTwoComponent }];
@NgModule({
  declarations: [HomeRuTwentyTwoComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TwentyTwoRuArtickleModule {}
