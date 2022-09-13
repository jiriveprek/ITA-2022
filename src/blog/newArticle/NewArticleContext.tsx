import { NewArticle } from './NewArticle'
import { genericHookContextBuilder } from '../../utils/genericHookContextBuilder'
import { hold } from '../../utils/utils'
import { services } from '../../utils/serviceLayer'
import React, { useContext, useState } from 'react'

const useLogicState = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [postErr, setPostErr] = useState('')
  const [titleErr, setTitleErr] = useState('')
  const [contentErr, setContentErr] = useState('')
  const [loading, setLoading] = useState(false)

  const addArticle = async () => {
    try {
      await services.blog.addArticle(title, content)
    } catch (err) {
      setPostErr('Could not post an article')
    }
  }

  const submitValidation = async (title: string, content: string) => {
    let validation = true

    if (!checkTitle(title)) {
      validation = false
    }

    if (!checkContent(content)) {
      validation = false
    }

    if (validation) {
      setLoading(true)
      addArticle()
      await hold(1000)
      setTitle('')
      setContent('')
      setTitleErr('')
      setContentErr('')
      setLoading(false)
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

  return {
    title,
    setTitle,
    content,
    setContent,
    submitValidation,
    postErr,
    titleErr,
    contentErr,
    loading,
  }
}

export const { ContextProvider: NewArticleContextProvider, Context: NewArticleContext } =
  genericHookContextBuilder(useLogicState)

export const NewArticleCTX = () => {
  return (
    <NewArticleContextProvider>
      <NewArticle />
    </NewArticleContextProvider>
  )
}
