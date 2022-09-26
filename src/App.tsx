import { BlogCTX } from './blog/articles/BlogContext'
import { CV } from './CV'
import { Hackertyper } from './hackertyper/Hackertyper'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Homepage } from './Homepage'
import { JSHistory } from './js-history/Jshistory'
import { MemoryGame } from './memory/MemoryGame'
import { MortgageCalculator } from './mortgage/Mortgage'
import { Navbar } from './navbar/Navbar'
import { Projects } from './Projects'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ThemeProvider } from '@emotion/react'
import { Todos } from './todoRedux/Todo'
import { injectGlobal } from '@emotion/css'
import { themes } from './themes'
import { urls } from './urls'

injectGlobal`
  html {
    background-color: ${themes.color.bright};
  }
`

export const App = () => {
  return (
    <HelmetProvider>
      <ThemeProvider theme={themes}>
        <Helmet>
          <title>Jiří Vepřek</title>
        </Helmet>
        <Router>
          <Navbar />
          <Routes>
            <Route path={urls.homepage} element={<Homepage />}></Route>
            <Route path={urls.projects} element={<Projects />}></Route>
            <Route path={urls.cv} element={<CV />}></Route>
            <Route path={urls.jsHistory} element={<JSHistory />}></Route>
            <Route path={urls.todolist} element={<Todos />}></Route>
            <Route path={urls.hackertyper} element={<Hackertyper />}></Route>
            <Route path={urls.mortgage} element={<MortgageCalculator />}></Route>
            <Route path={urls.memoryGame} element={<MemoryGame />}></Route>
            <Route path={urls.nestedBlog} element={<BlogCTX />}></Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  )
}
