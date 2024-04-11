import {ReactNode} from "react";

import {cn} from "../../lib/utils.tsx";

type IParameters = {
    className?: string,
    children: ReactNode
}

function FillScreenWrapper({className, children}: IParameters) {
    return (
        <div className={cn("w-screen h-screen", className)}>
            {children}
        </div>
    );
}

export default FillScreenWrapper;