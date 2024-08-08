import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-blog-fourty-six',
  templateUrl: './home-en-blog-fourty-six.component.html',
  styleUrl: './home-en-blog-fourty-six.component.scss',
})
export class HomeEnBlogFourtySixComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Free trading education - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Free Trading education | Trading training from scratch',
    });
  }
}
