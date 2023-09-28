import { PoI18nConfig } from "@po-ui/ng-components";
import { contaEn } from "./conta-en";
import { contaPt } from "./conta-pt";

export { contaPt, contaEn}

export const contaI18nConfig: PoI18nConfig = {
    default: {
      language: 'pt-BR',
      context: 'general',
      cache: true
    },
    contexts: {
      general: {
        'pt-BR': contaPt,
        'en-US': contaEn
      },
      hcm: {
        url: 'http://10.1.1.1/api/translations/hcm/'
      }
    }
  };