export type CustomConfig = {
  method: string;
  body?: string;
  headers: HeadersInit;
};

export type GetOptions = {
  endpoint: string;
};

export interface RequestException {
  status: number;
  statusText: string;
  ok: boolean;
  redirected: boolean;
  type: string;
  url: string;
  others: any;
}
export class RequestException {
  constructor({
    ok,
    redirected,
    status,
    statusText,
    type,
    url,
    ...others
  }: Response) {
    this.ok = ok;
    this.redirected = redirected;
    this.status = status;
    this.statusText = statusText;
    this.type = type;
    this.url = url;
    this.others = others;
  }
}
