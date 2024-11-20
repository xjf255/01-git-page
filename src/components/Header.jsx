import { useDebouncedCallback } from "use-debounce";
import { useUserActions } from "../hooks/useUserActions";
import { SearchIcon } from "../Icons";

export function Header() {
  const { createUser } = useUserActions()
  const debounced = useDebouncedCallback((value) => {
    createUser({name:value})
  },500)
  return (
    <header className='hero'>
      <label className='input__username'>
        <SearchIcon />
        <input type="text" placeholder='username' onChange={(e) => debounced(e.target.value)} />
      </label>
    </header>
  )
}