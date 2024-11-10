const formateError = (error) => {
    const errors = {};
    error.errors?.forEach((issue) => {
        errors[issue.path[0]] = issue.message;
    });
    return errors;
};
export { formateError };
