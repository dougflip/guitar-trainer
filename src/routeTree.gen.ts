/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as TrainingSessionsIndexImport } from './routes/training-sessions/index'
import { Route as TrainingSessionsCreateImport } from './routes/training-sessions/create'
import { Route as TrainingSessionsIdIndexImport } from './routes/training-sessions/$id/index'
import { Route as TrainingSessionsIdPlayImport } from './routes/training-sessions/$id/play'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const TrainingSessionsIndexRoute = TrainingSessionsIndexImport.update({
  id: '/training-sessions/',
  path: '/training-sessions/',
  getParentRoute: () => rootRoute,
} as any)

const TrainingSessionsCreateRoute = TrainingSessionsCreateImport.update({
  id: '/training-sessions/create',
  path: '/training-sessions/create',
  getParentRoute: () => rootRoute,
} as any)

const TrainingSessionsIdIndexRoute = TrainingSessionsIdIndexImport.update({
  id: '/training-sessions/$id/',
  path: '/training-sessions/$id/',
  getParentRoute: () => rootRoute,
} as any)

const TrainingSessionsIdPlayRoute = TrainingSessionsIdPlayImport.update({
  id: '/training-sessions/$id/play',
  path: '/training-sessions/$id/play',
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
    '/training-sessions/create': {
      id: '/training-sessions/create'
      path: '/training-sessions/create'
      fullPath: '/training-sessions/create'
      preLoaderRoute: typeof TrainingSessionsCreateImport
      parentRoute: typeof rootRoute
    }
    '/training-sessions/': {
      id: '/training-sessions/'
      path: '/training-sessions'
      fullPath: '/training-sessions'
      preLoaderRoute: typeof TrainingSessionsIndexImport
      parentRoute: typeof rootRoute
    }
    '/training-sessions/$id/play': {
      id: '/training-sessions/$id/play'
      path: '/training-sessions/$id/play'
      fullPath: '/training-sessions/$id/play'
      preLoaderRoute: typeof TrainingSessionsIdPlayImport
      parentRoute: typeof rootRoute
    }
    '/training-sessions/$id/': {
      id: '/training-sessions/$id/'
      path: '/training-sessions/$id'
      fullPath: '/training-sessions/$id'
      preLoaderRoute: typeof TrainingSessionsIdIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/training-sessions/create': typeof TrainingSessionsCreateRoute
  '/training-sessions': typeof TrainingSessionsIndexRoute
  '/training-sessions/$id/play': typeof TrainingSessionsIdPlayRoute
  '/training-sessions/$id': typeof TrainingSessionsIdIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/training-sessions/create': typeof TrainingSessionsCreateRoute
  '/training-sessions': typeof TrainingSessionsIndexRoute
  '/training-sessions/$id/play': typeof TrainingSessionsIdPlayRoute
  '/training-sessions/$id': typeof TrainingSessionsIdIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/training-sessions/create': typeof TrainingSessionsCreateRoute
  '/training-sessions/': typeof TrainingSessionsIndexRoute
  '/training-sessions/$id/play': typeof TrainingSessionsIdPlayRoute
  '/training-sessions/$id/': typeof TrainingSessionsIdIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/training-sessions/create'
    | '/training-sessions'
    | '/training-sessions/$id/play'
    | '/training-sessions/$id'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/training-sessions/create'
    | '/training-sessions'
    | '/training-sessions/$id/play'
    | '/training-sessions/$id'
  id:
    | '__root__'
    | '/'
    | '/training-sessions/create'
    | '/training-sessions/'
    | '/training-sessions/$id/play'
    | '/training-sessions/$id/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  TrainingSessionsCreateRoute: typeof TrainingSessionsCreateRoute
  TrainingSessionsIndexRoute: typeof TrainingSessionsIndexRoute
  TrainingSessionsIdPlayRoute: typeof TrainingSessionsIdPlayRoute
  TrainingSessionsIdIndexRoute: typeof TrainingSessionsIdIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  TrainingSessionsCreateRoute: TrainingSessionsCreateRoute,
  TrainingSessionsIndexRoute: TrainingSessionsIndexRoute,
  TrainingSessionsIdPlayRoute: TrainingSessionsIdPlayRoute,
  TrainingSessionsIdIndexRoute: TrainingSessionsIdIndexRoute,
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
        "/training-sessions/create",
        "/training-sessions/",
        "/training-sessions/$id/play",
        "/training-sessions/$id/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/training-sessions/create": {
      "filePath": "training-sessions/create.tsx"
    },
    "/training-sessions/": {
      "filePath": "training-sessions/index.tsx"
    },
    "/training-sessions/$id/play": {
      "filePath": "training-sessions/$id/play.tsx"
    },
    "/training-sessions/$id/": {
      "filePath": "training-sessions/$id/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
