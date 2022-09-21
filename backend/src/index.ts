import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import fs from 'fs'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Blog API',
    version: '1.0.0',
    description: 'A simple Blog API',
    contanct: {
      name: 'Jiří Vepřek',
      url: 'https://www.veprekj.cz/',
      email: 'veprekj.jiri@outlook.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:1234',
    },
  ],
}

const options = {
  swaggerDefinition,
  apis: ['src/index.ts'],
}

const swaggerSpec = swaggerJSDoc(options)

const app = express()
const port = 1234

app.use(cors())
app.use(bodyParser.json())
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

type Article = {
  id: string
  title: string
  content: string
  slug: string
}

type Articles = {
  articles: Article[]
}

const generateId = () => (Math.floor(Math.random() * 1_000_000) + 1).toString()

const getSlug = (textToSlug: string) => {
  return delAccentsDiacritics(textToSlug.toLowerCase().replaceAll(/ /g, ''))
}

const delAccentsDiacritics = (text: string) => {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

const getDataJSON = (): Articles => {
  const dataJSON = fs.readFileSync(`${__dirname}/../dataBlog.json`, 'utf-8')
  return JSON.parse(dataJSON)
}

const postDataJSON = (dataBody: Articles) => {
  fs.writeFileSync(`${__dirname}/../dataBlog.json`, JSON.stringify(dataBody))
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Articles:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The article ID
 *           example: 581672
 *         title:
 *           type: string
 *           description: Title of the article
 *           example: New Article
 *         content:
 *           type: string
 *           description: Content of the article
 *           example: This is the content of the new article
 *         slug:
 *           type: string
 *           description: Slug of the article based on it's title
 *           example: newarticle
 */

/**
 * @swagger
 * /articles:
 *   get:
 *     summary: Retrieve a list of articles
 *     description: Retrieve a list of articles from dataBlog.json
 *     responses:
 *       200:
 *         description: A list of articles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 articles:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Articles'
 *       500:
 *         description: Server error
 */

app.get('/articles', (req, res, next) => {
  try {
    const data = getDataJSON()
    const articles = data.articles
    res.send(articles)
  } catch (err) {
    next(err)
  }
})

/**
 * @swagger
 * /articles:
 *   post:
 *     summary: Post an article
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               $ref: '#/components/schemas/Articles'
 *     responses:
 *       200:
 *         description: Create
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Articles'
 *       500:
 *         description: Server error
 */

app.post('/articles', (req, res, next) => {
  try {
    const newArticle: Article = {
      id: generateId(),
      title: req.body.title,
      content: req.body.content,
      slug: getSlug(req.body.title),
    }
    const data = getDataJSON()
    const newData = { ...data, articles: [newArticle, ...data.articles] }
    postDataJSON(newData)
    res.send(newArticle)
  } catch (err) {
    next(err)
  }
})

/**
 * @swagger
 * /articles/{id}:
 *   get:
 *     summary: Retrieve a single article
 *     description: Retrieve a single article by it's own ID
 *     parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: String ID of the article to retrieve
 *           schema:
 *             type: string
 *     responses:
 *       200:
 *         description: The searched article
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Articles'
 *       404:
 *         description: The article was not found
 *       500:
 *         description: Server error
 */

app.get('/articles/:id', (req, res, next) => {
  try {
    const data = getDataJSON()
    const articles = data.articles
    const article = articles.find(article => article.id === req.params.id)
    res.send(article)
  } catch (err) {
    next(err)
  }
})

/**
 * @swagger
 * /articles/{id}:
 *   delete:
 *     summary: Delete a single article
 *     description: Delete an article based on it's ID
 *     parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: String ID of the article to retrieve
 *           schema:
 *             type: string
 *     responses:
 *       200:
 *         description: The article was deleted
 *       404:
 *         description: The article was not found
 *       500:
 *         description: Server error
 */

app.delete('/articles/:id', (req, res, next) => {
  try {
    const data = getDataJSON()
    const dataFiltering = {
      ...data,
      articles: data.articles.filter(article => article.id !== req.params.id),
    }
    postDataJSON(dataFiltering)
    res.send(dataFiltering)
  } catch (err) {
    next(err)
  }
})

/**
 * @swagger
 * /articles/{id}:
 *   post:
 *     summary: Update the article
 *     parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: String ID of the article to retrieve
 *           schema:
 *             type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               $ref: '#/components/schemas/Articles'
 *     responses:
 *       200:
 *         description: Updated
 *       404:
 *         description: The article was not found
 *       500:
 *         description: Server error
 */

app.post('/articles/:id', (req, res, next) => {
  try {
    const data = getDataJSON()
    const dataUpdating = {
      ...data,
      articles: data.articles.map(article =>
        article.id === req.params.id
          ? {
              ...article,
              title: req.body.title,
              content: req.body.content,
              slug: getSlug(req.body.title),
            }
          : article
      ),
    }
    postDataJSON(dataUpdating)
    res.send(dataUpdating)
  } catch (err) {
    next(err)
  }
})

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err)
  res.status(500)
  res.json(err)
})
app.listen(port, () => {
  console.info(`Example app listening on port ${port}`)
})
