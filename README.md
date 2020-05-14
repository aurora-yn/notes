# Simple Notes
Offline markdown note built with react and apollo

---

### Development

```
yarn add apollo-cache-inmemory apollo-client graphql react-apollo styled-components styled-reset react-textarea-autosize graphql-tag apollo-link-state apollo-link react-router-dom react-markdown-renderer
```
*Additional Extensions: Apollo Client Developer Tools (Unstable but not bad)

Add new data object on Apollo Dev Tools
```
mutation {
  createNote(title: "Hi", content: "Hi content") @client{
    id
  }
}
```

To edit, check the data on Apollo Dev Tools
```
mutation {
  editNote(id:1, title: "Edited title", content: "Edited content") @client{
    id
  }
}
```

Query to check data on Apollo Dev Tools
```
{
	notes @client {
    id
    title
    content
  }
}
```

#### Apollo
*Docs [https://www.apollographql.com/docs/]
- Everything in Apollo becomes a link link HTTP Link, Error Link, State Link, etc.s
- Apollo Boost requires HTTP, so this application hasn't built with Apollo Boost
- Offline setting is on /src/apollo.js and /src/clientState.js

---