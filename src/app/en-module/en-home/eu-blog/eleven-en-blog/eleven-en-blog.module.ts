import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogElevenComponent } from './home-en-blog-eleven/home-en-blog-eleven.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogElevenComponent }];

@NgModule({
  declarations: [HomeEnBlogElevenComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ElevenEnBlogModule {}
