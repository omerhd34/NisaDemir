import ArticleEditor from "@/app/admin/components/ArticleEditor";

export default async function AdminEditArticlePage({ params }) {
 const { id } = await params;
 return <ArticleEditor articleId={id} />;
}
