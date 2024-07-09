import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkTwentyEightComponent } from './home-uk-twenty-eight/home-uk-twenty-eight.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeUkTwentyEightComponent }];
@NgModule({
  declarations: [HomeUkTwentyEightComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TwentyEightUkArtickleModule {}
