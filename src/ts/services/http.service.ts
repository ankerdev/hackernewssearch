import { IKeyValAny, IKeyValString } from '../interfaces';

interface IOptions {
  headers: IKeyValString;
  method: string;
  body?: FormData | string;
}

class HTTP {
  private endpoint: string | undefined;

  constructor() {
    this.endpoint = process.env.API_ENDPOINT;
  }

  get(uri: string) {
    return this.buildRequest('GET', uri);
  }

  buildRequest(method: string, uri: string, body?: IKeyValAny): Promise<any> {
    return new Promise((resolve, reject) => {
      fetch(`${this.endpoint}${uri}`, this.getOptions(method, body))
        .then((res: Response) => this.onResponse(res, resolve, reject));
    });
  }

  getOptions(method: string, body?: IKeyValAny): IOptions {
    const options: IOptions = {
      headers: {},
      method,
    };

    if (body) {
      options.body = JSON.stringify(body);
      options.headers['content-type'] = 'application/json';
    }

    return options;
  }

  onResponse(res: Response, resolve: Function, reject: Function): Promise<any> {
    const contentType = res.headers.get('content-type');
    const jsonResponse = contentType && contentType.indexOf('application/json') !== -1;
    if (jsonResponse) {
      try {
        return res.json().then(obj => res.ok ? resolve(obj) : reject(obj));
      } catch (err) {
        return res.ok ? resolve(res) : reject(res);
      }
    } else {
      return res.ok ? resolve(res) : reject(res);
    }
  }
}

export const http = new HTTP();
