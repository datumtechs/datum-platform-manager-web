export default function useFormatDay(t: string | number) {
    var time = new Date(t);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    return _add0(m) + '-' + _add0(d)
}

const _add0 = (m: number) => m < 10 ? '0' + m : m
