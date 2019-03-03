export class Node {
    constructor(
        private id: string,
        private data: any,
        private nodes: Array<Node>
    ) {}

    find(id: string): Node {
        return this.nodes.find(e => {
            return e.id === id;
        });
    }

    add(node: Node) {
        this.nodes.push(node);
    }
}
