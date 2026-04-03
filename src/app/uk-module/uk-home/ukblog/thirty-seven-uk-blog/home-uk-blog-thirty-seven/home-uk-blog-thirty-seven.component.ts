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
  selector: 'app-home-uk-blog-thirty-seven',
  templateUrl: './home-uk-blog-thirty-seven.component.html',
  styleUrl: './home-uk-blog-thirty-seven.component.scss',
})
export class HomeUkBlogThirtySevenComponent implements OnInit {
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
      'Просідання в трейдингу: управління ризиками та відновлення капіталу | Arapov.trade',
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.updateTag({
      name: 'description',
      content:
        'Просідання в трейдингу: види drawdown, причини виникнення, методи аналізу та мінімізації. Практичний посібник з управління ризиками та відновлення капіталу.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-04-02' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/drawdowns.webp',
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
          headline:
            'Просідання в трейдингу: управління ризиками та відновлення капіталу',
          description:
            'Комплексний посібник з управління просіданнями: види drawdown, причини виникнення, методи аналізу, мінімізації та відновлення торгового капіталу.',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2026-03-25T00:00:00Z',
          dateModified: '2026-03-31T00:00:00Z',
          image: 'https://arapov.trade/assets/img/content/drawdowns1.webp',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/drawdowns',
          },
          articleSection: 'Трейдинг',
          keywords: [
            'просідання',
            'drawdown',
            'ризик-менеджмент',
            'управління капіталом',
            'відновлення рахунку',
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
          name: 'Що таке просідання в трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Просідання (drawdown) — це тимчасове зниження торгового капіталу від максимального значення до поточного або мінімального рівня. Показник виражається у відсотках або абсолютних величинах і є ключовою метрикою оцінки ризиків торгової стратегії.',
          },
        },
        {
          '@type': 'Question',
          name: 'Який рівень просідання вважається допустимим?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Для консервативних стратегій допустимим вважається просідання до 10-15%, для помірних — до 20-25%, для агресивних — до 30-35%. Просідання понад 50% критично небезпечне, оскільки потребує 100% прибутку для відновлення капіталу.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як мінімізувати просідання в трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Основні методи мінімізації: обмеження ризику на угоду до 1-2% капіталу, обов'язкове використання стоп-лоссів, диверсифікація портфеля, зменшення розміру позицій при наростанні збитків та дотримання торгового плану.",
          },
        },
        {
          '@type': 'Question',
          name: 'Як відновити капітал після глибокого просідання?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Відновлення потребує зниження ризиків, аналізу причин збитків, фокусу на якості угод замість їх кількості та поступового збільшення позицій по мірі зростання рахунку. Важливо не намагатися відігратися агресивною торгівлею.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чим відрізняється максимальне просідання від поточного?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Максимальне просідання — найбільше падіння капіталу від піку до дна за всю історію торгівлі. Поточне просідання — миттєве зниження від останнього максимуму, динамічний показник, що змінюється з кожною угодою.',
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
      name: 'Як управляти просіданнями в трейдингу',
      description:
        'Покроковий посібник з контролю просідань та відновлення торгового капіталу',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Визначте допустимий рівень ризику',
          text: 'Встановіть максимально допустиме просідання для вашої стратегії та обмежте ризик на одну угоду до 1-2% від капіталу.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Налаштуйте захисні ордери',
          text: 'Розміщуйте стоп-лосси для кожної позиції на основі технічного аналізу, а не комфортної суми збитку.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Ведіть моніторинг просідань',
          text: 'Відстежуйте поточне, середнє та максимальне просідання, аналізуйте час відновлення та коефіцієнт відновленості.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Застосовуйте правила зниження ризиків',
          text: 'При досягненні 5% просідання скоротіть обсяг угод удвічі, при 10% — призупиніть торгівлю для аналізу.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Відновлюйте капітал системно',
          text: 'Після просідання знизьте ризики, проаналізуйте помилки, фокусуйтесь на якісних сетапах та поступово збільшуйте позиції.',
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
      name: 'Глосарій термінів управління просіданнями',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Просідання',
          description:
            'Тимчасове зниження торгового капіталу від максимального значення до поточного або мінімального рівня',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Drawdown',
          description:
            'Англійський термін для позначення просідання, широко використовуваний у міжнародній торговій практиці',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Максимальне просідання',
          description:
            'Найбільше падіння капіталу від піку до дна за визначений період торгівлі',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Коефіцієнт відновлення',
          description:
            'Відношення накопиченого прибутку до максимального просідання, що показує ефективність стратегії',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ризик-менеджмент',
          description:
            'Система управління торговими ризиками, що включає контроль розміру позицій та захисні ордери',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description:
            'Захисний ордер, що автоматично закриває позицію при досягненні заданого рівня збитку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Час відновлення',
          description:
            'Період, необхідний для повернення капіталу до попереднього максимуму після просідання',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Диверсифікація',
          description:
            'Розподіл капіталу між різними активами для зниження загального ризику портфеля',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильність',
          description:
            'Ступінь мінливості ціни активу, що впливає на розмір потенційних просідань',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Вінрейт',
          description:
            'Відсоток прибуткових угод від загальної кількості, що впливає на частоту та глибину просідань',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
