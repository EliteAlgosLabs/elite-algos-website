import type { Post } from '../types'

/**
 * Editorial.
 *
 * These are the company's own technical positions, published under the
 * engineering byline — not attributed to invented individuals. They restate,
 * in long form, the principles the site claims on the home page, which is the
 * point: a visitor who wants to check whether the philosophy is real should be
 * able to read the reasoning behind it.
 */
export const posts: Post[] = [
  {
    slug: 'the-demo-to-production-gap',
    status: 'published',
    featured: true,
    authorId: 'engineering',
    publishedAt: '2026-03-18',
    readingMinutes: 7,
    topics: [
      { en: 'Engineering', fr: 'Ingénierie' },
      { en: 'Production AI', fr: 'IA en production' },
    ],
    title: {
      en: 'The gap between a demo and a system',
      fr: 'L’écart entre une démonstration et un système',
    },
    excerpt: {
      en: 'Most AI projects do not fail because the model was wrong. They fail because nobody engineered the twenty per cent of cases the demo never showed.',
      fr: 'La plupart des projets d’IA n’échouent pas parce que le modèle était mauvais. Ils échouent parce que personne n’a traité les vingt pour cent de cas que la démonstration ne montrait jamais.',
    },
    body: [
      {
        type: 'paragraph',
        text: {
          en: 'A demonstration is a curated path through a system. It is chosen because it works. That is not dishonest — it is what a demonstration is for — but it means the demonstration tells you almost nothing about whether the system will survive a Tuesday.',
          fr: 'Une démonstration est un chemin choisi à travers un système. Il est sélectionné parce qu’il fonctionne. Ce n’est pas malhonnête — c’est la fonction même d’une démonstration — mais cela signifie qu’elle ne vous apprend presque rien sur la capacité du système à survivre à un mardi ordinaire.',
        },
      },
      {
        type: 'heading',
        id: 'where-the-work-actually-is',
        text: { en: 'Where the work actually is', fr: 'Où se situe réellement le travail' },
      },
      {
        type: 'paragraph',
        text: {
          en: 'In our experience the model is rarely the hard part. The hard parts are the seams: what happens when the input is malformed, when the upstream API is slow, when two records disagree, when the confidence score is 0.61 and nobody ever decided what 0.61 means.',
          fr: 'D’après notre expérience, le modèle est rarement la partie difficile. Les difficultés sont dans les interstices : que se passe-t-il quand l’entrée est malformée, quand l’API amont est lente, quand deux enregistrements se contredisent, quand le score de confiance est de 0,61 et que personne n’a jamais décidé de ce que 0,61 signifie.',
        },
      },
      {
        type: 'list',
        items: {
          en: [
            'Degraded paths — what the system does when a dependency is unavailable',
            'Confidence thresholds — agreed in advance, not discovered in production',
            'Human escalation — who sees the exception, and with what context attached',
            'Cost ceilings — per action, per tenant, per day',
            'Drift detection — because the accuracy you measured is not permanent',
          ],
          fr: [
            'Modes dégradés — ce que fait le système lorsqu’une dépendance est indisponible',
            'Seuils de confiance — convenus à l’avance, non découverts en production',
            'Escalade humaine — qui voit l’exception, et avec quel contexte',
            'Plafonds de coût — par action, par client, par jour',
            'Détection de dérive — car la précision que vous avez mesurée n’est pas permanente',
          ],
        },
      },
      {
        type: 'callout',
        tone: 'note',
        text: {
          en: 'A useful test: ask what the system does when it is wrong. If the answer is "it does not tell anyone", it is not ready for a workflow that matters.',
          fr: 'Un test utile : demandez ce que fait le système lorsqu’il se trompe. Si la réponse est « il ne prévient personne », il n’est pas prêt pour un processus qui compte.',
        },
      },
      {
        type: 'heading',
        id: 'measure-before-you-automate',
        text: { en: 'Measure before you automate', fr: 'Mesurer avant d’automatiser' },
      },
      {
        type: 'paragraph',
        text: {
          en: 'We will not begin an automation engagement without a baseline. Not because it is procedurally tidy, but because without one there is no way to tell success from activity. If the manual process took an unknown amount of time and produced an unknown number of errors, then any claim about improvement afterwards is a guess.',
          fr: 'Nous ne démarrons pas une mission d’automatisation sans référence de départ. Non par souci de procédure, mais parce que sans elle, rien ne distingue le succès de l’activité. Si le processus manuel prenait un temps inconnu et produisait un nombre d’erreurs inconnu, toute affirmation d’amélioration ultérieure n’est qu’une supposition.',
        },
      },
      {
        type: 'quote',
        text: {
          en: 'Automation without a baseline is a guess wearing a suit.',
          fr: 'Automatiser sans référence de départ, c’est deviner en costume.',
        },
      },
      {
        type: 'paragraph',
        text: {
          en: 'The baseline also protects the client from us. It is the mechanism by which an engagement can be judged to have failed — and a supplier who cannot fail is a supplier who cannot be held to anything.',
          fr: 'La référence protège aussi le client contre nous. C’est le mécanisme qui permet de juger qu’une mission a échoué — et un prestataire qui ne peut pas échouer est un prestataire à qui l’on ne peut rien opposer.',
        },
      },
    ],
  },
  {
    slug: 'type-level-language-parity',
    status: 'published',
    featured: false,
    authorId: 'engineering',
    publishedAt: '2026-05-02',
    readingMinutes: 5,
    topics: [
      { en: 'Architecture', fr: 'Architecture' },
      { en: 'Internationalisation', fr: 'Internationalisation' },
    ],
    title: {
      en: 'Make missing translations a compile error',
      fr: 'Faire d’une traduction manquante une erreur de compilation',
    },
    excerpt: {
      en: 'Bilingual sites drift. One language gets a new paragraph, the other does not, and nobody notices for a quarter. The fix is a type, not a process.',
      fr: 'Les sites bilingues divergent. Une langue reçoit un nouveau paragraphe, l’autre non, et personne ne s’en aperçoit pendant un trimestre. La solution est un type, pas un processus.',
    },
    body: [
      {
        type: 'paragraph',
        text: {
          en: 'Every bilingual project we have inherited had the same defect: the second language was behind. Not catastrophically — a missing button label here, an untranslated error message there — but consistently, because keeping two files in sync is a discipline problem, and discipline degrades under deadline.',
          fr: 'Chaque projet bilingue dont nous avons hérité présentait le même défaut : la seconde langue était en retard. Pas de façon catastrophique — un libellé de bouton ici, un message d’erreur non traduit là — mais systématiquement, car maintenir deux fichiers synchronisés est un problème de discipline, et la discipline cède sous la pression des délais.',
        },
      },
      {
        type: 'paragraph',
        text: {
          en: 'The structural fix is to make one language the type source and every other language a value that must satisfy it.',
          fr: 'La correction structurelle consiste à faire d’une langue la source du type, et de chaque autre langue une valeur qui doit le satisfaire.',
        },
      },
      {
        type: 'code',
        language: 'ts',
        code: `// en.ts — the source of truth. Note: no \`as const\`.
export const en = {
  nav: { home: 'Home', about: 'About' },
}
export type Dictionary = typeof en

// fr.ts — cannot compile until every key exists.
import type { Dictionary } from './en'
export const fr: Dictionary = {
  nav: { home: 'Accueil', about: 'À propos' },
}`,
        caption: {
          en: 'Omitting `as const` matters: with literal types, a translation would only compile if it were identical to the English.',
          fr: 'L’absence de `as const` est essentielle : avec des types littéraux, une traduction ne compilerait que si elle était identique à l’anglais.',
        },
      },
      {
        type: 'paragraph',
        text: {
          en: 'Now a missing French string is not a content oversight discovered by a user — it is a red squiggle in the editor and a failed build in CI. The guarantee moves from "we remember to translate" to "it cannot ship otherwise".',
          fr: 'Dès lors, une chaîne française manquante n’est plus un oubli de contenu découvert par un utilisateur : c’est un soulignement rouge dans l’éditeur et une compilation en échec dans l’intégration continue. La garantie passe de « nous pensons à traduire » à « il est impossible de livrer autrement ».',
        },
      },
      {
        type: 'callout',
        tone: 'warning',
        text: {
          en: 'This catches missing strings, not wrong ones. A key filled with the English text still compiles. Type safety is a floor, not a substitute for review by someone who speaks the language.',
          fr: 'Cela détecte les chaînes manquantes, pas les chaînes erronées. Une clé remplie avec le texte anglais compile toujours. Le typage est un plancher, non un substitut à une relecture par une personne qui parle la langue.',
        },
      },
    ],
  },
]
