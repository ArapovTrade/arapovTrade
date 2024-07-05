import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  dropdownOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown() {
    this.dropdownOpen = true;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private meta: Meta,
    private titleService: Title
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Трейдинг');
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

  changeLanguage(lang: string) {
    // Получение текущего пути и параметров маршрута
    const currentPath = this.router.url;
    const pathSegments = currentPath.split('/');

    // Замена языка в пути
    if (
      pathSegments[1] === 'uk' ||
      pathSegments[1] === 'en' ||
      pathSegments[1] === 'ru'
    ) {
      pathSegments[1] = lang;
    } else {
      pathSegments.unshift(lang);
    }

    // Построение нового пути
    const newPath = pathSegments.join('/');

    // Перенаправление на новый путь
    this.router.navigateByUrl(newPath).then(() => {
      // После перехода выполнить прокрутку страницы в самый верх
      window.scrollTo(0, 0);
    });
  }
}
