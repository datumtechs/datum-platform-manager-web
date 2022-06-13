const useLoadImg = (e: any, url: string) => {
    if (e.target.complete) {
        console.log(e.target.complete);

        console.log('inside the complete');
        e.target.src = url
    }
}

export default useLoadImg