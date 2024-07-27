import { Component, OnInit } from '@angular/core';

import { NavigationEnd, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-en-blog-homepage',
  templateUrl: './en-blog-homepage.component.html',
  styleUrl: './en-blog-homepage.component.scss',
})
export class EnBlogHomepageComponent implements OnInit {
  constructor(
    private router: Router,
    private meta: Meta,
    private titleService: Title
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (typeof window !== 'undefined') {
          window.scrollTo(0, 0);
        }
      }
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle('Free trading training from Igor Arapov');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.addTag({
      name: 'keywords',
      content:
        'cryptocurrency trading training, trading from scratch, Free trading training, free trading training from scratch, free trading courses, free trading training',
    });
  }
}
