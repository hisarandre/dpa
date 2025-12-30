import type { UserType } from '@/features/user/types/user.type'
import { userCategoryStyles } from '@/shared/lib/userCategoryStyles'
import { Badge } from '@/shared/components/ui/badge'
import logo from '@/assets/logo.svg'
import { categoryLabels } from '@/features/user/types/category.type'
import { rankLabels } from '@/features/user/types/rank.type'

interface UserHeaderProps {
    user: UserType
}

export function UserHeader({ user }: UserHeaderProps) {
    const styles = userCategoryStyles[user.category]

    return (
        <div
            className={`
            relative overflow-hidden
            flex items-center justify-between
            sm:rounded-2xl
            px-10 py-10
            ${styles.gradient}
          `}
        >
            {/* Background logo */}
            <img
                src={logo}
                alt=""
                aria-hidden
                className="
                  pointer-events-none
                  absolute right-[-15%] top-1/2
                  h-[180%]
                  -translate-y-1/2
                  opacity-5
                  select-none
                "
            />

            {/* Content */}
            <div className="relative z-10 flex w-full items-center justify-between">
                {/* Left */}
                <div className="flex flex-col gap-2">
                  <span className={`text-xs font-bold ${styles.hint}`}>
                    #{user.technicalId}
                  </span>

                    <h1 className={`text-2xl font-bold ${styles.text}`}>
                        {user.firstName} {user.lastName}
                    </h1>

                    <div className="flex gap-2">
                        <Badge variant="outline" className={styles.badge}>
                            {rankLabels[user.rank]}
                        </Badge>

                        <Badge variant="outline" className={styles.badge}>
                            {categoryLabels[user.category]}
                        </Badge>
                    </div>
                </div>

                {/* Right – money bubble */}
                <div className="text-right">
                    <div
                        className="
                          flex items-center gap-2
                          rounded-full
                          px-5 py-2
                          bg-background/40
                          backdrop-blur-md
                          border border-border/40
                          shadow-sm
                        "
                    >
                        <span className="text-lg font-semibold tracking-tight">
                          {user.currentMoney.toLocaleString()}
                            <span className={`pl-2 ${styles.hint}`}>
                                ¥
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
