import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingHelper {
  public loading: number = 0;
  constructor() {}

  public showLoading(timeout?: number) {
    this.loading++;
    if (timeout > 0) {
      setTimeout(() => {
        this.hideLoading();
      }, timeout);
    }
  }

  public hideLoading() {
    if (this.loading) {
      this.loading--;
    }
  }
}
