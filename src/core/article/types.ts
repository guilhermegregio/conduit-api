import * as t from "io-ts";
import { profileCodec } from "../profile/types";

const articleCodec = t.type({
  slug: t.string,
  title: t.string,
  description: t.string,
  body: t.string,
  tagList: t.array(t.string),
  createdAt: t.string,
  updatedAt: t.string,
  favorited: t.boolean,
  favoritesCount: t.number,
  author: profileCodec,
});

type Article = t.TypeOf<typeof articleCodec>;

export { Article, articleCodec };
