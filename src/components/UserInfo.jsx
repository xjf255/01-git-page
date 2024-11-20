import { DATA_USER } from "../constant"
import { useAppSelector } from "../hooks/store"

export function UserInfo() {
  const user = useAppSelector((state) => state.users)
  return (
    <>
      {user.details !== null && <header className='user'>
        <figure>
          <img src={user.details["avatar_url"]} alt="imagen" />
        </figure>
        {DATA_USER.map(field => {
          return (
            <div key={field} className='user__info'>
              <p>{field}</p>
              <hr />
              <p className='user__info--response'>{user.details[field]}</p>
            </div>
          )
        })}
      </header>}
    </>
  )
}