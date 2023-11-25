import yq_base_ui_cp from "../../yq/sys/ui/yq_base_ui_cp";

const { ccclass, property } = cc._decorator;

@ccclass()
export class common_on_click extends yq_base_ui_cp {

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

    /** 提示 */
    on_click_btn_tips() {
        yq.ui.open("tips", `获得道具 ${Math.random()}`)
    }

    /** 通知 */
    on_click_btn_notify() {
        //todo
    }

    /** 遮罩 */
    on_click_btn_mask() {
        yq.ui.open_to_top("mask", `模拟的遮罩 ${Math.random()}`)
    }

    /** 飘字 */
    on_click_btn_toast() {
        yq.ui.open("toast", `模拟的飘字 ${Math.random()}`)
    }
}

