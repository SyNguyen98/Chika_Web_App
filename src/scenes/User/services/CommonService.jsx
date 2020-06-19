export const setHeaderBackground = (color, url) => {
    return {
        background: `linear-gradient(90deg, ${color}), url('${url}')`,
        backgroundSize: '100% 100%'
    }
}