import fetch from "../modules/fetch.js";

$("body").on("click", ".btn-view", async (e) =>
    state.view($(e.currentTarget).data("index"))
);

$("body").on("click", ".btn-recover", async (e) =>
    state.recover($(e.currentTarget).data("index"))
);

const state = {
    /* [Table] */
    entity: {
        name: "users/archieve-user",
        attributes: [
            "roleName",
            "fullName",
            "address",
            "contact",
            "DOB",
            "email",
            "statusName",
        ],
        actions: {
            recover: ["fas fa-undo-alt", "recover", "success"],
            view: ["fa fa-eye", "View", "info"],
        },
        baseUrl: "api",
    },
    /* [Object Mapping] */
    models: [],
    /* [Tag object] */
    // btnKey: document.getElementById("key"),
    // btnLook: document.getElementById("look"),
    btnNew: document.getElementById("btn-new"),
    Userid: document.getElementById("id"),
    modalTitle: document.getElementById("modal-title"),
    btnEngrave: document.getElementById("engrave"),
    activeIndex: 0,
    btnUpdate: null,
    btnDelete: null,
    /* [initialized] */
    init: () => {
        // Attach listeners
        // state.btnKey.addEventListener("keyup", state.ask);
        // state.btnKey.disabled = false;
        // state.btnLook.addEventListener("click", state.ask);
        // state.btnLook.disabled = false;
        state.btnNew.addEventListener("click", state.create);
        state.btnNew.disabled = false;

        state.ask();
    },
    /* [ACTIONS] */
    ask: async () => {
        state.models = await fetch.translate(state.entity);
        if (state.models) {
            state.models.forEach((model) => fetch.writer(state.entity, model));
        }
    },
    view: (i) => {
        state.activeIndex = i;
        state.btnEngrave.innerHTML = "Close";

        state.btnEngrave.removeEventListener("click", state.store);
        state.btnEngrave.addEventListener("click", state.closethis);
        fetch.viewOnModal(state.models[i]);
    },
    recover: async (i) => {
        let pkey = state.models[i].id;
        let ans = await fetch.recover(state.entity, pkey);
        if (ans) {
            state.models.splice(i, 1);
        }
    },
};

window.addEventListener("load", state.init);
