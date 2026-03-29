import { Locale } from "@/lib/types";

export const DEFAULT_LOCALE: Locale = "pt-BR";

const DICTIONARY = {
  "pt-BR": {
    appTitle: "Postgrad Companion",
    subtitle: "Hub acadêmico para curadoria de repositórios e progresso de estudos",
    navHome: "Início",
    navSubjects: "Disciplinas",
    navUpdates: "Atualizações",
    navProgress: "Progresso",
    heroTitle: "Sua base técnica para a pós em IA e Ciência de Dados",
    heroBody:
      "Explore frameworks, bibliotecas e projetos open source por disciplina. Acompanhe mudanças, organize trilhas de estudo e publique sua evolução.",
    ctaPrimary: "Ver disciplinas",
    ctaSecondary: "Ver progresso",
    sectionHighlights: "Destaques do MVP",
    highlightsOne: "Curadoria inicial para Agentes, LLMs e Visão Computacional",
    highlightsTwo: "Atualização semanal automatizada de repositórios",
    highlightsThree: "Registro bilíngue de marcos para uso acadêmico e LinkedIn",
    tableRepo: "Repositório",
    tableWhy: "Por que estudar",
    tableLevel: "Nível",
    updatesTitle: "Atualizações recentes",
    progressTitle: "Trilha de progresso",
    statusTodo: "A fazer",
    statusInProgress: "Em andamento",
    statusDone: "Concluído",
    language: "Idioma",
  },
  en: {
    appTitle: "Postgrad Companion",
    subtitle: "Academic hub for repository curation and study progress",
    navHome: "Home",
    navSubjects: "Subjects",
    navUpdates: "Updates",
    navProgress: "Progress",
    heroTitle: "Your technical foundation for AI and Data Science postgrad",
    heroBody:
      "Explore frameworks, libraries, and open source projects by subject. Track changes, organize study tracks, and showcase your evolution.",
    ctaPrimary: "Browse subjects",
    ctaSecondary: "View progress",
    sectionHighlights: "MVP highlights",
    highlightsOne: "Initial curation for Agents, LLMs, and Computer Vision",
    highlightsTwo: "Automated weekly repository sync",
    highlightsThree: "Bilingual milestone tracking for academy and LinkedIn",
    tableRepo: "Repository",
    tableWhy: "Why study",
    tableLevel: "Level",
    updatesTitle: "Recent updates",
    progressTitle: "Progress track",
    statusTodo: "To do",
    statusInProgress: "In progress",
    statusDone: "Done",
    language: "Language",
  },
} as const;

export function t(locale: Locale, key: keyof (typeof DICTIONARY)["pt-BR"]) {
  return DICTIONARY[locale][key] ?? DICTIONARY[DEFAULT_LOCALE][key];
}
