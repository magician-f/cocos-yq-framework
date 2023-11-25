// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import yq_base_ui_cp from "../../../yq/sys/ui/yq_base_ui_cp";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends yq_base_ui_cp<string> {

    @property(cc.Label)
    label: cc.Label = null;

    protected start(): void {
        this.label.string = this.option;

        const scale = 1;
        this.node.scaleY = 0;
        let a1 = cc.scaleTo(0.3, scale, scale);
        let a2 = cc.delayTime(0.5);
        let a3 = cc.moveBy(1, 0, 120 * scale);
        let a4 = cc.fadeOut(0.5);
        let a = cc.spawn(a3, a4);
        let call = cc.callFunc(() => {
            this.node.destroy();
        });
        let seq = cc.sequence(a1, a2, a, call);
        this.node.runAction(seq);
    }

    // update (dt) {}
}
