# Branchtalk

A branching discussion web app
Supports creating root discussions, replying with sub-nodes, and branching into new root discussions

一个分支式讨论应用
支持创建新讨论根、回复节点以及在已有节点下开始新的讨论根

## Features

- Create root discussions (`/api/root/create`)
- Create child nodes (`/api/node/create`)
- Get root with all nodes (`/api/root/get?id=ROOT_ID`)
- Index API to list all roots (`/api/index/get`)
- Supports “branching” new roots from existing nodes
- JSON-based storage; each root stored in a separate file
- Easy to extend (tags, search, front-end, idk, idk more, i really dk, etc.) (Doubtful)

## Project Structure

```
[client]
 +-- index.html
 +-- [css]
 |    +-- style.css
 +-- [js]
      +-- index.js

server
 +-- index.js
 +-- [routes]
 |    +-- roots.js
 |    +-- nodes.js
 |    +-- index.js
 +-- [services]
 |    +-- dataServices.js
 +-- [utils]
 |    +-- id.js
 +-- [data]
      +-- index.json
      +-- [roots]
```


## How to Run

### On Debian Linux:

1. Install dependencies:

- Install node.js and npm:
```bash
sudo apt install nodejs npm
```

- Install node.js dependencies:
```bash
npm install express body-parser
```

2. Start server:

```bash
cd server
node index.js
```

3. Open `client/index.html` in your browser for the homepage

### On other OS:

1. **IDK**

2. Help me to write this thx

## TODO List:
- Write client
- Expand more features
- ~~Make more bugs~~
- ~~Remove herobrine~~
- ~~Make my network be better to connect to github~~
