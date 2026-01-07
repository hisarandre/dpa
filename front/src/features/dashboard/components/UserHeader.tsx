import type {UserType} from '@/features/user/types/user.type'
import {userCategoryStyles} from '@/styles/userCategoryStyles'
import {Badge} from '@/shared/components/ui/badge'
import logo from '@/assets/images/logo.svg'
import placeHolder from '@/assets/images/placeholder.png'
import {categoryLabels} from '@/features/user/types/category.type'
import {rankLabels} from '@/features/user/types/rank.type'
import {easeInOut, motion} from 'framer-motion'

interface UserHeaderProps {
    user: UserType
}

export function UserHeader({user}: UserHeaderProps) {
    const styles = userCategoryStyles[user.category]
    // const styles = userCategoryStyles['ARMES_BLANCHES']

    return (
        <div className={`relative overflow-hidden flex items-center justify-between sm:rounded-2xl px-10 py-10 ${styles.gradient}`}>
            <img
                src={logo}
                alt="Background logo"
                aria-hidden
                className="h-[180%] absolute right-[-11%] top-[-60%] opacity-5 pointer-events-none select-none"
            />

            <div className="relative z-10 flex gap-4">
                <div className="relative size-20 flex items-center justify-center">
                    <motion.div
                        className="absolute inset-0 rounded-full bg-gray-dark opacity-50"
                        animate={{
                            scale: [1, 1.12, 1],
                            opacity: [0.35, 0.15, 0.35],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: easeInOut,
                        }}
                    />
                    <img
                        src={
                            user.avatarUrl ||
                            placeHolder
                        }
                        alt="Profile picture"
                        className="relative size-18 rounded-full border-8 border-gray-dark/75 object-cover"
                    />
                </div>


                <div className="flex flex-col gap-2">
                    <p className={`text-xs font-bold font-mono`}>
                        <span className={`${styles.text}`}>#</span>{user.technicalId}
                    </p>

                    <h1 className={`${styles.text}`}>
                        {user.firstName} {user.lastName}
                    </h1>

                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className={styles.badge}>
                            {rankLabels[user.rank]}
                        </Badge>

                        <Badge variant="outline" className={styles.badge}>
                            {categoryLabels[user.category]}
                        </Badge>
                    </div>
                </div>
            </div>
        </div>
    )
}
