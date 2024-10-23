
interface TitleProp {
    name: string
    id?: string
    style?: object
}

const DEFAULT_STYLE = {
    fontSize: '24px',
    fontWeight: 'bold'
};

export default function Title({ name, id, style }: TitleProp) {
    return <div id={id} style={style ? style : DEFAULT_STYLE}>{name}</div>
}