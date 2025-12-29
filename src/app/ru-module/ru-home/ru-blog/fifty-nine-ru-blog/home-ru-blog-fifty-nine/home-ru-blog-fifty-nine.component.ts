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
  selector: 'app-home-ru-blog-fifty-nine',
  templateUrl: './home-ru-blog-fifty-nine.component.html',
  styleUrl: './home-ru-blog-fifty-nine.component.scss',
})
export class HomeRuBlogFiftyNineComponent implements OnInit {
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

    this.ukrGroups = this.artickleServ.getRussianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;

    this.titleService.setTitle(
      'Как торговать пробой уровня в трейдинге | Стратегия пробоя'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Подробное руководство по торговле на пробой уровней поддержки и сопротивления. Узнайте, как определять истинные пробои, использовать ретесты и пин-бары для входа в сделки.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-18' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/levelbreakoutstrategy.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.artickleServ.getRandomUkArticles();
  }

  hoveredIndex: number | null = null;

  projects = [
    { title: 'Быстрый старт', link: 'https://arapov.education/course/' },
    {
      title: 'Введение в трейдинг',
      link: 'https://arapov.education/reg-workshop/',
    },
    {
      title: 'Профессиональные курсы',
      link: 'https://arapov.trade/ru/studying',
    },
    {
      title: 'Базовый курс',
      link: 'https://arapov.trade/ru/freestudying/freeeducation',
    },
    { title: 'Копитрейдинг', link: 'https://arapovcopytrade.com' },
  ];

  onGroupChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    this.router.navigate(['/ru/freestudying'], {
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
      article.groupsRus.forEach((group) => {
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

    this.router.navigate(['/ru/freestudying', nextpage]);
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

    this.router.navigate(['/ru/freestudying', nextpage]);
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
          headline:
            'Как торговать пробой уровня в трейдинге — полное руководство',
          description:
            'Подробное руководство по торговле на пробой уровней поддержки и сопротивления. Узнайте, как определять истинные пробои, использовать ретесты и пин-бары для входа в сделки.',
          author: {
            '@type': 'Person',
            name: 'Игорь Арапов',
            url: 'https://arapov.trade/ru',
            sameAs: [
              'https://www.youtube.com/@ArapovTrade',
              'https://t.me/ArapovTrade',
            ],
            jobTitle: 'Профессиональный трейдер',
            worksFor: {
              '@type': 'Organization',
              name: 'Arapov Trade',
            },
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov Trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-11-29T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/levelbreakoutstrategy',
          },
          articleSection: 'Трейдинг',
          keywords: [
            'пробой уровня',
            'торговля на пробой',
            'уровни поддержки',
            'уровни сопротивления',
            'ретест',
            'пин-бар',
          ],
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
      '@id': 'https://arapov.trade/ru#person',
      name: 'Игорь Арапов',
      url: 'https://arapov.trade/ru',
      image:
        'https://arapov.trade/assets/redesignArapovTrade/img/imageAuthor-light.png',
      sameAs: [
        'https://www.youtube.com/@ArapovTrade',
        'https://t.me/ArapovTrade',
      ],
      jobTitle: 'Профессиональный трейдер',
      description:
        'Активно торгую на финансовых рынках с 2013 года. Автор бесплатного курса по трейдингу.',
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
          name: 'Что такое пробой уровня в трейдинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Пробой уровня — это момент, когда цена актива преодолевает значимый уровень поддержки или сопротивления и продолжает движение в направлении пробоя. Это важный технический сигнал, указывающий на изменение баланса между покупателями и продавцами на рынке.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как отличить истинный пробой от ложного?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Истинный пробой подтверждается высоким объёмом торгов, устойчивым движением цены за уровень и успешным ретестом пробитого уровня. Ложный пробой характеризуется быстрым возвращением цены обратно за уровень при низком объёме.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое ретест уровня и зачем его ждать?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ретест — это возвращение цены к пробитому уровню для его тестирования. После ретеста бывшее сопротивление становится поддержкой и наоборот. Ожидание ретеста снижает риск входа на ложном пробое и обеспечивает лучшее соотношение риска к прибыли.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какую роль играет пин-бар в торговле на пробой?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Пин-бар на ретесте пробитого уровня подтверждает силу пробоя и показывает отклонение цены одной из сторон рынка. Длинная тень пин-бара указывает на неудачную попытку развернуть движение, что усиливает сигнал на вход.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какое соотношение риска к прибыли оптимально при торговле на пробой?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Рекомендуется выбирать сделки с соотношением риска к прибыли не менее 1:2, а в идеале 1:3 или выше. Это обеспечивает стабильную прибыль даже при 40-50% выигрышных сделок и защищает капитал от серии убытков.',
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
      name: 'Как торговать пробой уровня',
      description:
        'Пошаговая инструкция по торговле на пробой уровней поддержки и сопротивления',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Идентификация уровней',
          text: 'Определите ключевые уровни поддержки и сопротивления на старших таймфреймах. Используйте исторические данные и обращайте внимание на зоны с многократными касаниями цены.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Ожидание пробоя',
          text: 'Дождитесь чёткого пробоя уровня с высоким объёмом торгов. Убедитесь, что свеча закрылась за уровнем — это подтверждает силу движения.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Ретест уровня',
          text: 'После пробоя дождитесь возвращения цены к пробитому уровню. Успешный ретест подтверждает, что уровень теперь выполняет противоположную роль.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Поиск подтверждающего сигнала',
          text: 'Ищите свечные паттерны на ретесте: пин-бар, поглощение или молот. Эти формации показывают отклонение цены и подтверждают продолжение движения.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Вход в сделку с управлением рисками',
          text: 'Входите в позицию после подтверждения сигнала. Установите стоп-лосс за границами паттерна и тейк-профит на следующем значимом уровне с соотношением риска к прибыли не менее 1:2.',
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
      name: 'Терминология торговли на пробой',
      description: 'Основные термины стратегии пробоя уровней',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Пробой уровня',
          description:
            'Преодоление ценой значимого уровня поддержки или сопротивления с продолжением движения в направлении пробоя',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ретест',
          description:
            'Возвращение цены к пробитому уровню для его тестирования, после чего уровень меняет свою роль',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Пин-бар',
          description:
            'Свечной паттерн с длинной тенью и маленьким телом, указывающий на отклонение цены и потенциальный разворот',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ложный пробой',
          description:
            'Ситуация, когда цена пересекает уровень, но быстро возвращается обратно без продолжения движения',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Уровень поддержки',
          description:
            'Ценовая зона, где покупатели активно вступают в рынок, останавливая падение цены',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Уровень сопротивления',
          description:
            'Ценовая зона, где продавцы начинают доминировать, останавливая рост цены',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Импульс',
          description:
            'Резкое ускорение ценового движения после пробоя, вызванное активацией ордеров',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Объём торгов',
          description:
            'Количество сделок за определённый период, подтверждающее силу или слабость ценового движения',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Соотношение риска к прибыли',
          description:
            'Отношение потенциального убытка к потенциальной прибыли в сделке, рекомендуется не менее 1:2',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Трейлинг-стоп',
          description:
            'Динамический стоп-лосс, который перемещается вслед за ценой для фиксации прибыли',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
