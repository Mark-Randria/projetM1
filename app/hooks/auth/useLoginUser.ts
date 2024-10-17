import { useMutation } from "@tanstack/react-query"
import { CACHE_KEY } from "@/app/constants/cacheKeys"
import authService from "@/app/services/authService"

const useLoginUser = (onAdd: () => void) => {
    return useMutation({
        mutationKey: CACHE_KEY.loggedUser,
        mutationFn: authService.post,
        retry: 3,
        onSuccess: () => {
            onAdd()
        },
    })
}


export default useLoginUser
