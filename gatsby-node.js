const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js');
    const blogCategory = path.resolve('./src/templates/category.js');
    resolve(
      graphql(
        `
          {
            allContentfulBlogPost {
              edges {
                node {
                  title
                  slug
                }
              }
            }
            allContentfulCategories {
              edges {
                node {
                  slug
                  title
                }
              }
            }
          }
          `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allContentfulBlogPost.edges
        posts.forEach((post, index) => {
          createPage({
            path: `/blog/${post.node.slug}/`,
            component: blogPost,
            context: {
              slug: post.node.slug
            },
          });
        });

        const categories = result.data.allContentfulCategories.edges;
        categories.map(category => {
          createPage({
            path: `/category/${category.node.slug}/`,
            component: blogCategory,
            context: {
              slug: category.node.slug,
            },
          });
        });
      })
    )
  })
}

exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
}) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@pages": path.resolve(__dirname, 'src/pages'),
        "@components": path.resolve(__dirname, 'src/components'),
        "@constants": path.resolve(__dirname, 'src/constants'),
        "@assets": path.resolve(__dirname, 'src/scss/assets'),
        "@lib": path.resolve(__dirname, 'src/lib'),
        "@styles": path.resolve(__dirname, 'src/scss')
      }
    }
  })
}