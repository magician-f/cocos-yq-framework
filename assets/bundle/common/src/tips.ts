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
    }

    on_click_mask() {
        this.node.destroy();
    }

    // update (dt) {}
}
