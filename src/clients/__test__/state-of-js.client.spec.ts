import * as nock from "nock";
import { ApolloHttpClient } from "../../infra";
import { StateOfJs } from '../state-of-js.client'
import { STATE_OF_JS_API } from '../config/constants';

describe("State of JS client graphQL api", () => {
	it("should get status of a language", async () => {
    const url = STATE_OF_JS_API;
    const response =  {
      data: {
        name: 'any',
        count: 100
      }
    };

    let parsedBody: any;
    nock(url).post('', (body) => {
      parsedBody = body
      return body
    }).reply(200, response)

    const language = 'es-ES';
    const queryString = `locale(localeId: "${language}")`
    const sut = new StateOfJs(new ApolloHttpClient());
    const request = await sut.status(language);

    expect(request).toEqual(response.data);
    expect(parsedBody.query).toContain(queryString);
	});
});
