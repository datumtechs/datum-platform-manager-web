const useLoadImg = (e: any, url: string) => {
    if (e.target.complete) {
        e.target.src = url
    }
}

export default useLoadImg