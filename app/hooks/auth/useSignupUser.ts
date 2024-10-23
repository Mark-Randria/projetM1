import { useMutation } from "@tanstack/react-query"
import signupService from "@/app/services/signupService"

const useSignupUser = (onSuccessCallback: () => void) => {
    return useMutation({
        mutationFn: signupService.post,
        retry: 3,
        onSuccess: () => {
            onSuccessCallback()
        },
    })
}


export default useSignupUser
