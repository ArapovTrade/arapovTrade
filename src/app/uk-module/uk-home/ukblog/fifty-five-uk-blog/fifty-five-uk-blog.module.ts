import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogFiftyFiveComponent } from './home-uk-blog-fifty-five/home-uk-blog-fifty-five.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogFiftyFiveComponent }];

@NgModule({
  declarations: [HomeUkBlogFiftyFiveComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FiftyFiveUkBlogModule {}
