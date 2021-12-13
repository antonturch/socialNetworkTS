export const required = (value: any) => {
    if (value) return undefined
    return "Field is required"
}

export const maxLengthCreator = (maxLength: number) => {
    return (value: any) => {
        if (value.length < maxLength) return undefined
        return `Maximum ${maxLength} symbols`
    }
}
export const minLengthCreator = (minLength: number) => {
    return (value: any) => {
        if (value.length > minLength) return undefined
        return `Minimum ${minLength} symbols`
    }
}