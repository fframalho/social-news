import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("components/home.tsx"),
    route("articles/new-article", "components/articles/AddArticle.tsx"),
    route("articles/list", "components/articles/List.tsx")
] satisfies RouteConfig;
