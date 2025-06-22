import { http, HttpResponse } from "msw";
import { z } from "zod";

const url = import.meta.env.APP_API_URL;
export const Authhandlers = [
  http.post(`${url}/auth/login`, () => {
    return HttpResponse.json(
      {
        isSuccess: true,
        statusCode: 200,
        result: {
          userId: z.string(),
          accessToken: z.string(),
          expiresOn: z.string(),
        },
      },
      {
        status: 200,
      }
    );
  }),
];
