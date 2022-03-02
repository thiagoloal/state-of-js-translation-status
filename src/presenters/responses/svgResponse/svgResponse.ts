import { compactLayout } from "./layouts/compact"

export const svgResponse = (locale:string, totalCount:number, translatedCount:number):string => {
  return compactLayout.svg(locale, (translatedCount / totalCount) * 100)
}