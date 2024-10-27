const filesData = {
  id: "b13a90f2",
  name: "react project",
  type: "folder",
  children: [
    {
      id: "d91f07e1",
      name: "public",
      type: "folder",
      children: [
        {
          id: "4e68a9d3",
          name: "index.html",
          type: "file",
          data: "<!DOCTYPE html>\n<html>\n\t<head>\n\t\t<title>Vite + React</title>\n\t</head>\n\t<body>\n\t\t<div id='root'></div>\n\t</body>\n</html>",
        },
      ],
    },
    {
      id: "bb7c2d8e",
      name: "src",
      type: "folder",
      children: [
        {
          id: "3a82b7fa",
          name: "components",
          type: "folder",
          children: [
            {
              id: "53df9bcd",
              name: "Header.jsx",
              type: "file",
              data: "export default function Header() {\n\treturn (\n\t\t<header>Header</header>\n\t);\n}",
            },
            {
              id: "ee65e4f9",
              name: "Footer.jsx",
              type: "file",
              data: "export default function Footer() {\n\treturn (\n\t\t<footer>Footer</footer>\n\t);\n}",
            },
          ],
        },
        {
          id: "f4a71c3b",
          name: "App.jsx",
          type: "file",
          data: "import Header from './components/Header';\nimport Footer from './components/Footer';\n\nfunction App() {\n\treturn (\n\t\t<div>\n\t\t\t<Header />\n\t\t\t<Footer />\n\t\t</div>\n\t);\n}\n\nexport default App;",
        },
        {
          id: "c12f0d87",
          name: "main.jsx",
          type: "file",
          data: "import React from 'react';\nimport ReactDOM from 'react-dom';\nimport App from './App';\n\nReactDOM.render(\n\t<App />,\n\tdocument.getElementById('root')\n);",
        },
      ],
    },
    {
      id: "f8b3c0d1",
      name: "node_modules",
      type: "folder",
      children: [
        {
          id: "8c4b6af5",
          name: "vite.js",
          type: "file",
          data: "// Vite configuration and runtime scripts",
        },
      ],
    },
    {
      id: "29a7ef32",
      name: "package.json",
      type: "file",
      data: '{\n\t"name": "vite-react-project",\n\t"version": "1.0.0",\n\t"dependencies": {\n\t\t"react": "^18.0.0",\n\t\t"vite": "^4.0.0"\n\t}\n}',
    },
    {
      id: "a81d9f67",
      name: "vite.config.js",
      type: "file",
      data: "import { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\n\nexport default defineConfig({\n\tplugins: [react()]\n});",
    },
  ],
};

export default filesData;
