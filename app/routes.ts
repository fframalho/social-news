import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("components/Home.tsx"),
    route("articles/new-article", "components/articles/AddArticle.tsx"),
    route("articles/list", "components/articles/List.tsx"),
    route("unauthorized", "components/authorization/Unauthorized.tsx")
] satisfies RouteConfig;
