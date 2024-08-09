import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogFiftyOneComponent } from './home-uk-blog-fifty-one/home-uk-blog-fifty-one.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogFiftyOneComponent }];

@NgModule({
  declarations: [HomeUkBlogFiftyOneComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FiftyOneUkBlogModule {}
