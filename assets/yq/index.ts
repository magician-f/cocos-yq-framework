import yq from "./yq";

window["yq"] = new yq();
declare global {
    const yq: yq;
}