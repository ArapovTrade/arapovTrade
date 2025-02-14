import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogEightyComponent } from './home-en-blog-eighty/home-en-blog-eighty.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogEightyComponent }];

@NgModule({
  declarations: [HomeEnBlogEightyComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class EightyEnBlogModule {}
