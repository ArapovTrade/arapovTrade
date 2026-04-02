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
  selector: 'app-home-uk-blog-one',
  templateUrl: './home-uk-blog-one.component.html',
  styleUrl: './home-uk-blog-one.component.scss',
})
export class HomeUkBlogOneComponent implements OnInit {
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
      'Фази ринку в трейдингу: як визначити поточний етап циклу | Ігор Арапов',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Фази ринку в трейдингу: акумуляція, висхідний тренд, дистрибуція та низхідний тренд. Дізнайтеся, як визначати поточну фазу циклу та адаптувати торгову стратегію.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-13' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/blogmarketphases.webp',
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
          headline: 'Фази ринку в трейдингу: як визначити поточний етап циклу',
          description:
            'Детальний посібник з чотирьох фаз ринкового циклу: акумуляція, висхідний тренд, дистрибуція та низхідний тренд. Стратегії торгівлі для кожної фази.',
          image:
            'https://arapov.trade/assets/img/content/blogmarketphases.webp',
          datePublished: '2026-03-25T00:00:00Z',
          dateModified: '2026-03-31T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/uk#person',
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
            '@id': 'https://arapov.trade/uk/freestudying/blogmarketphases',
          },
          articleSection: 'Навчання трейдингу',
          keywords: [
            'фази ринку',
            'ринкові цикли',
            'акумуляція',
            'дистрибуція',
            'тренд',
            'технічний аналіз',
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
          name: 'Які існують основні фази ринку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Існують чотири основні фази ринкового циклу: фаза акумуляції (консолідація після падіння), фаза висхідного тренду (період зростання), фаза дистрибуції (консолідація на вершині) та фаза низхідного тренду (період зниження). Ці фази циклічно змінюють одна одну.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як визначити фазу акумуляції на графіку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Фаза акумуляції характеризується горизонтальним рухом ціни у вузькому діапазоні після тривалого падіння. Ознаки включають: низьку волатильність, багаторазове тестування рівня підтримки без його пробою, зростання обсягів на рухах вгору, бичачі дивергенції на RSI та MACD.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які індикатори допомагають визначити поточну фазу ринку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Для визначення фази ринку використовуються: ковзні середні (напрямок тренду), RSI та MACD (дивергенції та імпульс), Bollinger Bands (волатильність), ADX (сила тренду), Volume Profile (розподіл обсягів). Комплексний аналіз кількох індикаторів підвищує точність.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чим відрізняється фаза дистрибуції від фази акумуляції?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Фаза акумуляції відбувається на мінімумах після падіння — великі гравці скуповують актив. Фаза дистрибуції відбувається на максимумах після зростання — великі гравці продають актив. В акумуляції обсяги зростають на зростанні ціни, в дистрибуції — на падінні.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як торгувати в різних фазах ринку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'У фазі акумуляції: готуватися до купівлі при пробої опору. У висхідному тренді: купувати на відкатах, використовувати трейлінг-стопи. У фазі дистрибуції: фіксувати прибуток, посилювати стопи. У низхідному тренді: використовувати короткі позиції. У всіх фазах важливий ризик-менеджмент.',
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
      name: 'Як визначити поточну фазу ринкового циклу',
      description:
        'Покрокове керівництво з визначення поточної фази ринку для прийняття торгових рішень',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Визначте загальний контекст',
          text: 'Проаналізуйте графік на старшому таймфреймі (денний, тижневий). Визначте, чи перебуває ринок у висхідному або низхідному тренді, або в боковому русі після сильного імпульсу.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Оцініть структуру ціни',
          text: 'Вивчіть послідовність максимумів та мінімумів. Підвищувані максимуми та мінімуми вказують на висхідний тренд, знижувані — на низхідний, горизонтальні — на фазу акумуляції або дистрибуції.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Проаналізуйте обсяги торгів',
          text: 'Порівняйте обсяги на висхідних та низхідних рухах. В акумуляції обсяги зростають на зростанні ціни. В дистрибуції обсяги збільшуються при падінні. У трендах обсяги підтверджують напрямок руху.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Перевірте індикатори',
          text: 'Використовуйте RSI та MACD для виявлення дивергенцій, що попереджають про потенційний розворот. Застосуйте ADX для оцінки сили поточного тренду. Bollinger Bands покаже звуження волатильності перед сильним рухом.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Прийміть торгове рішення',
          text: 'На основі визначеної фази оберіть відповідну стратегію: підготовка до входу в акумуляції, слідування тренду в трендових фазах, фіксація прибутку в дистрибуції. Встановіть параметри ризик-менеджменту згідно з поточною фазою.',
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
      name: 'Глосарій термінів: фази ринку',
      description:
        "Ключові терміни та поняття, пов'язані з фазами ринкового циклу в трейдингу",
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Фаза акумуляції',
          description:
            'Період консолідації на мінімумах ринку, коли великі гравці планомірно викуповують актив після тривалого зниження ціни',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фаза дистрибуції',
          description:
            'Період консолідації на максимумах ринку, коли великі гравці фіксують прибуток та передають позиції запізнілим покупцям',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Висхідний тренд',
          description:
            'Фаза ринку зі стійким зростанням ціни, що характеризується послідовністю підвищуваних максимумів та мінімумів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Низхідний тренд',
          description:
            'Фаза ринку зі стійким зниженням ціни, що характеризується послідовністю знижуваних максимумів та мінімумів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Дивергенція',
          description:
            'Розбіжність між рухом ціни та показаннями індикатора, що сигналізує про потенційний розворот тренду',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маркет-мейкер',
          description:
            'Великий учасник ринку, що забезпечує ліквідність та здатний впливати на формування ціни активу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Консолідація',
          description:
            'Період бокового руху ціни в обмеженому діапазоні, що передує сильному напрямному імпульсу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ринковий цикл',
          description:
            'Послідовність повторюваних фаз розвитку ціни активу: акумуляція, зростання, дистрибуція, падіння',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Volume Profile',
          description:
            'Інструмент аналізу, що показує розподіл торгових обсягів за ціновими рівнями для виявлення зон інтересу учасників ринку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Капітуляція',
          description:
            'Масовий панічний продаж активів учасниками ринку, що зазвичай відбувається у фінальній стадії низхідного тренду',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
