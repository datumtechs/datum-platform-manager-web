import { routes } from '.'

function findRoutesByPaths (pathList, routeList, basename) {
    return routeList.filter((child) => { 
        return pathList.indexOf((basename || '') + child.path) !== -1 
})
}

function getBusinessRouteList () {
    const routeList = routes.filter(route => route.path === '/')
    if (routeList.length > 0) {
        return flattenRoute(routeList, true, true)
    }
    return []
}

export function flattenRoute (routeList, deep, auth) {
    const result = []

    for (let i = 0; i < routeList.length; i += 1) {
        const route = routeList[ i ]

        result.push({
            ...route
            // auth: typeof route.auth !== 'undefined' ? route.auth : auth,
        })

        if (route.children && deep) {
            result.push(...flattenRoute(route.children, deep, auth))
        }
    }
    return result
}

export const businessRouteList = getBusinessRouteList().filter(r => r.name)
export function getPagePathList (pathname) {
    return (pathname || window.location.pathname)
        .split('/')
        .filter(Boolean)
        .map((value, index, array) => '/'.concat(array.slice(0, index + 1).join('/')))
}

export function getBreadcrumbs (matched) {
    return findRoutesByPaths(matched, businessRouteList)
}