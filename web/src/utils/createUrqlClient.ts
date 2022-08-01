import { cacheExchange } from "@urql/exchange-graphcache";
import { NextUrqlClientConfig } from "next-urql";
import { dedupExchange, fetchExchange } from "urql";
import { myAuthExchange } from "./auth";

export const createUrqlClient: NextUrqlClientConfig = (ssrExchange, context) => ({
  url: process.env.NEXT_PUBLIC_BACK_END_URL!,
  exchanges: [
    dedupExchange, 
    cacheExchange({}),
    myAuthExchange(context),
    ssrExchange,
    fetchExchange
  ],
});
