import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkTwentyOneComponent } from './home-uk-twenty-one/home-uk-twenty-one.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeUkTwentyOneComponent }];
@NgModule({
  declarations: [HomeUkTwentyOneComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TwentyOneUkArtickleModule {}
