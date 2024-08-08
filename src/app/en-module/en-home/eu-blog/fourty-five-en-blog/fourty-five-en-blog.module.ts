import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogFourtyFiveComponent } from './home-en-blog-fourty-five/home-en-blog-fourty-five.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogFourtyFiveComponent }];

@NgModule({
  declarations: [HomeEnBlogFourtyFiveComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FourtyFiveEnBlogModule {}
