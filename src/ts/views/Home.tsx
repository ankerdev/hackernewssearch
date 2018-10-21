import * as React from 'react';
import * as dateFns from 'date-fns';
import { observer } from 'mobx-react';
import { Article, Icon } from '../components';
import { articleStore as store } from '../stores';

@observer
export class Home extends React.Component {
  maxInputLength: number = 6;

  /**
   * Set search query to user input and hit API.
   *
   * @param input string
   * @return {void}
   */
  onChange(input: string): void {
    store.query = input;
    store.articles = []; // Flush articles to correctly display paginator
    store.searching = true;

    // Throttle
    if (store.timeoutId) {
      window.clearTimeout(store.timeoutId);
    }

    if (input.length >= this.maxInputLength) {
      store.timeoutId = window.setTimeout(
        () => {
          store.page = 1;
          store.getData();
        },
        350
      );
    }
  }

  get renderArticles(): JSX.Element[] {
    return store.articles.map(article => (
      <Article
        key={article.created_at_i}
        title={article.title || 'No title'}
        author={
          <React.Fragment>
            {article.points} point{article.points !== 1 && 's'} • by {article.author} on {dateFns.format(article.created_at, 'Do MMM YYYY')}
          </React.Fragment>
        }
        onClick={
          typeof article.url === 'string'
            ? () => window.open(article.url ? article.url : '', '_blank') // Since it can technically be null, TypeScript requires a check
            : undefined
        }
      />
    ));
  }

  get renderPlaceHolders(): JSX.Element[] {
    return Array.from(new Array<number>(store.hitsPerPage)).map((_: any, i: number) => (
      <Article
        key={i}
        title="Lorem ipsum dolor sit amet"
        author="1337 points • by jonas on 22nd Dec 1994"
        blurred
      />
    ));
  }

  get showDropdown(): boolean {
    return store.query.length >= this.maxInputLength;
  }

  get showPaginator(): boolean {
    const { articles, totalPages } = store;
    return this.showDropdown
        && articles.length > 0
        && totalPages > 1;
  }

  get showSearchResults(): boolean {
    const { articles, searching } = store;
    return articles.length > 0 && !searching;
  }

  render() {
    return (
      <main className="full-screen flex-down align-center justify-start">
        <h1>Hacker News Search</h1>
        <div className="search-wrapper">
          <div className="card mt-1p5">
            <div className="input-wrapper flex align-center justify-start">
              <Icon
                className="hw-30 fill--black"
                name="magnify"
              />
              <input
                placeholder="Type 6 or more characters to search..."
                value={store.query}
                onChange={(e: React.FormEvent<HTMLInputElement>) => this.onChange(e.currentTarget.value)}
              />
            </div>

            <div className="articles-wrapper">
              {this.showDropdown && (
                <React.Fragment>
                  {store.searching && this.renderPlaceHolders}
                  {!store.searching && (
                    <React.Fragment>
                      {store.articles.length > 0 && this.renderArticles}
                      {store.articles.length === 0 && (
                        <div className="article">
                          <h2>No search results...</h2>
                        </div>
                      )}
                    </React.Fragment>
                  )}
                </React.Fragment>
              )}
            </div>
          </div>

          {this.showPaginator && (
            <div className="flex align-center justify-end full-width mt-1">
              <div className="button-wrapper flex align-center justify-between">
                <button
                  className={!store.canDecrementPage || store.searching ? 'muted' : ''}
                  onClick={() => store.changePage('decrement')}
                >
                  <Icon
                    className="hw-30 fill--black"
                    name="chevron-left"
                  />
                </button>
                <button
                  className={!store.canIncrementPage || store.searching ? 'muted' : ''}
                  onClick={() => store.changePage('increment')}
                >
                  <Icon
                    className="hw-30 fill--black"
                    name="chevron-right"
                  />
                </button>
              </div>
            </div>
          )}

          {store.apiError && <p className="color--white mt-1">Oops... Something went wrong.</p>}
        </div>
      </main>
    );
  }
}
