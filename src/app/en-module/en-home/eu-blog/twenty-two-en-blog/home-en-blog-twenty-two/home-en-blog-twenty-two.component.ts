import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-blog-twenty-two',
  templateUrl: './home-en-blog-twenty-two.component.html',
  styleUrl: './home-en-blog-twenty-two.component.scss',
})
export class HomeEnBlogTwentyTwoComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Price patterns in trading - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'About price patterns in trading',
    });
  }
}