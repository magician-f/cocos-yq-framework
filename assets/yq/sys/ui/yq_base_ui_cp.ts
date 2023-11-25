const { ccclass, property } = cc._decorator;

@ccclass
export default class yq_base_ui_cp<OPTION = null> extends cc.Component {

    option: OPTION = null;
    close_cb: () => void

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

    public set_data(option: any, close_cb?: () => void) {
        this.option = option;
        this.close_cb = close_cb;
    }

    public hide() {
        console.log("hide")
    }

}
