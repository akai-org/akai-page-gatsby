import React from "react"
import { graphql, Link } from "gatsby"

const BlogPage = ({
  data: {
    akaiBlogPage: { page, data },
  },
}) => {
  return (
    <div>
      <h1>Blog Page #{page}</h1>
      {data.results.map(article => (
        <div key={`${article["external_id"]}`}>
          <h2>{article.title}</h2>
          <h3>{article.date}</h3>
          <p>{article["short_description"]}</p>
          <hr />
        </div>
      ))}
      {data.previous && (
        <Link to={`/blog/page/${data.previous}`}>Previous Blog Page</Link>
      )}
      {data.next && <Link to={`/blog/page/${data.next}`}>Next Blog Page</Link>}
    </div>
  )
}

export const query = graphql`
  query($page: String!) {
    akaiBlogPage(page: { eq: $page }) {
      page
      data {
        count
        next
        previous
        results {
          date
          external_id
          first_name
          img_main
          last_name
          profile_pic_url
          short_description
          tag {
            id
            tag
          }
          title
        }
      }
    }
  }
`
export default BlogPage
