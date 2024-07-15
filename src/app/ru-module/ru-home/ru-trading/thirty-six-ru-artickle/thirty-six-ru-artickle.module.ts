import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuThirtySixComponent } from './home-ru-thirty-six/home-ru-thirty-six.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeRuThirtySixComponent }];
@NgModule({
  declarations: [HomeRuThirtySixComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ThirtySixRuArtickleModule {}
