import ContextMenu from '@/components/ContextMenu.vue'

ContextMenu.install = Vue => {
    const getInstance = (options) => {
        const ComponentConstructor = Vue.extend(ContextMenu)
        return new ComponentConstructor({
            el: document.createElement('div'),
            propsData: options
        })
    }

    const instance = getInstance()
    document.body.appendChild(instance.$el)

    Vue.prototype.$showContextMenu = (options) => {
        Vue.nextTick(() => {
            instance.showMenu()
        })
    }
}

export default ContextMenu

