import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogFiftyEightComponent } from './home-uk-blog-fifty-eight/home-uk-blog-fifty-eight.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogFiftyEightComponent }];

@NgModule({
  declarations: [HomeUkBlogFiftyEightComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FiftyEightUkBlogModule {}
