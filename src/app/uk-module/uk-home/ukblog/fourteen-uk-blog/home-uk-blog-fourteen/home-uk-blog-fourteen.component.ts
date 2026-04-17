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
  selector: 'app-home-uk-blog-fourteen',
  templateUrl: './home-uk-blog-fourteen.component.html',
  styleUrl: './home-uk-blog-fourteen.component.scss',
})
export class HomeUkBlogFourteenComponent implements OnInit {
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
      'Трейдинг та інвестиції: у чому різниця і що обрати | ArapovTrade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Трейдинг та інвестиції: ключові відмінності, переваги та недоліки кожного підходу. Як обрати свій шлях до фінансової незалежності.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-11-07' }); this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/tradingandinvestments.webp',
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
            'https://arapov.trade/uk/freestudying/tradingandinvestments#article',
          headline:
            'Трейдинг та інвестиції: ключові відмінності та вибір стратегії',
          description:
            'Трейдинг та інвестиції: ключові відмінності, переваги та недоліки кожного підходу до роботи на фінансових ринках.',
          image:
            'https://arapov.trade/assets/img/content/tradingandinvestments1.webp',
          datePublished: '2026-03-15T00:00:00Z',
         dateModified: '2026-04-15T00:00:00Z',

          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Pair Trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/tradingandinvestments',
          },
          articleSection: 'Трейдинг',
          keywords: [
            'трейдинг',
            'інвестиції',
            'трейдер',
            'інвестор',
            'фінансові ринки',
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
        'https://t.me/ArapovTrade'
      ],
       jobTitle: ['Незалежний дослідник', 'трейдер', 'автор і засновник arapov.trade'],
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
      '@id': 'https://arapov.trade/uk/freestudying/tradingandinvestments#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Чим трейдер відрізняється від інвестора?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Трейдер здійснює часті угоди на коротких часових інтервалах, заробляючи на цінових коливаннях. Інвестор тримає активи місяцями та роками, отримуючи дохід від зростання вартості та дивідендів.',
          },
        },
        {
          '@type': 'Question',
          name: 'Скільки можна заробити на трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Професійні трейдери заробляють 30-100% річних, але 70-80% новачків втрачають депозит у перший рік.',
          },
        },
        {
          '@type': 'Question',
          name: 'Який початковий капітал потрібен для інвестицій?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Почати інвестувати можна з 1000-5000 гривень через брокерський рахунок.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи можна поєднувати трейдинг та інвестиції?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Так, професіонали тримають 70-80% капіталу в довгострокових інвестиціях і 20-30% використовують для активної торгівлі.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що вигідніше — трейдинг чи інвестиції?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Статистично 80% інвесторів у плюсі через 10 років, тоді як 90% трейдерів у мінусі.',
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
      '@id': 'https://arapov.trade/uk/freestudying/tradingandinvestments#howto',
      name: 'Як обрати між трейдингом та інвестиціями',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Оцініть вільний час',
          text: 'Трейдинг вимагає 2-8 годин щодня, інвестиції — кілька годин на місяць.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Визначте ризик-профіль',
          text: 'Висока толерантність до ризику — трейдинг, консервативний підхід — інвестиції.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Оцініть початковий капітал',
          text: 'Для трейдингу достатньо 100-500 доларів, для інвестицій бажано більше.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Пройдіть навчання',
          text: 'Вивчіть основи обраного напрямку на демо-рахунку мінімум 3 місяці.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Почніть з малого',
          text: 'Протестуйте стратегію невеликими сумами перед збільшенням обсягів.',
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
      '@id': 'https://arapov.trade/uk/freestudying/tradingandinvestments#terms',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Трейдинг',
          description:
            'Активна торгівля фінансовими інструментами на коротких часових інтервалах',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Інвестиції',
          description:
            'Довгострокове вкладення капіталу в активи для отримання доходу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Диверсифікація',
          description:
            'Розподіл капіталу між різними активами для зниження ризиків',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Дивіденди',
          description: 'Частина прибутку компанії, що виплачується акціонерам',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ETF',
          description:
            'Біржовий фонд, що торгується як акція та містить кошик активів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Технічний аналіз',
          description:
            'Метод прогнозування цін на основі графіків та індикаторів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фундаментальний аналіз',
          description: 'Оцінка вартості активу на основі фінансових показників',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ризик-менеджмент',
          description: 'Система управління торговими ризиками',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильність',
          description: 'Ступінь мінливості ціни активу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Портфель',
          description: 'Сукупність інвестиційних активів власника',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
