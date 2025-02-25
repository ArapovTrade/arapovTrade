import {
  Component,
  OnInit,
  DoCheck,
  ChangeDetectorRef,
  AfterViewChecked,
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from './servises/articles.service';
import { LangService } from './servises/lang.service';
import { SearchServiceService } from './servises/search-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, AfterViewChecked {
  dropdownOpen = false;
  checkLang!: number;
  private destroy$ = new Subject<void>();

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
    private cdr: ChangeDetectorRef,
    private searchSer: SearchServiceService
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

  setUkraine() {
    this.lan.setNumber(1);
  }
  setRussian() {
    this.lan.setNumber(2);
  }
  setEnglish() {
    this.lan.setNumber(3);
  }
  ngOnInit(): void {
    this.getLang();
  }
  getLang() {
    this.lan
      .getNumber()
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.checkLang = value;
        this.searchSer.setLange(this.checkLang);
      });
  }
  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  //popup
  flag1: boolean = false;
  flagTrue1: boolean = true;
  searchtoggle(event: Event) {
    this.flag1 = !this.flag1;
    this.flagTrue1 = !this.flagTrue1;
  }
}
