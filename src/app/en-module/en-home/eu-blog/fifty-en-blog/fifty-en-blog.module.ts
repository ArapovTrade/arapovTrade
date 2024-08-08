import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogFiftyComponent } from './home-en-blog-fifty/home-en-blog-fifty.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogFiftyComponent }];

@NgModule({
  declarations: [HomeEnBlogFiftyComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FiftyEnBlogModule {}
