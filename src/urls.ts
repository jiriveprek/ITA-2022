import Blog from './images/Blog.png'
import HackerTyper from './images/Hackertyper.png'
import JSHistory from './images/JS_History.png'
import MemoryGame from './images/Memory.png'
import Mortgage from './images/Mortgage.png'
import Todo from './images/Todo.png'
import gitHubIcon from './images/GitHub-Mark-32px.png'
import profilePic from './images/ProfilePic.jpg'

export const urls = {
  homepage: '/',
  projects: 'projects',
  cv: 'cv',
  jsHistory: '/js-history',
  todolist: '/todoRedux',
  hackertyper: '/hackertyper',
  mortgage: '/mortgage',
  memoryGame: '/memory',
  blog: '/blog',
  nestedBlog: '/blog/*',
  newArticle: '/newArticle',
  details: '/details/:articleID/:id',
  getDetailsReq: (titleToSlug: string, id: string) => `/blog/details/${titleToSlug}/${id}`,
  images: {
    profilePic: `${profilePic}`,
    jsHistory: `${JSHistory}`,
    Todo: `${Todo}`,
    HackerTyper: `${HackerTyper}`,
    Mortgage: `${Mortgage}`,
    MemoryGame: `${MemoryGame}`,
    Blog: `${Blog}`,
    gitHub: `${gitHubIcon}`,
  },
  gitHub: {
    jsHistory: 'https://github.com/jiriveprek/ITA-2022/tree/main/src/js-history',
    todolist: 'https://github.com/jiriveprek/ITA-2022/tree/main/src/todoRedux',
    hackertyper: 'https://github.com/jiriveprek/ITA-2022/tree/main/src/hackertyper',
    mortgage: 'https://github.com/jiriveprek/ITA-2022/tree/main/src/mortgage',
    memoryGame: 'https://github.com/jiriveprek/ITA-2022/tree/main/src/memory',
    blog: 'https://github.com/jiriveprek/ITA-2022/tree/main/src/blog',
  },
} as const

export const combineUrls = (...arrStrings: String[]) => {
  return arrStrings.join('')
}

export const apiUrl = process.env.REACT_APP_BLOG_URL
