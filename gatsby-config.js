require('dotenv').config();

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  host: process.env.CONTENTFUL_HOST || 'cdn.contentful.com',
}

const { spaceId, accessToken, host } = contentfulConfig

if (!spaceId || !accessToken || !host) {
  throw new Error(
    'Contentful spaceId and the access token need to be provided.'
  )
}

module.exports = {
  siteMetadata: {
    siteUrl: 'https://www.deployinc.com',
    title: 'A Technology Agency | Deploy Inc.',
    description: 'We build digital platforms for startups, product companies and creatives that enable them to reach millions of people around the world.'
  },
  pathPrefix: '/gatsby-contentful-starter',
  plugins: [
    'gatsby-transformer-remark',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sass',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-netlify',
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig,
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: "UA-30456352-1",
      },
    },
  ],
}