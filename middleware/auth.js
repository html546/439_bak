export default function ({ store, error }) {
    if (store.state.message == null || Object.keys(store.state.message).length == 0) {
        error({
            message: "You are not connected",
            statusCode: 403
        })
    }
}