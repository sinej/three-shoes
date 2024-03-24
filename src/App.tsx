import './App.css'
import Home from "./components/Home.tsx";
import { RecoilRoot } from "recoil";

function App() {

  return (
    <>
        <RecoilRoot>
            <Home/>
        </RecoilRoot>
    </>
  )
}

export default App
