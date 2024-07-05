import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-ru-home',
  templateUrl: './ru-home.component.html',
  styleUrl: './ru-home.component.scss',
})
export class RuHomeComponent implements OnInit {
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
    this.titleService.setTitle(
      'Курсы трейдинга Авторское обучение трейдингу онлайн | Игорь Арапов'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Авторские ⏩ курсы трейдинга от Игоря Арапова. ⭐ Обучение трейдингу с нуля от ArapovTrade.',
    });
    this.meta.addTag({
      name: 'keywords',
      content:
        'курсы трейдинга, трейдинг, биржа, финансы, акции, валюты, обучение трейдингу, курсы, бесплатное обучение трейдингу',
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
