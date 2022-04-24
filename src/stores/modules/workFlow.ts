import { defineStore } from "pinia";

const WorkerFlowName = 'workerFlow'
const Step = 'step'
export default defineStore('workFlow', {
    state: () => ({
        mode: 'normal', // 工作流默认展示是引导模式
        workerFlow: (() => {
            const mode = { workflowId: '', workflowVersion: '' }
            let info = mode
            try {
                info = JSON.parse(localStorage[WorkerFlowName])
            } catch (e) {
                info = mode
            }
            return info
        })(),
        step: localStorage[Step] || 0
    }),
    getters: {
        getMode: state => state.mode,
        getWorkerFlow: state => state.workerFlow,
        getStep: state => state.step,
    },
    actions: {
        setMode(str: string) {
            this.mode = str
        },
        setStep(step: any) {
            localStorage.setItem(Step, step)
            this.step = step
        },
        setWorkerFlow(workerFlowobj: {
            workflowId: any
            workflowVersion: any
        }) {
            localStorage.setItem(WorkerFlowName, JSON.stringify(workerFlowobj))
            this.workerFlow = {
                workflowId: workerFlowobj.workflowId,
                workflowVersion: workerFlowobj.workflowVersion,
            }
        },
    }
})