import { PoToasterType } from '@po-ui/ng-components';

export enum PoToasterTypeExtensao {
  exception = 5,
}

export type PoToasterTypeExtendido = PoToasterType | PoToasterTypeExtensao;
