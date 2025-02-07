import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogSixtyOneComponent } from './home-ru-blog-sixty-one/home-ru-blog-sixty-one.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeRuBlogSixtyOneComponent }];

@NgModule({
  declarations: [HomeRuBlogSixtyOneComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SixtyOneRuBlogModule {}
