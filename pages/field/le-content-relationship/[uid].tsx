import type { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import * as prismic from "@prismicio/client";
import { createClient } from "@/prismicio";

type ContentRelationshipPageProps = InferGetStaticPropsType<
  typeof getStaticProps
>;

export default function ContentRelationshipPage({
  page,
}: ContentRelationshipPageProps) {
  return <h1>{page.uid}</h1>;
}

export async function getStaticPaths() {
  const client = createClient();

  const pages = await client.getAllByType("content_relationship_field", {
    lang: "fr-fr",
  });

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
  const page = await client.getByUID("content_relationship_field", params.uid, {
    lang: "fr-fr",
  });

  return {
    props: { page },
  };
}
