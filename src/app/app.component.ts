import {
  Component,
  OnInit,
  DoCheck,
  ChangeDetectorRef,
  AfterViewChecked,
} from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from './servises/articles.service';
import { LangService } from './servises/lang.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, AfterViewChecked {
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
    private artickle: ArticlesService,
    private lan: LangService,
    private cdr: ChangeDetectorRef
  ) {}

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
    this.artickle.selectedGroups = [];
    // Перенаправление на новый путь
    this.router.navigateByUrl(newPath).then(() => {
      // После перехода выполнить прокрутку страницы в самый верх
      window.scrollTo(0, 0);
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
  checkLang!: number;
  setUkraine() {
    this.lan.setNumber(1);
    // this.getLang();
  }
  setRussian() {
    this.lan.setNumber(2);
    // this.getLang();
  }
  setEnglish() {
    this.lan.setNumber(3);
    // this.getLang();
  }
  ngOnInit(): void {
    this.getLang();
  }

  getLang() {
    // this.checkLang = this.lan.getNumber();
    this.lan.getNumber().subscribe((value) => {
      this.checkLang = value;
    });
  }
  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }
  // ngDoCheck() {
  //   this.getLang();
  //   console.log(this.checkLang);
  // }
}
