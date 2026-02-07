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
import { ThemeservService } from '../../../../../servises/themeserv.service';
import { Subscription } from 'rxjs';
declare var AOS: any;
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-osnovy-treydinga-tom-two-uk',
  templateUrl: './osnovy-treydinga-tom-two-uk.component.html',
  styleUrl: './osnovy-treydinga-tom-two-uk.component.scss'
})
export class OsnovyTreydingaTomTwoUkComponent 
  implements OnInit, AfterViewInit, OnDestroy
{
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
  currentLang = 'ua';
  dropdownOpen = false;
  menuOpen: boolean = false;
  ngOnInit() {
    this.removeExistingWebPageSchema();

    this.titleService.setTitle(
      'Основи трейдингу. Практика — Безкоштовна книга Ігоря Арапова | 979-8-90243-078-0'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Завантажити безкоштовно книгу «Основи трейдингу. Практика» — методичне посібник для початкових трейдерів від Ігоря Арапова. FOREX, технічний аналіз, об’ємний аналіз, Smart Money. 979-8-90243-078-0',
    });

    this.meta.updateTag({
      name: 'keywords',
      content:
        'книга трейдинг, навчання трейдингу, форекс для початківців, технічний аналіз, об`ємний аналіз, Ігор Арапов, Smart Money',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-06-07' });
    this.meta.updateTag({
      property: 'og:image',
      content: 'https://arapov.trade/assets/img/photo_mainpage.jpg',
    });
    this.addWebSiteSchema();
    this.addWebPageSchema();
    this.addFAQPageSchema();
    this.addPersoneSchema();
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
        if (content['@type'] === 'Book') {
          script.remove();
        }
        if (content['@type'] === 'Person') {
          script.remove();
        }
        if (content['@type'] === 'WebPage') {
          script.remove();
        }
        if (content['@type'] === 'FAQPage') {
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
        return json['@type'] === 'Book' && json['name'] === 'Основи трейдингу. Практика';
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
      '@type': 'Book',
      '@id': 'https://arapov.trade/uk/books/osnovy-treydinga-tom-two#book',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://arapov.trade/uk/books/osnovy-treydinga-tom-two',
      },
      name: 'Основи трейдингу. Практика',
      alternateName: [
        'Osnovy Treydinga. Practic',
        'Методичний посібник з Фінансового Трейдингу',
        'Trading Basics',
      ],
      headline:
        'Основи трейдингу. Практика — Методичний посібник для початкових трейдерів',
      description:
        'Практичне керівництво по фінансовому трейдингу для початківців. Книга охоплює основи біржової торгівлі, ринок FOREX, фундаментальний, технічний та об’ємний аналіз, види ордерів, управління капіталом та типові помилки трейдерів. Автор ділиться 12-річним досвідом торгівлі на фінансових ринках.',
      isbn: '979-8-90243-078-0',
      numberOfPages: 60,
      bookFormat: 'https://schema.org/EBook',
      bookEdition: '1-е видання',
      inLanguage: {
        '@type': 'Language',
        name: 'Russian',
        alternateName: 'ru',
      },
      datePublished: '2025-12-18',
      dateCreated: '2025-12-18',
      copyrightYear: 2025,
      copyrightHolder: {
        '@type': 'Person',
        '@id': 'https://arapov.trade/uk#author',
      },
      genre: ['Business', 'Finance', 'Trading', 'Education', 'Investment'],
      about: [
        {
          '@type': 'Thing',
          name: 'Біржова торгівля',
          sameAs: 'https://ru.wikipedia.org/wiki/Биржевая_торговля',
        },
        {
          '@type': 'Thing',
          name: 'FOREX',
          sameAs: 'https://ru.wikipedia.org/wiki/Форекс',
        },
        {
          '@type': 'Thing',
          name: 'Технічний аналіз',
          sameAs: 'https://ru.wikipedia.org/wiki/Технический_анализ',
        },
        {
          '@type': 'Thing',
          name: 'Фундаментальний аналіз',
        },
        {
          '@type': 'Thing',
          name: 'Об’ємний аналіз',
        },
        {
          '@type': 'Thing',
          name: 'Управління капіталом',
        },
        {
          '@type': 'Thing',
          name: 'Smart Money Concepts',
        },
      ],
      keywords:
        'трейдинг, форекс, технічний аналіз, об’ємний аналіз, біржа, інвестиції, smart money, навчання трейдингу',
      author: {
        '@type': 'Person',
        '@id': 'https://arapov.trade/uk#author',
      },
      publisher: {
        '@type': 'Organization',
        '@id': 'https://arapov.trade/#organization',
      },
      image: {
        '@type': 'ImageObject',
        url: 'https://arapov.trade/assets/redesignArapovTrade/img/cover_ukr.png',
        width: 600,
        height: 900,
        caption: 'Обкладинка книги «Основи трейдингу. Практика» - Ігор Арапов',
      },
      url: 'https://arapov.trade/uk/books/osnovy-treydinga-tom-two',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://arapov.trade/uk/books/osnovy-treydinga-tom-two',
        priceValidUntil: '2026-12-31',
        seller: {
          '@type': 'Organization',
          '@id': 'https://arapov.trade/#organization',
        },
      },
      workExample: {
        '@type': 'Book',
        isbn: '979-8-90243-078-0',
        bookFormat: 'https://schema.org/EBook',
        inLanguage: 'ru',
        potentialAction: {
          '@type': 'ReadAction',
          target: {
            '@type': 'EntryPoint',
            url: 'https://arapov.trade/uk/books/osnovy-treydinga-tom-two',
            actionPlatform: [
              'http://schema.org/DesktopWebPlatform',
              'http://schema.org/MobileWebPlatform',
            ],
          },
          expectsAcceptanceOf: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
            eligibleRegion: {
              '@type': 'Place',
              name: 'Worldwide',
            },
          },
        },
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5',
        ratingCount: '1',
        bestRating: '5',
        worstRating: '1',
      },
    });

    this.document.head.appendChild(script);
  }

  downloadFile() {
    const link = document.createElement('a');
    link.href = '/assets/documents/Osnovy_Treydyngu_Tom2_UA.epub'; // путь к вашему файлу
    link.download = 'Osnovy_Treydyngu_Tom2_UA.epub'; // имя файла для скачивания
    link.click();
  }

  openLink(url: string) {
    window.open(url, '_blank');
  }

  private addPersoneSchema() {
    const exists = Array.from(
      this.document.querySelectorAll('script[type="application/ld+json"]')
    ).some((script) => {
      try {
        const json = JSON.parse(script.textContent || '{}');
        return json['@type'] === 'Person' && json['name'] === 'Ігор Арапов';
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
      '@type': 'Person',
      '@id': 'https://arapov.trade/uk#author',
      name: 'Ігор Арапов',
      alternateName: ['Igor Arapov', 'Игорь Арапов'],
      givenName: 'Ігор',
      familyName: 'Арапов',
      description:
        'Український трейдер із 2013 року. Творець освітньої платформи arapov.trade, автор 130+ статей та 70+ відеоуроків з трейдингу. Спеціалізується на Smart Money концепціях, методі Вайкоффа та об`ємному аналізі.',
      url: 'https://arapov.trade',
      image: {
        '@type': 'ImageObject',
        url: 'https://arapov.trade/assets/redesignArapovTrade/img/imageAuthor-light.png',
        width: 400,
        height: 400,
        caption: 'Ігор Арапов — трейдер і автор',
      },
      sameAs: [
        'https://www.youtube.com/@ArapovTrade',
        'https://t.me/ArapovTrade',
        'https://www.instagram.com/arapovtrade/',
      ],
      jobTitle: 'Трейдер',
      hasOccupation: {
        '@type': 'Occupation',
        name: 'Trader',
        description: 'Професійний трейдер на фінансових ринках',
        occupationLocation: {
          '@type': 'Country',
          name: 'Ukraine',
        },
      },
      nationality: {
        '@type': 'Country',
        name: 'Ukraine',
        alternateName: 'Україна',
      },
      knowsAbout: [
        'Trading',
        'Smart Money Concepts',
        'Wyckoff Method',
        'Volume Analysis',
        'Technical Analysis',
        'Fundamental Analysis',
        'FOREX',
        'Stock Market',
        'Risk Management',
      ],
      knowsLanguage: [
        { '@type': 'Language', name: 'Russian' },
        { '@type': 'Language', name: 'Ukrainian' },
        { '@type': 'Language', name: 'English' },
      ],
      worksFor: {
        '@type': 'Organization',
        '@id': 'https://arapov.trade/#organization',
      },
    });

    this.document.head.appendChild(script);
  }
  private addWebPageSchema() {
    const exists = Array.from(
      this.document.querySelectorAll('script[type="application/ld+json"]')
    ).some((script) => {
      try {
        const json = JSON.parse(script.textContent || '{}');
        return json['@type'] === 'WebPage' && json['name'] === 'Основи трейдингу. Практика — Безкоштовна книга Ігоря Арапова';
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
      '@type': 'WebPage',
      '@id': 'https://arapov.trade/uk/books/osnovy-treydinga-tom-two',
      url: 'https://arapov.trade/uk/books/osnovy-treydinga-tom-two',
      name: 'Основи трейдингу. Практика — Безкоштовна книга Ігоря Арапова',
      description:
        'Скачати безкоштовно книгу з трейдингу. 979-8-90243-078-0',
      inLanguage: 'uk',
      isPartOf: {
        '@type': 'WebSite',
        '@id': 'https://arapov.trade/#website',
        name: 'arapov.trade',
        url: 'https://arapov.trade',
      },
      about: {
        '@type': 'Book',
        '@id': 'https://arapov.trade/uk/books/osnovy-treydinga-tom-two#book',
      },
      author: {
        '@type': 'Person',
        '@id': 'https://arapov.trade/uk#author',
      },
      datePublished: '2025-12-18',
      dateModified: '2025-12-18',
      mainEntity: {
        '@type': 'Book',
        '@id': 'https://arapov.trade/uk/books/osnovy-treydinga-tom-two#book',
      },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Головна',
            item: 'https://arapov.trade',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Про автора',
            item: 'https://arapov.trade/uk',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Мої книги',
            item: 'https://arapov.trade/uk/books',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Книга',
            item: 'https://arapov.trade/uk/books/osnovy-treydinga-tom-two',
          },
        ],
      },
    });

    this.document.head.appendChild(script);
  }

  private addFAQPageSchema() {
    const exists = Array.from(
      this.document.querySelectorAll('script[type="application/ld+json"]')
    ).some((script) => {
      try {
        const json = JSON.parse(script.textContent || '{}');
        return json['@type'] === 'FAQPage' && json['name'] === "Питання та відповіді щодо книги 'Основи трейдингу. Практика'";
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
      '@type': 'FAQPage',
      name: "Питання та відповіді щодо книги 'Основи трейдингу. Практика'",
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Книжка справді безкоштовна?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Так, книга «Основи трейдингу. Практика» доступна для завантаження абсолютно безкоштовно у форматі EPUB. Автор надає її як частину безкоштовної освітньої програми на платформі arapov.trade.',
          },
        },
        {
          '@type': 'Question',
          name: 'Для кого ця книга?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Книга призначена для початкових трейдерів, які хочуть зрозуміти основи фінансових ринків, а також для інвесторів, які бажають розібратися в біржовій торгівлі. Досвід у трейдингу не потрібен.',
          },
        },
        {
          '@type': 'Question',
          name: 'В якому форматі доступна книга?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Книга доступна в форматі EPUB, який підтримується більшістю електронних книг та програм для читання.',
          },
        },
        {
          '@type': 'Question',
          name: 'Хто автор книги?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Автор книги – Ігор Арапов, практикуючий трейдер з 2013 року. Творець освітньої платформи arapov.trade із 130+ статтями та YouTube каналу @ArapovTrade із 70+ відеоуроками з трейдингу.',
          },
        },
        {
          '@type': 'Question',
          name: 'Який ISBN у книги?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'ISBN книги: 979-8-90243-078-0. Це міжнародний стандартний книжковий номер, зареєстрований у Bowker Books in Print.',
          },
        },
      ],
    });

    this.document.head.appendChild(script);
  }
  
}

