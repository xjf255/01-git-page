import { useQuery } from "@tanstack/react-query"

export default function useFetchAPI({ api, key }) {
  const fetchData = async () => {
    const data = await fetch(api)
    if (!data.ok) {
      throw new Error('Error en la obtencion de datos')
    }
    return data.json()
  }

  const { isLoading, data, isError } = useQuery({
    queryKey: [key],
    queryFn: fetchData,
  })

  return { isLoading, data, isError }
}