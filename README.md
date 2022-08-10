# Speed Reader API

## API

A pretty simple backend that fetches data from Reddit, cleans up the data a bit, and then sends it to the frontend

Next goal is to add the ability for a user to save posts that can be accessed again later

### Routes

| Verb   | URI Pattern         |
|--------|---------------------|
| GET    | `/posts/new/:sub`   |
| GET    | `/posts/post`       |