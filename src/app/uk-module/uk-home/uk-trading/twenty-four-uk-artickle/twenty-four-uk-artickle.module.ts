import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkTwentyFourComponent } from './home-uk-twenty-four/home-uk-twenty-four.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeUkTwentyFourComponent }];
@NgModule({
  declarations: [HomeUkTwentyFourComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TwentyFourUkArtickleModule {}
