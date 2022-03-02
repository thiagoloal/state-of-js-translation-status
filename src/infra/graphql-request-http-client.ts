import "cross-fetch/polyfill";
import { request, gql } from 'graphql-request'
import * as queries from "./helpers/queries";
import { HttpGetClient, HttpGetParams, HttpResponse } from "./protocols/http";

export class ApolloHttpClient implements HttpGetClient {
	async get<T>(params: HttpGetParams): Promise<T> {
		let graphQLResponse;
		try {
			let query = gql``;
			if (params.query) {
				query = gql`
					${params.query}
				`;
			} else if (params.queryName) {
				query = queries[params.queryName](params.queryValues);
			}
      graphQLResponse = await request(params.url, query).then(data => data)
		} catch (error) {
			graphQLResponse = error;
		}
		return graphQLResponse;
	}
}
