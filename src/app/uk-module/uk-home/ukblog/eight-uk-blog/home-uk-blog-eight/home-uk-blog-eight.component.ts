import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Inject,
  Renderer2,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

import { ThemeservService } from '../../../../../servises/themeserv.service';
import { artickle } from '../../../../../servises/articles.service';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-home-uk-blog-eight',
  templateUrl: './home-uk-blog-eight.component.html',
  styleUrl: './home-uk-blog-eight.component.scss',
})
export class HomeUkBlogEightComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private artickleServ: ArticlesService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private themeService: ThemeservService,
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
      'Імбаланс у Трейдингу: Повний Посібник | Arapov.trade',
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.updateTag({
      name: 'description',
      content:
        'Імбаланс у трейдингу — повний посібник з дисбалансу попиту та пропозиції. Методи визначення зон імбалансу, об`ємний аналіз, стратегії торгівлі.',
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
          '@id':
            'https://arapov.trade/uk/freestudying/imbalanceintrading#article',
          headline:
            'Імбаланс у Трейдингу: Повний Посібник з Дисбалансу Попиту та Пропозиції',
          description:
            "Комплексний посібник з імбалансу: види дисбалансу, методи визначення зон, об'ємний аналіз, стратегії торгівлі та управління ризиками.",
          image:
            'https://arapov.trade/assets/img/content/imbalanceintrading3.png',
          author: { '@id': 'https://arapov.trade/uk#person' },
          publisher: {
            '@type': 'Organization',
            name: 'ArapovTrade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2026-03-25T00:00:00Z',
          dateModified: '2026-03-31T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/imbalanceintrading',
          },
          articleSection: 'Трейдинг',
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
          name: 'Що таке імбаланс у трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Імбаланс — це диспропорція між ринковим попитом та пропозицією, що викликає нерівномірний розподіл ліквідності та значний ціновий рух в одному напрямку.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які види імбалансу існують?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Виділяють три основні види: локальний імбаланс (короткостроковий дисбаланс), структурний імбаланс (довгострокове переважання однієї сторони) та імбаланс ліквідності (маніпуляції великих гравців).',
          },
        },
        {
          '@type': 'Question',
          name: 'Як визначити зони імбалансу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Зони імбалансу визначаються через Market Profile, Delta Volume, Footprint Charts та Order Flow. Ці інструменти показують розподіл об'ємів та потоки заявок.",
          },
        },
        {
          '@type': 'Question',
          name: 'Чому ціна повертається в зону імбалансу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Після сильного імпульсного руху в зоні дисбалансу залишається незаповнена ліквідність. Ринок прагне до балансу, тому ціна часто повертається для ретесту.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як торгувати за зонами імбалансу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Визначте зону різкого руху без відкатів, дочекайтеся повернення ціни в цю область, знайдіть підтверджуючі сигнали та відкрийте позицію в напрямку тренду.',
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
      name: 'Як торгувати за імбалансом',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Визначення зони дисбалансу',
          text: 'Знайдіть на графіку область різкого імпульсного руху без значних корекцій.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: "Аналіз об'ємів",
          text: 'Проаналізуйте Delta Volume для визначення переважання покупців або продавців.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Очікування ретесту',
          text: 'Дочекайтеся повернення ціни в зону імбалансу та шукайте підтверджуючі сигнали.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Підтвердження входу',
          text: "Використовуйте свічкові патерни або збільшення об'єму для підтвердження точки входу.",
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Управління ризиками',
          text: 'Розмістіть стоп-лос за межами зони імбалансу. Співвідношення ризику до прибутку мінімум 1:2.',
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
      name: 'Глосарій термінів імбалансу',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Імбаланс',
          description:
            'Диспропорція між попитом та пропозицією що викликає нерівномірний розподіл ліквідності',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Volume Profile',
          description:
            "Інструмент що показує розподіл об'єму торгів за ціновими рівнями",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Delta Volume',
          description:
            "Різниця між об'ємами покупок та продажів на ціновому рівні",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Footprint Charts',
          description:
            "Графік що візуалізує угоди всередині свічки з деталізацією за об'ємами",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Order Flow',
          description:
            'Аналіз потоків заявок що показує активність учасників ринку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Market Profile',
          description:
            "Метод аналізу розподілу об'єму та часу за ціновими рівнями",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Локальний імбаланс',
          description:
            'Короткострокове порушення балансу між попитом та пропозицією',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Структурний імбаланс',
          description:
            'Довгострокове переважання однієї сторони ринку що формує тренд',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ретест',
          description: 'Повернення ціни до рівня для перевірки його значущості',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Кластерний аналіз',
          description:
            "Метод аналізу розподілу об'єму за кластерами всередині свічки",
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
