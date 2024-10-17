import { useMutation } from "@tanstack/react-query"
import signupService from "@/app/services/signupService"

const useSignupUser = (onAdd: () => void) => {
    return useMutation({
        mutationFn: signupService.post,
        retry: 3,
        onSuccess: () => {
            onAdd()
        },
    })
}


export default useSignupUser
