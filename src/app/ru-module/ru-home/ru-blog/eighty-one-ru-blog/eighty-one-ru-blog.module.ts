import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogEightyOneComponent } from './home-ru-blog-eighty-one/home-ru-blog-eighty-one.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogEightyOneComponent }];

@NgModule({
  declarations: [HomeRuBlogEightyOneComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class EightyOneRuBlogModule {}
