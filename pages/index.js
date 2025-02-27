import Head from "next/head";
import Link from "next/link";
import { Text } from "./blog/detail/[id].js"
import { getDatabase } from "../lib/notion";
import Layout from '../components/layout'

export const databaseId = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID;
console.log("▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲")
console.log(databaseId)
console.log("▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲")
export default function Home({ posts }) {
  return (
    <Layout>
      <Head>
        <title>Techvenience - トップ -</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-dark py-1">
            <div className="container px-2 px-lg-5 my-2">
                <div className="text-center text-white">
                    <h1 className="display-4 fw-bolder">all posts</h1>
                </div>
            </div>
        </header>
        <section className="py-5">
            <div className="container px-4 px-lg-5 mt-5">
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    {posts.map((post) => {
                      const date = new Date(post.last_edited_time).toLocaleString(
                        "en-US",
                        {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                        }
                      );
                      return (
                          <div className="col mb-5" key={post.id}>
                              <div className="card h-100">
                                  <img className="card-img-top border-bottom" src={post.properties.Image.url} alt="..." />
                                  <div className="card-body p-4">
                                      <div className="text-center">
                                          <h5 className="fw-bolder"><Text text={post.properties.Name.title} /></h5>
                                          <div className="d-flex justify-content-center small text-warning mb-2">
                                            {post.properties.Tags.multi_select.map((tag) => {
                                              return (
                                                <Link href={`/blog/?tag=${tag.name}`} className="bi-star-fill btn btn-outline-secondary m-1"  key={tag.id}>{tag.name}</Link>
                                              )
                                            })}
                                          </div>
                                          {date}
                                      </div>
                                  </div>
                                  <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                      <div className="text-center">
                                        <Link className="btn btn-outline-dark mt-auto link"  href={`/blog/detail/${post.id}/`}>記事を読む</Link>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      );
                    })}
                </div>
            </div>
        </section>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId);

  return {
    props: {
      posts: database,
    },
    revalidate: 1,
  };
};
