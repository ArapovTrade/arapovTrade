import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogFourtyTwoComponent } from './home-en-blog-fourty-two/home-en-blog-fourty-two.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogFourtyTwoComponent }];

@NgModule({
  declarations: [HomeEnBlogFourtyTwoComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FourtyTwoEnBlogModule {}
