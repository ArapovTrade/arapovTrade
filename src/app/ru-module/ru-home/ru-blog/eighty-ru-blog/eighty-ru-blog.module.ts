import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogEightyComponent } from './home-ru-blog-eighty/home-ru-blog-eighty.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogEightyComponent }];

@NgModule({
  declarations: [HomeRuBlogEightyComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class EightyRuBlogModule {}
