export async function getStaticPaths() {
  const res = await fetch("https://organokala.ir/wp-json/wp/v2/posts?per_page=100");
  const posts = await res.json();

  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

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
      post: data[0] || null,
    },
  };
}

export default function ProductPage({ post }) {
  if (!post) return <p>محصولی یافت نشد</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 font-sans">
      <h1 className="text-3xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      <img
        className="rounded-xl shadow mb-4"
        src={post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || ""}
        alt="product"
      />
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </div>
  );
}
