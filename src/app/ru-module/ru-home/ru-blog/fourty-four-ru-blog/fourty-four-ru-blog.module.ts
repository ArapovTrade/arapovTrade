import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogFourtyFourComponent } from './home-ru-blog-fourty-four/home-ru-blog-fourty-four.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogFourtyFourComponent }];

@NgModule({
  declarations: [HomeRuBlogFourtyFourComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FourtyFourRuBlogModule {}
