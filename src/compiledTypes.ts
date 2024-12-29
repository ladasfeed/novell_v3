export type CompiledNovellType = {
    id: string,
    title: string,
    assets: [{
        type: 'audio',
        id: string,
        src: string
    }, {
        type: 'image',
        id: string,
        src: string
    }],
    chapters: {
        nodes: NodeCompiled[],
    }[]
}

export type NodeCompiled = {
    type: 'basic',
    id: string,
    background?: string,
    next?: string,
    acts: any[],
    isRoot?: boolean
} | {
    type: 'action',
    id: string,
    next?: string,
    background?: string,
    options: Array<{
        text: string,
        next?: string
    }>,
    isRoot?: boolean
}