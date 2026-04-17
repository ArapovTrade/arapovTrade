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
  selector: 'app-home-uk-blog-twenty-six',
  templateUrl: './home-uk-blog-twenty-six.component.html',
  styleUrl: './home-uk-blog-twenty-six.component.scss',
})
export class HomeUkBlogTwentySixComponent implements OnInit {
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

    this.ukrGroups = this.artickleServ.getUkrainianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;
    this.titleService.setTitle(
      'Види ордерів на біржі: повний посібник | ArapovTrade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Повний посібник з видів ордерів на біржі. Ринкові, лімітні, стоп-ордери, OCO, Iceberg та інші типи наказів для ефективної торгівлі.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-14' });this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/ordertypes.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.artickleServ.getRandomUkArticles();
  }

  hoveredIndex: number | null = null;

  projects = [
    { title: 'Книги з трейдингу', link: 'https://arapov.trade/uk/books' },
    { title: 'Професійні курси', link: 'https://arapov.trade/uk/studying' },
    {
      title: 'Базовий курс',
      link: 'https://arapov.trade/uk/freestudying/freeeducation',
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

    this.router.navigate(['/uk/freestudying', nextpage]);
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
          headline: 'Види ордерів на біржі: повний посібник для трейдерів',
          description:
            'Повний посібник з видів ордерів на біржі. Ринкові, лімітні, стоп-ордери, OCO, Iceberg та інші типи наказів для ефективної торгівлі.',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'ArapovTrade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2026-03-15T00:00:00Z',
         dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/ordertypes',
          },
          image: 'https://arapov.trade/assets/img/content/ordertypes.webp',
          inLanguage: 'uk',
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
      '@id': 'https://arapov.trade/uk#person',
      name: 'Ігор Арапов',
      alternateName: [
        'Igor Arapov',
        'Арапов Игорь',
        'I. Arapov',
        'Игорь Арапов',
        'І. В. Арапов',
        'Арапов Ігор',
        'Arapov Igor',
      ],
      url: 'https://arapov.trade/uk',
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
        'Незалежний дослідник',
        'трейдер',
        'автор і засновник arapov.trade',
      ],
      description:
        'Незалежний дослідник, практикуючий трейдер, автор книг з трейдингу та наукових публікацій. Спеціалізується на психології трейдингу та когнітивних упередженнях на фінансових ринках.',
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
          name: 'Що таке ринковий ордер?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ринковий ордер — це наказ купити або продати актив миттєво за поточною ринковою ціною. Виконується одразу після відправки на біржу за наявності ліквідності.',
          },
        },
        {
          '@type': 'Question',
          name: 'У чому різниця між лімітним та стоп-ордером?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Лімітний ордер виконується за вказаною ціною або кращою. Стоп-ордер активується при досягненні ціни і стає ринковим, використовується для захисту позицій.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке стоп-лосс?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Стоп-лосс — захисний ордер, що автоматично закриває позицію при досягненні певного рівня збитку. Ключовий інструмент ризик-менеджменту.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як працює трейлінг-стоп?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Трейлінг-стоп автоматично переміщує рівень стоп-лосса слідом за рухом ціни в прибутковому напрямку, фіксуючи прибуток при продовженні тренду.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке OCO-ордер?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "OCO — пов'язана пара ордерів, де виконання одного автоматично скасовує інший. Зазвичай комбінує тейк-профіт і стоп-лосс.",
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
      name: 'Як обрати правильний тип ордера',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Визначте мету угоди',
          text: 'Вирішіть, чи потрібен терміновий вхід/вихід (ринковий ордер) чи готові чекати кращу ціну (лімітний).',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Оцініть ліквідність',
          text: 'На низьколіквідних ринках використовуйте лімітні ордери для уникнення прослизання.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Встановіть захисні ордери',
          text: 'Завжди розміщуйте стоп-лосс для обмеження збитків.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Налаштуйте фіксацію прибутку',
          text: 'Встановіть тейк-профіт або трейлінг-стоп.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Використовуйте комбіновані ордери',
          text: 'Застосовуйте OCO для автоматизації управління позицією.',
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
      name: 'Терміни біржових ордерів',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Ринковий ордер',
          description:
            'Наказ на негайну купівлю або продаж активу за найкращою доступною ціною',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Лімітний ордер',
          description:
            'Наказ на купівлю або продаж за вказаною ціною або кращою',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-ордер',
          description:
            'Умовний наказ, що активується при досягненні ціною заданого рівня',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description:
            'Захисний ордер для автоматичного закриття позиції при збитку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тейк-профіт',
          description: 'Ордер для автоматичної фіксації прибутку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Трейлінг-стоп',
          description: 'Динамічний стоп-ордер, що рухається за ціною',
        },
        {
          '@type': 'DefinedTerm',
          name: 'OCO-ордер',
          description: 'Пара ордерів, де виконання одного скасовує інший',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Iceberg-ордер',
          description:
            "Великий ордер, розділений на частини зі схованим об'ємом",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Прослизання',
          description: 'Різниця між очікуваною та фактичною ціною виконання',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лімітний ордер',
          description:
            'Ордер, що при активації стає лімітним замість ринкового',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
