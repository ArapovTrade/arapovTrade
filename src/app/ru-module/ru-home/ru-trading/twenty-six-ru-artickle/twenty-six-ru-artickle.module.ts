import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuTwentySixComponent } from './home-ru-twenty-six/home-ru-twenty-six.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeRuTwentySixComponent }];
@NgModule({
  declarations: [HomeRuTwentySixComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TwentySixRuArtickleModule {}
