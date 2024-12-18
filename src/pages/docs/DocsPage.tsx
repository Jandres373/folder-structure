import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { BookOpen, Code2, Database, GitBranch, Layers, TestTube, Workflow } from "lucide-react";

interface DocSection {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  params?: { [key: string]: string };
}

const docSections: DocSection[] = [
  {
    title: "Introducción",
    description: "Comienza aquí para entender la arquitectura y los conceptos básicos del proyecto.",
    icon: <BookOpen className="w-6 h-6" />,
    path: "/docs/introduction",
  },
  {
    title: "Primeros Pasos",
    description: "Configura tu entorno de desarrollo y comienza a trabajar con el proyecto.",
    icon: <Workflow className="w-6 h-6" />,
    path: "/docs/getting-started",
  },
  {
    title: "Arquitectura",
    description: "Explora la estructura del proyecto y sus diferentes capas.",
    icon: <Layers className="w-6 h-6" />,
    path: "/docs/architecture",
  },
  {
    title: "Fetching de Datos",
    description: "Aprende cómo se manejan las peticiones y el estado del servidor.",
    icon: <Database className="w-6 h-6" />,
    path: "/docs/fetching-data",
  },
  {
    title: "Migración de Proyecto",
    description: "Guía para migrar proyectos existentes a la nueva arquitectura.",
    icon: <GitBranch className="w-6 h-6" />,
    path: "/docs/migrate-project",
  },
  {
    title: "Testing E2E",
    description: "Guía de testing end-to-end con Cypress.",
    icon: <TestTube className="w-6 h-6" />,
    path: "/docs/testing",
  },
  {
    title: "Gestión de Estado",
    description: "Guía sobre el manejo de estado local y global en la aplicación.",
    icon: <Database className="w-6 h-6" />,
    path: "/docs/state-management",
  },
  {
    title: "Referencia de API",
    description: "Documentación detallada de todas las APIs y componentes disponibles.",
    icon: <Code2 className="w-6 h-6" />,
    path: "/docs/api-reference",
  },
];

function DocsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-4">
            Documentación
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Todo lo que necesitas saber para trabajar con nuestro proyecto
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {docSections.map((section) => (
            <Link
              key={section.path}
              to={section.path}
              params={section.params}
              className={cn(
                "group relative rounded-lg border border-gray-200 dark:border-gray-800",
                "p-6 hover:border-gray-300 dark:hover:border-gray-700",
                "transition-all duration-200",
                "hover:shadow-lg"
              )}
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "p-2 rounded-lg",
                  "bg-gray-100 dark:bg-gray-800",
                  "text-gray-600 dark:text-gray-400",
                  "group-hover:bg-blue-50 dark:group-hover:bg-blue-950",
                  "group-hover:text-blue-600 dark:group-hover:text-blue-400",
                  "transition-colors duration-200"
                )}>
                  {section.icon}
                </div>
                <div>
                  <h2 className={cn(
                    "text-xl font-semibold",
                    "text-gray-900 dark:text-gray-100",
                    "group-hover:text-blue-600 dark:group-hover:text-blue-400",
                    "transition-colors duration-200"
                  )}>
                    {section.title}
                  </h2>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    {section.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DocsPage;