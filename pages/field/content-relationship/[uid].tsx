import type { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import * as prismic from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { createClient } from "@/prismicio";

type ContentRelationshipPageProps = InferGetStaticPropsType<
  typeof getStaticProps
>;

export default function ContentRelationshipPage({
  page,
}: ContentRelationshipPageProps) {
  console.log({ page });
  return (
    <div>
      <h1>{page.uid}</h1>
      <ul className="flex flex-wrap gap-3">
        {/*@ts-ignore*/}
        {page.alternate_languages.map((lang: Language) => {
          console.log({ lang });
          return (
            <li
              key={lang.lang}
              // className={lang === lang.lang ? 'font-semibold' : ''}
            >
              {lang.type === "content_relationship_fieldz" ? (
                <PrismicNextLink
                  locale={lang.lang === "fr-fr" ? "fr" : lang.lang}
                  field={lang}
                  linkResolver={(doc) => {
                    if (doc.type === "content_relationship_field") {
                      if (doc.lang === "fr-fr") {
                        return `/field/le-content-relationship/${doc.uid}`;
                      }
                      return `/field/content-relationship/${doc.uid}`;
                    }
                    return null;
                  }}
                  aria-label={`Change language to ${lang.lang}`}>
                  {lang.lang}
                </PrismicNextLink>
              ) : (
                <PrismicNextLink
                  href={lang.uid}
                  // locale={lang.lang}
                  locale={lang.lang === "fr-fr" ? "fr" : lang.lang}
                  aria-label={`Change language to ${lang.lang}`}>
                  {lang.lang}
                </PrismicNextLink>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export async function getStaticPaths() {
  const client = createClient();

  const pages = await client.getAllByType("content_relationship_field");

  return {
    paths: pages.map((page) => prismic.asLink(page)),
    fallback: false,
  };
}

export async function getStaticProps({
  params,
  previewData,
}: GetStaticPropsContext) {
  const client = createClient({ previewData });

  // @ts-ignore
  const page = await client.getByUID("content_relationship_field", params.uid);

  return {
    props: { page },
  };
}
