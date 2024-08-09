import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogFiftyNineComponent } from './home-uk-blog-fifty-nine/home-uk-blog-fifty-nine.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogFiftyNineComponent }];

@NgModule({
  declarations: [HomeUkBlogFiftyNineComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FiftyNineUkBlogModule {}
