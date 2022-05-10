
const useThousand = (number: number) => {
    if (isNaN(number)) {
        return 0
    }
    return ('' + number).replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,')
}

export default useThousand