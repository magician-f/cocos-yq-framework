const { ccclass, property } = cc._decorator;

@ccclass
export default class debug extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    onLoad() {
        this.add_debug_node();
    }

    add_debug_node() {
        if (cc.director.getScene().getChildByName("debug")) {
            this.node.destroy();
            return
        }
        const node = new cc.Node("debug");
        node.width = cc.winSize.width;
        node.height = cc.winSize.height;
        node.zIndex = 100;
        cc.game.addPersistRootNode(node);
        node.x = cc.winSize.width / 2;
        node.y = cc.winSize.height / 2;
        this.node.parent = node;

        this.schedule(() => {
            let str = "";
            for (let k in yq.ui._ui_stack_data) {
                const list = yq.ui._ui_stack_data[k];
                if (k == cc.director.getScene().name) {
                    str += `[scene] - ${k}\n`;
                }
                for (let i = 0; i < list.length; i++) {
                    const data = list[i];
                    str += `[${data.node.active ? "显" : "隐"}] - ${data.ui_id}\n`
                }
            }
            this.label.string = str;
        }, 0.2, cc.macro.REPEAT_FOREVER, 0.2)
    }



}
