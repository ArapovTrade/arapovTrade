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
  selector: 'app-psychologiya-treydinga',
  templateUrl: './psychologiya-treydinga.component.html',
  styleUrl: './psychologiya-treydinga.component.scss'
})
export class PsychologiyaTreydingaComponent  
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
  currentLang = 'ru';
  dropdownOpen = false;
  menuOpen: boolean = false;
  ngOnInit() {
    this.removeExistingWebPageSchema();

    this.titleService.setTitle(
      'Психология трейдинга — Бесплатная книга Игоря Арапова | ISBN 979-8-90243-081-0'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Скачать бесплатно книгу «Психология трейдинга» — практическое руководство по управлению эмоциями от Игоря Арапова. Страх, жадность, дисциплина, психология успешного трейдера. ISBN 979-8-90243-081-0',
    });

    this.meta.updateTag({
      name: 'keywords',
      content:
        'книга трейдинг, обучение трейдингу, форекс для начинающих, технический анализ, объёмный анализ, Игорь Арапов, Smart Money',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-12-17' });
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
        return json['@type'] === 'Book' && json['name'] === 'Психология трейдинга';
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
      '@id': 'https://arapov.trade/ru/books/psihologiya-treydinga#book',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://arapov.trade/ru/books/psihologiya-treydinga',
      },
      name: 'Психология трейдинга',
      alternateName: [
        'Trading Psychology',
        'Как управлять эмоциями и мыслить как профессиональный трейдер.',
        'Trading Basics',
      ],
      headline:
        'Психология трейдинга — Как управлять эмоциями и мыслить как профессиональный трейдер.',
      description:
        'Скачать бесплатно книгу «Психология трейдинга» — практическое руководство по управлению эмоциями от Игоря Арапова. Страх, жадность, дисциплина, психология успешного трейдера. ISBN 979-8-90243-081-0',
      isbn: '979-8-90243-081-0',
      numberOfPages: 60,
      bookFormat: 'https://schema.org/EBook',
      bookEdition: '1-е издание',
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
        '@id': 'https://arapov.trade/ru#author',
      },
      genre: ['Business', 'Finance', 'Trading', 'Education', 'Investment'],
      about: [
        {
          '@type': 'Thing',
          name: 'Биржевая торговля',
          sameAs: 'https://ru.wikipedia.org/wiki/Биржевая_торговля',
        },
        {
          '@type': 'Thing',
          name: 'FOREX',
          sameAs: 'https://ru.wikipedia.org/wiki/Форекс',
        },
        {
          '@type': 'Thing',
          name: 'Технический анализ',
          sameAs: 'https://ru.wikipedia.org/wiki/Технический_анализ',
        },
        {
          '@type': 'Thing',
          name: 'Фундаментальный анализ',
        },
        {
          '@type': 'Thing',
          name: 'Объёмный анализ',
        },
        {
          '@type': 'Thing',
          name: 'Управление капиталом',
        },
        {
          '@type': 'Thing',
          name: 'Smart Money Concepts',
        },
      ],
      keywords:
        'трейдинг, форекс, технический анализ, объёмный анализ, биржа, инвестиции, smart money, обучение трейдингу',
      author: {
        '@type': 'Person',
        '@id': 'https://arapov.trade/ru#author',
      },
      publisher: {
        '@type': 'Organization',
        '@id': 'https://arapov.trade/#organization',
      },
      image: {
        '@type': 'ImageObject',
        url: 'https://arapov.trade/assets/redesignArapovTrade/img/cover_psychology.jpg',
        width: 600,
        height: 900,
        caption: 'Обложка книги «Психология трейдинга» — Игорь Арапов',
      },
      url: 'https://arapov.trade/ru/books/psihologiya-treydinga',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://arapov.trade/ru/books/psihologiya-treydinga',
        priceValidUntil: '2026-12-31',
        seller: {
          '@type': 'Organization',
          '@id': 'https://arapov.trade/#organization',
        },
      },
      workExample: {
        '@type': 'Book',
        isbn: '979-8-90243-081-0',
        bookFormat: 'https://schema.org/EBook',
        inLanguage: 'ru',
        potentialAction: {
          '@type': 'ReadAction',
          target: {
            '@type': 'EntryPoint',
            url: 'https://arapov.trade/ru/books/psihologiya-treydinga',
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
    link.href = '/assets/documents/Psihologiya_Treydinga_Final.epub'; // путь к вашему файлу
    link.download = 'Psihologiya_Treydinga_Final.epub'; // имя файла для скачивания
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
        return json['@type'] === 'Person' && json['name'] === 'Игорь Арапов';
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
      '@id': 'https://arapov.trade/ru#author',
      name: 'Игорь Арапов',
      alternateName: ['Igor Arapov', 'Ігор Арапов'],
      givenName: 'Игорь',
      familyName: 'Арапов',
      description:
        'Украинский трейдер с 2013 года. Создатель образовательной платформы arapov.trade, автор 130+ статей и 70+ видеоуроков по трейдингу. Специализируется на Smart Money концепциях, методе Вайкоффа и объёмном анализе.',
      url: 'https://arapov.trade',
      image: {
        '@type': 'ImageObject',
        url: 'https://arapov.trade/assets/redesignArapovTrade/img/imageAuthor-light.png',
        width: 400,
        height: 400,
        caption: 'Игорь Арапов — трейдер и автор',
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
        description: 'Профессиональный трейдер на финансовых рынках',
        occupationLocation: {
          '@type': 'Country',
          name: 'Ukraine',
        },
      },
      nationality: {
        '@type': 'Country',
        name: 'Ukraine',
        alternateName: 'Украина',
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
        return json['@type'] === 'WebPage' && json['name'] === 'Психология трейдинга — Бесплатная книга Игоря Арапова';
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
      '@id': 'https://arapov.trade/ru/books/psihologiya-treydinga',
      url: 'https://arapov.trade/ru/books/psihologiya-treydinga',
      name: 'Психология трейдинга — Бесплатная книга Игоря Арапова',
      description:
        'Скачать бесплатно книгу по трейдингу. ISBN 979-8-90243-081-0',
      inLanguage: 'ru',
      isPartOf: {
        '@type': 'WebSite',
        '@id': 'https://arapov.trade/#website',
        name: 'arapov.trade',
        url: 'https://arapov.trade',
      },
      about: {
        '@type': 'Book',
        '@id': 'https://arapov.trade/ru/books/psihologiya-treydinga#book',
      },
      author: {
        '@type': 'Person',
        '@id': 'https://arapov.trade/ru#author',
      },
      datePublished: '2025-12-18',
      dateModified: '2025-12-18',
      mainEntity: {
        '@type': 'Book',
        '@id': 'https://arapov.trade/ru/books/psihologiya-treydinga#book',
      },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Главная',
            item: 'https://arapov.trade',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Про автора',
            item: 'https://arapov.trade/ru',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Мои книги',
            item: 'https://arapov.trade/ru/books',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Книга',
            item: 'https://arapov.trade/ru/books/psihologiya-treydinga',
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
        return json['@type'] === 'FAQPage' && json['name'] === 'Вопросы и ответы по книге "Психология трейдинга"';
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
      name: 'Вопросы и ответы по книге "Психология трейдинга"',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Книга действительно бесплатная?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Да, книга «Психология трейдинга» доступна для скачивания абсолютно бесплатно в формате EPUB. Автор предоставляет её как часть бесплатной образовательной программы на платформе arapov.trade.',
          },
        },
        {
          '@type': 'Question',
          name: 'Для кого эта книга?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Книга предназначена для начинающих трейдеров, которые хотят понять основы финансовых рынков, а также для инвесторов, желающих разобраться в биржевой торговле. Опыт в трейдинге не требуется.',
          },
        },
        {
          '@type': 'Question',
          name: 'В каком формате доступна книга?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Книга доступна в формате EPUB, который поддерживается большинством электронных книг и приложений для чтения.',
          },
        },
        {
          '@type': 'Question',
          name: 'Кто автор книги?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Автор книги — Игорь Арапов, практикующий трейдер с 2013 года. Создатель образовательной платформы arapov.trade с 130+ статьями и YouTube канала @ArapovTrade с 70+ видеоуроками по трейдингу.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какой ISBN у книги?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'ISBN книги: 979-8-90243-081-0. Это международный стандартный книжный номер, зарегистрированный в Bowker Books in Print.',
          },
        },
      ],
    });

    this.document.head.appendChild(script);
  }
  
}
