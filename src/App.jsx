import './App.css'
import { Header } from './components/Header'
import { UserInfo } from './components/UserInfo'
import { Repositories } from './components/Repositories'
import { useAppSelector } from './hooks/store'
import { useUserActions } from './hooks/useUserActions'
import useFetchAPI from './hooks/useAPI'
import { useEffect } from 'react'

function App() {
  const user = useAppSelector(state => state.users)
  const { updateUser } = useUserActions()
  const { data: userDetails, isLoading, isError } = useFetchAPI({ api: `https://api.github.com/users/${user.name}`, key: user.name })
  const { data: initialRepos, isLoading: isLoadingRepos, isError: isErrorRepos } = useFetchAPI({ api: `https://api.github.com/users/${user.name}/repos?per_page=4&page=1`, key: `${user.name}InitialRepos` })
  useEffect(() => {
    if (!(isLoading || isLoadingRepos)) {
      updateUser({
        details: userDetails,
        repositories: initialRepos,
        page: 1,
      })
    }
  }, [userDetails, initialRepos])
  if (isLoading || isLoadingRepos) return <p>Cargando...</p>
  if (isError || isErrorRepos) return <p>Error en la carga</p>

  return (
    <>
      <Header />
      <main>
        <UserInfo />
        <Repositories />
      </main>
    </>
  )
}

export default App
