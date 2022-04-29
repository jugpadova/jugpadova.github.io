const path = require(`path`)
const _ = require(`lodash`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blog-post.js`)

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        allPosts: allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: ASC }
          filter: { fileAbsolutePath: { regex: "/(/blog/)/" } }
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
        allPages: allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: ASC }
          filter: { fileAbsolutePath: { regex: "/(/pages/)/" } }
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
        categoriesGroup: allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/(/blog/)/" } }
          limit: 100
        ) {
          group(field: frontmatter___categories___permalink) {
            fieldValue
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(`There was an error loading your data`, result.errors)
    return
  }

  const posts = result.data.allPosts.nodes

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: post.fields.slug,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }

  // Define a template for single pages post
  const singlePage = path.resolve(`./src/templates/single-page.js`)

  const singlePages = result.data.allPages.nodes

  // Create site single pages
  // But only if there's at least one markdown file found at "content/pages" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (singlePages.length > 0) {
    singlePages.forEach(page => {
      createPage({
        path: page.fields.slug,
        component: singlePage,
        context: {
          id: page.id,
        },
      })
    })
  }

  // Define a template for the post list pages
  const postListPage = path.resolve(`./src/templates/post-list.js`)

  // Create individual category pages.
  const categories = result.data.categoriesGroup.group
  if (categories.length > 0) {
    categories.forEach(category => {
      createPage({
        path: `/articles/category/${_.kebabCase(category.fieldValue)}/`,
        component: postListPage,
        context: {
          title: `Posts in ${category.fieldValue}`,
          filter: {
            fileAbsolutePath: { regex: "/(/blog/)/" },
            frontmatter: {
              categories: {
                elemMatch: { permalink: { eq: category.fieldValue } },
              },
            },
          },
        },
      })
    })
  }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      author: PostAuthor
    }

    type PostAuthor {
      username: String
      fullname: String
      email: String
    }

    type Fields {
      slug: String
    }
  `)
}
