# Three E-Commerce

### 

### vite + React + typescript
`$ npm create vite@latest`

### Project Setting
`$ npm i`
`$ npm run dev`

#### Three 설치
`npm install three @types/three @react-three/fiber`
`npm i @react-three/drei`

#### tsconfig or vite.config
`npm i path`
`npm i node`
`npm i @types/node`

````
** tsconfig
"baseUrl": ".",
"paths": {
  "@components/*": ["src/components/*"]
},
"types": [
  "node"
],
````

````
** vite.config
resolve: {
    alias: [
      {
        find: "@src",
        replacement: path.resolve(__dirname, "src"),
      },
      {
        find: "@components",
        replacement: path.resolve(__dirname, "src/components")
      }
    ]
}
````



