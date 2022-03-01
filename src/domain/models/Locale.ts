import { TranslatedKeys } from "./TranslatedKeys";

export interface Locale {
  locale: {
    id: string;
    completion: number;
    totalCount: number;
    translatedCount: number;
    label: string;
    strings?: TranslatedKeys[];
  }
}
