import { useDispatch } from "react-redux"
import { addRepositories, createNewUser, updateStateUser } from "../store/users/slice";

export const useUserActions = () => {
  const dispatch = useDispatch()

  const createUser = ({ name }) => {
    dispatch(createNewUser({ name, details: null, repositories: null, page: 1 }))
  }

  const updateUser = ({ details, repositories, page }) => {
    dispatch(updateStateUser({ details, repositories, page }))
  }

  const addMoreRepositories = ({ newRepositories }) => {
    dispatch(addRepositories(newRepositories))
  }

  return { createUser, updateUser, addMoreRepositories }
}