import { apiUrl } from '../urls'

export const filteringUrl = (value: string) => {
  return `${process.env.REACT_APP_URL}?search=${value}`
}

type Article = {
  id: string
  title: string
  content: string
  slug: string
}

export const services = {
  blog: {
    getAll: async () => {
      const response = await fetch(apiUrl!)
      if (!response.ok) throw new Error('Could not fetch articles')
      return (await response.json()) as Article[]
    },
    addArticle: async (title: string, content: string) => {
      const response = await fetch(apiUrl!, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
        }),
      })
      if (!response.ok) throw new Error('Could not post an article')
      return (await response.json()) as Article
    },
    getArticleDetails: async (id: string) => {
      const response = await fetch(`${apiUrl}/${id}`)
      if (!response.ok) throw Error
      return (await response.json()) as Article
    },

    deleteArticle: async (id: string) => {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
        },
      })
      if (!response.ok) throw new Error('Could not delete an article')
      return (await response.json()) as Article[]
    },

    updateArticle: async (id: string, title: string, content: string) => {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          content: content,
        }),
      })
      if (!response.ok) throw new Error('Could not update an article')
      return (await response.json()) as Article[]
    },
  },
}
