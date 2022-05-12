import React, { useEffect, useRef, useState } from "react"
import { useStaticQuery, graphql, Link, navigate } from "gatsby"
import {
  AllSubstringsIndexStrategy,
  CaseSensitiveSanitizer,
  ExactWordIndexStrategy,
  LowerCaseSanitizer,
  PrefixIndexStrategy,
  Search as JSSearch,
  StemmingTokenizer,
  StopWordsTokenizer,
  TfIdfSearchIndex,
  UnorderedSearchIndex,
} from "js-search"
import { stemmer } from "stemmer"
import { isBrowser } from "../utilities/utilities"
import { searchOptions } from "../utilities/search"
import styled from "styled-components"

const Wrapper = styled.nav`
  & > ol {
    list-style-type: none;
  }

  & > ol > li {
    margin-bottom: 0.5em;
    white-space: normal;
  }

  & input {
    width: 100%;
  }
`

const Search = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { fileAbsolutePath: { regex: "/(/blog/)/" } }
      ) {
        nodes {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(fromNow: true, locale: "it")
            title
            description
            author {
              username
              fullname
              email
            }
            categories {
              name
              permalink
            }
            tags {
              name
              display
            }
          }
          rawMarkdownBody
          id
        }
      }
    }
  `)

  const {
    termFrequency,
    removeStopWords,
    stemWords,
    indexStrategy,
    searchSanitiser,
    indexBy,
  } = searchOptions

  let searchParam
  if (isBrowser) {
    const params = new URLSearchParams(window.location.search.substring(1))
    searchParam = params.get("q") || ""
  }

  const [isLoading, setLoading] = useState(true)
  const [search, setSearch] = useState(null)
  const [searchQuery, setSearchQuery] = useState(searchParam)
  const [searchResults, setSearchResults] = useState([])
  const searchInputNode = useRef()

  const addSearchIndices = dataToSearch => {
    indexBy.forEach(element => {
      dataToSearch.addIndex(element)
    })
  }

  const rebuildIndex = () => {
    const dataToSearch = new JSSearch("id")

    if (removeStopWords) {
      dataToSearch.tokenizer = new StopWordsTokenizer(dataToSearch.tokenizer)
    }
    if (stemWords) {
      dataToSearch.tokenizer = new StemmingTokenizer(
        stemmer,
        dataToSearch.tokenizer
      )
    }
    if (indexStrategy === "All") {
      dataToSearch.indexStrategy = new AllSubstringsIndexStrategy()
    } else if (indexStrategy === "Exact match") {
      dataToSearch.indexStrategy = new ExactWordIndexStrategy()
    } else if (indexStrategy === "Prefix match") {
      dataToSearch.indexStrategy = new PrefixIndexStrategy()
    }

    dataToSearch.sanitizer =
      searchSanitiser === "Case sensitive"
        ? new CaseSensitiveSanitizer()
        : new LowerCaseSanitizer()
    dataToSearch.searchIndex =
      termFrequency === true
        ? new TfIdfSearchIndex("id")
        : new UnorderedSearchIndex()

    addSearchIndices(dataToSearch)
    dataToSearch.addDocuments(data.allMarkdownRemark.nodes)
    setSearch(dataToSearch)
    setLoading(false)
  }

  useEffect(() => {
    rebuildIndex()
  }, [])

  useEffect(() => {
    if (searchInputNode.current) {
      searchInputNode.current.focus()
    }
    if (search !== null && searchQuery !== "") {
      const queryResult = search.search(searchQuery)
      setSearchResults(queryResult)
    }
  }, [search])

  const handleChange = event => {
    const queryResult = search.search(event.target.value)
    setSearchQuery(event.target.value)
    setSearchResults(queryResult.slice(0, 10))
  }

  const handleSubmit = event => {
    event.preventDefault()
    navigate(`?q=${searchQuery}`)
  }

  if (isLoading || search === null) {
    return null;
  }

  return (
    <Wrapper>
      <h3>Cerca</h3>
      <form onSubmit={handleSubmit}>
        <input
          aria-label="Cerca articoli del blog"
          ref={searchInputNode}
          autoComplete="off"
          spellCheck={false}
          id="Search"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Cerca"
          type="search"
        />
      </form>
      {searchQuery === "" ? null : (
        <>
          {searchResults.length ? (
            <ol>
              {searchResults.map(value => {
                const { id } = value
                return (
                  <li key={id}>
                    <Link to={value.fields.slug}>
                      {value.frontmatter.title}
                    </Link>
                  </li>
                )
              })}
            </ol>
          ) : (
            <p>Nessun risultato</p>
          )}
        </>
      )}
    </Wrapper>
  )
}

export default Search
