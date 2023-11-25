
const { ccclass, property } = cc._decorator;

@ccclass()
export class common_on_click extends cc.Component {

    root: cc.Node = null;

    __preload() {
        let buttons = this.node.getComponentsInChildren(cc.Button);
        for (let i = 0; i < buttons.length; i++) {
            const node = buttons[i].node;
            const func_name = "on_click_" + node.name;
            if (this[func_name]) {
                node.on("click", this[func_name], this);
            }
            const def_click = "on_click_self";
            if (node == this.node && this[def_click]) {
                node.on("click", this[def_click], this);
            }
        }
        this.root = this.node.getChildByName("root");
    }

    protected start(): void {
        this.on_open_anim();
    }

    on_open_anim() {
        if (this.root) {
            //首次实例，打开的时候
            cc.tween(this.root)
                .call(() => {
                    this.root.scale = 0;
                    this.root.opacity = 255;
                })
                .to(0.3, { scale: 1 }, { easing: 'cubicOut' })
                .start();
        }
    }

    on_close_anim(cb: Function) {
        if (this.root) {
            cc.tween(this.root)
                .to(0.15, { scale: 0, opacity: 0 })
                .call(() => {
                    cb();
                })
                .start()
        }
    }

    /** 关闭 */
    on_click_btn_close() {
        yq.ui.back();
    }

    /** 升级页 */
    on_click_btn_upgrade() {
        yq.ui.open("upgrade")
    }

    /** 前往升级页 */
    on_click_btn_to_upgrade() {
        yq.ui.go_to("upgrade")
    }

    /** 活动页 */
    on_click_btn_activity() {
        yq.ui.open("activity")
    }

    /** 前往活动页 */
    on_click_btn_to_activity() {
        yq.ui.go_to("activity")
    }

    /** 战斗场景 */
    on_click_btn_battle() {
        cc.director.loadScene("battle_scene")
    }

    /** 活动页 */
    on_click_btn_settle() {
        yq.ui.open("settle")
    }

    /** 返回主场景 */
    on_click_btn_main() {
        //从战斗返回首页，要销毁战斗页的所有页面
        yq.ui.close_scene_all(cc.director.getScene().name);
        cc.director.loadScene("main_scene")
    }
}

