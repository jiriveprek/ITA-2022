import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import fs from 'fs'

const app = express()
const port = 1234

app.use(cors())
app.use(bodyParser.json())

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

app.get('/articles', (req, res, next) => {
  try {
    const data = getDataJSON()
    const articles = data.articles
    res.send(articles)
  } catch (err) {
    next(err)
  }
})

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
