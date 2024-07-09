import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkTwentyFiveComponent } from './home-uk-twenty-five/home-uk-twenty-five.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeUkTwentyFiveComponent }];
@NgModule({
  declarations: [HomeUkTwentyFiveComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TwentyFiveUkArtickleModule {}
