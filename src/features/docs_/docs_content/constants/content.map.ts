import { lazy } from 'react';

// Lazy load MDX content
const Introduction = lazy(() => import('../content/introduction.mdx'));
const GettingStarted = lazy(() => import('../content/getting-started.mdx'));
const DevelopmentGuide = lazy(() => import('../content/development-guide.mdx'));
const Architecture = lazy(() => import('../content/architecture.mdx'));
const ApiReference = lazy(() => import('../content/api-reference.mdx'));
const Deployment = lazy(() => import('../content/deployment.mdx'));
const StyleGuide = lazy(() => import('../content/style-guide.mdx'));
const Index = lazy(() => import('../content/index.mdx'));
const FetchingData = lazy(() => import('../content/fetching-data.mdx'));
const MigrateProject = lazy(() => import('../content/migrate-project.mdx'));
const Testing = lazy(() => import('../content/testing.mdx'));
const StateManagement = lazy(() => import('../content/state-management.mdx'));

export const contentMap = {
    'introduction': Introduction,
    'getting-started': GettingStarted,
    'development-guide': DevelopmentGuide,
    'architecture': Architecture,
    'api-reference': ApiReference,
    'deployment': Deployment,
    'style-guide': StyleGuide,
    'index': Index,
    'fetching-data': FetchingData,
    'migrate-project': MigrateProject,
    'testing': Testing,
    'state-management': StateManagement
} as const;