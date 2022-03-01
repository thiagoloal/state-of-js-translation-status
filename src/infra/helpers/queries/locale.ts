import { gql } from 'graphql-request'

export const locale = (values: any) =>  gql`
  {
    locale(localeId: "${values?.locale || 'pt-BR'}") {
      id
      completion
      totalCount
      translatedCount
      label
    }
  }
`;
