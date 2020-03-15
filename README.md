## Stack

* Gatsby
* React
* Contentful

## Global Dependencies
Dependencies will need to be installed **globally**.

- [yarn] (https://www.npmjs.com/package/yarn)
- (Optional) [netlify-cli] (https://www.npmjs.com/package/netlify-cli)

## Installation

```bash
# Install local dependencies.
$ yarn
```

## Environment Variables

Create .env file and add environment variables using .env.example as example.

## Netlify Functions

Netlify functions are located inside /functions folder. Full documentation: (https://docs.netlify.com/functions/configure-and-deploy/#configure-the-functions-folder)

## Tasks

| Environment  |        Command           | Description                                                                     |
| ------------ | :----------------------: | --------------------------------------------------------------------------------|
| Local        |   **yarn dev**           | Run project locally on: http://localhost:8000                                   |
| Netlify dev  |   **netlify dev**        | Run project locally with Netlify functions available on: http://localhost:8888  |
| Production   |   **yarn build**         | Run production build.                                                           |

## Troubleshooting

```bash
# Clear cached files
$ rm -rf .cache

# Clear public folder
$ rm -rf public
```