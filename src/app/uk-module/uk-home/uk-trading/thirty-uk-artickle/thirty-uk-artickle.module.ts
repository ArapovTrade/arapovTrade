import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkThirtyComponent } from './home-uk-thirty/home-uk-thirty.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeUkThirtyComponent }];
@NgModule({
  declarations: [HomeUkThirtyComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ThirtyUkArtickleModule {}
