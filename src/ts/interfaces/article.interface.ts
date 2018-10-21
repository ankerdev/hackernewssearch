import { IKeyValAny } from './key-val.interface';

// @READ Looking through the API responses I saw that
// a lot of the properties could potentially be null.
// In order to be type-safe, I added OR null to these properties.

export interface IArticle {
  created_at: string;
  title: string | null;
  url: string | null;
  author: string;
  points: number | null;
  story_text: string | null;
  comment_text: string | null;
  num_comments: number | null;
  story_id: number | null;
  story_title: string | null;
  story_url: string | null;
  parent_id: number | null;
  created_at_i: number;
  _tags: string[];
  objectID: number;
  _highlightResult: IKeyValAny;
}

export interface IArticleApiResponse {
  hits: IArticle[];
  nbPages: number;
}
