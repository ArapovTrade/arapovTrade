import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogFourtyFourComponent } from './home-uk-blog-fourty-four/home-uk-blog-fourty-four.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogFourtyFourComponent }];

@NgModule({
  declarations: [HomeUkBlogFourtyFourComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FourtyFourUkBlogModule {}
