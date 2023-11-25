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

    @property(cc.Node)
    mask: cc.Node = null;

    @property(cc.Label)
    label: cc.Label = null;

    protected start(): void {
        this.label.string = this.option;

        let time = 2;
        this.schedule(() => {
            if (time == 0) {
                this.node.active = false;
                return
            }
            this.label.string = `${this.option}\n${time}秒后关闭`;
            time--;
        }, 1, 3)

        const fadeIn = cc.tween().to(0.1, { opacity: 50 }).to(1, { opacity: 150 });
        const fadeOut = cc.tween().to(0.1, { opacity: 150 }).to(1, { opacity: 50 });
        const sequence = cc.tween().then(fadeIn).then(fadeOut).union().repeatForever();
        cc.tween(this.mask).then(sequence).start();
    }

    // update (dt) {}
}
