import Loading from '../../../public/loading.svg'

const DEFAULT_STYLE = {
    width : '4%'
}

interface LoadingIconProp {
    style?:object
}

export default function LoadingIcon({style}:LoadingIconProp) {

    return <>
        <img src={Loading} alt='로딩중' style={style ? style : DEFAULT_STYLE} />
    </>
}