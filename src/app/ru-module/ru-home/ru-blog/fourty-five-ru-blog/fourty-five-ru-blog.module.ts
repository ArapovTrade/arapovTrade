import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogFourtyFiveComponent } from './home-ru-blog-fourty-five/home-ru-blog-fourty-five.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogFourtyFiveComponent }];

@NgModule({
  declarations: [HomeRuBlogFourtyFiveComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FourtyFiveRuBlogModule {}
