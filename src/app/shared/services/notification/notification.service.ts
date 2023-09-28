import { HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PoNotification, PoNotificationService } from '@po-ui/ng-components';
import { notificationPt } from './i18n/notification-pt';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  literals = notificationPt;

  constructor(private poNotificationService: PoNotificationService) {}

  success(notification: PoNotification | string): void {
    this.poNotificationService.success(notification);
  }

  warning(notification: PoNotification | string): void {
    this.poNotificationService.warning(notification);
  }

  information(notification: PoNotification | string): void {
    this.poNotificationService.information(notification);
  }

  error(notification: PoNotification | string): void {
    this.poNotificationService.error(notification);
  }

  exception(exception: any, message?: string) {
    if (exception) {
      if (exception.error instanceof Blob) {
        this._getBlobExceptionMessage(exception);
        return;
      } else if (Array.isArray(exception.error?.Details)) {
        this._getExceptionDetails(exception);
        return;
      } else if (typeof exception === 'string' && !message) {
        message = exception;
      } else if ('status' in exception) {
        switch (exception.status) {
          case 0:
            return;
          case <number>HttpStatusCode.Forbidden:
            message = this.literals.httpErrors.Forbidden;
            break;
          case <number>HttpStatusCode.Unauthorized:
            message = this.literals.httpErrors.Unauthorized;
            break;
          case <number>HttpStatusCode.NotFound:
            message =
              exception.error?.Message ?? this.literals.httpErrors.NotFound;
            break;
        }
      }
    }

    message = message || this._getExceptionMessage(exception);

    this._onError(message);
    console.error(exception);
  }

  errorLookup(error: any) {
    this._onError(error);
  }

  private _getExceptionDetails(exception: any) {
    const details = [...exception.error.Details]?.map(
      (detail) => <{ Code: string; Message: string }>detail
    );
    const mensagens = details?.map((detail) => detail.Message);
    this._onError(...mensagens);
  }

  private _getBlobExceptionMessage(exception: any) {
    const reader = new FileReader();
    reader.addEventListener('loadend', (e) => {
      let json = JSON.parse(e.target.result.toString());
      let message = [json.Message, json.DetailMessage]
        .filter((msg) => !!msg)
        .join('. ');
      this.poNotificationService.error(message);
    });
    reader.readAsText(exception.error);
    return;
  }

  private _getExceptionMessage(exception: any) {
    if (exception.error) {
      if (exception.error.Message) {
        return exception.error.Message;
      }
      return exception.error;
    }
    if (exception.message) {
      return exception.message;
    }
    return this.literals.httpErrors.padrao;
  }

  private _onError(...messages: any[]) {
    messages.forEach((error) => {
      this.poNotificationService.error(error);
    });
  }
}
