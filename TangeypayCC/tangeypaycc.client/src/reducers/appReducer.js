export default function appReducer(post, action) {
    switch (action.type) {
        case "toggle": {
            const { toggle } = action;
            return toggle;
        }
        case "addinfo": {
            const { info } = action;
            return info;
        }
        default:
            throw new Error("Unhandled action " + action.type);
    }
}