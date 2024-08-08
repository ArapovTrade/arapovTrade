import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogFourtyTwoComponent } from './home-ru-blog-fourty-two/home-ru-blog-fourty-two.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogFourtyTwoComponent }];

@NgModule({
  declarations: [HomeRuBlogFourtyTwoComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FourtyTwoRuBlogModule {}
