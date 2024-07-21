import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogFourComponent } from './home-uk-blog-four/home-uk-blog-four.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogFourComponent }];

@NgModule({
  declarations: [HomeUkBlogFourComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FourUkBlogModule {}
