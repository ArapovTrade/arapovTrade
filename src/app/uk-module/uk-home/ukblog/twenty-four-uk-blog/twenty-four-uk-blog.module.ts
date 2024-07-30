import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogTwentyFourComponent } from './home-uk-blog-twenty-four/home-uk-blog-twenty-four.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogTwentyFourComponent }];

@NgModule({
  declarations: [HomeUkBlogTwentyFourComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TwentyFourUkBlogModule {}
