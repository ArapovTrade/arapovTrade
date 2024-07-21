import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-blog-two',
  templateUrl: './home-en-blog-two.component.html',
  styleUrl: './home-en-blog-two.component.scss',
})
export class HomeEnBlogTwoComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Divergence on indicators - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Divergence on indicators',
    });
  }
}
