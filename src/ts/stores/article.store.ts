import { action, computed, observable } from 'mobx';
import { IArticle, IArticleApiResponse } from '../interfaces';
import { http } from '../services';

class ArticleStore {
  @observable articles: IArticle[] = [];
  @observable apiError: boolean = false;
  @observable hitsPerPage: number = 8;
  @observable page: number = 1;
  @observable query: string = '';
  @observable searching: boolean = false;
  @observable totalPages: number = 0;
  @observable timeoutId: number | null = null;

  @action
  getData(): Promise<void | IArticle[]> {
    this.apiError = false;
    return http.get(`/search?query=${this.query}&tags=story&page=${this.page}&hitsPerPage=${this.hitsPerPage}`)
      .then((response: IArticleApiResponse) => {
        this.articles = response.hits;
        this.totalPages = response.nbPages;
        this.searching = false;
      })
      .catch(() => { this.apiError = true; });
  }

  @action
  changePage(action: string): void {
    switch (action) {
      case 'decrement':
        if (this.canDecrementPage) {
          this.page--;
        }
        break;

      case 'increment':
        if (this.canIncrementPage) {
          this.page++;
        }
        break;
    }

    this.searching = true;
    this.getData();
  }

  @computed
  get canDecrementPage(): boolean {
    return this.page > 1;
  }

  @computed
  get canIncrementPage(): boolean {
    return this.page < this.totalPages;
  }
}

export const articleStore = new ArticleStore();
