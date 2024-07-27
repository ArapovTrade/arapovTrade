import { Component, OnInit } from '@angular/core';

import { NavigationEnd, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-ru-blog-homepage',
  templateUrl: './ru-blog-homepage.component.html',
  styleUrl: './ru-blog-homepage.component.scss',
})
export class RuBlogHomepageComponent implements OnInit {
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
    this.titleService.setTitle(
      'Бесплатное обучение трейдингу от Игоря Арапова'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.addTag({
      name: 'keywords',
      content:
        'Бесплатное обучение трейдингу , обучение трейдингу с нуля бесплатно,  курсы по трейдингу бесплатно,  обучение трейдингу бесплатно, обучение трейдингу криптовалют, трейдинг с нуля',
    });
  }
}
