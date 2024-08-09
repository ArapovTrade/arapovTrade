import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogFiftySevenComponent } from './home-ru-blog-fifty-seven/home-ru-blog-fifty-seven.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogFiftySevenComponent }];

@NgModule({
  declarations: [HomeRuBlogFiftySevenComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FiftySevenRuBlogModule {}
