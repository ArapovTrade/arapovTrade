import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-blog-twenty-four',
  templateUrl: './home-en-blog-twenty-four.component.html',
  styleUrl: './home-en-blog-twenty-four.component.scss',
})
export class HomeEnBlogTwentyFourComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Flag figure in trading - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'How to use the Flag figure in trading?',
    });
  }
}
