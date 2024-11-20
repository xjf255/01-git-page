import { useUserActions } from "../hooks/useUserActions";
import { SearchIcon } from "../Icons";

export function Header() {
  const { createUser } = useUserActions()
  return (
    <header className='hero'>
      <label className='input__username'>
        <SearchIcon />
        <input type="text" placeholder='username' onChange={(e) => createUser({ name: e.target.value })} />
      </label>
    </header>
  )
}