import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-eu-blog-fifty-four',
  templateUrl: './home-eu-blog-fifty-four.component.html',
  styleUrl: './home-eu-blog-fifty-four.component.scss',
})
export class HomeEuBlogFiftyFourComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Features of the Cryptocurrency market - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Features of the Cryptocurrency market | Trading training',
    });
  }
}
