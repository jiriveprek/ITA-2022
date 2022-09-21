import { BlogContext } from './BlogContext'
import { Link } from 'react-router-dom'
import { combineUrls, urls } from '../../urls'
import { services } from '../../utils/serviceLayer'
import { themes } from '../../themes'
import { useComponentDidMount } from '../../utils/utils'
import React, { useContext, useState } from 'react'
import styled from '@emotion/styled'

export const Articles = () => {
  const logic = useContext(BlogContext)

  useComponentDidMount(async () => {
    logic.setLoading(true)
    try {
      const data = await services.blog.getAll()
      logic.setArticles(data)
    } catch (err) {
      logic.setArticles([])
      logic.setErrMsg('Could not fetch the articles')
    }
    logic.setLoading(false)
  })

  return (
    <div>
      <Div_ArticlesContainer>
        {logic.loading ? (
          <Div_MessageContainer>Loading...</Div_MessageContainer>
        ) : logic.errMsg ? (
          <>
            <Div_MessageContainer>{logic.errMsg}</Div_MessageContainer>
            <Div_GitHubRefContainer>
              For a fully working version, download this repository from{' '}
              <A_RepoLink href={urls.gitHub.main}>GitHub</A_RepoLink> and run it locally.
            </Div_GitHubRefContainer>
          </>
        ) : (
          logic.articles.map(article => (
            <Div_ArticleContainer key={article.id}>
              <Link to={urls.getDetailsReq(article.slug, article.id)}>
                <H2_ArticleTitle>{article.title}</H2_ArticleTitle>
              </Link>
              <Div_ArticleText>
                {article.content.length > 41
                  ? article.content.slice(0, 20) + '...'
                  : article.content}
              </Div_ArticleText>
              <Link to={urls.getDetailsReq(article.slug, article.id)}>
                <Button_DetailsButton>Details...</Button_DetailsButton>
              </Link>
            </Div_ArticleContainer>
          ))
        )}
      </Div_ArticlesContainer>
    </div>
  )
}
const Div_ArticlesContainer = styled.div`
  overflow: auto;

  padding-left: ${themes.spacing.s};
  padding-right: ${themes.spacing.s};

  height: 600px;

  border-bottom: 1px solid ${themes.color.dark};
`

const Div_MessageContainer = styled.div`
  margin: 0 auto;
  margin-top: 3.5em;
  padding: 2em;

  box-sizing: border-box;

  width: max-content;

  font-size: 1rem;

  background-color: ${themes.color.dark};

  @media (min-width: 560px) {
    font-size: 2rem;
  }
`

const Div_GitHubRefContainer = styled.div`
  color: ${themes.color.darkred};
  text-align: center;
  font-size: 1rem;
  margin-top: 1em;

  @media (min-width: 560px) {
    font-size: 2rem;
  }
`
const A_RepoLink = styled.a`
  color: ${themes.color.dark};
`

const H2_ArticleTitle = styled.h2`
  margin-bottom: ${themes.spacing.xs};
  width: max-content;

  font-size: ${themes.fonts.s};

  color: ${themes.color.dark};
`

const Div_ArticleText = styled.div`
  color: ${themes.color.dark};
`

const Div_ArticleContainer = styled.div`
  position: relative;

  height: 80px;

  border-bottom: 1px solid ${themes.color.dark};
`

const Button_DetailsButton = styled.button`
  cursor: pointer;
  position: absolute;

  bottom: ${themes.spacing.none};
  right: ${themes.spacing.none};

  border: none;

  background-color: transparent;
`
