import { useMutation } from "@tanstack/react-query"
import authService from "@/app/services/authService"

const useLoginUser = (onSuccessCallback: () => void) => {
    return useMutation({
        mutationFn: authService.post,
        retry: 3,
        onSuccess: () => {
            onSuccessCallback()
        },
    })
}

export default useLoginUser
