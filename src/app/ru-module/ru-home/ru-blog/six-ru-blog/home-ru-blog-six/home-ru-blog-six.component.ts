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
  selector: 'app-home-ru-blog-six',
  templateUrl: './home-ru-blog-six.component.html',
  styleUrl: './home-ru-blog-six.component.scss',
})
export class HomeRuBlogSixComponent implements OnInit {
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
      'Smart Money в трейдинге: стратегия крупных игроков | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Smart Money в трейдинге: полное руководство по концепции крупных игроков. Узнайте, как институционалы управляют ликвидностью, создают ловушки и формируют тренды на финансовых рынках.',
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
          '@id': 'https://arapov.trade/ru/freestudying/smartestmoney#article',
          headline: 'Smart Money в трейдинге: стратегия крупных игроков',
          description:
            'Smart Money в трейдинге: полное руководство по концепции крупных игроков. Узнайте, как институционалы управляют ликвидностью, создают ловушки и формируют тренды.',
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/smartestmoney1.webp',
            width: 1200,
            height: 630,
          },
          author: { '@id': 'https://arapov.trade/ru#person' },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2025-12-29T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/smartestmoney',
          },
          articleSection: 'Трейдинг',
          keywords: [
            'Smart Money',
            'смарт мани',
            'ликвидность',
            'ордерные блоки',
            'Wyckoff',
          ],
          wordCount: 1339,
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
      '@id': 'https://arapov.trade/ru/freestudying/smartestmoney#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Что такое Smart Money в трейдинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Smart Money — это капитал институциональных участников рынка: банков, хедж-фондов и маркет-мейкеров. Они обладают значительными ресурсами и возможностью влиять на движение цены через управление ликвидностью.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как Smart Money манипулируют рынком?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Smart Money используют ложные пробои, охоту на стоп-лоссы и сбор ликвидности. Они создают искусственные движения цены для накопления позиций перед основным трендовым движением.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое ордерный блок?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ордерный блок — это последняя свеча противоположного направления перед импульсным движением. Эти зоны отмечают места входа крупного капитала, и цена часто возвращается к ним для тестирования.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие фазы рынка выделяет методология Wyckoff?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Методология Wyckoff выделяет четыре фазы: накопление (покупка по низким ценам), рост (восходящий тренд), распределение (продажа по высоким ценам) и падение (нисходящий тренд).',
          },
        },
        {
          '@type': 'Question',
          name: 'Как избежать ловушек Smart Money?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Используйте объёмный анализ для распознавания ложных пробоев, ожидайте подтверждения перед входом, анализируйте старшие таймфреймы и размещайте стоп-лоссы на безопасном расстоянии от очевидных уровней.',
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
      '@id': 'https://arapov.trade/ru/freestudying/smartestmoney#howto',
      name: 'Как торговать по концепции Smart Money',
      description:
        'Пошаговое руководство по применению концепции Smart Money в трейдинге',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Определите зону интереса',
          text: 'Найдите области высокой ликвидности: уровни поддержки и сопротивления, зоны скопления стоп-ордеров, ордерные блоки.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Проанализируйте поведение цены',
          text: 'Следите за ложными пробоями, аномальными объёмами и реакцией цены на ключевые уровни. Определите фазу рынка по Wyckoff.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Найдите подтверждающий сигнал',
          text: 'Используйте свечные паттерны, объёмный анализ и поведение цены на младших таймфреймах для фильтрации ложных сигналов.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Войдите в позицию',
          text: 'После подтверждения направления движения откройте сделку с чётким планом по стоп-лоссу и тейк-профиту.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Управляйте позицией',
          text: 'Фиксируйте прибыль по достижении целевого уровня или при изменении структуры рынка. Соблюдайте дисциплину.',
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
      '@id': 'https://arapov.trade/ru/freestudying/smartestmoney#terms',
      name: 'Термины Smart Money',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Smart Money',
          description:
            'Капитал институциональных участников рынка: банков, хедж-фондов и маркет-мейкеров, способных влиять на движение цены.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ликвидность',
          description:
            'Объём доступных ордеров на покупку и продажу. Зоны высокой ликвидности привлекают крупных игроков.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ордерный блок',
          description:
            'Последняя свеча противоположного направления перед импульсным движением, отмечающая зону входа крупного капитала.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ложный пробой',
          description:
            'Кратковременный выход цены за уровень поддержки или сопротивления с последующим быстрым возвратом.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Дисбаланс',
          description:
            'Разница между спросом и предложением, проявляющаяся в резком движении цены без откатов.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Накопление',
          description:
            'Фаза рынка, когда крупные игроки скрытно покупают актив по низким ценам перед восходящим движением.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Распределение',
          description:
            'Фаза рынка, когда институционалы продают накопленный актив розничным трейдерам по высоким ценам.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stop Hunt',
          description:
            'Охота на стопы — искусственное движение цены для выбивания стоп-ордеров розничных трейдеров.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Методология Wyckoff',
          description:
            'Концепция анализа рынка, описывающая циклы накопления и распределения под влиянием крупного капитала.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маркет-мейкер',
          description:
            'Крупный участник рынка, обеспечивающий ликвидность и способный влиять на движение цены.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
