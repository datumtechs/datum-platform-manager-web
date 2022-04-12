interface TaskRow {
    isAlgoProvider: String,
    isDataProvider: String,
    isPowerProvider: String,
    isResultReceiver: String,
    isTaskSponsor: String,
}

export default function useRole(roleObj: TaskRow) {
    const roles = {
        isAlgoProvider: roleObj.isAlgoProvider,
        isDataProvider: roleObj.isDataProvider,
        isPowerProvider: roleObj.isPowerProvider,
        isResultReceiver: roleObj.isResultReceiver,
        isTaskSponsor: roleObj.isTaskSponsor
    }
    const ary: string[] = []
    Object.keys(roles).forEach(r => {
        if (roles[r] === false) {
            delete roles[r]
        } else {
            ary.push(r.replace(/^is/g, '').replace(/^./, (L) => L.toLowerCase()))
        }
    })
    return ary
}