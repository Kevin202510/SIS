import fetch from "../modules/fetch.js";
$("body").on("click", ".btn-find", async (e) =>
    state.show($(e.currentTarget).data("index"))
);
$("body").on("click", ".btn-delete", (e) =>
    state.destroy($(e.currentTarget).data("index"))
);

$("#searchBar").keyup(function () {
    var value = $("#searchBar").val().toLowerCase();
    $("#table-main tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
});

const state = {
    entity: {
        name: "role",
        attributes: ["display_name"],
        actions: {
            find: ["fa fa-pencil-alt", "Edit", "info"],
        },
        baseUrl: "api",
    },
    models: [],
    btnNew: document.getElementById("btn-new"),
    Userid: document.getElementById("id"),
    modalTitle: document.getElementById("modal-title"),
    btnEngrave: document.getElementById("engrave"),
    activeIndex: 0,
    btnUpdate: null,
    btnDelete: null,
    init: () => {
        state.btnNew.addEventListener("click", state.create);
        state.btnNew.disabled = false;

        state.ask();
    },
    ask: async () => {
        state.models = await fetch.translate(state.entity);
        if (state.models) {
            state.models.forEach((model) => fetch.writer(state.entity, model));
        }
    },
    create: () => {
        state.btnEngrave.innerHTML = "Save";
        state.btnEngrave.removeEventListener("click", state.update);
        state.btnEngrave.addEventListener("click", state.store);
        fetch.showModal("roles");
    },
    show: (i) => {
        state.activeIndex = i;
        state.btnEngrave.innerHTML = "Update";

        state.btnEngrave.removeEventListener("click", state.store);
        state.btnEngrave.addEventListener("click", state.update);
        state.btnEngrave.setAttribute("data-id", state.models[i].id);
        fetch.showOnModal(state.models[i]);
    },
    store: async (e) => {
        e.preventDefault();
        let params = $("#set-Model").serializeArray();
        let model = await fetch.store(state.entity, params);
        if (model) {
            state.models.push(model);
            fetch.writer(state.entity, model);
            $("#modal-main").modal("hide");
        }
    },
    update: async () => {
        let params = $("#set-Model").serializeArray();
        let pk = state.btnEngrave.getAttribute("data-id");
        let model = await fetch.update(state.entity, pk, params);

        if (model) {
            //    console.log(model)
            state.models[state.activeIndex] = model;
            fetch.writer(state.entity, model);

            $("#modal-main").modal("hide");
        }
    },
    destroy: async (i) => {
        let pkey = state.models[i].id;
        let ans = await fetch.destroy(state.entity, pkey);
        if (ans) {
            state.models.splice(i, 1);
        }
    },
};

window.addEventListener("load", state.init);
