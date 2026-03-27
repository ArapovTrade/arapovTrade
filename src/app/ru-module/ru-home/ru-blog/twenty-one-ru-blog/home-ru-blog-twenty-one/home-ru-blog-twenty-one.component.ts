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
  selector: 'app-home-ru-blog-twenty-one',
  templateUrl: './home-ru-blog-twenty-one.component.html',
  styleUrl: './home-ru-blog-twenty-one.component.scss',
})
export class HomeRuBlogTwentyOneComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private themeService: ThemeservService,
    private artickleServ: ArticlesService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
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
      'Маркет-мейкер в трейдинге: полное руководство | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Маркет-мейкер в трейдинге: кто это, как работает и как использовать их стратегии в своей торговле. Полное руководство от Игоря Арапова.',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.artickleServ.getRandomUkArticles();
  }

  hoveredIndex: number | null = null;

  projects = [
    { title: 'Книги по трейдингу', link: 'https://arapov.trade/ru/books' },
    {
      title: 'Профессиональные курсы',
      link: 'https://arapov.trade/ru/studying',
    },
    {
      title: 'Базовый курс',
      link: 'https://arapov.trade/ru/freestudying/freeeducation',
    },
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
        () => Math.random() - 0.5,
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
      a.titleUkr.toLowerCase().includes(this.searchQuery.toLowerCase()),
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
      (a) => a.linkUkr == path,
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
      (a) => a.linkUkr == path,
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
      'script[type="application/ld+json"]',
    );

    scripts.forEach((script) => {
      try {
        const json = JSON.parse(script.textContent || '{}');

        // Массив, объект-граф или одиночный объект
        const candidates =
          json['@graph'] ?? (Array.isArray(json) ? json : [json]);

        const shouldRemove = candidates.some(
          (entry: any) =>
            entry['@type'] && typesToRemove.includes(entry['@type']),
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
          headline: 'Маркет-мейкер в трейдинге: полное руководство',
          description:
            'Маркет-мейкер в трейдинге: кто это, как работает и как использовать их стратегии в своей торговле. Полное руководство от Игоря Арапова.',
          image: 'https://arapov.trade/assets/img/content/marketmaker1.webp',
          datePublished: '2026-03-15T00:00:00Z',
          dateModified: '2026-03-22T00:00:00Z',

          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov Trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/marketmaker',
          },
          articleSection: 'Обучение трейдингу',
          keywords: [
            'маркет мейкер',
            'market maker',
            'ликвидность',
            'манипуляции рынка',
            'Smart Money',
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
      alternateName: [
        'Igor Arapov',
        'Арапов Игорь',
        'I. Arapov',
        'Ігор Арапов',
        'І. В. Арапов',
        'Арапов Ігор',
        'Arapov Igor',
      ],
      url: 'https://arapov.trade/ru',
      image:
        'https://arapov.trade/assets/redesignArapovTrade/img/imageAuthor-light.png',
      sameAs: [
        'https://www.wikidata.org/wiki/Q137454477',
        'https://scholar.google.com/citations?user=N440tWQAAAAJ',
        'https://orcid.org/0009-0003-0430-778X',
        'https://isni.org/isni/0000000529518564',
        'https://www.amazon.com/stores/author/B0GBRFY457',
        'https://github.com/ArapovTrade',
        'https://ua.linkedin.com/in/arapovtrade',
        'https://www.youtube.com/@ArapovTrade',
        'https://t.me/ArapovTrade',
      ],
      jobTitle: [
        'Независимый исследователь',
        'трейдер',
        'автор и основатель arapov.trade',
      ],
      description:
        'Независимый исследователь, практикующий трейдер, автор книг по трейдингу и научных публикаций. Специализируется на психологии трейдинга и когнитивных искажениях на финансовых рынках.',
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
          name: 'Кто такой маркет-мейкер простыми словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Маркет-мейкер — это крупный участник рынка (банк, хедж-фонд или специализированная компания), который обеспечивает ликвидность, постоянно выставляя заявки на покупку и продажу. Благодаря маркет-мейкерам трейдеры могут быстро совершать сделки по справедливым ценам без значительных проскальзываний.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как маркет-мейкеры зарабатывают деньги?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Маркет-мейкеры получают прибыль из нескольких источников: спред между ценой покупки и продажи, комиссии от бирж за поддержание ликвидности, а также от направленных сделок на основе информационного преимущества и анализа потока ордеров.',
          },
        },
        {
          '@type': 'Question',
          name: 'Манипулируют ли маркет-мейкеры рынком?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Маркет-мейкеры используют различные техники управления ликвидностью, которые могут выглядеть как манипуляции: создание ложных пробоев, охота на стоп-ордера, спуфинг. Однако их основная функция — обеспечение ликвидности, а не манипулирование ценой в убыток розничным трейдерам.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как определить присутствие маркет-мейкера на графике?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Признаки активности маркет-мейкера: резкие всплески объёма без движения цены, ложные пробои ключевых уровней с быстрым возвратом, длинные тени свечей на важных уровнях, аномальная активность в периоды низкой ликвидности, внезапные расширения спреда.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как торговать вместе с маркет-мейкерами, а не против них?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Чтобы торговать в направлении маркет-мейкеров: анализируйте объёмы для выявления накопления позиций, избегайте входов на очевидных уровнях, ждите подтверждения после ложных пробоев, размещайте стопы за пределами зон охоты на ликвидность, не торгуйте во время выхода важных новостей.',
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
      name: 'Как выявить и использовать активность маркет-мейкера в торговле',
      description:
        'Пошаговое руководство по определению действий маркет-мейкеров и использованию этой информации для улучшения торговых результатов.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Анализ объёмов',
          text: 'Изучите объёмные показатели с помощью Volume Profile и Delta Volume. Ищите аномалии: высокий объём без движения цены указывает на накопление позиций маркет-мейкерами.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Определение ключевых уровней',
          text: 'Отметьте зоны, где сосредоточена ликвидность: области за очевидными уровнями поддержки и сопротивления, где розничные трейдеры размещают стоп-ордера.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Наблюдение за ложными пробоями',
          text: 'Отслеживайте пробои ключевых уровней. Если цена быстро возвращается в диапазон после пробоя, это признак сбора ликвидности маркет-мейкером.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Подтверждение входа',
          text: 'Дождитесь подтверждающих сигналов перед входом: свечных паттернов (пин-бар, поглощение), изменения дельты объёма, теста уровня без нового пробоя.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Управление позицией',
          text: 'Размещайте стоп-лоссы за пределами очевидных зон ликвидности. Используйте ATR для расчёта безопасного расстояния до стопа.',
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
      name: 'Глоссарий терминов маркет-мейкинга',
      description:
        'Ключевые термины, связанные с деятельностью маркет-мейкеров на финансовых рынках',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Маркет-мейкер',
          description:
            'Крупный участник рынка, обеспечивающий ликвидность путём постоянного выставления заявок на покупку и продажу активов',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ликвидность',
          description:
            'Способность рынка обеспечивать быстрое исполнение сделок без существенного влияния на цену актива',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спред',
          description:
            'Разница между лучшей ценой покупки (Bid) и лучшей ценой продажи (Ask) актива',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ложный пробой',
          description:
            'Краткосрочное движение цены за ключевой уровень с последующим быстрым возвратом в предыдущий диапазон',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Охота на стопы',
          description:
            'Движение цены к зонам скопления стоп-ордеров для их активации и сбора ликвидности',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спуфинг',
          description:
            'Размещение крупных фиктивных ордеров для создания иллюзии спроса или предложения с последующей их отменой',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Order Flow',
          description:
            'Поток ордеров — анализ последовательности и объёма рыночных заявок для понимания намерений участников рынка',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Volume Profile',
          description:
            'Инструмент анализа, отображающий распределение объёма торгов по ценовым уровням за определённый период',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Delta Volume',
          description:
            'Разница между объёмом покупок и продаж на определённом ценовом уровне',
        },
        {
          '@type': 'DefinedTerm',
          name: 'HFT',
          description:
            'High-Frequency Trading — высокочастотный трейдинг с использованием алгоритмов для совершения сделок за миллисекунды',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
