
export const createInputHandler = (setState, state) => (e) => {
    const fieldName = e.target.name;
    setState({ ...state, [fieldName]: e.target.value });
};

