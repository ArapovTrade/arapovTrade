import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogElevenComponent } from './home-ru-blog-eleven/home-ru-blog-eleven.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogElevenComponent }];

@NgModule({
  declarations: [HomeRuBlogElevenComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ElevenRuBlogModule {}
