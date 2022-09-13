import { Blog } from './Blog'
import { genericHookContextBuilder } from '../../utils/genericHookContextBuilder'
import React, { useState } from 'react'

export type Article = {
  id: string
  title: string
  content: string
  slug: string
}

const useLogicState = () => {
  const [articles, setArticles] = useState([] as Article[])
  const [errMsg, setErrMsg] = useState('')
  const [loading, setLoading] = useState(false)

  return {
    articles,
    setArticles,
    errMsg,
    setErrMsg,
    loading,
    setLoading,
  }
}

export const { ContextProvider: BlogContextProvider, Context: BlogContext } =
  genericHookContextBuilder(useLogicState)

export const BlogCTX = () => {
  return (
    <BlogContextProvider>
      <Blog />
    </BlogContextProvider>
  )
}
