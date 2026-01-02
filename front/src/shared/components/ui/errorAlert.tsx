import {motion} from "framer-motion"
import {Alert, AlertDescription} from "@/shared/components/ui/alert";

function ErrorAlert({message}: { message: string }) {
    return (
        <motion.div
            initial={{opacity: 0, y: -10}}
            animate={{opacity: 1, y: 0}}
            role="alert"
            aria-live="assertive"
        >
            <Alert variant="destructive">
                <AlertDescription>{message}</AlertDescription>
            </Alert>
        </motion.div>
    )
}

export {ErrorAlert}
