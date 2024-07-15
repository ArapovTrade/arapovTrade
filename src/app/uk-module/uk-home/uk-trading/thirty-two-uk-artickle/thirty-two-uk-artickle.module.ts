import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkThirtyTwoComponent } from './home-uk-thirty-two/home-uk-thirty-two.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeUkThirtyTwoComponent }];
@NgModule({
  declarations: [HomeUkThirtyTwoComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ThirtyTwoUkArtickleModule {}
