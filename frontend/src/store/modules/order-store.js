import { orderService } from '../../services/order-service'

export default {
    state: {
        orders: null,
    },
    getters: {
        orders(state) {
            return state.orders
        },
    },
    mutations: {
        setOrders(state, { orders }) {
            state.orders = orders
        },
        addOrder(state, { order }) {
            state.orders.push(order)
        },
        removeOrder(state, { orderId }) {
            const idx = state.orders.findIndex((order) => order._id === orderId)
            state.orders.splice(idx, 1)
        },
    },
    actions: {
        async getOrders({ commit }, { filterBy }) {
            try {
                const orders = await orderService.query(filterBy)
                commit({ type: 'setOrders', orders })
                return orders
            } catch (err) {
                console.log('err :>> ', err)
            }
        },
        async addOrder({ commit }, { order }) {
            console.log(order);
            try {
                const addedOrder = await orderService.save(order)
                commit({ type: 'addOrder', order: addedOrder })
            } catch (err) {
                console.log('err :>> ', err)
            }
        },
        async removeOrder({ commit }, { orderId }) {
            try {
                await orderService.removeOrder(orderId)
                commit({ type: 'removeOrder', orderId })
            } catch (err) {
                console.log('err :>> ', err)
            }
        },
    },
}
