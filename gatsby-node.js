const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")
const fetch = require("node-fetch")
const { createContentDigest } = require("gatsby-core-utils")
const URL = "http://localhost:2137"

exports.sourceNodes = async ({ actions }) => {
  const { createNode } = actions

  const fetchBlogPage = async (url, page = 1) => {
    const res = await fetch(url)
    const pageData = await res.json()
    return { page, data: pageData }
  }

  const processData = pageData => ({
    id: `page-${pageData.page}`,
    page: `${pageData.page}`,
    data: {
      ...pageData.data,
      previous: pageData.data.previous ? pageData.page - 1 : null,
      next: pageData.data.next ? pageData.page + 1 : null,
    },
    parent: null,
    children: [],
    internal: {
      type: "AkaiBlogPage",
      contentDigest: createContentDigest(JSON.stringify(pageData)),
    },
  })

  let pageData = null
  // Start fetching data from api
  let pageCount = 1
  try {
    // Fetch First Page of blog articles
    pageData = await fetchBlogPage(`${URL}/article/page/${pageCount}`)
    await createNode(processData(pageData))
  } catch (error) {
    console.log(error)
  }
  pageCount += 1
  // Fetch until there is "next" page
  while (pageData.data.next) {
    try {
      pageData = await fetchBlogPage(
        `${URL}/article/page/${pageCount}`,
        pageCount
      )
      await createNode(processData(pageData))
    } catch (error) {
      console.log(error)
    }
    pageCount += 1
  }
  return
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNode, createNodeField } = actions
  /*
  if (node.internal.type === "AkaiBlogPage") {
    node.data.results.forEach(article => {
      // Fetch a single article for more data and create a new node type
      createNode({
        id: `page-${pageData.page}`,
        data: { ...pageData.data },
        parent: null,
        children: [],
        internal: {
          type: "AkaiBlogPage",
          contentDigest: createContentDigest(JSON.stringify(pageData)),
        },
      })
    })
  }
  */
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    {
      allAkaiBlogPage {
        edges {
          node {
            page
          }
        }
      }
    }
  `)
  result.data.allAkaiBlogPage.edges.forEach(({ node }) => {
    createPage({
      path: `/blog/page/${node.page}`,
      component: path.resolve("./src/templates/blog-page.js"),
      context: {
        page: node.page,
      },
    })
  })
}
