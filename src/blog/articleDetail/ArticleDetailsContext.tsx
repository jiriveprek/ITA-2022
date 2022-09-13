import { Article } from '../articles/BlogContext'
import { Details } from './ArticleDetails'
import { genericHookContextBuilder } from '../../utils/genericHookContextBuilder'
import { hold, useComponentDidMount } from '../../utils/utils'
import { services } from '../../utils/serviceLayer'
import { urls } from '../../urls'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

const useLogicState = () => {
  const params = useParams()
  const id = params.id
  const navigate = useNavigate()

  const [detailedArticle, setDetailedArticle] = useState({} as Article)
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [titleErr, setTitleErr] = useState('')
  const [contentErr, setContentErr] = useState('')
  const [updateErr, setUpdateErr] = useState('')
  const [deleteErr, setDeleteErr] = useState('')
  const [loading, setLoading] = useState(false)

  useComponentDidMount(async () => {
    setLoading(true)
    try {
      const data = await services.blog.getArticleDetails(id!)
      setDetailedArticle(data)
    } catch (error) {
      setErrMsg('Could not fetch the article')
    }
    setLoading(false)
  })

  const submitValidation = async (title: string, content: string) => {
    let validation = true

    if (!checkTitle(title)) {
      validation = false
    }

    if (!checkContent(content)) {
      validation = false
    }

    if (validation) {
      await updateArticle()
      setEditing(false)
      await hold(2000)
      navigate(urls.blog)
    }
  }

  const checkTitle = (title: string) => {
    if (title.trim().length === 0) {
      setTitleErr('Title field can not be empty!')
      return false
    }
    return true
  }

  const checkContent = (content: string) => {
    if (content.trim().length === 0) {
      setContentErr('Content field can not be empty!')
      return false
    }
    return true
  }

  const updateArticle = async () => {
    setLoading(true)
    try {
      await services.blog.updateArticle(id!, title, content)
    } catch (err) {
      setUpdateErr('Could not update article')
    }
    await hold(1000)
    setLoading(false)
  }

  const deleteArticle = async () => {
    setLoading(true)
    try {
      await services.blog.deleteArticle(id!)
    } catch (error) {
      setDeleteErr('Could not delete article')
    }
    await hold(1000)
    setLoading(false)
  }

  return {
    detailedArticle,
    deleteArticle,
    updateArticle,
    title,
    setTitle,
    content,
    setContent,
    editing,
    setEditing,
    submitValidation,
    errMsg,
    titleErr,
    contentErr,
    updateErr,
    deleteErr,
    loading,
  }
}

export const { ContextProvider: ArticleDetailsContextProvider, Context: ArticleDetailsContext } =
  genericHookContextBuilder(useLogicState)

export const ArticleDetailContext = () => {
  return (
    <ArticleDetailsContextProvider>
      <Details />
    </ArticleDetailsContextProvider>
  )
}
