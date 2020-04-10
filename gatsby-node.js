const path = require(`path`)
const {createFilePath} = require(`gatsby-source-filesystem`)

/**
 * Creates a slug for either .md or .json files.
 * .md => Blog post
 * .json => Project listing
 *
 * We have to generate and take the last segment of the default file path as we need to create custom slugs
 * for each post to be under the specified file folders.
 */
exports.onCreateNode = ({node, getNode, actions}) => {
  const {createNodeField} = actions
  const nodeType = node.internal.type
  if ([`MarkdownRemark`, `ProjectsJson`].indexOf(nodeType) >= 0) {
    const defaultFilePath = createFilePath({node, getNode, basePath: `pages`})
    const parts = defaultFilePath.split("/")
    const filename = parts[parts.length - 2]
    // If the file is a .md file, it's a blog post
    // If the file is a .json file, it's a project listing
    const parent = nodeType === `MarkdownRemark` ? `blog` : `projects`
    const filePath = `/${parent}/posts/${filename}`

    // Adds a field to the GraphQL schema with fields { slug }
    createNodeField({
      node,
      name: `slug`,
      value: filePath
    })
    console.log(filePath)
  }
}

/**
 * Creates the pages from the respective slugs.
 */
exports.createPages = async ({graphql, actions}) => {
  const {createPage} = actions
  const result = await graphql(`
    query {
      allProjectsJson {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  result.data.allProjectsJson.edges.forEach(({node}) => {
    generatePage(createPage, node.fields.slug, `project-listing`)
  })

  result.data.allMarkdownRemark.edges.forEach(({node}) => {
    generatePage(createPage, node.fields.slug, `blog-post`)
  })
}

const generatePage = (createPage, slug, template) => {
  createPage({
    path: slug,
    component: path.resolve(`./src/templates/${template}.js`),
    context: {
      slug: slug
    }
  })
}
