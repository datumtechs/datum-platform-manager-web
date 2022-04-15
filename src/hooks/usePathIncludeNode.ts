
import { useRoute } from 'vue-router'

export default function usePathIncludeNode() {
    const route = useRoute()
    return route.path.includes('node')
}