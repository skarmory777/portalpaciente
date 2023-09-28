import { Platform } from '@angular/cdk/platform';
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';

// Os métodos reloadPage, changeHref e goToOrigin não podem ser testados pois mudam a url
// e não temos como ver se já foram chamados pelo fato de não conseguirmos fazer o mock de um dom do js
@Injectable()
export class WindowUtilService {
  private static MOBILE_WIDTH = 767;
  private static MOBILE_HEIGHT = 1200;

  private static MD_WIDTH = 960;

  constructor(private location: Location, private platform: Platform) {}

  public static isMobile(width: number, height: number): boolean {
    return width <= WindowUtilService.MOBILE_WIDTH && height <= WindowUtilService.MOBILE_HEIGHT;
  }

  public static mdDeviceOrSmaller(width: number): boolean {
    return width <= WindowUtilService.MD_WIDTH;
  }

  public voltar(): void {
    this.location.back();
  }

  public go(diff: number): void {
    window.history.go(diff);
  }

  public reloadPage(): void {
    location.reload();
  }

  public getHref(): string {
    return window.location.href;
  }

  public changeHref(url: string): void {
    window.location.href = url;
  }

  public locationAssign(url: string): void {
    window.location.assign(url);
  }

  public goToOrigin(): void {
    window.location.href = window.location.origin;
  }

  public scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  public isSecureContext(): boolean {
    return window.isSecureContext;
  }

  public canGetMediaDevices(): boolean {
    return !!navigator.mediaDevices;
  }

  public getDevice(): string {
    const deviceName = window.localStorage.getItem('device');
    if (deviceName === null || deviceName === undefined) {
      return '';
    }
    return deviceName;
  }

  public isIOS(): boolean {
    return this.getDevice().toLowerCase() === 'ios';
  }

  public isAndroid(): boolean {
    return this.getDevice() && this.getDevice().toLowerCase() === 'android';
  }

  public isWebView(): boolean {
    return this.getDevice().toLowerCase() === 'android' || this.getDevice().toLowerCase() === 'ios';
  }

  public isSafariBrowser(): boolean {
    return this.platform.SAFARI;
  }

  public isFirefoxBrowser(): boolean {
    return this.platform.FIREFOX;
  }

  public isIosDevice(): boolean {
    return this.platform.IOS;
  }

  public isMobileDevice(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
      navigator.userAgent,
    );
  }
}
