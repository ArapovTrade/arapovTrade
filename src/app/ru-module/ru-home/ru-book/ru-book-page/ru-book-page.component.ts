import {
  Component,
  OnInit,
  HostListener,
  AfterViewInit,
  ChangeDetectorRef,
  Inject,
  OnDestroy,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { ThemeservService } from '../../../../servises/themeserv.service';
import { Subscription } from 'rxjs';
declare var AOS: any;
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-ru-book-page',
  templateUrl: './ru-book-page.component.html',
  styleUrl: './ru-book-page.component.scss',
})
export class RuBookPageComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private router: Router,
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document,
    private themeService: ThemeservService
  ) {}

  ngAfterViewInit() {
    setTimeout(() => {
      if (typeof AOS !== 'undefined') {
        AOS.init({
          duration: 1000,
          once: false,
          offset: 100,
        });
      }
    }, 500); // Задержка 0.5s
  }
  isDark!: boolean;
  languages = ['ua', 'en', 'ru']; // какие языки нужны
  currentLang = 'ru';
  dropdownOpen = false;
  menuOpen: boolean = false;
  ngOnInit() {
    this.removeExistingWebPageSchema();

    this.titleService.setTitle(
      'Обучение трейдеров торговле на бирже | Курс трейдинга от Игоря Арапова'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Бесплатный курс по трейдингу Игоря Арапова: 130+ статей и 70 видео. Изучайте теханализ, риск-менеджмент и торговые стратегии онлайн',
    });

    this.meta.updateTag({
      name: 'keywords',
      content:
        'Трейдинг, Обучение трейдингу, Технический анализ, Финансовая биржа, Торговая система, Игорь Арапов',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-06-07' });
    this.meta.updateTag({
      property: 'og:image',
      content: 'https://arapov.trade/assets/img/photo_mainpage.jpg',
    });
    this.addWebSiteSchema();

    this.themeSubscription = this.themeService.getTheme().subscribe((data) => {
      this.isDark = data;
      this.cdr.detectChanges();
    });

    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (typeof window !== 'undefined') {
          window.scrollTo(0, 0);
        }
      }
    });
  }
  toggleTheme() {
    this.isDark = !this.isDark;
    this.themeService.setTheme(this.isDark);

    this.refreshAOS();
  }
  refreshAOS() {
    if (typeof AOS !== 'undefined') {
      setTimeout(() => {
        AOS.refresh(); // Обновление позиций AOS
        this.cdr.detectChanges(); // Принудительное обнаружение изменений
      }, 100); // Задержка для синхронизации
    } else {
      console.warn('AOS is not defined, refresh skipped');
    }
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
  selectLang(lang: string) {
    this.currentLang = lang;

    this.dropdownOpen = false;
  }
  navigateTo(path: string) {
    this.router.navigate([path]);
  }
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    if (this.menuOpen) {
      this.dropdownOpen = false; // Закрываем меню языков, если открываем навигацию
    }
  }
  private routerSubscription!: Subscription;
  private themeSubscription!: Subscription;
  ngOnDestroy() {
    // Отписка от подписок
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }
  hovered: string | null = null;

  private removeExistingWebPageSchema(): void {
    const scripts = this.document.querySelectorAll(
      'script[type="application/ld+json"]'
    );

    scripts.forEach((script) => {
      try {
        const content = JSON.parse(script.textContent || '{}');
        if (content['@type'] === 'WebSite') {
          script.remove();
        }
      } catch (e) {
        // Игнорируем некорректные JSON (например, из других источников)
      }
    });
  }

  private addWebSiteSchema() {
    const exists = Array.from(
      this.document.querySelectorAll('script[type="application/ld+json"]')
    ).some((script) => {
      try {
        const json = JSON.parse(script.textContent || '{}');
        return json['@type'] === 'WebSite' && json['name'] === 'Arapov.Trade';
      } catch {
        return false;
      }
    });

    // Если уже существует — выходим
    if (exists) return;

    // Создаем новый JSON-LD
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': 'https://arapov.trade/ru/main#website',
      url: 'https://arapov.trade/ru/main',
      name: 'Arapov.Trade',
      alternateName: 'Обучение трейдингу',
      description:
        'Бесплатное обучение трейдингу от Игоря Арапова. 130+ статей, 70 видеоуроков.',
      inLanguage: 'ru-RU',
      publisher: {
        '@type': 'Organization',
        '@id': 'https://arapov.trade/#organization',
        name: 'Arapov.Trade',
        url: 'https://arapov.trade',
        logo: {
          '@type': 'ImageObject',
          url: 'https://arapov.trade/favicon.ico',
        },
        founder: {
          '@type': 'Person',
          '@id': 'https://arapov.trade/#person',
          name: 'Арапов Ігор Віталійович',
        },
      },
    });

    this.document.head.appendChild(script);
  }

  downloadFile() {
    const link = document.createElement('a');
    link.href = '/assets/documents/Trading_Book_ISBN.epub'; // путь к вашему файлу
    link.download = 'Trading_Book_ISBN.epub'; // имя файла для скачивания
    link.click();
  }



  openLink(url: string) {
    window.open(url, '_blank');
  }
}
