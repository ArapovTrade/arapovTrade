import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-blog-six',
  templateUrl: './home-en-blog-six.component.html',
  styleUrl: './home-en-blog-six.component.scss',
})
export class HomeEnBlogSixComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Smart Money - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Smart money - a complete trading course! Teaching of trading from zero',
    });
  }
}
