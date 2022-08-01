import { useEffect } from "react";
import { authExchange } from "@urql/exchange-auth";
import Router from "next/router";
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { NextPageContext } from "next";

type AuthState = {
  token: string
}


const TOKEN_COOKIE_KEY = 'token';

export const saveToken = (token: string) => {
  setCookie(TOKEN_COOKIE_KEY, token);
}

const redirectToLogin = (context: NextPageContext | undefined) => { 
  if (typeof window === 'undefined') {
    context?.res?.writeHead(302, { Location: '/login' });
    context?.res?.end();
  } else {
    Router.replace('/login');
  }
}

const getToken = (context: NextPageContext | undefined) => { 

  const options = context ? { 
    req: context.req,
    res: context.res
  } : {};

  const value = getCookie(TOKEN_COOKIE_KEY, options);
  return value?.toString();
}

export const logout = (context?: NextPageContext) => {
  const options = context ? { 
    req: context.req,
    res: context.res
  } : {};

  deleteCookie(TOKEN_COOKIE_KEY, options);
  redirectToLogin(context);
}


export const withAuthSync = (WrappedComponent: any) => {
  const Wrapper = (props: any) => {

    const syncLogout = (event: StorageEvent) => {
      if (event.key === 'logout') {
        console.log('logged out from storage!');
        Router.replace('/login');
      }
    }

    useEffect(() => {
      window.addEventListener('storage', syncLogout);

      return () => {
        window.removeEventListener('storage', syncLogout);
        window.localStorage.removeItem('logout');
      }
    }, []);

    return <WrappedComponent {...props} />
  }

  Wrapper.getInitialProps = async (ctx: NextPageContext) => {
    const token = getToken(ctx);

    // If there's no token, it means the user is not logged in.
    if (!token) {
      redirectToLogin(ctx);
    }


    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx))

    return { ...componentProps, token }
  }

  return Wrapper;
}


export const myAuthExchange = (context: NextPageContext | undefined) => authExchange<AuthState>({
  addAuthToOperation: ({
    authState,
    operation,
  }) => {
    // the token isn't in the auth state, return the operation without changes
    if (!authState || !authState.token) {
      return operation;
    }

    // fetchOptions can be a function (See Client API) but you can simplify this based on usage
    const fetchOptions: RequestInit =
      typeof operation.context.fetchOptions === 'function'
        ? operation.context.fetchOptions()
        : operation.context.fetchOptions || {};

    return {
      ...operation,
      context: {
        ...operation.context,
        fetchOptions: {
          ...fetchOptions,
          headers: {
            ...fetchOptions.headers,
            "Authorization": `Bearer ${authState.token}`,
          },
        },
      },
    };
  },
  willAuthError: ({ authState }) => {
    if (!authState) return true;
    // e.g. check for expiration, existence of auth etc
    return false;
  },
  didAuthError: ({ error }) => {
    const isAuthError = error.graphQLErrors.some(
      e => e.extensions?.code === 'UNAUTHENTICATED',
    );

    if (isAuthError) {
      logout(context);
    }
    // check if the error was an auth error (this can be implemented in various ways, e.g. 401 or a special error code)
    return isAuthError;
  },
  getAuth: async ({ authState,  }) => {
    // for initial launch, fetch the auth state from storage (local storage, async storage etc)
    if (!authState) {
      const token = getToken(context);
      if (token) {
        return { token };
      }
    }

    return null;
  }
});

