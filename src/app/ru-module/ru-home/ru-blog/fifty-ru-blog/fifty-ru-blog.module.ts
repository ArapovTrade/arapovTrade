import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogFiftyComponent } from './home-ru-blog-fifty/home-ru-blog-fifty.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogFiftyComponent }];

@NgModule({
  declarations: [HomeRuBlogFiftyComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FiftyRuBlogModule {}
