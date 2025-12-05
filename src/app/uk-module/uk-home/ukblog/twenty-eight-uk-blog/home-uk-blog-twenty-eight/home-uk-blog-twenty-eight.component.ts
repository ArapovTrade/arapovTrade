import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Inject,
  Renderer2,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ThemeservService } from '../../../../../servises/themeserv.service';
import { artickle } from '../../../../../servises/articles.service';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-twenty-eight',
  templateUrl: './home-uk-blog-twenty-eight.component.html',
  styleUrl: './home-uk-blog-twenty-eight.component.scss',
})
export class HomeUkBlogTwentyEightComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private themeService: ThemeservService,
    private artickleServ: ArticlesService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}
  private routerSubscription!: Subscription;
  private themeSubscription!: Subscription;
  isDark!: boolean;
  ukrGroups: any = [];
  grr!: any;
  checkedGroup!: any;

  readonly panelOpenState = signal(false);

  ngOnInit(): void {
    this.removeSelectedSchemas();
    this.setArticleSchema();
    this.setPersonSchema();
    this.setFaqSchema();
    this.setHowToSchema();
    this.setGlossarySchema();

    this.themeSubscription = this.themeService.getTheme().subscribe((data) => {
      this.isDark = data;
      this.cdr.detectChanges();
    });

    this.ukrGroups = this.artickleServ.getUkrainianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;
    this.titleService.setTitle(
      'Альтернативні блокчейни: огляд та відмінності | Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Альтернативні блокчейни: повний огляд Solana, Polkadot, Avalanche, Cardano. Механізми консенсусу, переваги, недоліки та місце в екосистемі Web3.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-22' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/altblockchains.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.artickleServ.getRandomUkArticles();
  }

  hoveredIndex: number | null = null;

  projects = [
    { title: 'Швидкий старт', link: 'https://arapov.education/ua/course-ua/' },
    {
      title: 'Вступ до трейдингу',
      link: 'https://arapov.education/ua/reg-workshop-ua/',
    },
    { title: 'Професійні курси', link: 'https://arapov.trade/uk/studying' },
    {
      title: 'Базовий курс',
      link: 'https://arapov.trade/uk/freestudying/freeeducation',
    },
    {
      title: 'Копiтрейдинг',
      link: 'https://arapovcopytrade.com/ua/invest-ua/',
    },
  ];

  onGroupChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    this.router.navigate(['/uk/freestudying'], {
      queryParams: { group: value },
    });

    this.checkedGroup = this.artickleServ.selectedGroups;
  }
  paginatedArticles = []; // Статьи для отображения на текущей странице
  currentPage = 0;
  pageSize = 10;

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
  toggleTheme() {
    this.isDark = !this.isDark;
    this.themeService.setTheme(this.isDark);
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  articleCounts: { [key: string]: number } = {};
  updateArticleCounts() {
    this.articleCounts = {}; // очищаем

    this.artickleServ.ukrArtickles.forEach((article) => {
      // article.groupsUkr — это массив, например ['Програмування', 'Маркетинг']
      article.groupsUkr.forEach((group) => {
        if (!this.articleCounts[group]) {
          this.articleCounts[group] = 1;
        } else {
          this.articleCounts[group]++;
        }
      });
    });
  }
  //popup
  flag1: boolean = false;
  flagTrue1: boolean = true;
  searchtoggle(event: Event) {
    this.flag1 = !this.flag1;
    this.flagTrue1 = !this.flagTrue1;
  }

  isFocused = false;
  displayedArticles: artickle[] = [];
  maxResults = 5;
  searchQuery: string = '';

  onFocus() {
    this.isFocused = true;

    // Показываем 5 случайных статей при фокусе, если инпут пуст
    if (!this.searchQuery) {
      const shuffled = [...this.artickleServ.ukrArtickles].sort(
        () => Math.random() - 0.5
      );
      this.displayedArticles = shuffled.slice(0, this.maxResults);
    }
  }

  onBlur() {
    setTimeout(() => {
      this.isFocused = false;
    }, 150); // таймаут чтобы клик по статье сработал
  }

  onSearchChange() {
    // Логика асинхронного поиска
    const filtered = this.artickleServ.ukrArtickles.filter((a) =>
      a.titleUkr.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.displayedArticles = filtered.slice(0, this.maxResults);
  }

  moveToTheTop() {
    const element = document.getElementById('scrollToTop');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  groupsMenuOpen = false;
  toggleGroupsMenu(event: Event) {
    this.groupsMenuOpen = !this.groupsMenuOpen;
  }

  goToNextPage() {
    let nextpage: any;
    const path: string =
      this.router.url.split('/')[this.router.url.split('/').length - 1];
    let index = this.artickleServ.ukrArtickles.findIndex(
      (a) => a.linkUkr == path
    );

    if (this.artickleServ.ukrArtickles.length - 1 == index) {
      nextpage = this.artickleServ.ukrArtickles[0].linkUkr;
    } else {
      nextpage = this.artickleServ.ukrArtickles[index + 1].linkUkr;
    }

    this.router.navigate(['/uk/freestudying', nextpage]);
  }

  goToPreviousPage() {
    let nextpage: any;
    const path: string =
      this.router.url.split('/')[this.router.url.split('/').length - 1];
    let index = this.artickleServ.ukrArtickles.findIndex(
      (a) => a.linkUkr == path
    );

    if (index == 1) {
      nextpage =
        this.artickleServ.ukrArtickles[
          this.artickleServ.ukrArtickles.length - 1
        ].linkUkr;
    } else {
      nextpage = this.artickleServ.ukrArtickles[index - 1].linkUkr;
    }

    this.router.navigate(['/uk/freestudying', nextpage]);
  }

  private removeSelectedSchemas(): void {
    const typesToRemove = [
      'Article',
      'FAQPage',
      'HowTo',
      'DefinedTermSet',
      'Person',
    ];

    const scripts = this.document.querySelectorAll(
      'script[type="application/ld+json"]'
    );

    scripts.forEach((script) => {
      try {
        const json = JSON.parse(script.textContent || '{}');

        // Массив, объект-граф или одиночный объект
        const candidates =
          json['@graph'] ?? (Array.isArray(json) ? json : [json]);

        const shouldRemove = candidates.some(
          (entry: any) =>
            entry['@type'] && typesToRemove.includes(entry['@type'])
        );

        if (shouldRemove) {
          script.remove();
        }
      } catch {
        /* ignore invalid */
      }
    });
  }

  private addJsonLdSchema(data: any): void {
    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    this.renderer.appendChild(this.document.head, script);
  }

  // ============================================================
  //  ARTICLE
  // ============================================================
  private setArticleSchema(): void {
    const data = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          headline: 'Альтернативні блокчейни: огляд та відмінності',
          description:
            'Повний огляд альтернативних блокчейнів: Solana, Polkadot, Avalanche, Cardano та їх місце в Web3',
          author: {
            '@type': 'Person',
            name: 'Ігор Арапов',
            url: 'https://arapov.trade/uk',
            sameAs: ['https://www.youtube.com/@ArapovTrade'],
            jobTitle: 'Професійний трейдер',
            worksFor: { '@type': 'Organization', name: 'Arapov.trade' },
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-01-10',
          dateModified: '2025-01-10',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/altblockchains',
          },
          image: 'https://arapov.trade/assets/img/content/altblockchains1.webp',
          articleSection: 'Навчання трейдингу',
          keywords:
            'альтернативні блокчейни, Solana, Polkadot, Avalanche, Cardano, Polygon, Web3, DeFi, Layer 1',
          inLanguage: 'ru',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }

  // ============================================================
  //  PERSON
  // ============================================================
  private setPersonSchema(): void {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': 'https://arapov.trade/#person',
      name: 'Ігор Арапов',
      url: 'https://arapov.trade/uk',
      image:
        'https://arapov.trade/assets/redesignArapovTrade/img/imageAuthor-light.png',
      sameAs: [
        'https://www.youtube.com/@ArapovTrade',
        'https://t.me/ArapovTrade',
      ],
      jobTitle: 'Професійний трейдер',
      description:
        'Активно торгую на фінансових ринках з 2013 року. Автор безкоштовного курсу з трейдингу.',
    };

    this.addJsonLdSchema(data);
  }

  // ============================================================
  //  FAQ
  // ============================================================
  private setFaqSchema(): void {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Що таке альтернативні блокчейни?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Альтернативні блокчейни — це мережі, розроблені як покращені версії Bitcoin та Ethereum. Вони вирішують проблеми масштабованості, високих комісій та низької швидкості транзакцій.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чим Solana відрізняється від Ethereum?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Solana використовує механізм Proof-of-History, що забезпечує до 65,000 транзакцій на секунду з мінімальними комісіями.',
          },
        },
        {
          '@type': 'Question',
          name: 'Який блокчейн кращий для DeFi?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Для DeFi популярні Ethereum, Solana, Avalanche та Polygon. Вибір залежить від пріоритетів проекту.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке парачейни в Polkadot?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Парачейни — незалежні блокчейни, що працюють паралельно з основною мережею Polkadot.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи безпечні альтернативні блокчейни?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Безпека залежить від зрілості проекту, кількості валідаторів та проведених аудитів.',
          },
        },
      ],
    };

    this.addJsonLdSchema(data);
  }

  // ============================================================
  //  HOWTO
  // ============================================================
  private setHowToSchema(): void {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'Як обрати альтернативний блокчейн для проекту',
      description: 'Критерії вибору відповідної блокчейн-платформи',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Оцініть масштабованість',
          text: 'Визначте необхідну пропускну здатність мережі.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Проаналізуйте комісії',
          text: 'Порівняйте транзакційні витрати на різних платформах.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Вивчіть екосистему',
          text: 'Оцініть доступні інструменти та інтеграції.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Перевірте сумісність',
          text: 'Виберіть платформу з підтримкою мостів за потреби.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Оцініть безпеку',
          text: 'Вивчіть історію аудитів та репутацію мережі.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }

  // ============================================================
  //  GLOSSARY
  // ============================================================
  private setGlossarySchema(): void {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'DefinedTermSet',
      name: 'Глосарій альтернативних блокчейнів',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Layer 1',
          description:
            'Базовий рівень блокчейну з власним механізмом консенсусу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Layer 2',
          description: 'Рішення масштабування поверх основного блокчейну',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Proof-of-Stake',
          description: 'Механізм консенсусу на основі заблокованих токенів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Proof-of-History',
          description: 'Механізм часових міток Solana',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Шардинг',
          description: 'Технологія поділу мережі на сегменти',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Парачейни',
          description: 'Незалежні блокчейни в екосистемі Polkadot',
        },
        {
          '@type': 'DefinedTerm',
          name: 'TPS',
          description: 'Кількість транзакцій на секунду',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Міст',
          description: 'Протокол для переказу активів між блокчейнами',
        },
        {
          '@type': 'DefinedTerm',
          name: 'dApp',
          description: 'Децентралізований застосунок',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Валідатор',
          description: 'Учасник мережі, що підтверджує транзакції',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
