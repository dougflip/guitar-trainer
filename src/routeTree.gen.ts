/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as PracticeSessionsIndexImport } from './routes/practice-sessions/index'
import { Route as PracticeSessionsCreateImport } from './routes/practice-sessions/create'
import { Route as PracticeSessionsIdIndexImport } from './routes/practice-sessions/$id/index'
import { Route as PracticeSessionsIdPlayImport } from './routes/practice-sessions/$id/play'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const PracticeSessionsIndexRoute = PracticeSessionsIndexImport.update({
  id: '/practice-sessions/',
  path: '/practice-sessions/',
  getParentRoute: () => rootRoute,
} as any)

const PracticeSessionsCreateRoute = PracticeSessionsCreateImport.update({
  id: '/practice-sessions/create',
  path: '/practice-sessions/create',
  getParentRoute: () => rootRoute,
} as any)

const PracticeSessionsIdIndexRoute = PracticeSessionsIdIndexImport.update({
  id: '/practice-sessions/$id/',
  path: '/practice-sessions/$id/',
  getParentRoute: () => rootRoute,
} as any)

const PracticeSessionsIdPlayRoute = PracticeSessionsIdPlayImport.update({
  id: '/practice-sessions/$id/play',
  path: '/practice-sessions/$id/play',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/practice-sessions/create': {
      id: '/practice-sessions/create'
      path: '/practice-sessions/create'
      fullPath: '/practice-sessions/create'
      preLoaderRoute: typeof PracticeSessionsCreateImport
      parentRoute: typeof rootRoute
    }
    '/practice-sessions/': {
      id: '/practice-sessions/'
      path: '/practice-sessions'
      fullPath: '/practice-sessions'
      preLoaderRoute: typeof PracticeSessionsIndexImport
      parentRoute: typeof rootRoute
    }
    '/practice-sessions/$id/play': {
      id: '/practice-sessions/$id/play'
      path: '/practice-sessions/$id/play'
      fullPath: '/practice-sessions/$id/play'
      preLoaderRoute: typeof PracticeSessionsIdPlayImport
      parentRoute: typeof rootRoute
    }
    '/practice-sessions/$id/': {
      id: '/practice-sessions/$id/'
      path: '/practice-sessions/$id'
      fullPath: '/practice-sessions/$id'
      preLoaderRoute: typeof PracticeSessionsIdIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/practice-sessions/create': typeof PracticeSessionsCreateRoute
  '/practice-sessions': typeof PracticeSessionsIndexRoute
  '/practice-sessions/$id/play': typeof PracticeSessionsIdPlayRoute
  '/practice-sessions/$id': typeof PracticeSessionsIdIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/practice-sessions/create': typeof PracticeSessionsCreateRoute
  '/practice-sessions': typeof PracticeSessionsIndexRoute
  '/practice-sessions/$id/play': typeof PracticeSessionsIdPlayRoute
  '/practice-sessions/$id': typeof PracticeSessionsIdIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/practice-sessions/create': typeof PracticeSessionsCreateRoute
  '/practice-sessions/': typeof PracticeSessionsIndexRoute
  '/practice-sessions/$id/play': typeof PracticeSessionsIdPlayRoute
  '/practice-sessions/$id/': typeof PracticeSessionsIdIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/practice-sessions/create'
    | '/practice-sessions'
    | '/practice-sessions/$id/play'
    | '/practice-sessions/$id'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/practice-sessions/create'
    | '/practice-sessions'
    | '/practice-sessions/$id/play'
    | '/practice-sessions/$id'
  id:
    | '__root__'
    | '/'
    | '/practice-sessions/create'
    | '/practice-sessions/'
    | '/practice-sessions/$id/play'
    | '/practice-sessions/$id/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  PracticeSessionsCreateRoute: typeof PracticeSessionsCreateRoute
  PracticeSessionsIndexRoute: typeof PracticeSessionsIndexRoute
  PracticeSessionsIdPlayRoute: typeof PracticeSessionsIdPlayRoute
  PracticeSessionsIdIndexRoute: typeof PracticeSessionsIdIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  PracticeSessionsCreateRoute: PracticeSessionsCreateRoute,
  PracticeSessionsIndexRoute: PracticeSessionsIndexRoute,
  PracticeSessionsIdPlayRoute: PracticeSessionsIdPlayRoute,
  PracticeSessionsIdIndexRoute: PracticeSessionsIdIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/practice-sessions/create",
        "/practice-sessions/",
        "/practice-sessions/$id/play",
        "/practice-sessions/$id/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/practice-sessions/create": {
      "filePath": "practice-sessions/create.tsx"
    },
    "/practice-sessions/": {
      "filePath": "practice-sessions/index.tsx"
    },
    "/practice-sessions/$id/play": {
      "filePath": "practice-sessions/$id/play.tsx"
    },
    "/practice-sessions/$id/": {
      "filePath": "practice-sessions/$id/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
