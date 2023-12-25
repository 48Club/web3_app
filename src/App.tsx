import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import './App.css'
import './i18n'
import routes from './router'
import axios from 'axios'
import { useInscriptionsEffectData } from './store'

export const githubUrl = 'https://raw.githubusercontent.com/48Club/web3_app/main'

export const getStaticUrl = (type: "border" | "lv" | "avatar", name: string) => {
  return `${githubUrl}/public/static/${type}/${name}.png`
}


const App = () => {

  const { setEffectData } = useInscriptionsEffectData()

  useEffect(() => {
    axios.get(githubUrl + '/inscriptions.json').then((res: any) => {
      setEffectData(res)
    })
  }, [])

  return <RouterProvider router={routes} />;
}

export default App;