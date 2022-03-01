import * as nock from "nock";
import { ApolloHttpClient } from "../graphql-request-http-client";
import { AvaiableQueries } from "../helpers/queries/avaiable";
import { HttpGetParams } from "../protocols/http";

describe("Apollo http client", () => {
	it("get", async () => {
    const url = 'https://any.com/api';
    const response =  {
      data: {
        name: 'any',
        count: 100,
        dt: []
      }
    }
    nock(url).post('').reply(200, response)
		const sut = new ApolloHttpClient();
		const params: HttpGetParams = {
			url,
			queryName: AvaiableQueries.LOCALE,
		};
    const request = await sut.get(params);
    expect(request).toEqual(response.data);
	});
});
