import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-uk-home',
  templateUrl: './uk-home.component.html',
  styleUrl: './uk-home.component.scss',
})
export class UkHomeComponent implements OnInit {
  constructor(
    private router: Router,
    private meta: Meta,
    private titleService: Title
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (typeof window !== 'undefined') {
          // Ваш код, который использует window
          window.scrollTo(0, 0);
        }
      }
    });
  }
  ngOnInit(): void {
    this.titleService.setTitle('Навчання трейдингу');

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Авторські ⏩ курси трейдингу від Ігоря Арапова. ⭐ Навчання трейдингу з нуля від ArapovTrade.',
    });
    this.meta.addTag({
      name: 'keywords',
      content:
        'курси трейдингу, трейдинг, біржа, фінанси, акції, валюти, навчання трейдингу, курси, безкоштовне навчання трейдингу',
    });
  }

  isMenuOpen = false;

  openMenu() {
    this.isMenuOpen = true;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
