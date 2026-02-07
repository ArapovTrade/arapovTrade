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
  selector: 'app-osnovy-treydinga-en',
  templateUrl: './osnovy-treydinga-en.component.html',
  styleUrl: './osnovy-treydinga-en.component.scss'
})
export class OsnovyTreydingaEnComponent 
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
  currentLang = 'en';
  dropdownOpen = false;
  menuOpen: boolean = false;
  ngOnInit() {
    this.removeExistingWebPageSchema();

    this.titleService.setTitle(
      'Trading Basics – Free Book by Igor Arapov | ISBN 979-8-90243-075-9'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Download the free book "Trading Basics" — a methodological guide for beginners by Igor Arapov. FOREX, technical analysis, volume analysis, Smart Money. ISBN 979-8-90243-075-9',
    });

    this.meta.updateTag({
      name: 'keywords',
      content:
        'Trading book, trading training, Forex for beginners, technical analysis, volume analysis, Igor Arapov, Smart Money',
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
        return json['@type'] === 'Book' && json['name'] === 'Trading Basics';
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
      '@id': 'https://arapov.trade/en/books/osnovy-treydinga#book',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://arapov.trade/en/books/osnovy-treydinga',
      },
      name: 'Trading Basics',
      alternateName: [
        'Osnovy Treydinga',
        'Methodological manual on Financial Trading',
        'Trading Basics',
      ],
      headline:
        'Trading Basics — Methodological manual for beginners',
      description:
        'Practical guide to financial trading for beginners. The book covers the basics of stock trading, the FOREX market, fundamental, technical and volume analysis, order types, capital management and typical trader mistakes. The author shares 12 years of experience trading on financial markets.',
      isbn: '979-8-90243-075-9',
      numberOfPages: 60,
      bookFormat: 'https://schema.org/EBook',
      bookEdition: '1st edition',
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
        '@id': 'https://arapov.trade/en#author',
      },
      genre: ['Business', 'Finance', 'Trading', 'Education', 'Investment'],
      about: [
        {
          '@type': 'Thing',
          name: 'Exchange trading',
          sameAs: 'https://ru.wikipedia.org/wiki/Биржевая_торговля',
        },
        {
          '@type': 'Thing',
          name: 'FOREX',
          sameAs: 'https://ru.wikipedia.org/wiki/Форекс',
        },
        {
          '@type': 'Thing',
          name: 'Technical analysis',
          sameAs: 'https://ru.wikipedia.org/wiki/Технический_анализ',
        },
        {
          '@type': 'Thing',
          name: 'Fundamental analysis',
        },
        {
          '@type': 'Thing',
          name: 'Volume analysis',
        },
        {
          '@type': 'Thing',
          name: 'Capital management',
        },
        {
          '@type': 'Thing',
          name: 'Smart Money Concepts',
        },
      ],
      keywords:
        'trading, forex, technical analysis, volume analysis, exchange, investments, smart money, trading education',
      author: {
        '@type': 'Person',
        '@id': 'https://arapov.trade/en#author',
      },
      publisher: {
        '@type': 'Organization',
        '@id': 'https://arapov.trade/#organization',
      },
      image: {
        '@type': 'ImageObject',
        url: 'https://arapov.trade/assets/redesignArapovTrade/img/cover_en.jpg',
        width: 600,
        height: 900,
        caption: 'Cover of the book "Trading Basics" — Igor Arapov',
      },
      url: 'https://arapov.trade/en/books/osnovy-treydinga',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://arapov.trade/en/books/osnovy-treydinga',
        priceValidUntil: '2026-12-31',
        seller: {
          '@type': 'Organization',
          '@id': 'https://arapov.trade/#organization',
        },
      },
      workExample: {
        '@type': 'Book',
        isbn: '979-8-90243-075-9',
        bookFormat: 'https://schema.org/EBook',
        inLanguage: 'ru',
        potentialAction: {
          '@type': 'ReadAction',
          target: {
            '@type': 'EntryPoint',
            url: 'https://arapov.trade/en/books/osnovy-treydinga',
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
    link.href = '/assets/documents/Trading_Fundamentals_Vol1_EN_FINAL.epub'; // путь к вашему файлу
    link.download = 'Trading_Fundamentals_Vol1_EN_FINAL.epub'; // имя файла для скачивания
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
        return json['@type'] === 'Person' && json['name'] === 'Igor Arapov';
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
      '@id': 'https://arapov.trade/en#author',
      name: 'Igor Arapov',
      alternateName: ['Игорь Арапов', 'Ігор Арапов'],
      givenName: 'Igor',
      familyName: 'Arapov',
      description:
        'Ukrainian trader since 2013. Creator of the educational platform arapov.trade, author of 130+ articles and 70+ video lessons on trading. Specializes in Smart Money Concepts, Wyckoff Method, and volume analysis.',
      url: 'https://arapov.trade',
      image: {
        '@type': 'ImageObject',
        url: 'https://arapov.trade/assets/redesignArapovTrade/img/imageAuthor-light.png',
        width: 400,
        height: 400,
        caption: 'Igor Arapov - trader and author',
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
        description: 'Professional trader on financial markets',
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
        return json['@type'] === 'WebPage' && json['name'] === 'Trading Basics – Free Book by Igor Arapov';
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
      '@id': 'https://arapov.trade/en/books/osnovy-treydinga',
      url: 'https://arapov.trade/en/books/osnovy-treydinga',
      name: 'Trading Basics – Free Book by Igor Arapov',
      description:
        'Download the free book on trading. ISBN 979-8-90243-075-9',
      inLanguage: 'en',
      isPartOf: {
        '@type': 'WebSite',
        '@id': 'https://arapov.trade/#website',
        name: 'arapov.trade',
        url: 'https://arapov.trade',
      },
      about: {
        '@type': 'Book',
        '@id': 'https://arapov.trade/en/books/osnovy-treydinga#book',
      },
      author: {
        '@type': 'Person',
        '@id': 'https://arapov.trade/en#author',
      },
      datePublished: '2025-12-18',
      dateModified: '2025-12-18',
      mainEntity: {
        '@type': 'Book',
        '@id': 'https://arapov.trade/en/books/osnovy-treydinga#book',
      },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Main',
            item: 'https://arapov.trade',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'About the author',
            item: 'https://arapov.trade/en',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'My books',
            item: 'https://arapov.trade/en/books',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Book',
            item: 'https://arapov.trade/en/books/osnovy-treydinga',
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
        return json['@type'] === 'FAQPage' && json['name'] === 'Trading Basics – Free Book by Igor Arapov - FAQ';
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
      name: 'Trading Basics – Free Book by Igor Arapov - FAQ',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Is the book really free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, the book "Trading Basics" is available for download absolutely free of charge in EPUB format. The author provides it as part of a free educational program on the arapov.trade platform.',
          },
        },
        {
          '@type': 'Question',
          name: 'For whom is this book?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The book is intended for beginners in trading who want to understand the basics of financial markets, as well as for investors who wish to learn about stock trading. No experience in trading is required.',
          },
        },
        {
          '@type': 'Question',
          name: 'In what format is the book available?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The book is available in EPUB format, which is supported by most e-readers and reading applications.',
          },
        },
        {
          '@type': 'Question',
          name: 'Who is the author of the book?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The author of the book is Igor Arapov, a practicing trader since 2013. Creator of the educational platform arapov.trade with over 130 articles and a YouTube channel @ArapovTrade with 70+ video tutorials on trading.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the ISBN of the book?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The book\'s ISBN is 979-8-90243-075-9. This is an International Standard Book Number registered with Bowker Books in Print.',
          },
        },
      ],
    });

    this.document.head.appendChild(script);
  }
  
}
