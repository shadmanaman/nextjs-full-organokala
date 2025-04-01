export async function getStaticPaths() {
  const res = await fetch("https://organokala.ir/wp-json/wp/v2/posts?per_page=100");
  const posts = await res.json();

  const paths = Array.isArray(posts)
    ? posts.map((post) => ({
      params: { slug: post.slug },
    }))
    : [];

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://organokala.ir/wp-json/wp/v2/posts?slug=${params.slug}&_embed`);
  const data = await res.json();

  return {
    props: {
      post: Array.isArray(data) ? data[0] || null : null,
    },
  };
}

export default function ProductPage({ post }) {
  if (!post) return <p>محصولی یافت نشد ❌</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{post.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </div>
  );
}
