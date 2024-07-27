import { Component, OnInit } from '@angular/core';

import { NavigationEnd, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-uk-blog-homepage',
  templateUrl: './uk-blog-homepage.component.html',
  styleUrl: './uk-blog-homepage.component.scss',
})
export class UkBlogHomepageComponent implements OnInit {
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
      'Безкоштовне навчання трейдингу від Ігоря Арапова'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.addTag({
      name: 'keywords',
      content:
        'Безкоштовне навчання трейдингу, навчання трейдингу з нуля безкоштовно, курси з трейдингу безкоштовно, навчання трейдингу безкоштовно, навчання трейдингу криптовалют, трейдинг з нуля',
    });
  }
}
