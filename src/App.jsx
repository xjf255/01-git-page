import './App.css'
import { useEffect } from 'react'
import { Header } from './components/Header'
import { UserInfo } from './components/UserInfo'
import { Repositories } from './components/Repositories'
import { useAppSelector } from './hooks/store'
import { useUserActions } from './hooks/useUserActions'

function App() {
  const user = useAppSelector(state => state.users)
  const { updateUser } = useUserActions()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user details
        const userResponse = await fetch(`https://api.github.com/users/${user.name}`);
        if (!userResponse.ok) throw new Error("Failed to fetch user details");
        const userDetails = await userResponse.json();

        // Fetch initial repositories
        const repoResponse = await fetch(
          `https://api.github.com/users/${user.name}/repos?per_page=4&page=1`
        );
        if (!repoResponse.ok) throw new Error("Failed to fetch repositories");
        const initialRepos = await repoResponse.json();

        updateUser({
          details: userDetails,
          repositories: initialRepos,
          page: 1,
        })

      } catch (error) {
        console.error(error.message)
      }
    };
    fetchUserData()

  }, [user.name])
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
