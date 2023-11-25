import { common_on_click } from "../../src/scene/common_on_click";
import yq_base_ui_cp from "./ui/yq_base_ui_cp";
import yq_base_sys from "./yq_base_sys";

export interface ui_data_define {

    //页面名，也为索引，用id命名索引规范配置命名
    id: string

    //预制id
    prefab_id: string,

    //类型 
    type: "layer" | "notify" | "tips" | "mask" | "toast"

}
interface ui_stack_define {
    //节点实例
    node: cc.Node

    // ui索引
    ui_id: string
}
interface ui_stack_data_define {
    //支持针对场景
    [key: string]: ui_stack_define[]
}
export default class yq_ui_sys extends yq_base_sys<ui_data_define> {

    private _root: cc.Node = null;

    /** ui的栈数据 */
    _ui_stack_data: ui_stack_data_define = {}

    constructor() {
        super();
        //加载新场景之前所触发的事件。
        cc.director.on(cc.Director.EVENT_BEFORE_SCENE_LOADING, (scene_name) => {
            this.hide_cur_scene_all();
        });
        //运行新场景之后所触发的事件。
        cc.director.on(cc.Director.EVENT_AFTER_SCENE_LAUNCH, (scene_name) => {
            this.restore_cur_scene_all();
        });
    }

    /** 获得ui系统的根节点 */
    private _get_root_node(): cc.Node {
        if (!this._root) {
            const node = new cc.Node();
            node.width = cc.winSize.width;
            node.height = cc.winSize.height;
            cc.game.addPersistRootNode(node);
            node.x = cc.winSize.width / 2;
            node.y = cc.winSize.height / 2;
            this._root = node;
        }
        return this._root;
    }

    /** 获得当前堆栈数据 */
    private _get_cur_scene_stack() {
        let scene_name = cc.director.getScene().name;
        if (!this._ui_stack_data[scene_name]) {
            this._ui_stack_data[scene_name] = [];
        }
        return this._ui_stack_data[scene_name];
    }

    /** 当前场景是否存在栈数据 */
    private _has_cur_scene_stack(): boolean {
        let scene_name = cc.director.getScene().name;
        return !!this._ui_stack_data[scene_name]
    }

    private _get_data(id: string) {
        const ui_data = this.table_data[id];
        if (!ui_data) {
            console.error(`ui.open no find id:[${id}] data`)
        }
        return ui_data
    }

    private _show(node: cc.Node, id: string, option?: any) {
        const cp = node.getComponent(yq_base_ui_cp);
        if (cp) {
            cp.set_data(option);
        } else {
            console.log(`ui.open id [${id}] no find ${yq_base_ui_cp.name}`)
        }
        node.active = true;
    }

    /** 打开一个新的页面 */
    public async open(id: string, option?: any) {
        const ui_data = this._get_data(id);
        if (!ui_data) {
            return
        }
        //获得预制
        const node = await yq.prefab.ins_node_by_id(ui_data.prefab_id);

        if (!node) {
            console.error(`ui.open node is null`)
            return
        }
        //添加到栈中
        const cur_stack_list = this._get_cur_scene_stack();
        switch (ui_data.type) {
            case "layer":
            case "notify":
            case "mask":
                cur_stack_list.push({
                    node: node,
                    ui_id: id
                })
            case "tips":
            case "toast":
                break;
            default:
                throw new Error(`un.open undefined type [${ui_data.type}]`)
        }

        let zIndex = 0;
        switch (ui_data.type) {
            case "layer":
                zIndex = 10;
                break;
            case "notify":
                zIndex = 20;
                break;
            case "tips":
                zIndex = 30;
                break;
            case "mask":
                zIndex = 40;
                break;
            case "toast":
                zIndex = 50;
                break;
            default:
                throw new Error(`un.open undefined type [${ui_data.type}]`)
        }
        node.zIndex = zIndex;
        node.active = false;
        //添加到根节点
        this._get_root_node().addChild(node);
        this._show(node, id, option);
    }

    /** 
     * 前往某个页面，并关掉所有在他之上的页面
     * 如果不存在就新建一个
     */
    public async go_to(id: string, option?: any) {
        const cur_stack_list = this._get_cur_scene_stack();
        for (let i = cur_stack_list.length - 1; i >= 0; i--) {
            const data = cur_stack_list[i];
            if (data.ui_id == id) {
                while (cur_stack_list.length - 1 > i) {
                    const data = cur_stack_list.pop()
                    data.node.destroy();
                }
                //找到了,激活这个节点
                this._show(data.node, id, option);
                return;
            }

        }
        await this.open(id, option);
    }

    /**
     * 打开一个页面，如果没有创建，如果有移动到栈顶
     */
    public async open_to_top(id: string, option?: any) {
        const cur_stack_list = this._get_cur_scene_stack();
        for (let i = cur_stack_list.length - 1; i >= 0; i--) {
            const data = cur_stack_list[i];
            if (data.ui_id == id) {
                cur_stack_list.splice(i, 1);
                cur_stack_list.push(data);
                this._show(data.node, id, option);
                return;
            }
        }
        await this.open(id, option);
    }

    /** 关闭当前页面 */
    public back() {
        const cur_stack_list = this._get_cur_scene_stack();
        if (cur_stack_list.length) {
            const data = cur_stack_list.pop();
            const anim_cp = data.node.getComponent(yq_base_ui_cp);
            if (anim_cp) {
                anim_cp.on_close_anim(() => {
                    data.node.destroy();
                })
            } else {
                data.node.destroy();
            }
        }
    }

    /** 关闭当前场景的所有页面 */
    public close_scene_all(scene_name: string) {
        const cur_stack_list = this._ui_stack_data[scene_name] || [];
        for (let k in cur_stack_list) {
            const data = cur_stack_list[k];
            data.node.destroy();
        }
        delete this._ui_stack_data[scene_name];
    }

    /** 隐藏当前场景所有页面 */
    public hide_cur_scene_all() {
        if (!this._has_cur_scene_stack()) {
            return
        }
        const cur_stack_list = this._get_cur_scene_stack();
        for (let k in cur_stack_list) {
            const data = cur_stack_list[k];
            //记录当前的状态
            data.node["yq_restore"] = data.node.active;
            if (data.node.active) {
                data.node.active = false;
            }
        }
    }

    /** 恢复当前场景的所有页面 */
    public restore_cur_scene_all() {
        const cur_stack_list = this._get_cur_scene_stack();
        for (let k in cur_stack_list) {
            const data = cur_stack_list[k];
            data.node.active = data.node["yq_restore"];
        }
    }

}