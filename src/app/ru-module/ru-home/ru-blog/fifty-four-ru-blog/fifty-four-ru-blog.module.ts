import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogFiftyFourComponent } from './home-ru-blog-fifty-four/home-ru-blog-fifty-four.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogFiftyFourComponent }];

@NgModule({
  declarations: [HomeRuBlogFiftyFourComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FiftyFourRuBlogModule {}
