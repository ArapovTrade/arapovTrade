import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogEightyFourComponent } from './home-en-blog-eighty-four/home-en-blog-eighty-four.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogEightyFourComponent }];

@NgModule({
  declarations: [HomeEnBlogEightyFourComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class EightyFourEnBlogModule {}
