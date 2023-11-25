// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import global_data from "../global_data";

const { ccclass, property } = cc._decorator;

@ccclass
export default class main_scene extends cc.Component {

    onLoad() {
        yq.ui.set_table_data(global_data.ui_table);
        yq.prefab.set_table_data(global_data.prefab_table);
    }

}
