import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkTwentyTwoComponent } from './home-uk-twenty-two/home-uk-twenty-two.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeUkTwentyTwoComponent }];
@NgModule({
  declarations: [HomeUkTwentyTwoComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TwentyTwoUkArtickleModule {}
