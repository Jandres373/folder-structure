import { FC } from 'react';
import { Link } from '@tanstack/react-router';
import { DocId } from '../types/mdx_docs.types';

interface DocLink {
    id: DocId;
    title: string;
    description: string;
}

const docLinks: DocLink[] = [
    { id: 'introduction', title: 'Introduction', description: 'Overview of the documentation' },
    { id: 'getting-started', title: 'Getting Started', description: 'Quick start guide' },
    { id: 'development-guide', title: 'Development Guide', description: 'Detailed development instructions' },
    { id: 'architecture', title: 'Architecture', description: 'System architecture overview' },
    { id: 'api-reference', title: 'API Reference', description: 'API documentation' },
    { id: 'deployment', title: 'Deployment', description: 'Deployment guidelines' },
    { id: 'style-guide', title: 'Style Guide', description: 'Coding style guidelines' },
    { id: 'fetching-data', title: 'Fetching Data', description: 'Data fetching architecture and implementation' },
    { id: 'migrate-project', title: 'Project Migration', description: 'Guide for migrating existing projects to the new architecture' },
    { id: 'testing', title: 'E2E Testing', description: 'End-to-end testing with Cypress' },
    { id: 'index', title: 'Index', description: 'Documentation index' }
];

export const DocsContainerFeat: FC = () => {
    return (
        <div className="w-full max-w-4xl px-6 py-8">
            <div className="prose prose-slate dark:prose-invert max-w-none">
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th className="text-left py-2">Section</th>
                            <th className="text-left py-2">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {docLinks.map((doc) => (
                            <tr key={doc.id} className="border-t">
                                <td className="py-3">
                                    <Link
                                        to="/docs/$docId"
                                        params={{ docId: doc.id }}
                                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                    >
                                        {doc.title}
                                    </Link>
                                </td>
                                <td className="py-3">{doc.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DocsContainerFeat;