import { useAppSelector } from "../hooks/store"
import { useUserActions } from "../hooks/useUserActions";
import { ChieldIcon, NestingIcon, StarIcon } from "../Icons"

export function Repositories() {
  const user = useAppSelector(state => state.users)
  const { addMoreRepositories } = useUserActions()

  const handleGetMoreRepositories = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/users/${user.name}/repos?per_page=30&page=${user.page}`
      );
      if (!response.ok) throw new Error("Failed to fetch more repositories");
      const data = await response.json();
      addMoreRepositories({
        newRepositories: data
      })
    } catch (error) {
      console.error(error.message);
    }
  };

  if(user.repositories === null) return null

  return (
    <section className="info">
      {user.repositories && <section className='info__personal'>
        <h2>{user.details["name"]}</h2>
        <p>{user.details["bio"]}</p>
      </section>}

      {user.repositories && <section className='info__repositories'>
        {user.repositories.map(repo => {
          const { id, name, description, updated_at, stargazers_count, forks, license } = repo
          return (
            <div key={id}>
              <h3 className='repo__name'>{name}</h3>
              <p className='repo__description'>{description}</p>

              <span>
                {license !== null && <span>
                  <ChieldIcon />
                  <h4>{license["spdx_id"]}</h4>
                </span>}
                <span>
                  <NestingIcon />
                  <h4>{forks}</h4>
                </span>
                <span>
                  <StarIcon />
                  <h4>{stargazers_count}</h4>
                </span>
                <span>
                  <p>
                    updated {new Date(new Date().getTime() - new Date(updated_at).getTime()).getDate()} days ago
                  </p>
                </span>
              </span>
            </div>
          )
        })}
      </section>
      }
      {user.details["public_repos"] > user.repositories.length && <button onClick={() => handleGetMoreRepositories()}>View all repositories</button>}
    </section>
  )
}