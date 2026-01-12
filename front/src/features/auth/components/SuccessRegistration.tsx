import { Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter
} from '@/shared/components/ui/card'
import {Button} from "@/shared/components/ui/button";

export const SuccessRegistration = () => {
    return (
        <Card className="w-full max-w-md">
            <CardHeader className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-category-hacker/20 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-category-hacker" />
                </div>

                <CardTitle className="text-2xl">
                    Inscription envoyée !
                </CardTitle>

                <CardDescription>
                    Votre demande d’inscription a bien été prise en compte.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                <p className="text-sm text-subtext text-center">
                    Les inscriptions sont validées manuellement.<br />
                    Vous recevrez un email dès que votre compte sera validé.
                    Cette étape peut prendre quelques jours.
                </p>
            </CardContent>

            <CardFooter>
                <Link to="/login" className="w-full">
                    <Button size='full'>
                        Retour à la connexion
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    )
}
