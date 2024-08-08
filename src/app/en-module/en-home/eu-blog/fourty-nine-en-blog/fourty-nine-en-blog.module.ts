import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogFourtyNineComponent } from './home-en-blog-fourty-nine/home-en-blog-fourty-nine.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogFourtyNineComponent }];

@NgModule({
  declarations: [HomeEnBlogFourtyNineComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FourtyNineEnBlogModule {}
