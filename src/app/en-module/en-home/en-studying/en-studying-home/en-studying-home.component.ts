import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-en-studying-home',
  templateUrl: './en-studying-home.component.html',
  styleUrl: './en-studying-home.component.scss',
})
export class EnStudyingHomeComponent implements OnInit {
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
      " Author's online trading training Trading courses Igor Arapov"
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        "Author's ⏩ trading training from ArapovTrade. ⭐ Distance learning online trading from scratch from Igor Arapov.",
    });
    this.meta.addTag({
      name: 'keywords',
      content:
        'trading courses, trading, trading training, online trading training, free trading training, distance trading training ',
    });
  }
  navigateToHomeWithId() {
    this.router.navigateByUrl('/en/home').then(() => {
      setTimeout(() => {
        this.scrollToRegistration();
      }, 100);
    });
  }
  scrollToRegistration() {
    const element = document.getElementById('registrationEn');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  // changeLanguage(lang: string) {
  //   // Получение текущего пути
  //   const currentPath = this.router.url;

  //   // Разделение пути на части
  //   const pathSegments = currentPath.split('/');

  //   // Замена языка в пути
  //   if (pathSegments[1] === 'uk' || pathSegments[1] === 'en') {
  //     pathSegments[1] = lang;
  //   } else {
  //     pathSegments.unshift(lang);
  //   }

  //   // Построение нового пути
  //   const newPath = pathSegments.join('/');

  //   // Перенаправление на новый путь
  //   this.router.navigateByUrl(newPath);
  // }
}
