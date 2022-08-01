import { authExchange } from "@urql/exchange-auth";
import { cacheExchange } from "@urql/exchange-graphcache";
import { NextUrqlClientConfig } from "next-urql";
import { dedupExchange, fetchExchange } from "urql";
import { myAuthExchange } from "./auth";
/*
export const createUrqlClient: NextUrqlClientConfig = (ssrExchange, _) => ({
  url: process.env.NEXT_PUBLIC_BACK_END_URL!,
  exchanges: [dedupExchange, cacheExchange({}), ssrExchange, fetchExchange],
});*/

// This is for route which require user to be logged in
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
