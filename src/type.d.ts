export type LineStyle = 'normal' | 'bold' | 'double'

export type BorderLineChar = Record<LineStyle, string>
export type Position = 'leftTop' | 'rightTop' | 'vertical' |
 'horizontal' | 'leftBottom' | 'rightBottom' | 'topT' | 'bottomT' | 'intersection' | 'rightT' | 'leftT'
export type SegmentPosition = 'top' | 'bottom';

export type Segment = {
    startIndex: number,
    endIndex: number,
    content: string
    lineStyle?: LineStyle,
}

export type DocumentStyle = {
    cellHeight: number,
    cellWidth: numbeer,
    charLength: number, 
    elipsis?: string,
    paddingSpace: number,
    lineStyle: LineStyle,
}

export type ArrayDocument<T> = {
    body: Array<T> | string,
    style?: DocumentStyle,
    segments?: Record<SegmentPosition, Segment[]>,
    accessor?: (content: T) => string,
}



