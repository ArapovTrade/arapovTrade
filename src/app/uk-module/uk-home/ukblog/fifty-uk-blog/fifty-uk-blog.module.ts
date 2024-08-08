import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogFiftyComponent } from './home-uk-blog-fifty/home-uk-blog-fifty.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogFiftyComponent }];

@NgModule({
  declarations: [HomeUkBlogFiftyComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FiftyUkBlogModule {}
