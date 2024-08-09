import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogFiftyOneComponent } from './home-ru-blog-fifty-one/home-ru-blog-fifty-one.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogFiftyOneComponent }];

@NgModule({
  declarations: [HomeRuBlogFiftyOneComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FiftyOneRuBlogModule {}
