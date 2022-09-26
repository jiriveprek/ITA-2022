import { ArticleDetailContext } from '../articleDetail/ArticleDetailsContext'
import { Articles } from './ArticlesList'
import { Details } from '../articleDetail/ArticleDetails'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Link, Route, Routes } from 'react-router-dom'
import { NewArticle } from '../newArticle/NewArticle'
import { NewArticleCTX } from '../newArticle/NewArticleContext'
import { combineUrls, urls } from '../../urls'
import { themes } from '../../themes'
import React, { useContext, useState } from 'react'
import styled from '@emotion/styled'

export const Blog = () => {
  return (
    <HelmetProvider>
      <Div_Main>
        <Helmet>
          <title>Jiří Vepřek | Blog</title>
        </Helmet>
        <Div_BlogWrapper>
          <H1_ArticleTitle>React Blog</H1_ArticleTitle>
          <Div_LinksContainer>
            <Div_LinksWrapper>
              <Link_Links to={urls.blog}>List of articles</Link_Links>
              <Link_Links to={combineUrls(urls.blog, urls.newArticle)}>New article</Link_Links>
            </Div_LinksWrapper>
          </Div_LinksContainer>
          <Routes>
            <Route path={urls.homepage} element={<Articles />}></Route>
            <Route path={urls.details} element={<ArticleDetailContext />}></Route>
            <Route path={urls.newArticle} element={<NewArticleCTX />}></Route>
          </Routes>
        </Div_BlogWrapper>
      </Div_Main>
    </HelmetProvider>
  )
}

const Div_Main = styled.div`
  padding-top: 1em;

  min-width: 360px;
  //height: 110vh;

  color: ${themes.color.bright};
  //background-color: ${themes.color.bright};
`

const Div_BlogWrapper = styled.div`
  margin: ${themes.spacing.none} auto;

  max-width: 700px;
`
const Div_LinksContainer = styled.div`
  padding-bottom: 0.3em;

  width: 100%;

  border-bottom: 1px solid ${themes.color.dark};
`
const Div_LinksWrapper = styled.div`
  display: flex;
  gap: ${themes.spacing.l};

  margin: ${themes.spacing.none} auto;

  width: max-content;
`

const H1_ArticleTitle = styled.h1`
  margin: ${themes.spacing.s} auto;

  width: max-content;

  border-bottom: 1px solid ${themes.color.dark};
  border-top: 1px solid ${themes.color.dark};

  color: ${themes.color.dark};
`

const Link_Links = styled(Link)`
  text-decoration: none;

  font-size: ${themes.fonts.m};
  font-weight: 600;

  color: ${themes.color.dark};
`
